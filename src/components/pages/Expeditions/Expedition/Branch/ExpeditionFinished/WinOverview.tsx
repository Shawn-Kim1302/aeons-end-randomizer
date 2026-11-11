import React from 'react'

import InfoItem from 'components/molecules/InfoItem'
import P from 'components/atoms/P'
import { t } from 'i18n'

type Props = {
  info: string
}

const WinOverview = ({ info }: Props) => {
  return (
    <>
      <P>{t('expeditions.branch.expeditionComplete')}</P>
      <InfoItem label={t('expeditions.branch.score')} info={info} />
    </>
  )
}

export default React.memo(WinOverview)
