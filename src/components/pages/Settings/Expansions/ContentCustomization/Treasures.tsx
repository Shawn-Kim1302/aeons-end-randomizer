import React from 'react'
import { connect } from 'react-redux'

import { RootState, selectors, actions } from 'Redux/Store'

import TreasureListItem from './TreasureListItem'
import { t } from 'i18n'

const mapStateToProps = (state: RootState, props: { expansionId: string }) => ({
  treasures: selectors.Settings.Expansions.Treasures.getTreasuresByExpansionId(
    state,
    props
  ),
})

const mapDispatchToProps = {
  handleTreasureChange: actions.Settings.Expansions.Treasures.selected.toggle,
}

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps & {
    expansionId: string
  }

const Treasures = ({ treasures, handleTreasureChange }: Props) => (
  <React.Fragment>
    {treasures.length > 0 && (
      <TreasureListItem
        entities={treasures}
        handleCheckboxChange={handleTreasureChange}
        label={t('settings.content.treasures')}
      />
    )}
  </React.Fragment>
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(Treasures))
