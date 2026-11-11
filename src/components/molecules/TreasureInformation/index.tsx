import React from 'react'

import { withTheme } from 'styled-components/macro'

import * as types from 'aer-types/types'

import InfoItem from 'components/molecules/InfoItem'

import SectionHeadline from 'components/atoms/SectionHeadline'
import Effect from 'components/atoms/Effect'
import { t } from 'i18n'

type Props = {
  card: types.Treasure
  expansionName: string
  theme: any
}

const Body = ({ card, expansionName, theme }: Props) => (
  <React.Fragment>
    <InfoItem label={t('info.set')} info={expansionName} />
    <InfoItem label={t('info.treasureLevel')} info={card.level.toString()} />
    {card.subtype && <InfoItem label={t('info.subtype')} info={card.subtype} />}

    <SectionHeadline themeColor={theme.colors.text.primary}>
      {t('info.effect')}
    </SectionHeadline>

    <Effect effect={card.effect || ''} />
  </React.Fragment>
)

export default withTheme(React.memo(Body))
