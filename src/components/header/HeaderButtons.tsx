import { useNavigate } from 'react-router';

const HeaderButtons = () => {
  const navigate = useNavigate();

  const redirectToMap = () => {
    navigate('/map');
  };

  const redirectToCard = () => {
    navigate('/card');
  };

  const redirectToGraph = () => {
    navigate('/graph');
  };

  const redirectToMain = () => {
    navigate('/');
  };

  return (
    <div id="header-buttons">
      <button className="btn-redirect-map header-btn" onClick={redirectToMap}>
        지도로 보기
      </button>
      <button className="btn-redirect-card header-btn" onClick={redirectToCard}>
        카드로 보기
      </button>
      <button className="btn-redirect-graph header-btn" onClick={redirectToGraph}>
        그래프로 보기
      </button>
      <button className="btn-redirect-main header-btn" onClick={redirectToMain}>
        메인으로 돌아가기
      </button>
    </div>
  );
};

export default HeaderButtons;
