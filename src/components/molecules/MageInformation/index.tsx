import React from 'react'
import { withTheme } from 'styled-components/macro'

import { Mage, ICard, Expansion } from 'aer-types/types'

import InfoItem from '../InfoItem'

import Ability from '../../atoms/Ability'
import SectionHeadline from '../../atoms/SectionHeadline'

import UniqueStarter from '../UniqueStarter'

import Grid from '@material-ui/core/Grid'
import { t } from 'i18n'

const renderUniqueStarters = (uniqueStarters: ICard[]) => {
  return uniqueStarters.map((card: ICard) => (
    <UniqueStarter key={card.id} card={card} />
  ))
}

type Props = {
  mage: Mage
  player: 'player1' | 'player2' | 'player3' | 'player4'
  expansion: Expansion
  theme: any
}

function formatCharges(
  numberOfCharges: number | 'Custom',
  numberOfOvercharges?: number
): string {
  return `${numberOfCharges}${
    numberOfOvercharges ? ` + ${numberOfOvercharges}` : ''
  }`
}

const MageInformation = ({ mage, player, expansion, theme }: Props) => (
  <React.Fragment>
    <InfoItem label={t('info.title')} info={mage.mageTitle} />
    <InfoItem label={t('info.expansion')} info={expansion.name} />
    <InfoItem label={t('info.wave')} info={expansion.wave || '-'} />
    <InfoItem
      label={t('info.charges')}
      info={formatCharges(mage.numberOfCharges, mage.numberOfOvercharges)}
    />
    {mage.complexityRating ? (
      <InfoItem
        label={t('info.complexity')}
        info={mage.complexityRating.toString()}
      />
    ) : null}

    <Ability
      themeColor={
        player
          ? theme.colors.playerColors[player].normal
          : theme.colors.playerColors['player1'].normal
      }
      name={mage.abilityName}
      activation={mage.abilityActivation}
      effect={mage.abilityEffect}
    />

    <SectionHeadline
      themeColor={
        player
          ? theme.colors.playerColors[player].normal
          : theme.colors.playerColors['player1'].normal
      }
    >
      {t('info.uniqueStarters')}
    </SectionHeadline>

    {mage.uniqueStarters ? (
      <Grid container spacing={16}>
        {renderUniqueStarters(mage.uniqueStarters)}
      </Grid>
    ) : null}
  </React.Fragment>
)

export default withTheme(React.memo(MageInformation))
