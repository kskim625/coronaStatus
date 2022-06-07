import loading from '../../images/loading.gif';

const HeaderMoveModal = () => {
  return (
    <div className="header-date-move">
      <div className="header-date-modal">
        <div className="header-date-modal-content">
          <img className="header-date-loading-gif" src={loading}></img>
          데이터를 불러오는 중입니다.<br></br>잠시만 기다려주세요.
        </div>
      </div>
    </div>
  );
};

export default HeaderMoveModal;
