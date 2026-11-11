import React from 'react'
import SectionHeadline from 'components/atoms/SectionHeadline'
import Li from 'components/atoms/Li'
import { t } from 'i18n'

const SpecialRules = ({ rules }: { rules: string[] }) => {
  return (
    <>
      <SectionHeadline>{t('expeditions.battle.specialRules')}</SectionHeadline>
      <ul>
        {rules.map((rule) => (
          <Li key={rule}>{rule}</Li>
        ))}
      </ul>
    </>
  )
}

export default SpecialRules
