import React from 'react'
import { connect } from 'react-redux'
import { Typography } from '@material-ui/core'
import { t } from 'i18n'

const GameLanguageSelection = () => (
  <Typography paragraph>{t('settings.gameLanguageHelp')}</Typography>
)

export default connect()(React.memo(GameLanguageSelection))
