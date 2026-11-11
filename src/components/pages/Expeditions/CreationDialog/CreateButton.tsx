import React from 'react'

import Button from '@material-ui/core/Button'
import { t } from 'i18n'

type Props = {
  handleExpeditionCreation: () => void
}

const CreateButton = ({ handleExpeditionCreation, ...rest }: Props) => {
  return (
    <Button
      size="small"
      variant="contained"
      color="primary"
      onClick={handleExpeditionCreation}
      {...rest}
    >
      {t('expeditions.creation.createExpedition')}
    </Button>
  )
}

export default React.memo(CreateButton)
