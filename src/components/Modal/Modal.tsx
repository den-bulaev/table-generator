import { FormEvent, FormEventHandler, useState } from "react";

import ModalForm from "./components/ModalForm/ModalForm";

import closeIcon from "../../assets/icon-close.png";
import { ITableModal } from "../TableComponent/interfaces";
import { EInputNames } from "../Modal/utils";

import "./Modal.css";

interface IModalProps {
  defaultModalData: ITableModal;
  onSubmitModal: (data: ITableModal) => void;
  generateRow: () => void;
}

const Modal: React.FC<IModalProps> = ({
  defaultModalData,
  onSubmitModal,
  generateRow,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onCloseModal = () => {
    setIsModalVisible(false);
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    const data = { ...defaultModalData };
    const formData = new FormData(e.target as HTMLFormElement);
    for (const item of formData) {
      data[item[0] as EInputNames] = +item[1];
    }

    onSubmitModal(data);
    setIsModalVisible(false);
  };

  return (
    <div className="modal-container">
      <div className="modal-btn-block">
        <button
          className="btn-prime"
          onClick={() => setIsModalVisible(true)}
        >
          Manage table
        </button>
        <button
          className="btn-prime "
          onClick={() => generateRow()}
        >
          Add row
        </button>
      </div>

      {isModalVisible && (
        <div className="modal-wrapper">
          <div className="modal">
            <header className="modal-header">
              <h2>Generate table</h2>
              <button className="btn close-modal-btn" onClick={onCloseModal}>
                <img className="close-icon" src={closeIcon} alt="close modal" />
              </button>
            </header>

            <ModalForm
              onCloseModal={onCloseModal}
              onSubmit={onSubmit}
              defaultData={defaultModalData}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
