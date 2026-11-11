import React from 'react'

import Button from '@material-ui/core/Button'

import ModalBodyWrapper from '../atoms/ModalBodyWrapper'
import ModalFooterWrapper from '../atoms/ModalFooterWrapper'
import { t } from 'i18n'

const Prompt = ({
  yesHandler,
  noHandler,
  children,
}: {
  yesHandler: () => void
  noHandler: () => void
  children?: React.ReactChild
}) => {
  return (
    <React.Fragment>
      <ModalBodyWrapper hasFooter={true}>{children}</ModalBodyWrapper>
      <ModalFooterWrapper>
        <Button
          onClick={noHandler}
          size="small"
          variant="contained"
          color="secondary"
          data-test="NO"
        >
          {t('common.no')}
        </Button>
        <Button
          size="small"
          variant="contained"
          color="primary"
          onClick={yesHandler}
          data-test="YES"
        >
          {t('common.yes')}
        </Button>
      </ModalFooterWrapper>
    </React.Fragment>
  )
}

export default React.memo(Prompt)
