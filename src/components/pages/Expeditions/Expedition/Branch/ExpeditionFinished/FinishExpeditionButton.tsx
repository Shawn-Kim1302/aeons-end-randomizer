import React from 'react'
import Button from '@material-ui/core/Button'
import { t } from 'i18n'

type Props = {
  handleFinish: () => void
}

const FinishExpeditionButton = ({ handleFinish }: Props) => {
  return (
    <Button
      onClick={handleFinish}
      size="small"
      variant="contained"
      color="primary"
    >
      {t('expeditions.branch.finishExpedition')}
    </Button>
  )
}

export default React.memo(FinishExpeditionButton)
