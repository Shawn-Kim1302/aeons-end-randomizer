import React from 'react'
import List from '@material-ui/core/List'

import { INemesisCard, BasicNemesisCard } from 'aer-types/types'

import InfoItem from 'components/molecules/InfoItem'

import Name from './Name'
import Effect from 'components/atoms/Effect'
import { t } from 'i18n'

type Props = {
  nemesisCard: INemesisCard | BasicNemesisCard
  inline: boolean
}

const Body = ({ nemesisCard, inline = false }: Props) => (
  <React.Fragment>
    <Name component="p">{nemesisCard.name}</Name>
    <List>
      <InfoItem label={t('info.set')} info={nemesisCard.expansion} />
      {'tier' in nemesisCard && (
        <InfoItem label={t('info.tier')} info={nemesisCard.tier.toString()} />
      )}
      {nemesisCard.type && (
        <InfoItem label={t('info.type')} info={nemesisCard.type} />
      )}
      {nemesisCard.type === 'Minion' && (
        <InfoItem label={t('info.hp')} info={nemesisCard.hp.toString()} />
      )}
      {inline && <Effect effect={nemesisCard.effect || ''} />}
    </List>
  </React.Fragment>
)

export default React.memo(Body)
