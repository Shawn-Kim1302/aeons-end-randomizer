import React from 'react'

import AmountPicker from 'components/molecules/AmountPicker'
import { t } from 'i18n'

type Props = {
  selectedValue: string
  handleAmountChange: (e: React.ChangeEvent<any>) => void
}

const MageCountPicker = ({ selectedValue, handleAmountChange }: Props) => (
  <AmountPicker
    label={t('randomizer.amountOfMages')}
    selectedValue={selectedValue}
    handleAmountChange={handleAmountChange}
    optionsCount={4}
  />
)

export default React.memo(MageCountPicker)
