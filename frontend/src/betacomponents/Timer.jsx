import { Settings } from "lucide-react";
import { Controls } from "./Controls";

export function Timer({ serverDay, serverTime, now }) {
  return (
    <div className="row p-4">
      <div className="col"></div>
      <div className='col-4 card pb-2 my-shad' style={{ minWidth: "350px" , backgroundColor: "#eedbe7"}}>
        <div className="row m-2">
          <div className="col-2"></div>
          <div className="col-8">
            <div className="flex-column justify-content-center align-items-center">

              <h1 className='text-center'>{serverDay.format(now)}:</h1>
              <h1 className='text-center'>{serverTime.format(now)}</h1>
            </div>
          </div>
          <div className="col-2 d-flex align-items-end">
            <button className="m-2 p-1 btn my-btn"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#controls"
              aria-expanded="false"
              aria-controls="controls">
              <Settings size={25} />
            </button>
          </div>
          <span className="text-center"> {`Server Timezone: Europe/Coppenhagen`} </span>
          <div className=" mt-4 collapse" id="controls">
            <Controls/>
          </div>
        </div>
      </div>
      <div className="col">
      </div>
    </div>
  )
}