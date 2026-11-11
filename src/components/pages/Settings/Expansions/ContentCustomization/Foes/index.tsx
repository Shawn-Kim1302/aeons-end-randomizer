import React from 'react'
import { connect } from 'react-redux'
import * as types from 'aer-types/types'

import { RootState, selectors, actions } from 'Redux/Store'

import ListWrapper from 'components/molecules/ListWrapper'

import Checkbox from './Checkbox'
import { t } from 'i18n'

export type ChangeHandler = (id: string) => void

const renderCheckboxes = (items: types.Foe[], changeHandler: ChangeHandler) =>
  items.map((item) => (
    <Checkbox key={item.id} foe={item} changeHandler={changeHandler} />
  ))

const mapStateToProps = (state: RootState, props: { expansionId: string }) => ({
  selectedFoes: selectors.Settings.Expansions.Foes.getFoesByExpansionId(
    state,
    props
  ),
})

const mapDispatchToProps = {
  handleFoeChange: actions.Settings.Expansions.Foes.selected.toggle,
}

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps & {
    expansionId: string
  }

const Foes = ({ selectedFoes, handleFoeChange }: Props) => {
  return (
    <React.Fragment>
      {selectedFoes.length > 0 && (
        <ListWrapper label={t('settings.content.foes')}>
          <React.Fragment>
            {renderCheckboxes(selectedFoes, handleFoeChange)}
          </React.Fragment>
        </ListWrapper>
      )}
    </React.Fragment>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Foes))
