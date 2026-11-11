import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import SaveIcon from '@material-ui/icons/Save'
import CancelIcon from '@material-ui/icons/Cancel'

import * as types from 'aer-types/types'

import InputField from './InputField'
import MainControlsWrapper from './MainControlsWrapper'
import { t } from 'i18n'

type Props = {
  bluePrintList: types.IBluePrint[]
  cancelEdit: Function
  setup: types.IMarketSetup
  setupName: string
  setSetupName: Function
  saveCustomSetup: Function
}

const MainControls = ({
  bluePrintList,
  cancelEdit,
  setup,
  setupName,
  setSetupName,
  saveCustomSetup,
}: Props) => {
  return (
    <MainControlsWrapper>
      <InputField
        id="setup-name"
        label={t('settings.supply.setupName')}
        placeholder={t('settings.supply.setupName')}
        value={setupName}
        onChange={(e) => setSetupName(e.currentTarget.value)}
        margin="normal"
        data-test="input-name"
      />
      <IconButton
        color="primary"
        aria-label={t('common.save')}
        onClick={() =>
          saveCustomSetup({ ...setup, name: setupName, tiles: bluePrintList })
        }
        data-test="btn-save-custom-supply-setup"
      >
        <SaveIcon />
      </IconButton>
      <IconButton
        color="secondary"
        aria-label={t('common.cancel')}
        onClick={() => cancelEdit(setup.id)}
        data-test="btn-cancel-edit-custom-supply-setup"
      >
        <CancelIcon />
      </IconButton>
    </MainControlsWrapper>
  )
}

export default React.memo(MainControls)
