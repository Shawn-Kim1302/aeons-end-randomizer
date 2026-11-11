import React from 'react'
import IconButton from 'components/atoms/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import { t } from 'i18n'

type Props = {
  onClick: (...args: any) => void
}

const EditButton = ({ onClick, ...rest }: Props) => (
  <IconButton
    color="primary"
    aria-label={t('common.edit')}
    onClick={onClick}
    {...rest}
  >
    <EditIcon />
  </IconButton>
)

export default React.memo(EditButton)
