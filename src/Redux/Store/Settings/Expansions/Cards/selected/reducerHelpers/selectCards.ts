import { Cmd, loop } from 'redux-loop'

import { State } from '../types'
import { actions } from '../actions'
import { setSelectedCardsToDB } from '../sideEffects'

export const selectCards = (
  state: State,
  action: ReturnType<typeof actions.selectCards>
) => {
  const missingIds = action.payload.filter((id) => !state.includes(id))
  const newState = [...state, ...missingIds]

  return loop(
    newState,
    Cmd.run(setSelectedCardsToDB, {
      args: [newState],
      successActionCreator: actions.setToDBSuccessful,
      failActionCreator: actions.setToDBFailed,
    })
  )
}
