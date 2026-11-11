import React, { useCallback } from 'react'
import { connect } from 'react-redux'
import { RootState, selectors, actions } from 'Redux/Store'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'

type OwnProps = {
  keyword: string
}

const mapStateToProps = (state: RootState, ownProps: OwnProps) => ({
  selectedByKeyword:
    selectors.Settings.Expansions.Cards.getSelectedCardIdsByKeyword(
      state,
      ownProps
    ),
  allByKeyword: selectors.Settings.Expansions.Cards.getCardIdsByKeyword(
    state,
    ownProps
  ),
})

const mapDispatchToProps = {
  handleDeselect: actions.Settings.Expansions.Cards.selected.deselectCards,
  handleSelect: actions.Settings.Expansions.Cards.selected.selectCards,
}

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps &
  OwnProps

// Behaves like a checkbox for all supply cards with this keyword:
// checked = all selected, indeterminate = some selected.
// Clicking a checked box deselects them; otherwise it selects all of them.
const KeywordButton = ({
  keyword,
  selectedByKeyword,
  allByKeyword,
  handleDeselect,
  handleSelect,
}: Props) => {
  const allSelected =
    allByKeyword.length > 0 && selectedByKeyword.length === allByKeyword.length
  const someSelected = selectedByKeyword.length > 0 && !allSelected

  const toggle = useCallback(() => {
    if (allSelected) {
      handleDeselect(selectedByKeyword)
    } else {
      handleSelect(allByKeyword)
    }
  }, [
    allSelected,
    selectedByKeyword,
    allByKeyword,
    handleDeselect,
    handleSelect,
  ])

  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={allSelected}
          indeterminate={someSelected}
          onChange={toggle}
          data-test={`keyword-${keyword}`}
        />
      }
      label={`${keyword} (${selectedByKeyword.length}/${allByKeyword.length})`}
    />
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(KeywordButton))
