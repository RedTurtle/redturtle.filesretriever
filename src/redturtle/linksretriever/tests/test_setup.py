# -*- coding: utf-8 -*-
"""Setup tests for this package."""
from plone import api
from plone.app.testing import setRoles, TEST_USER_ID
from redturtle.linksretriever.testing import (
    REDTURTLE_LINKSRETRIEVER_INTEGRATION_TESTING  # noqa: E501,
)

import unittest


try:
    from Products.CMFPlone.utils import get_installer
except ImportError:
    get_installer = None


class TestSetup(unittest.TestCase):
    """Test that redturtle.linksretriever is properly installed."""

    layer = REDTURTLE_LINKSRETRIEVER_INTEGRATION_TESTING

    def setUp(self):
        """Custom shared utility setup for tests."""
        self.portal = self.layer['portal']
        if get_installer:
            self.installer = get_installer(self.portal, self.layer['request'])
        else:
            self.installer = api.portal.get_tool('portal_quickinstaller')

    def test_product_installed(self):
        """Test if redturtle.linksretriever is installed."""
        self.assertTrue(self.installer.isProductInstalled(
            'redturtle.linksretriever'))

    def test_browserlayer(self):
        """Test that IRedturtleLinksretrieverLayer is registered."""
        from redturtle.linksretriever.interfaces import (
            IRedturtleLinksretrieverLayer)
        from plone.browserlayer import utils
        self.assertIn(
            IRedturtleLinksretrieverLayer,
            utils.registered_layers())


class TestUninstall(unittest.TestCase):

    layer = REDTURTLE_LINKSRETRIEVER_INTEGRATION_TESTING

    def setUp(self):
        self.portal = self.layer['portal']
        if get_installer:
            self.installer = get_installer(self.portal, self.layer['request'])
        else:
            self.installer = api.portal.get_tool('portal_quickinstaller')
        roles_before = api.user.get_roles(TEST_USER_ID)
        setRoles(self.portal, TEST_USER_ID, ['Manager'])
        self.installer.uninstallProducts(['redturtle.linksretriever'])
        setRoles(self.portal, TEST_USER_ID, roles_before)

    def test_product_uninstalled(self):
        """Test if redturtle.linksretriever is cleanly uninstalled."""
        self.assertFalse(self.installer.isProductInstalled(
            'redturtle.linksretriever'))

    def test_browserlayer_removed(self):
        """Test that IRedturtleLinksretrieverLayer is removed."""
        from redturtle.linksretriever.interfaces import \
            IRedturtleLinksretrieverLayer
        from plone.browserlayer import utils
        self.assertNotIn(
            IRedturtleLinksretrieverLayer,
            utils.registered_layers())
