import React from 'react'

import * as types from 'aer-types/types'

import TreasureList from 'components/molecules/TreasureList'
import SectionHeadline from 'components/atoms/SectionHeadline'
import { t } from 'i18n'

type Props = {
  treasures: types.Treasure[]
}

const TreasureReward = ({ treasures }: Props) => {
  return (
    <>
      {treasures.length > 0 && (
        <SectionHeadline>{t('expeditions.branch.treasures')}</SectionHeadline>
      )}
      <TreasureList treasures={treasures} />
    </>
  )
}

export default React.memo(TreasureReward)
