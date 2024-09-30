import { MouseEvent } from "react";

import TableHeader from "./components/TableHeader";
import TableFooter from "./components/TableFooter";

import { ITableProps, TCell, TNearestCellsCache } from "./interfaces";
import {
  handleMouseOutAmountCell,
  handleMouseOutSum,
  prepareNearestCells,
} from "./utils";

import iconDelete from "../../assets/icon-delete3.svg";
import "./TableComponent.css";

const TableComponent: React.FC<ITableProps> = (props) => {
  const { rows, columns, nearestCellsAmount, onCellClick, handleDeleteRow } =
    props;

  const handleMouseOverSum = (
    e: MouseEvent<HTMLTableCellElement>,
    rowSum: number
  ) => {
    e.stopPropagation();

    const childNodes = (e.target as HTMLTableCellElement).closest(
      "tr"
    )?.childNodes;

    if (!childNodes) {
      return;
    }

    childNodes.forEach((node) => {
      if ((node as HTMLTableCellElement).className === "amount-cell") {
        if (!node.textContent) {
          return;
        }

        const sumPercent = ((+node.textContent / rowSum) * 100).toFixed(1);
        node.textContent = `${sumPercent}%`;
        (
          node as HTMLTableCellElement
        ).style.backgroundColor = `rgba(135, 0, 255, ${
          (+sumPercent * columns.length) / 10
        }%)`;
      }
    });
  };

  function handleMouseOverAmountCell(
    this: TNearestCellsCache,
    e: MouseEvent<HTMLTableCellElement>
  ) {
    const targetNum = (e.target as HTMLTableCellElement).textContent;

    if (!targetNum) {
      return;
    }

    if (this.hoveredValueId === +(e.target as HTMLTableCellElement).id) {
      prepareNearestCells(this.targetCells);
      return;
    }

    const rowNodeList = (e.target as HTMLTableCellElement).closest("tr")
      ?.parentNode?.childNodes;

    const allCells: HTMLTableCellElement[] = Array.prototype.map
      .call(rowNodeList, (val) => {
        const cellsCollection = val.cells as HTMLCollection;
        const cellsArr: Element[] = [];

        for (const i of cellsCollection) {
          if (i.className === "amount-cell") {
            cellsArr.push(i);
          }
        }

        return cellsArr;
      })
      .flat() as HTMLTableCellElement[];

    const filteredCells = allCells.filter(
      (element) => element.id !== (e.target as HTMLTableCellElement).id
    );

    filteredCells.sort((a, b) => {
      const aNum = Number((a as HTMLTableCellElement).textContent);
      const bNum = Number((b as HTMLTableCellElement).textContent);

      return Math.abs(aNum - +targetNum) - Math.abs(bNum - +targetNum);
    });

    const nearestCells = filteredCells.slice(0, +nearestCellsAmount);

    prepareNearestCells(nearestCells as HTMLTableCellElement[]);

    this.targetCells = nearestCells;
    this.hoveredValueId = +(e.target as HTMLTableCellElement).id;
  }

  function handleClickAmount(cell: TCell, nearest: HTMLTableCellElement[]) {
    prepareNearestCells(nearest, true);
    onCellClick(cell);
  }

  return (
    <table>
      <TableHeader columns={columns} />

      <tbody>
        {rows.map((rowData, i) => {
          const rowSum = rowData.getRowSum();
          const nearestCellsCache: TNearestCellsCache = {
            hoveredValueId: null,
            targetCells: [],
          };

          const handleOverAmount =
            handleMouseOverAmountCell.bind(nearestCellsCache);
          const handleOutAmount =
            handleMouseOutAmountCell.bind(nearestCellsCache);

          return (
            <tr
              className={`table-row ${
                (i + 1) % 2 === 0 ? "table-even-row" : "table-odd-row"
              }`}
              key={rowData.id}
            >
              <td className="row-number">{i + 1}</td>
              {rowData.rowCells.map((cell, cellInd) => {
                return (
                  <td
                    id={String(cell.id)}
                    className="amount-cell"
                    onClick={() =>
                      handleClickAmount(cell, nearestCellsCache.targetCells)
                    }
                    onMouseOver={handleOverAmount}
                    onMouseOut={handleOutAmount}
                    key={cellInd + 1}
                  >
                    {cell.amount}
                  </td>
                );
              })}

              {/* Sum column */}
              <td
                className="sum-cell"
                onMouseOver={(e) => handleMouseOverSum(e, rowSum)}
                onMouseOut={(e) => handleMouseOutSum(e, rowData.rowCells)}
              >
                {rowSum}
              </td>

              {/* Actions */}
              <td
                className={`actions-cell ${
                  (i + 1) % 2 === 0 ? "table-even-row" : "table-odd-row"
                }`}
              >
                <button
                  className="btn action-btn"
                  onClick={() => handleDeleteRow(rowData.id)}
                  disabled={rows.length === 1}
                >
                  <img
                    className="actions-icon"
                    src={iconDelete}
                    aria-hidden={true}
                    alt="Delete row"
                  />
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>

      <TableFooter
        columns={columns}
        rows={rows}
        avgRowClassName={
          rows.length % 2 !== 0 ? "table-even-row" : "table-odd-row"
        }
      />
    </table>
  );
};

export default TableComponent;
