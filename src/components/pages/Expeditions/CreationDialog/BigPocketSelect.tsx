import React from 'react'

import Checkbox from '@material-ui/core/Checkbox'
import FormControl from '../FormControl'
import FormLabel from './FormLabel'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { t } from 'i18n'

type Props = {
  bigPocketVariant: boolean
  changeBigPocketVariant: (value: boolean) => any
}

const BigPocketSelect = ({
  bigPocketVariant,
  changeBigPocketVariant,
}: Props) => {
  return (
    <FormControl component={'fieldset' as 'div'}>
      <FormLabel>{t('expeditions.creation.lootDistribution')}</FormLabel>
      <FormControlLabel
        control={
          <Checkbox
            id="bigPocket"
            checked={bigPocketVariant}
            onChange={() => changeBigPocketVariant(!bigPocketVariant)}
          />
        }
        label={t('expeditions.creation.bigPocketVariant')}
      />
    </FormControl>
  )
}

export default React.memo(BigPocketSelect)
