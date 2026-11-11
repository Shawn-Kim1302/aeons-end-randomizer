import React from 'react'
import { connect } from 'react-redux'

import IconButton from 'components/atoms/IconButton'
import Typography from '@material-ui/core/Typography'
import { Loop, Publish, GetApp } from '@material-ui/icons'
import { ITurnOrderCard } from 'aer-types/types'

import { RootState, actions } from 'Redux/Store'

import Cell from './Cell'
import RowWrapper from './RowWrapper'
import { t } from 'i18n'

const mapStateToProps = (state: RootState) => ({})

const mapDispatchToProps = {
  addToTop: actions.TurnOrder.ActiveGame.addToTop,
  addToBottom: actions.TurnOrder.ActiveGame.addToBottom,
  shuffleIntoDeck: actions.TurnOrder.ActiveGame.shuffleIntoDeck,
}

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps & {
    card: ITurnOrderCard
  }

const Row = ({ card, addToTop, addToBottom, shuffleIntoDeck }: Props) => (
  <RowWrapper type={card.type}>
    <Cell>
      <Typography component="p">{card.name}</Typography>
    </Cell>
    <Cell align="right">
      <IconButton
        aria-label={t('turnOrder.addToTop')}
        title={t('turnOrder.addToTop')}
        onClick={() => addToTop(card.id)}
      >
        <Publish fontSize="small" />
      </IconButton>
    </Cell>
    <Cell align="right">
      <IconButton
        aria-label={t('turnOrder.addToBottom')}
        title={t('turnOrder.addToBottom')}
        onClick={() => addToBottom(card.id)}
      >
        <GetApp fontSize="small" />
      </IconButton>
    </Cell>
    <Cell align="right">
      <IconButton
        aria-label={t('turnOrder.shuffleIntoDeck')}
        title={t('turnOrder.shuffleIntoDeck')}
        onClick={() => shuffleIntoDeck(card.id)}
      >
        <Loop fontSize="small" />
      </IconButton>
    </Cell>
  </RowWrapper>
)

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Row))
