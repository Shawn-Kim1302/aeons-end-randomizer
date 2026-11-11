import React from 'react'

import Link from './Link'
import Wrapper from './Wrapper'
import { t } from 'i18n'

const BottomNavigation = () => (
  <Wrapper>
    <Link
      to="/randomizer/nemesis"
      label={t('nav.nemesis')}
      icon="ra-broken-skull"
    />
    <Link
      to="/randomizer/basic-nemesis-cards"
      label={t('nav.nemesisCards')}
      icon=" ra-monster-skull"
    />
    <Link
      to="/randomizer/mages"
      label={t('nav.mages')}
      icon="ra-crystal-wand"
    />
    <Link to="/randomizer/supply" label={t('nav.supply')} icon="ra-campfire" />
    <Link
      to="/randomizer/friendfoe"
      label={t('nav.friendFoe')}
      icon="ra-double-team"
    />
  </Wrapper>
)

export default React.memo(BottomNavigation)
