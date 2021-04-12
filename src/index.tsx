import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { store } from './state'
import './scss/App.scss'
import CellLists from './components/Cell/CellLists'

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <CellLists />
      </div>
    </Provider>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
