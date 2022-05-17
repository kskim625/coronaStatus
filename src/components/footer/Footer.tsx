import '../../stylesheets/Footer.css';

const Footer = () => {
  const goToDataPortal = () => {
    window.open('https://www.data.go.kr');
  };
  return (
    <div id="footer">
      <div>
        {`data from\n`}
        <span className="footer-link" onClick={goToDataPortal}>
          공공데이터포털
        </span>
      </div>
      <div></div>
    </div>
  );
};

export default Footer;
