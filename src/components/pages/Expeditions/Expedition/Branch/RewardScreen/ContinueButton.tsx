import React from 'react'
import Button from '@material-ui/core/Button'
import { t } from 'i18n'

type Props = {
  handleContinue: () => void
  finishingIsPossible: boolean
}

const ContinueButton = ({ handleContinue, finishingIsPossible }: Props) => {
  return (
    <Button
      size="small"
      variant="contained"
      color="primary"
      onClick={handleContinue}
      disabled={!finishingIsPossible}
      data-test="btn-continue"
    >
      {t('common.continue')}
    </Button>
  )
}

export default React.memo(ContinueButton)
