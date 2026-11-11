import React from 'react'
import IconButton from 'components/atoms/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import { t } from 'i18n'

type Props = {
  onClick: (...args: any) => void
  className?: string
}

const DeleteButton = ({ onClick, className, ...rest }: Props) => (
  <IconButton
    color="secondary"
    aria-label={t('common.delete')}
    onClick={onClick}
    className={className}
    {...rest}
  >
    <DeleteIcon />
  </IconButton>
)

export default React.memo(DeleteButton)
