import { TColumn } from "../interfaces";

const TableHeader: React.FC<{ columns: TColumn[] }> = ({ columns }) => {
  return (
    <thead>
      <tr>
        <td className="header-cell">&nbsp;</td>
        {columns.map((col, i) => {
          return <th className="header-cell" key={i + 1}>{col.columnName}</th>;
        })}
        <th className="header-cell">Sum</th>
        <th className="actions-column header-cell">
          <div className="actions-text">Actions</div>
        </th>
      </tr>
    </thead>
  );
};

export default TableHeader;
