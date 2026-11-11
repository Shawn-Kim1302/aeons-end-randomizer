import React from 'react'

import { withTheme } from 'styled-components/macro'

import * as types from 'aer-types/types'

import InfoItem from 'components/molecules/InfoItem'

import SectionHeadline from 'components/atoms/SectionHeadline'
import Effect from 'components/atoms/Effect'
import { t } from 'i18n'

type Props = {
  card: types.BasicNemesisCard | types.UpgradedBasicNemesisCard
  expansion: types.Expansion
  theme: any
}

const Body = ({ card, expansion, theme }: Props) => (
  <React.Fragment>
    <InfoItem label={t('info.expansion')} info={expansion.name} />
    <InfoItem label={t('info.wave')} info={expansion.wave || '-'} />
    <InfoItem label={t('info.tier')} info={card.tier.toString()} />
    {card.type && <InfoItem label={t('info.type')} info={card.type} />}
    {card.type === 'Minion' && (
      <InfoItem label={t('info.hp')} info={card.hp.toString()} />
    )}

    <SectionHeadline themeColor={theme.colors.turnOrderCards['nemesis'].normal}>
      {t('info.effect')}
    </SectionHeadline>

    <Effect effect={card.effect || ''} />
  </React.Fragment>
)

export default withTheme(React.memo(Body))
