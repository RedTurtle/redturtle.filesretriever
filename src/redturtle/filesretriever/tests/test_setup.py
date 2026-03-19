# -*- coding: utf-8 -*-
"""Setup tests for this package."""
from plone import api
from plone.app.testing import setRoles, TEST_USER_ID
from redturtle.filesretriever.testing import (
    REDTURTLE_FILESRETRIEVER_INTEGRATION_TESTING,  # noqa: E501,
)

import unittest


try:
    from Products.CMFPlone.utils import get_installer
except ImportError:
    get_installer = None


class TestSetup(unittest.TestCase):
    """Test that redturtle.filesretriever is properly installed."""

    layer = REDTURTLE_FILESRETRIEVER_INTEGRATION_TESTING

    def setUp(self):
        """Custom shared utility setup for tests."""
        self.portal = self.layer["portal"]


class TestUninstall(unittest.TestCase):

    layer = REDTURTLE_FILESRETRIEVER_INTEGRATION_TESTING

    def setUp(self):
        self.portal = self.layer["portal"]

