import { useMemo, useState } from "react";

import TableComponent from "../TableComponent/TableComponent";
import Modal from "../Modal/Modal";

import { useTableData } from "../../hooks/useTableData";
import { ITableModal, TCell } from "../TableComponent/interfaces";
import { defaultModalData } from "./utils";

const MainTable: React.FC = () => {
  const [modalData, setModalData] = useState<ITableModal>(defaultModalData);
  const [tableData, incrementCellValue, deleteRow, addRow] =
    useTableData(modalData);

  const preparedModalData = useMemo(
    () => ({
      ...modalData,
      rowsAmount: tableData.rows.length,
    }),
    [tableData.rows]
  );

  const handleCellClick = (
    cell: TCell,
    increment?: number
  ) => {
    incrementCellValue(cell, increment);
  };

  const handleDeleteRow = (rowId: number) => {
    deleteRow(rowId);
  };

  const onSubmitModal = (data: ITableModal) => {
    setModalData({ ...data });
  };

  return (
    <div className="table-wrapper">
      <Modal
        onSubmitModal={onSubmitModal}
        generateRow={addRow}
        defaultModalData={preparedModalData}
      />
      <TableComponent
        {...tableData}
        nearestCellsAmount={modalData.nearestAmount}
        onCellClick={handleCellClick}
        handleDeleteRow={handleDeleteRow}
      />
    </div>
  );
};

export default MainTable;
