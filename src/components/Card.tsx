import CardColor from './CardColor';
import StatusCard from './StatusCard';
import { objectType } from '../App';
import '../stylesheets/Card.css';

const Card = ({ data }: { data: objectType[][] }) => {
  return (
    <div id="card">
      <CardColor />
      <div id="wrapper">
        {data.map((dataSet, i) => {
          return <StatusCard key={`statusCard-${i}`} dataSet={dataSet} from="card" />;
        })}
      </div>
    </div>
  );
};

export default Card;
