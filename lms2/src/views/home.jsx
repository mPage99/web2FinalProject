import parkCityImage from "../images/parkcity.jpg";
import skierImage from "../images/skier.jpg";

export default function HomePage() {
  return (
    <div className="container-fluid" style={{ marginTop: 10 }}>
      <div className="row">
        <div className="col-md-9">
          <h1>Welcome to Utah Skiing League!</h1>
          <p>
            This League collaborates with Skiers who reside in Utah. Many Skiers come together to race and perform
            tricks in our league.
          </p>
          <img src={parkCityImage} className="img-fluid mb-3" alt="Park City" />
        </div>
        <div className="col-md-3">
          <h2>Latest Winner</h2>
          <img src={skierImage} className="img-fluid" alt="Skier on Mountain" />
        </div>
      </div>
    </div>
  );
}
