import React from 'react'

import Checkbox from '@material-ui/core/Checkbox'
import FormControl from '../FormControl'
import FormLabel from './FormLabel'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { t } from 'i18n'

type Props = {
  uniqueMageNames: boolean
  changeUniqueMageNames: (value: boolean) => any
}

const UniqueMageNamesSelect = ({
  uniqueMageNames,
  changeUniqueMageNames,
}: Props) => {
  return (
    <FormControl component={'fieldset' as 'div'}>
      <FormLabel>{t('expeditions.creation.mageSelection')}</FormLabel>
      <FormControlLabel
        control={
          <Checkbox
            id="uniqueMageNames"
            checked={uniqueMageNames}
            onChange={() => changeUniqueMageNames(!uniqueMageNames)}
          />
        }
        label={t('expeditions.creation.uniqueMageNames')}
      />
    </FormControl>
  )
}

export default React.memo(UniqueMageNamesSelect)
