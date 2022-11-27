import { useNavigate } from 'react-router';
import map from '../../images/map.jpg';
import card from '../../images/card.jpg';
import graph from '../../images/graph.jpg';
import '../../stylesheets/Main.css';

const Main = () => {
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

  return (
    <>
      <div id="main-description">
        한국 코로나 상황판에 오신 것을 환영합니다!
        <br></br>
        아래 버튼을 눌러 원하는 형식으로 데이터를 확인할 수 있습니다!
      </div>
      <div id="main">
        <div className="main-btn">
          <div className="main-btn-description">지도로 보기</div>
          <img className="main-image-btn" src={map} onClick={redirectToMap} alt="map-btn" />
        </div>
        <div className="main-btn">
          <div className="main-btn-description">카드로 보기</div>
          <img className="main-image-btn" src={card} onClick={redirectToCard} alt="card-btn" />
        </div>
        <div className="main-btn">
          <div className="main-btn-description">그래프로 보기</div>
          <img className="main-image-btn" src={graph} onClick={redirectToGraph} alt="graph-btn" />
        </div>
      </div>
    </>
  );
};

export default Main;
