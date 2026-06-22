export function Timer({serverDay, serverTime, now}) {
  return (
    <div className="row">
      <div className="col"></div>
      <div className='col-3' style={{ minWidth: "250px" }}>
        <div className="card m-2">
          <h1 className='center'>{serverDay.format(now)}:</h1>
          <h1 className='center'>{serverTime.format(now)}</h1>
        </div>
      </div>
      <div className="col">
      </div>
    </div>
  )
}