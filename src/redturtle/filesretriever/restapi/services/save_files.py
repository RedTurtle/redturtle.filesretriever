# -*- coding: utf-8 -*-
from plone.restapi.services import Service
from redturtle.filesretriever import _
from requests.exceptions import RequestException
from requests.exceptions import Timeout
from zope.i18n import translate
from zope.interface import alsoProvides
from plone.restapi.deserializer import json_body
from copy import deepcopy
from plone import api
from plone.namedfile.file import NamedBlobFile
from plone.protect.interfaces import IDisableCSRFProtection

import logging
import requests
import re

logger = logging.getLogger(__name__)


class SaveFilesService(Service):
    """ """

    def reply(self):
        query = json_body(self.request)
        urls = deepcopy(query.get("urls", []))
        # Disable CSRF protection
        alsoProvides(self.request, IDisableCSRFProtection)

        return self.fetch_and_create(urls=urls)

    def fetch_and_create(self, urls):
        """ """
        for url in urls:
            data = self.fetch_data(url=url.get("href", ""))
            if not data or "error" in data:
                url["created"] = False
                url["error"] = data.get("error", {})
                continue
            try:
                file_obj = api.content.create(
                    container=self.context,
                    type="File",
                    title=url.get("text", data.get("filename", "")),
                )
                file_obj.file = NamedBlobFile(
                    data=data.get("data", ""),
                    filename=data.get("filename", ""),
                    contentType=data.get("content-type", ""),
                )
                url["created"] = True
                url["ploneUrl"] = file_obj.absolute_url()
            except Exception as e:
                logger.exception(e)
                message = e.message or e.args[0]
                url["created"] = False
                url["error"] = dict(
                    error=translate(
                        _(
                            u"Error creating file: ${message}",
                            mapping={"message": message},
                        ),
                        context=self.request,
                    ),
                )
        return urls

    def fetch_data(self, url):
        """ """
        try:
            response = requests.get(url, timeout=10)
        except Timeout as e:
            logger.exception(e)
            return dict(
                error=translate(
                    _(
                        "request_timeout",
                        default="Unable to fetch data from given url (${url}): timeout. Retry later.",
                        mapping=dict(url=url),
                    ),
                    context=self.request,
                ),
            )
        except RequestException as e:
            logger.exception(e)
            return dict(
                error=translate(
                    _(
                        "request_error",
                        default='Unable to fetch data from "${url}". Retry later.',
                        mapping=dict(url=url),
                    ),
                    context=self.request,
                ),
            )
        if response.status_code != 200:
            message = response.text or response.reason
            return dict(error=message)
        filename = ""
        if "Content-Disposition" in response.headers.keys():
            filename = re.findall(
                "filename=(.+)", response.headers["Content-Disposition"]
            )[0]
        else:
            filename = response.url.split("/")[-1]
        content_type = response.headers.get("Content-Type", "")
        if content_type.startswith("text/html"):
            return dict(
                error=translate(
                    _(
                        "wrong_content_type",
                        default='Wrong response content type: "${content_type}".',
                        mapping=dict(content_type=content_type),
                    ),
                    context=self.request,
                ),
            )
        return {
            "filename": filename,
            "data": response.content,
            "content-type": response.headers.get("Content-Type", ""),
        }
