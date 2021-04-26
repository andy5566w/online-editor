import CodeEditor from './CodeEditor'
import PreviewIframe from './preview'
import { useState, useEffect } from 'react'
import bundler from '../../../bundler'
import { Cell } from '../../../state/cell'
import { useActions } from '../../../hooks/use-actions'

interface CodeCellProps {
  cell: Cell
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const [input, setInput] = useState('')
  const [code, setCode] = useState('')
  const { updateCell } = useActions()

  useEffect(() => {
    let timer: any
    try {
      timer = setTimeout(async () => {
        const result = await bundler(cell.content)
        setCode(result)
      }, 500)
    } catch (e) {
      console.log(e)
    }

    return () => clearTimeout(timer)
  }, [cell.content])

  const handleEditorChange = (value: string) => {
    updateCell(cell.id, value)
  }

  return (
    <div>
      <CodeEditor
        initialValue={cell.content}
        handleCodeChange={handleEditorChange}
      />
      <PreviewIframe code={code} />
    </div>
  )
}
export default CodeCell
