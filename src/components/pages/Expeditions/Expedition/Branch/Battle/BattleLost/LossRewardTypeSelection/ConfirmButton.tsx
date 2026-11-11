import React from 'react'
import Button from '@material-ui/core/Button'
import { t } from 'i18n'

type Props = {
  handleRewardConfirmation: () => void
}

const ConfirmButton = ({ handleRewardConfirmation, ...rest }: Props) => {
  return (
    <Button
      size="small"
      variant="contained"
      color="primary"
      onClick={handleRewardConfirmation}
      {...rest}
    >
      {t('expeditions.battle.getRewards')}
    </Button>
  )
}

export default React.memo(ConfirmButton)
