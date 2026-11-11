import React from 'react'

import FormControl from '../FormControl'
import FormLabel from './FormLabel'
import Input from '../Input'
import Tooltip from 'components/molecules/Tooltip'
import { t } from 'i18n'

type Props = {
  seed: string
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const SeedInput = ({ seed, handleInputChange }: Props) => {
  return (
    <FormControl component={'fieldset' as 'div'}>
      <FormLabel>{t('expeditions.creation.seedSettings')}</FormLabel>

      <Tooltip>{t('expeditions.creation.seedHelp')}</Tooltip>

      <Input
        id="expeditionSeed"
        label={t('expeditions.creation.seed')}
        placeholder={t('expeditions.creation.customSeed')}
        value={seed}
        onChange={handleInputChange}
        margin="normal"
        variant="outlined"
        data-test="input-seed"
      />
    </FormControl>
  )
}

export default React.memo(SeedInput)
