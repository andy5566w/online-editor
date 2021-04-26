import { Cell } from '../../state/cell'
import CodeCell from './code/CodeCell'

interface CellItemProps {
  cell: Cell
}
const CellItem: React.FC<CellItemProps> = ({ cell }) => {
  let child: JSX.Element
  if (cell.type === 'code') {
    child = <CodeCell cell={cell} />
  } else {
    child = <CodeCell cell={cell} />
  }
  return <div>{child}</div>
}

export default CellItem
