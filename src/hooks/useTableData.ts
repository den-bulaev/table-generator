import { useEffect, useRef, useState } from "react";
import {
  ITableData,
  ITableModal,
  TCell,
  TColumn,
  TRow,
} from "../components/TableComponent/interfaces";
import { generateRandomNumber } from "../utils";

const generateColumns = (columnsAmount: number): TColumn[] => {
  const columns: TColumn[] = [];

  for (let i = 0; i < columnsAmount; i++) {
    const column: TColumn = {
      columnName: `Column ${i + 1}`,
      id: i + 1,
      index: i,
      getColumnAvg: function (rows: TRow[]) {
        const clearRows = rows.map((row) => row.rowCells);
        const sum = clearRows.reduce((acc, curr) => {
          return acc + curr[i].amount;
        }, 0);

        return rows.length === 1 ? sum : sum / 2;
      },
    };

    columns.push(column);
  }

  return columns;
};

export const useTableData = (
  data: ITableModal
): [
  ITableData,
  incrementCellValue: (cell: TCell, increment?: number) => void,
  deleteRow: (rowId: number) => void,
  addRow: () => void
] => {
  const [tableData, setTableData] = useState<ITableData>({
    rows: [],
    columns: [],
  });
  const cellId = useRef(1);
  const rowId = useRef(1);

  const { rowsAmount, colsAmount } = data;

  useEffect(() => {
    const rows: TRow[] = [];

    for (let i = 0; i < rowsAmount; i++) {
      const row = generateRow(colsAmount);

      rows.push(row);
    }

    const columns = generateColumns(colsAmount);

    setTableData((prev) => ({ ...prev, columns, rows }));
  }, [data]);

  const generateRow = (colsAmount: number): TRow => {
    const rowCells: TCell[] = [];

    for (let i = 0; i < colsAmount; i++) {
      const amount = generateRandomNumber(1, 999);
      const cell: TCell = {
        id: cellId.current,
        index: i,
        amount,
        rowId: rowId.current,
      };

      rowCells.push(cell);
      cellId.current += 1;
    }

    const row: TRow = {
      rowCells: rowCells,
      id: rowId.current,
      getRowSum: function () {
        return getCellsSum(this.rowCells);
      },
    };

    rowId.current += 1;
    return row;
  };

  const getCellsSum = (cells: TCell[]) => {
    return cells.reduce((acc, curr) => acc + curr.amount, 0);
  };

  const incrementCellValue = (cell: TCell, increment = 1) => {
    if (cell.amount >= 999) {
      return;
    }

    const { rowId, index: cellIndex } = cell;
    const tableDataCopy = { ...tableData };
    const targetRow = tableDataCopy.rows.find((row) => row.id === rowId);

    if (targetRow) {
      targetRow.rowCells[cellIndex].amount += increment;
    }

    setTableData(tableDataCopy);
  };

  const deleteRow = (rowId: number) => {
    const rowsCopy = [...tableData.rows];
    const targetRowIndex = rowsCopy.findIndex((row) => row.id === rowId);

    if (targetRowIndex >= 0) {
      rowsCopy.splice(targetRowIndex, 1);

      setTableData((prev) => ({ ...prev, rows: rowsCopy }));
    }
  };

  const addRow = () => {
    if (tableData.rows.length < 100) {
      const newRow = generateRow(colsAmount);
      const preparedRows = [...tableData.rows, newRow];

      setTableData((prev) => ({ ...prev, rows: preparedRows }));
    }
  };

  return [tableData, incrementCellValue, deleteRow, addRow];
};
