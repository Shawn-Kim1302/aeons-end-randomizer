import React from 'react'
import List from '@material-ui/core/List'

import { Battle } from 'aer-types/types'

import InfoItem from 'components/molecules/InfoItem'

import BodyWrapper from '../../BodyWrapper'
import Name from './Name'
import { t } from 'i18n'

type Props = {
  battle: Battle
  nemesis: string
  friend: string | undefined
  foe: string | undefined
}

const Body = ({ battle, nemesis, friend, foe }: Props) => (
  <BodyWrapper status={battle.status}>
    <Name variant="h6" component="h2">
      Battle: {nemesis}
    </Name>
    <List>
      {foe && <InfoItem label={t('expeditions.battle.foe')} info={foe} />}
      {friend && (
        <InfoItem label={t('expeditions.battle.friend')} info={friend} />
      )}
      <InfoItem label={t('info.tier')} info={battle.config.tier.toString()} />
      <InfoItem
        label={t('expeditions.battle.status')}
        info={t(`expeditions.battle.statuses.${battle.status}` as const)}
      />
      <InfoItem
        label={t('expeditions.battle.tries')}
        info={battle.tries.toString()}
      />
    </List>
  </BodyWrapper>
)

export default React.memo(Body)
