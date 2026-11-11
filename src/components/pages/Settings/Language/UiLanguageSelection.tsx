import React from 'react'
import { useTranslation } from 'react-i18next'
import FormGroup from '@material-ui/core/FormGroup'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Typography from '@material-ui/core/Typography'

import SelectField from 'components/atoms/SelectField'
import {
  t,
  UI_LANGUAGES,
  UiLanguage,
  changeUiLanguage,
  currentUiLanguage,
} from 'i18n'

const UiLanguageSelection = () => {
  // Re-render when the language changes so the selected value stays in sync.
  useTranslation()

  return (
    <FormGroup style={{ marginBottom: '16px' }}>
      <InputLabel shrink>{t('settings.uiLanguage')}</InputLabel>
      <SelectField
        value={currentUiLanguage()}
        onChange={(e: React.ChangeEvent<{ value: UiLanguage }>) =>
          changeUiLanguage(e.target.value)
        }
        inputProps={{ name: 'uiLanguage', id: 'uiLanguage' }}
        data-test="select-ui-language"
      >
        {(Object.keys(UI_LANGUAGES) as UiLanguage[]).map((language) => (
          <MenuItem key={language} value={language}>
            {UI_LANGUAGES[language]}
          </MenuItem>
        ))}
      </SelectField>
      <Typography color="textSecondary">
        {t('settings.uiLanguageHelp')}
      </Typography>
    </FormGroup>
  )
}

export default React.memo(UiLanguageSelection)
