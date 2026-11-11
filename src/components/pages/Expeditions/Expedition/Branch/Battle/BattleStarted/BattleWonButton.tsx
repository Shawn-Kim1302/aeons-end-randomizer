import React from 'react'

import Button from '@material-ui/core/Button'
import { t } from 'i18n'

type Props = {
  handleWin: () => void
}

const BattleWonButton = ({ handleWin }: Props) => {
  return (
    <Button
      size="small"
      variant="contained"
      color="primary"
      onClick={handleWin}
      data-test="btn-battle-won"
    >
      {t('expeditions.battle.battleWon')}
    </Button>
  )
}

export default React.memo(BattleWonButton)
