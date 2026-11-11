import React from 'react'

import InfoItem from 'components/molecules/InfoItem'
import Wrapper from './Wrapper'
import { t } from 'i18n'

type Props = {
  count: number
}

const RoundCount = ({ count }: Props) => {
  return (
    <Wrapper>
      <InfoItem label={t('turnOrder.round')} info={count.toString()}></InfoItem>
    </Wrapper>
  )
}

export default React.memo(RoundCount)
