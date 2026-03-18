
let serverDay = new Intl.DateTimeFormat("en-US", {
  timeZone: "Europe/Copenhagen",
  weekday: "long"
});
let serverTime = new Intl.DateTimeFormat("en-US", {
  timeZone: "Europe/Copenhagen",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false
});
let serverTimeTable = new Intl.DateTimeFormat("en-US", {
  timeZone: "Europe/Copenhagen",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false
});

export function Home(){
    return(<>
            {/* <div className='row'>
              <div className='col'>
                <Title />
              </div>
            </div>
            <div className='row'>
              <div className='col'>
                <Timer serverDay={serverDay} serverTime={serverTime} />
              </div>
            </div>
            <div className='row'>
              <div className='col'>
                <Upcomming output="nextFirst" serverTimeTable={serverTimeTable} serverDay={serverDay} />
                <Controls />
              </div>
              <div className='col'>
                <Upcomming output="nextRaces" serverTimeTable={serverTimeTable} serverDay={serverDay} />
              </div>
            </div> */}
          </>)
}