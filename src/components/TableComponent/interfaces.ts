export type TCell = {
  id: number;
  index: number;
  rowId: number;
  amount: number;
};

export type TRow = {
  id: number;
  rowCells: TCell[];
  getRowSum: () => number;
};

export type TColumn = {
  id: number;
  index: number;
  columnName: string;
  getColumnAvg: (rows: TRow[]) => number;
};

export interface ITableModal {
  rowsAmount: number;
  colsAmount: number;
  nearestAmount: number;
}

export interface ITableData {
  rows: TRow[];
  columns: TColumn[];
}

export interface ITableProps extends ITableData {
  nearestCellsAmount: number;
  onCellClick: (
    cell: TCell,
    increment?: number
  ) => void;
  handleDeleteRow: (rowId: number) => void;
}

export type TNearestCellsCache = {
  hoveredValueId: number | null;
  targetCells: HTMLTableCellElement[];
};
