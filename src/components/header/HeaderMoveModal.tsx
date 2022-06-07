import React, { LegacyRef } from 'react';

interface propsType {
  dateRef: LegacyRef<HTMLInputElement>;
  isInputValid: () => boolean;
  modalMessage: string;
  getDatesData: () => Promise<void>;
  removeModal: () => void;
}

const HeaderMoveModal = ({ dateRef, isInputValid, modalMessage, getDatesData, removeModal }: propsType) => {
  const handleClickWrapper = (e: React.MouseEvent) => {
    const WRAPPER_CLASSNAME = 'header-date-move';
    if (WRAPPER_CLASSNAME === (e.target as HTMLElement).className) {
      removeModal();
    }
  };

  return (
    <div className="header-date-move" onClick={handleClickWrapper}>
      <div className="header-date-modal">
        <div className="header-date-modal-content">
          이동하고자 하는 날짜를 입력해주세요.<br></br>범위: 20200120 이후 날짜 입력 가능<br></br>(예시: 20220306)
          <input className="header-date-modal-text" type="text" ref={dateRef} onInput={isInputValid}></input>
          <div className="header-date-modal-warning">{modalMessage}</div>
          <div className="header-date-modal-submit-buttons">
            <div className="header-date-modal-submit" onClick={getDatesData}>
              이동
            </div>
            <div className="header-date-modal-submit" onClick={removeModal}>
              취소
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderMoveModal;
