import React from 'react'

import useExpansionHandling from 'hooks/useExpansionHandling'
import { t } from 'i18n'

import ExpansionPanel from 'components/molecules/ExpansionPanel'
import GameLanguageSelection from './GameLanguageSelection/GameLanguageSelection'
import UiLanguageSelection from './UiLanguageSelection'

const Language = () => {
  const { expanded, createExpansionHandler } = useExpansionHandling()
  const expansionKey = 'languageSelectionSet'
  const expansionHandler = createExpansionHandler(expansionKey)

  return (
    <ExpansionPanel
      expanded={expanded}
      expansionHandler={expansionHandler}
      expansionKey={expansionKey}
      summary={t('settings.languageSelection')}
      data-test="LanguageSelection"
    >
      <div>
        <UiLanguageSelection />
        <GameLanguageSelection />
      </div>
    </ExpansionPanel>
  )
}

export default React.memo(Language)
