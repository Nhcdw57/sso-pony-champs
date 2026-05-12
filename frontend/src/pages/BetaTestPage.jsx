import { useContext, useEffect, useState } from "react";
import { AudioContext } from "../hooks/AudioContext";
import { Title } from "../betacomponents/Title"
import { Timer } from "../betacomponents/Timer";
import { Upcomming } from "../betacomponents/Upcomming";
import { Controls } from "../betacomponents/Controls";

export function BetaTestPage() {
  const [now, setNow] = useState(new Date());
  const [amount, setAmount] = useState(18);
  const [timezone, setTimezone] = useState("Europe/Copenhagen");
  const [notified, setNotified] = useState(false);
  const { raceStartAudioRef, signUpAudioRef } = useContext(AudioContext);
  const [nextRaces, setNextRaces] = useState([])

  const nextRace = nextRaces[0];
  const followingRaces = nextRaces.slice(1);

  const API_URL = import.meta.env.VITE_API_BASE_URL

  let serverDay = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    weekday: "long"
  });
  let serverTime = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  });

  async function fetchRaces() {
    const params = new URLSearchParams({
      amount: amount,
      timezone: timezone
    })
    let response = await fetch(`${API_URL}/api/races/next?${params}`);
    const nextRacesData = await response.json();
    if (response.ok) {
      setNextRaces(nextRacesData["nextRaces"])
    }

  }

  useEffect(() => {
    let timer;
    function tick() {
      let n = new Date()
      setNow(n);

      //Alarm logic
      let minutes = n.getMinutes();
      if (minutes == 0 || minutes == 30) { //race is happening now!
        setNotified((oldValue) => {
          let value = true;
          if (!oldValue) {
            raceStartAudioRef.current.play();
            fetchRaces()
          }
          return value
        })
      } else if (minutes == 55 || minutes == 25) { //sign ups are happening now!
        setNotified((oldValue) => {
          let value = true;
          if (!oldValue) {
            signUpAudioRef.current.play();
            fetchRaces()
          }
          return value
        });
      }
      else {
        setNotified(false);
      }
      //Alarm logic ends


      const delay = 1000 - (Date.now() % 1000);
      timer = setTimeout(tick, delay);
    }
    tick();
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    fetchRaces()
  }, [timezone,amount])

  return (<>
    <div className='row'>
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
        {nextRace && <Upcomming output="nextFirst" raceList={[nextRace]} />}
        <Controls />
      </div>
      <div className='col'>
        <Upcomming output="nextRaces" raceList={followingRaces} />
      </div>
    </div>
  </>)
}