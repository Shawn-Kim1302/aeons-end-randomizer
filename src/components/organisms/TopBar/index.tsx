import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Toolbar from '@material-ui/core/Toolbar'

import Title from './Title'
import AppBar from './AppBar'
import MenuButton from './MenuButton'
import { t } from 'i18n'

type Props = {
  drawerIsOpen: boolean
  toggleDrawer: () => void
}

const TopBar = ({ drawerIsOpen, toggleDrawer }: Props) => (
  <AppBar>
    <Toolbar disableGutters={!drawerIsOpen}>
      <MenuButton drawerIsOpen={drawerIsOpen} onClick={toggleDrawer} />
      <Title variant="h6" color="inherit">
        <Switch>
          <Route path="/randomizer/nemesis" render={() => t('nav.nemesis')} />
          <Route
            path="/randomizer/basic-nemesis-cards"
            render={() => t('nav.basicNemesisCards')}
          />
          <Route path="/randomizer/mages" render={() => t('nav.mages')} />
          <Route path="/randomizer/supply" render={() => t('nav.supply')} />
          <Route path="/turnorder" render={() => t('nav.turnOrder')} />
          <Route path="/about" render={() => t('nav.about')} />
          <Route
            path="/settings/expansions/:id"
            render={() => t('nav.settingsExpansions')}
          />
          <Route path="/settings" render={() => t('nav.settings')} />
          <Route path="/expeditions/:id" render={() => t('nav.expeditions')} />
          <Route path="/expeditions" render={() => t('nav.expeditions')} />
        </Switch>
      </Title>
    </Toolbar>
  </AppBar>
)

export default React.memo(TopBar)
