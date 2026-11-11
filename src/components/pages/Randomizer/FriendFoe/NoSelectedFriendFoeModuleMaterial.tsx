import React from 'react'
import Typography from '@material-ui/core/Typography'

import A from 'components/atoms/A'
import { t } from 'i18n'

const NoSelectedFriendFoeModuleMaterial = () => (
  <Typography paragraph>
    {t('randomizer.noFriendFoeCards')}{' '}
    <A to="/settings">{t('common.goToSettings')}</A>.
  </Typography>
)

export default React.memo(NoSelectedFriendFoeModuleMaterial)
