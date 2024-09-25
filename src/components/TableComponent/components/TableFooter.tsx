import { TColumn, TRow } from "../interfaces";

interface ITableFooterProps {
  columns: TColumn[];
  avgRowClassName: string;
  rows: TRow[];
}

const TableFooter: React.FC<ITableFooterProps> = ({
  columns,
  avgRowClassName,
  rows,
}) => {
  return (
    <tfoot>
      <tr className={avgRowClassName}>
        <th scope="row">
          Avg
        </th>

        {columns.map((column, i) => {
          return <td key={i + 1}>{column.getColumnAvg(rows)}</td>;
        })}

        {/* Sum empty cell */}
        <td>&nbsp;</td>

        {/* Actions empty cell */}
        <td className={`actions-cell ${avgRowClassName}`}>
          <div className="actions-text">&nbsp;</div>
        </td>
      </tr>
    </tfoot>
  );
};

export default TableFooter;
