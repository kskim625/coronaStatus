import { useNavigate } from 'react-router';
import map from '../images/map.jpg';
import card from '../images/card.jpg';
import graph from '../images/graph.jpg';
import '../stylesheets/Main.css';

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
    <div id="main">
      <div className="main-btn">
        <div className="main-btn-description">지도로 보기</div>
        <img className="main-image-btn" src={map} onClick={redirectToMap}></img>
      </div>
      <div className="main-btn">
        <div className="main-btn-description">카드로 보기</div>
        <img className="main-image-btn" src={card} onClick={redirectToCard}></img>
      </div>
      <div className="main-btn">
        <div className="main-btn-description">그래프로 보기</div>
        <img className="main-image-btn" src={graph} onClick={redirectToGraph}></img>
      </div>
    </div>
  );
};

export default Main;
