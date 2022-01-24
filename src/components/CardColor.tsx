import '../stylesheets/CardColor.css';

const CardColor = () => {
  const colorList = ['black', 'red', 'yellow', 'blue', 'green'];
  const warnList = ['1000명 이상', '500명 이상', '250명 이상', '50명 이상', '50명 미만'];

  return (
    <div id="header-color-type">
      {colorList.map((color, idx) => {
        return (
          <div className="color-type" key={`color-type-${idx}`}>
            <div className={`color-type-circle color-type-${color}`}></div>
            <div className="color-type-description">{warnList[idx]}</div>
          </div>
        );
      })}
    </div>
  );
};

export default CardColor;
