import React from 'react'
import { connect } from 'react-redux'
import List from '@material-ui/core/List'

import { Treasure } from 'aer-types/types'
import { RootState, selectors } from 'Redux/Store'

import Effect from 'components/atoms/Effect'

import InfoItem from '../../InfoItem'

import Name from './Name'
import { t } from 'i18n'

type OwnProps = {
  treasure: Treasure
}

const mapStateToProps = (state: RootState) => ({
  expansions:
    selectors.Settings.Expansions.Expansions.content.getContent(state),
})

const mapDispatchToProps = {}

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps &
  OwnProps

const Body = ({ treasure, expansions }: Props) => (
  <React.Fragment>
    <Name component="p">{treasure.name}</Name>
    <List>
      <InfoItem
        label={t('info.set')}
        info={expansions.ENG[treasure.expansion]?.name || ''}
      />
      <InfoItem
        label={t('info.treasureLevel')}
        info={treasure.level.toString()}
      />
      {treasure.subtype && (
        <InfoItem label={t('info.subtype')} info={treasure.subtype} />
      )}
    </List>
    <Effect effect={treasure.effect} />
  </React.Fragment>
)

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Body))
