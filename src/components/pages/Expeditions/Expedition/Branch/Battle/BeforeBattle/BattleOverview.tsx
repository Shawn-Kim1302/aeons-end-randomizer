import React from 'react'

import * as types from 'aer-types/types'

import UpgradedBasicNemesisCardList from 'components/molecules/UpgradedBasicNemesisCardList'
import NemesisInformation from 'components/molecules/NemesisInformation'
import InfoItem from 'components/molecules/InfoItem'
import SectionHeadline from 'components/atoms/SectionHeadline'
import SpecialRules from '../SpecialRules'
import FriendInformation from 'components/molecules/FriendInformation'
import FoeInformation from 'components/molecules/FoeInformation'
import { t } from 'i18n'

type Props = {
  info: string
  nemesis?: types.Nemesis
  foe?: types.Foe
  friend?: types.Friend
  specialRules?: string
  onLoss?: string
  upgradedBasicNemsisCards: types.UpgradedBasicNemesisCard[]
  tier: types.NemesisTier
}

const BattleOverview = ({
  info,
  nemesis,
  friend,
  foe,
  upgradedBasicNemsisCards,
  specialRules,
  onLoss,
  tier,
}: Props) => {
  return (
    <>
      <InfoItem label={t('expeditions.battle.tries')} info={info} />
      <SectionHeadline data-test={`${nemesis?.name}`}>
        {nemesis ? nemesis.name : t('expeditions.battle.nemesis')}
      </SectionHeadline>
      <NemesisInformation nemesis={nemesis} fightFive={tier === 5} />
      {friend && (
        <>
          <SectionHeadline data-test="friend">
            {t('expeditions.battle.friendName', { name: friend.name })}
          </SectionHeadline>
          <FriendInformation friend={friend} simple={true} />
        </>
      )}
      {foe && (
        <>
          <SectionHeadline data-test="foe">
            {t('expeditions.battle.foeName', { name: foe.name })}
          </SectionHeadline>
          <FoeInformation foe={foe} simple={true} />
        </>
      )}
      {(specialRules || onLoss) && (
        <SpecialRules
          rules={[
            ...(specialRules ? [specialRules] : []),
            ...(onLoss === 'skip' ? [t('common.singleTry')] : []),
          ]}
        />
      )}
      <UpgradedBasicNemesisCardList
        upgradedBasicNemsisCards={upgradedBasicNemsisCards}
      />
    </>
  )
}

export default React.memo(BattleOverview)
