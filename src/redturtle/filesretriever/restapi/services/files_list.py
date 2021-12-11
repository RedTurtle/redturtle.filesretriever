# -*- coding: utf-8 -*-
from bs4 import BeautifulSoup
from plone.restapi.deserializer import json_body
from plone.restapi.services import Service
from redturtle.filesretriever import _
from requests.exceptions import RequestException
from requests.exceptions import Timeout
from zope.i18n import translate

import logging
import requests


logger = logging.getLogger(__name__)


class FilesListService(Service):
    """ """

    def reply(self):
        query = json_body(self.request)
        url = query.get("url", "")

        html = self.fetch_html(url)
        if not html:
            return {}

        css_class = query.get("class", "")
        css_id = query.get("id", "")
        links = self.extract_links(html=html, css_class=css_class, css_id=css_id)
        return {"links": links}

    def fetch_html(self, url):
        """ """
        try:
            response = requests.get(url, timeout=10)
        except Timeout as e:
            logger.exception(e)
            return dict(
                error=dict(
                    code="408",
                    type="Timeout",
                    message=translate(
                        _(
                            "request_timeout",
                            default="Unable to fetch data from given url (${url}): timeout. Retry later.",
                            mapping=dict(url=url),
                        ),
                        context=self.request,
                    ),
                )
            )
        except RequestException as e:
            logger.exception(e)
            return dict(
                error=dict(
                    code="500",
                    type="InternalServerError",
                    message=translate(
                        _(
                            "request_error",
                            default='Unable to fetch data from "${url}". Retry later.',
                            mapping=dict(url=url),
                        ),
                        context=self.request,
                    ),
                )
            )
        if response.status_code != 200:
            message = response.text or response.reason
            return dict(
                error=dict(
                    code=response.status_code,
                    type="InternalServerError",
                    message=message,
                )
            )
        return response.content

    def extract_links(self, html, css_class, css_id):
        """ """
        soup = BeautifulSoup(html, "html.parser")
        if css_class:
            root = soup.find_all(class_=css_class)
        elif css_id:
            root = soup.find_all(id=css_id)
        else:
            root = [soup]
        links = []
        for element in root:
            for a_tag in element.findAll("a"):
                href = a_tag.attrs.get("href")
                text = a_tag.text
                if href == "" or href is None:
                    # href empty tag
                    continue
                links.append(dict(href=href, text=text))
        return links
