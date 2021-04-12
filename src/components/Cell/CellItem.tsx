import { Cell } from '../../state/cell'

interface CellItemProps {
  cell: Cell
}
const CellItem: React.FC<CellItemProps> = ({ cell }) => {
  return <div>{cell.id}</div>
}

export default CellItem
