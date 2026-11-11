import React, { useCallback } from 'react'

import * as types from 'aer-types/types'
import { useModal, usePrompt } from 'hooks/useModal'

import EditButton from 'components/molecules/EditButton'
import DeleteButton from 'components/molecules/DeleteButton'

import ModalBodyWrapper from 'components/atoms/ModalBodyWrapper'
import P from 'components/atoms/P'

import CheckboxWithPreview from '../CheckboxWithPreview'
import CustomSetupEdit from '../CustomSetupEdit'
import CheckboxWithPreviewControls from './CheckboxWithPreviewControls'
import { t } from 'i18n'

type Props = {
  setup: types.IMarketSetup
  changeHandler: (id: string) => void
  editSetup: (id: string) => void
  deleteSetup: (id: string) => void
  cancelEdit: (id: string) => void
}

const CustomSetupCheckbox = ({
  setup,
  changeHandler,
  editSetup,
  deleteSetup,
  cancelEdit,
}: Props) => {
  const {
    show: showEditModal,
    hide: hideEditModal,
    RenderModal: RenderEditModal,
  } = useModal()
  const {
    show: showDeletionDialog,
    hide: hideDeletionDialog,
    RenderPrompt: RenderDeletionPrompt,
  } = usePrompt()
  const modalTitle = t('settings.supply.editSetup')

  const handleEdit = useCallback(() => {
    showEditModal()
    editSetup(setup.id)
  }, [setup.id, showEditModal, editSetup])

  const handleEditCancel = useCallback(
    () => cancelEdit(setup.id),
    [cancelEdit, setup.id]
  )

  const openDeletionDialog = useCallback(() => {
    showDeletionDialog()
  }, [showDeletionDialog])

  const handleDelete = useCallback(() => {
    deleteSetup(setup.id)
    hideDeletionDialog()
  }, [setup.id, deleteSetup, hideDeletionDialog])

  return (
    <CheckboxWithPreview
      setup={setup}
      changeHandler={changeHandler}
      data-test="supply-setup-wrapper"
    >
      <CheckboxWithPreviewControls>
        <EditButton
          onClick={handleEdit}
          data-test="btn-edit-custom-supply-setup"
        />
        <DeleteButton
          onClick={openDeletionDialog}
          data-test="btn-delete-custom-supply-setup"
        />
      </CheckboxWithPreviewControls>
      <RenderEditModal
        titleColor="#333"
        titleLabel={modalTitle}
        closeCallback={handleEditCancel}
      >
        <ModalBodyWrapper>
          <CustomSetupEdit setup={setup} saveCallback={hideEditModal} />
        </ModalBodyWrapper>
      </RenderEditModal>
      <RenderDeletionPrompt
        yesHandler={handleDelete}
        noHandler={hideDeletionDialog}
        titleColor="#333"
        titleLabel={t('settings.supply.deleteSetup')}
      >
        <P>{t('settings.supply.deleteSetupQuestion', { name: setup.name })}</P>
      </RenderDeletionPrompt>
    </CheckboxWithPreview>
  )
}

export default React.memo(CustomSetupCheckbox)
