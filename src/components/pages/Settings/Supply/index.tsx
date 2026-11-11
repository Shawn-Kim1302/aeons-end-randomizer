import React from 'react'

import useExpansionHandling from 'hooks/useExpansionHandling'

import ExpansionPanel from 'components/molecules/ExpansionPanel'

import SetupSelection from './SetupSelection'
import { t } from 'i18n'

const Supply = () => {
  const { expanded, createExpansionHandler } = useExpansionHandling()
  const expansionKey = 'supplySets'
  const expansionHandler = createExpansionHandler(expansionKey)

  return (
    <ExpansionPanel
      expanded={expanded}
      expansionHandler={expansionHandler}
      expansionKey={expansionKey}
      summary={t('settings.supplySetups')}
      data-test="SupplySetups"
    >
      <SetupSelection />
    </ExpansionPanel>
  )
}

export default React.memo(Supply)
