import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers'
import { ActionType } from './action-types'

export const store = createStore(reducers, {}, applyMiddleware(thunk))

store.dispatch({
  type: ActionType.INSERT_CELL_BEFORE,
  payload: {
    id: Math.random().toString(16).slice(2),
    type: 'code',
  },
})
store.dispatch({
  type: ActionType.INSERT_CELL_BEFORE,
  payload: {
    id: Math.random().toString(16).slice(2),
    type: 'text',
  },
})
store.dispatch({
  type: ActionType.INSERT_CELL_BEFORE,
  payload: {
    id: Math.random().toString(16).slice(2),
    type: 'code',
  },
})
store.dispatch({
  type: ActionType.INSERT_CELL_BEFORE,
  payload: {
    id: Math.random().toString(16).slice(2),
    type: 'code',
  },
})
