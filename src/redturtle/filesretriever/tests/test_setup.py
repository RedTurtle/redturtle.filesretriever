# -*- coding: utf-8 -*-
"""Setup tests for this package."""

from redturtle.filesretriever.testing import (  # noqa: E501,
    REDTURTLE_FILESRETRIEVER_INTEGRATION_TESTING,
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

    def test_placeholder(self):
        self.assertEqual(1, 1)


class TestUninstall(unittest.TestCase):

    layer = REDTURTLE_FILESRETRIEVER_INTEGRATION_TESTING

    def setUp(self):
        self.portal = self.layer["portal"]

    def test_placeholder(self):
        self.assertEqual(1, 1)
