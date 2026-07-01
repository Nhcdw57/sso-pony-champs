import { Compass } from 'lucide-react';
import placeholder from "../assets/placeholder.png";

export function RaceCard({ race, onNav, variant, signupStatus }) {

  return (variant === "following" ?
    (
      <div className='card m-3 my-shad' style={{ minHeight: "110px" }}>
        <div className='row'>
          <div className='col-md-4'>
            <img src={placeholder} className="img-fluid rounded-start" alt="..." style={{ minHeight: "110px" }}></img>
          </div>
          <div className='col-md-6 flex-column align-content-center'>
            <h3 className='text-center'>{race["raceName"]}</h3>
            <h5 className='text-center'>{race["raceTime"]}</h5>
          </div>
          <div className='col-md-2 d-flex align-items-center justify-content-center'>
            <button className='p-md-2 p-sm-1 btn my-btn m-2' onClick={() => onNav(race)}>
              <Compass size={25} />
            </button>
          </div>
        </div>
      </div>
    ) : (
      <div className='card m-3 my-hShad' style={{backgroundColor: "#eedbe7" }}>
        <img src={placeholder} className="img-fluid mx-2 mt-2 rounded" alt="..."></img>
        <div className="card-body">

          <div className='row d-flex justify-content-evenly'>
            <div className='col-md-1'></div>
            <div className='col-md-6 flex-column align-content-center'>
              <h3 className='text-center'>{race["raceName"]}</h3>
              <h5 className='text-center'>{race["raceTime"]}</h5>
            </div>
            <div className='col-md-2 d-flex align-items-center justify-content-center'>
              <button className='p-md-3 p-sm-2 btn my-hBtn' onClick={() => onNav(race)}>
                <Compass size={30} />
              </button>
            </div>
          </div>

        </div>

        <div className="card-footer text-body-secondary">
          <h5 className="" style={{ textAlign: "left" }}>{`${signupStatus.label} ${signupStatus.format}`}</h5>
        </div>
      </div>

    )

  );
}