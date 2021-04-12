import { useTypedSelector } from '../../hooks/use-typed-selector'
import CellItem from './CellItem'
import { Cell } from '../../state/cell'

const CellLists: React.FC = () => {
  // @ts-ignore
  const cells = useTypedSelector(({ cells: { order, data } }) => {
    return order.map((order_id: string | number) => data[order_id])
  })
  const renderedCell = cells.map((cell: Cell) => (
    <CellItem key={cell.id} cell={cell} />
  ))
  return <div>{renderedCell}</div>
}

export default CellLists
