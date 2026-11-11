import React from 'react'
import Typography from '@material-ui/core/Typography'

import A from '../atoms/A'
import { t } from 'i18n'

const NoSelectedExpansions = () => (
  <Typography paragraph>
    {t('noSelectedExpansions')} <A to="/settings">{t('common.goToSettings')}</A>
    .
  </Typography>
)

export default React.memo(NoSelectedExpansions)
