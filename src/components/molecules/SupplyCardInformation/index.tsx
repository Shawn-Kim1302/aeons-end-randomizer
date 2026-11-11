import React from 'react'

import { withTheme } from 'styled-components/macro'

import * as types from 'aer-types/types'

import InfoItem from '../InfoItem'

import SectionHeadline from '../../atoms/SectionHeadline'
import Keywords from '../../atoms/Keywords'
import Keyword from '../../atoms/Keyword'
import Effect from '../../atoms/Effect'
import { t } from 'i18n'

type Props = {
  card: {
    selected: boolean
    type: types.CardType
    name: string
    expansion: string
    cost: number
    developCost?: number
    keywords: string[]
    effect: string
  }
  expansion: types.Expansion
  theme: any
}

const Body = ({ card, expansion, theme }: Props) => (
  <React.Fragment>
    <InfoItem label={t('info.expansion')} info={expansion.name} />
    <InfoItem label={t('info.wave')} info={expansion.wave || '-'} />
    <InfoItem label={t('info.type')} info={card.type} />
    <InfoItem label={t('info.cost')} info={card.cost.toString()} />
    {card.developCost ? (
      <InfoItem
        label={t('info.developCost')}
        info={card.developCost.toString()}
      />
    ) : null}

    <SectionHeadline
      themeColor={theme.colors.cards[card.type.toLowerCase()].color}
    >
      {t('info.effect')}
    </SectionHeadline>

    <Effect effect={card.effect || ''} />
    {card.keywords ? (
      <Keywords>
        {card.keywords.map((keyword) => (
          <Keyword key={keyword}>{keyword}</Keyword>
        ))}
      </Keywords>
    ) : null}
  </React.Fragment>
)

export default withTheme(React.memo(Body))
