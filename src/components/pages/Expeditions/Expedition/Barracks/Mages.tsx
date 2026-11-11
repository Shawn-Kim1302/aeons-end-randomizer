import React from 'react'

import * as types from 'aer-types/types'

import ExpansionPanel from 'components/molecules/ExpansionPanel'
import MageList from 'components/molecules/MageList'
import { t } from 'i18n'

type Props = {
  mages: types.Mage[]
  expansionKey: string
  expansionHandler: (
    e: React.ChangeEvent<any> | undefined,
    expanded: string | boolean
  ) => void
  expanded: boolean | string
}

const Mages = ({ mages, expansionKey, expansionHandler, expanded }: Props) => (
  <ExpansionPanel
    summary={t('expeditions.expedition.mages')}
    expansionKey={expansionKey}
    expansionHandler={expansionHandler}
    expanded={expanded}
  >
    <MageList mages={mages} />
  </ExpansionPanel>
)

export default React.memo(Mages)
