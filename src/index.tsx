import React from 'react'
import ReactDOM from 'react-dom'
import CodeCell from './components/CodeCell'
import { Provider } from 'react-redux'
import { store } from './state'

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <CodeCell />
      </div>
    </Provider>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
