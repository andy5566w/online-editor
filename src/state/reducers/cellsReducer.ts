import { ActionType } from '../action-types'
import { CellActions } from '../actions'
import { Cell } from '../cell'

interface CellsState {
  loading: boolean
  error: string | null
  order: string[]
  data: {
    [key: string]: Cell
  }
}

const initialState = {
  loading: false,
  error: null,
  order: [],
  data: {},
}

const reducer = (
  state: CellsState = initialState,
  action: CellActions
): CellsState => {
  switch (action.type) {
    case ActionType.MOVE_CELL:
      return state
    case ActionType.DELETE_CELL:
      return state
    case ActionType.INSERT_CELL_BEFORE:
      return state
    case ActionType.UPDATE_CELL:
      return {
        ...state,
        data: {
          ...state.data,
          [action.payload.id]: {
            ...state.data[action.payload.id],
            content: action.payload.content,
          },
        },
      }
    default:
      return state
  }
}

export default reducer
