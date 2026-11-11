import React from 'react'

import * as types from 'aer-types/types'
import { useModal } from 'hooks/useModal'

import ShuffleButton from 'components/atoms/ShuffleButton'

import BarracksContent from './BarracksContent'
import { t } from 'i18n'

type Props = {
  expedition: types.Expedition
}

const Barracks = ({ expedition }: Props) => {
  const { show, RenderModal } = useModal()

  return (
    <React.Fragment>
      <RenderModal
        titleColor="#333"
        titleLabel={t('expeditions.expedition.barracks')}
      >
        <BarracksContent expedition={expedition} />
      </RenderModal>
      <ShuffleButton
        onClick={show}
        color="primary"
        variant="extended"
        data-test="btn-open-barracks"
      >
        {t('expeditions.expedition.showBarracks')}
      </ShuffleButton>
    </React.Fragment>
  )
}

export default React.memo(Barracks)
