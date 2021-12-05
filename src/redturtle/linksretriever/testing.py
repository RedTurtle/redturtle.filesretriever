# -*- coding: utf-8 -*-
from plone.app.contenttypes.testing import PLONE_APP_CONTENTTYPES_FIXTURE
from plone.app.robotframework.testing import REMOTE_LIBRARY_BUNDLE_FIXTURE
from plone.app.testing import (
    applyProfile,
    FunctionalTesting,
    IntegrationTesting,
    PloneSandboxLayer,
)
from plone.testing import z2

import redturtle.linksretriever


class RedturtleLinksretrieverLayer(PloneSandboxLayer):

    defaultBases = (PLONE_APP_CONTENTTYPES_FIXTURE,)

    def setUpZope(self, app, configurationContext):
        # Load any other ZCML that is required for your tests.
        # The z3c.autoinclude feature is disabled in the Plone fixture base
        # layer.
        import plone.restapi
        self.loadZCML(package=plone.restapi)
        self.loadZCML(package=redturtle.linksretriever)

    def setUpPloneSite(self, portal):
        applyProfile(portal, 'redturtle.linksretriever:default')


REDTURTLE_LINKSRETRIEVER_FIXTURE = RedturtleLinksretrieverLayer()


REDTURTLE_LINKSRETRIEVER_INTEGRATION_TESTING = IntegrationTesting(
    bases=(REDTURTLE_LINKSRETRIEVER_FIXTURE,),
    name='RedturtleLinksretrieverLayer:IntegrationTesting',
)


REDTURTLE_LINKSRETRIEVER_FUNCTIONAL_TESTING = FunctionalTesting(
    bases=(REDTURTLE_LINKSRETRIEVER_FIXTURE,),
    name='RedturtleLinksretrieverLayer:FunctionalTesting',
)


REDTURTLE_LINKSRETRIEVER_ACCEPTANCE_TESTING = FunctionalTesting(
    bases=(
        REDTURTLE_LINKSRETRIEVER_FIXTURE,
        REMOTE_LIBRARY_BUNDLE_FIXTURE,
        z2.ZSERVER_FIXTURE,
    ),
    name='RedturtleLinksretrieverLayer:AcceptanceTesting',
)
