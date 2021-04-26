import { ActionType } from '../action-types'
import { CellActions } from '../actions'
import { Cell } from '../cell'
import produce from 'immer'
const initialCode = `import React from 'react';
import ReactDOM from 'react-dom'

const App = () => {
  return <div>Hi There~</div>
}

ReactDOM.render(<App />, document.getElementById('root'))
`
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

const reducer = produce(
  (state: CellsState = initialState, action: CellActions) => {
    switch (action.type) {
      case ActionType.MOVE_CELL:
        const { direction } = action.payload
        const index = state.order.findIndex((id) => id === action.payload.id)
        const target_index = direction === 'up' ? index - 1 : index + 1
        if (target_index < 0 || target_index > state.order.length - 1) return

        state.order[index] = state.order[target_index]
        state.order[target_index] = action.payload.id
        return state
      case ActionType.DELETE_CELL:
        delete state.data[action.payload.id]
        state.order = state.order.filter((id) => id !== action.payload.id)
        return state
      case ActionType.INSERT_CELL_BEFORE:
        const cell: Cell = {
          content: initialCode,
          type: action.payload.type,
          id: randomId(),
        }
        state.data[cell.id] = cell

        const foundIndex = state.order.findIndex(
          (id) => id === action.payload.id
        )
        if (foundIndex === -1) state.order.push(cell.id)
        else state.order.splice(foundIndex, 0)

        return state
      case ActionType.UPDATE_CELL:
        const { id, content } = action.payload
        state.data[id].content = content
        return state
      default:
        return state
    }
  }
)
const randomId = () => Math.random().toString(16).slice(2)

export default reducer
