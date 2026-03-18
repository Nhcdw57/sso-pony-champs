export function Tabs({race, raceTime}) {
  return (
    <div className='row d-flex justify-content-center'>
      <div className='col-10 p-1'>
        <div className='card'>
          <h1>{race} @ {raceTime}</h1>
        </div>
      </div>
    </div>
  )
}