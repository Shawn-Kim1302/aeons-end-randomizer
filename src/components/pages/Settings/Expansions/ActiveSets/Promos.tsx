import React from 'react'
import { connect } from 'react-redux'

import { RootState, selectors } from '../../../../../Redux/Store'

import ExpansionList, { ChangeHandler } from './ExpansionList'
import { t } from 'i18n'

const mapStateToProps = (state: RootState) => ({
  promos: selectors.Settings.Expansions.Expansions.getPromos(state),
})

const mapDispatchToProps = {}

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps & {
    handleChange: ChangeHandler
  }

const Standalones = ({ promos, handleChange }: Props) => (
  <ExpansionList
    label={t('settings.promos')}
    expansions={promos}
    handleChange={handleChange}
  />
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(Standalones))
