import { Cell } from '../../state/cell'
import CodeCell from '../CodeCell'

interface CellItemProps {
  cell: Cell
}
const CellItem: React.FC<CellItemProps> = ({ cell }) => {
  let child: JSX.Element
  if (cell.type === 'code') {
    child = <CodeCell />
  } else {
    child = <CodeCell />
  }
  return <div>{child}</div>
}

export default CellItem
