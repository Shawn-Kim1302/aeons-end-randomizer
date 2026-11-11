import React from 'react'

import H2 from '../../../../atoms/H2'
import P from '../../../../atoms/P'

import Wrapper from './Wrapper'
import { t } from 'i18n'

type Props = {
  title: string
  score: number
}

const Header = ({ title, score }: Props) => (
  <Wrapper>
    <H2>{t('expeditions.expedition.title', { title })}</H2>
    <P>
      <b>{t('expeditions.expedition.currentScore')}</b> {score}
    </P>
  </Wrapper>
)

export default React.memo(Header)
