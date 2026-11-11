import React from 'react'
import CopyIcon from '@material-ui/icons/FileCopy'

import IconButton from 'components/atoms/IconButton'
import { t } from 'i18n'

type Props = {
  onClick: (...args: any) => void
  className?: string
}

const CopyButton = ({ onClick, className, ...rest }: Props) => (
  <IconButton
    color="primary"
    aria-label={t('common.copy')}
    onClick={onClick}
    className={className}
    {...rest}
  >
    <CopyIcon />
  </IconButton>
)

export default React.memo(CopyButton)
