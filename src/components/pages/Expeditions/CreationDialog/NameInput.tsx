import React from 'react'

import Input from '../Input'
import FormLabel from './FormLabel'
import FormControl from '../FormControl'
import { t } from 'i18n'

type Props = {
  expeditionName: string
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const NameInput = ({ expeditionName, handleInputChange, ...rest }: Props) => {
  return (
    <FormControl component={'fieldset' as 'div'}>
      <FormLabel>{t('expeditions.creation.general')}</FormLabel>

      <Input
        id="expeditionName"
        label={t('expeditions.creation.expeditionName')}
        placeholder={t('expeditions.creation.expeditionName')}
        value={expeditionName}
        onChange={handleInputChange}
        margin="normal"
        variant="outlined"
        {...rest}
      />
    </FormControl>
  )
}

export default React.memo(NameInput)
