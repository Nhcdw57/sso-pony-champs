import { useState } from "react";


export function Timer({serverDay, serverTime}) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000)
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="row">
      <div className="col"></div>
      <div className='col-3' style={{ minWidth: "200px" }}>
        <div className="card m-2">
          <h1 className='center'>{serverDay.format(time)}:</h1>
          <h1 className='center'>{serverTime.format(time)}</h1>
        </div>
      </div>
      <div className="col">
      </div>
    </div>
  )
}