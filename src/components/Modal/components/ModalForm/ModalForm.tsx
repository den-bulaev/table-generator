import { ChangeEvent, FormEventHandler, useMemo, useState } from "react";

import { EInputNames } from "../../utils";
import { ITableModal } from "../../../TableComponent/interfaces";

interface IModalFormProps {
  defaultData: ITableModal;
  onSubmit: FormEventHandler<HTMLFormElement>;
  onCloseModal: () => void;
}

const ModalForm: React.FC<IModalFormProps> = (props) => {
  const { onSubmit, defaultData, onCloseModal } = props;

  const [modalData, setModalData] = useState(defaultData);
  const [validationSchema, setValidationSchema] = useState({
    [EInputNames.ColsAmount]: true,
    [EInputNames.RowsAmount]: true,
    [EInputNames.NearestAmount]: true,
  });

  const { rowsAmount, colsAmount, nearestAmount } = modalData;

  const isFormValid = useMemo(() => {
    return Object.values(validationSchema).every((element) => !!element);
  }, [validationSchema, defaultData]);

  const handleChangeNumbers = (
    e: ChangeEvent<HTMLInputElement>,
    inputName: keyof ITableModal
  ) => {
    setModalData((prev) => {
      const value = +e.target.value;
      return { ...prev, [inputName]: value || "" };
    });

    setValidationSchema((prev) => ({
      ...prev,
      [inputName]: !!e.target.value,
    }));
  };

  return (
    <>
      <main className="modal-main">
        <form id="modal-form" className="modal-form" onSubmit={onSubmit}>
          <div className="modal-input-wrapper">
            <label className="modal-label" htmlFor="rows">
              Rows number:
            </label>
            <input
              id="rows"
              className={`modal-number-input${
                !modalData.rowsAmount ? " error" : ""
              }`}
              name={EInputNames.RowsAmount}
              type="number"
              value={rowsAmount}
              onChange={(e) => handleChangeNumbers(e, EInputNames.RowsAmount)}
              max={100}
              min={1}
            />
          </div>

          <div className="modal-input-wrapper">
            <label htmlFor="cols" className="modal-label">
              Columns number:
            </label>
            <input
              id="cols"
              className={`modal-number-input${
                !modalData.colsAmount ? " error" : ""
              }`}
              name={EInputNames.ColsAmount}
              type="number"
              value={colsAmount}
              onChange={(e) => handleChangeNumbers(e, EInputNames.ColsAmount)}
              max={100}
              min={1}
            />
          </div>
          <div className="modal-input-wrapper">
            <label htmlFor="nearest" className="modal-label">
              Nearest number:
            </label>
            <input
              id="nearest"
              className={`modal-number-input${
                !modalData.nearestAmount ? " error" : ""
              }`}
              name={EInputNames.NearestAmount}
              type="number"
              value={nearestAmount}
              onChange={(e) =>
                handleChangeNumbers(e, EInputNames.NearestAmount)
              }
              max={modalData.colsAmount * modalData.rowsAmount - 1}
              min={1}
            />
          </div>
        </form>
      </main>

      <footer className="modal-footer">
        <button className="btn-prime cancel-btn" onClick={onCloseModal}>
          Cancel
        </button>
        <button
          className={`btn-prime${isFormValid ? "" : " btn-disabled"}`}
          type="submit"
          form="modal-form"
          disabled={!isFormValid}
        >
          Submit
        </button>
      </footer>
    </>
  );
};

export default ModalForm;
