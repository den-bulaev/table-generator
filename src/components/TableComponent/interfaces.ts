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
  rowsAmount: string;
  colsAmount: string;
  nearestAmount: string;
}

export interface ITableData {
  rows: TRow[];
  columns: TColumn[];
}

export interface ITableProps extends ITableData {
  nearestCellsAmount: string;
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
