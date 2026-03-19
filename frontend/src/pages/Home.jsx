import { useContext, useEffect, useState } from "react";
import { findNext } from "../lib/schedule";
import { RACEDATA } from "../data/races";

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
  const [now, setNow] = useState(new Date());
  const [notified, setNotified] = useState(false);
  const { raceStartAudioRef, signUpAudioRef } = useContext(AudioContext);

  useEffect(()=>{
    let timer;
    function tick(){
      let n = new Date()
      setNow(n);

      //Alarm logic
      let minutes = n.getMinutes();
      if (minutes == 0 || minutes == 30) { //race is happening now!
        setNotified((oldValue) => {
          let value = true;
          if (!oldValue) {
            raceStartAudioRef.current.play();
          }
          return value
        })
      } else if (minutes == 55 || minutes == 25) { //sign ups are happening now!
        setNotified((oldValue) => {
          let value = true;
          if (!oldValue) {
            signUpAudioRef.current.play();
          }
          return value
        });
      }
      else {
        setNotified(false);
      }
      //Alarm logic ends

      let nextBuffer = findNext(new Date(), 18, RACEDATA, serverTimeTable, serverDay);

      const delay = 1000 - (Date.now() % 1000);
      timer = setTimeout(tick,delay);
    }
    tick();
    return ()=>clearTimeout(timer)
  },[])

    return(<>
            {/* <div className='row'>
              <div className='col'>
                <Title />
              </div>
            </div>
            <div className='row'>
              <div className='col'>
                <Timer serverDay={serverDay} serverTime={serverTime} now={now} />
              </div>
            </div>
            <div className='row'>
              <div className='col'>
                <Upcomming output="nextFirst" />
                <Controls />
              </div>
              <div className='col'>
                <Upcomming output="nextRaces" />
              </div>
            </div> */}
          </>)
}