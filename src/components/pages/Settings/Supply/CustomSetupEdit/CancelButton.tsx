import React from 'react'
import styled from 'styled-components'
import IconButton from 'components/atoms/IconButton'
import CancelIcon from '@material-ui/icons/Cancel'
import { t } from 'i18n'

const CancelButton = (props: any) => (
  <IconButton
    className={props.className}
    color="secondary"
    aria-label={t('common.cancel')}
    onClick={props.onClick}
  >
    <CancelIcon />
  </IconButton>
)

const StyledCancelButton = styled(React.memo(CancelButton))`
  position: absolute;
  top: -5px;
  right: -5px;
`

export default StyledCancelButton
