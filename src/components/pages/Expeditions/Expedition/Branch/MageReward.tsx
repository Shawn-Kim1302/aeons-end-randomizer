import React from 'react'

import * as types from 'aer-types/types'

import SectionHeadline from 'components/atoms/SectionHeadline'
import MageList from 'components/molecules/MageList'
import { t } from 'i18n'

type Props = {
  mages: (types.Mage | undefined)[]
}

const MageReward = ({ mages }: Props) => {
  return (
    <>
      {mages.length > 0 && (
        <SectionHeadline>{t('expeditions.branch.newMages')}</SectionHeadline>
      )}
      {mages.length > 0 && <MageList mages={mages} />}
    </>
  )
}

export default React.memo(MageReward)
