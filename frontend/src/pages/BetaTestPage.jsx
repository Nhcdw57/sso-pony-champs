import { use, useContext, useEffect, useState } from "react";
import { AudioContext } from "../hooks/AudioContext";
import { Title } from "../betacomponents/Title"
import { Timer } from "../betacomponents/Timer";
import { Upcomming } from "../betacomponents/Upcomming";
import { Controls } from "../betacomponents/Controls";
import placeholder from "../assets/placeholder.png";
import { RaceLocationModal } from "../betacomponents/RaceLocationModal";

export function BetaTestPage() {
  const [now, setNow] = useState(new Date());
  const [amount, setAmount] = useState(18);
  const [timezone, setTimezone] = useState("Europe/Copenhagen");
  const [notified, setNotified] = useState(false);
  const { raceStartAudioRef, signUpAudioRef } = useContext(AudioContext);
  const [nextRaces, setNextRaces] = useState([])

  const nextRace = nextRaces[0];
  const followingRaces = nextRaces.slice(1);

  const [selectedRace, setSelectedRace] = useState();
  const [locationModalOpen, setLocationModalOpen] = useState(false);

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
  
  const signupStatus = calcSignups();

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

  function onNavClick(race) {
    setSelectedRace(race);
    setLocationModalOpen(true);
  }

  function calcSignups() {
    let t = getServerMinSec(now,serverTime);
    const minute = t.minute;
    const second = t.second;
    let nextTime =
      minute < 25 ? 25 :
        minute < 30 ? 30 :
          minute < 55 ? 55 :
            60;
    const secondsLeft = (nextTime - minute) * 60 - second;
    let format = `${Math.floor(secondsLeft / 60)}:${String(secondsLeft % 60).padStart(2, "0")}`;
    let label = nextTime === 25 || nextTime === 55 ? `Signup opens in:` : `Signup closes in:`;
    return {
      mode: nextTime === 25 || nextTime === 55 ? "opens" : "closes",
      format,
      label,
      secondsLeft
    };
  }

  function getServerMinSec(nowTime, serverTimeZone) {
    const parts = serverTimeZone.formatToParts(nowTime);
    const minute = Number(parts.find((part) => part.type === "minute").value);
    const second = Number(parts.find((part) => part.type === "second").value);
    return {minute,second}
  }

  useEffect(() => {
    let timer;
    function tick() {
      let n = new Date()
      setNow(n);

      let t = getServerMinSec(n,serverTime);
      //Alarm logic
      let minutes = t.minute;
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
  }, [timezone, amount])

  return (<>
    <div className="home__bg">
      <Title />
    </div>
    <div>
      <div className='row'>
        <div className='col'>
          <Timer serverDay={serverDay} serverTime={serverTime} now={now} />
        </div>
      </div>
      <div className='row px-3'>
        <div className='col'>
          {nextRace && <Upcomming output="nextFirst" onNav={onNavClick} raceList={[nextRace]} signupStatus={signupStatus} />}
          {/* <Controls /> */}
        </div>
        <div className='col'>
          <Upcomming output="nextRaces" onNav={onNavClick} raceList={followingRaces} />
        </div>
      </div>

      {locationModalOpen && (<RaceLocationModal race={selectedRace} onClose={() => setLocationModalOpen(false)} />)}
    </div>
  </>)
}