import React from 'react'
import ReactDOM from 'react-dom'
import CodeCell from './components/CodeCell'

const App = () => {
  return (
    <div>
      <CodeCell />
      <CodeCell />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
