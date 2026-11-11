import React from 'react'
import { connect } from 'react-redux'

import { RootState, selectors } from '../../../../../Redux/Store'

import ExpansionList, { ChangeHandler } from './ExpansionList'
import { t } from 'i18n'

const mapStateToProps = (state: RootState) => ({
  miniExpansions:
    selectors.Settings.Expansions.Expansions.getMiniExpansions(state),
})

const mapDispatchToProps = {}

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps & {
    handleChange: ChangeHandler
  }

const Standalones = ({ miniExpansions, handleChange }: Props) => (
  <ExpansionList
    label={t('settings.miniExpansions')}
    expansions={miniExpansions}
    handleChange={handleChange}
  />
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(Standalones))
