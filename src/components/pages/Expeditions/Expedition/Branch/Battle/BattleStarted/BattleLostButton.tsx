import React from 'react'

import Button from '@material-ui/core/Button'
import { t } from 'i18n'

type Props = {
  handleLoss: () => void
}

const BattleLostButton = ({ handleLoss }: Props) => {
  return (
    <Button
      size="small"
      variant="contained"
      color="secondary"
      onClick={handleLoss}
      data-test="btn-battle-lost"
    >
      {t('expeditions.battle.battleLost')}
    </Button>
  )
}

export default React.memo(BattleLostButton)
