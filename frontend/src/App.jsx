import { useEffect, useState, useRef, useContext } from 'react'
import './App.css'
import { AudioContext } from './hooks/AudioContext.jsx'
import { RACEDATA } from './data/races.js';
import { findNext } from './lib/schedule.js';

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



export function Timer() {
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

export function Controls() {
  const [volume, setVolume] = useState(50);
  const [raceSoundOn, setRaceSoundOn] = useState(true);
  const [signupSoundOn, setSignupSoundOn] = useState(true);

  const { raceStartAudioRef, signUpAudioRef } = useContext(AudioContext);

  const raceStartCheckboxRef = useRef(null);
  const signUpCheckboxRef = useRef(null);



  useEffect(() => {
    raceStartAudioRef.current.volume = (raceSoundOn) ? volume / 100 : 0;
    signUpAudioRef.current.volume = (signupSoundOn) ? volume / 100 : 0;
  }
    , [volume, raceSoundOn, signupSoundOn])

  function volumeAdjust(event) {
    setVolume(event.target.value);
  }

  function muteToggle(event) {
    stopCurrentSound();
    (event.target.id === "checkRaceStart") ? setRaceSoundOn(event.target.checked) : setSignupSoundOn(event.target.checked);
  }

  function play(file) {
    stopCurrentSound();

    let audioRef = (file === "raceStart") ? raceStartAudioRef : signUpAudioRef;
    audioRef.current.play();
  }

  function stopCurrentSound() { //makes everyone else shut up
    raceStartAudioRef.current.pause();
    raceStartAudioRef.current.currentTime = 0;
    signUpAudioRef.current.pause();
    signUpAudioRef.current.currentTime = 0;
  }


  return (
    <div className='row'>
      <div className='col'></div>
      <div className='col-8'>
        <h2 className='text-center text-light mx-4 mt-5'> Controls:</h2>
        <form className='position-relative'>
          <div className="card w-100 position-absolute top-0 start-50 translate-middle-x" style={{ minHeight: "188px", minWidth: "336px" }}>
            <div className="card-body" style={{ backgroundColor: "pink" }}>
              <label className="form-label fs-3 fw-bold">Volume: {volume}</label>
              <input type="range" className="form-range" id="volumeC" value={volume} min={0} max={100} onChange={volumeAdjust} />
              <button type="button" className="btn btn-success mb-3 mx-2" onClick={() => play("raceStart")}>Test Race Start Volume</button>
              <button type="button" className="btn btn-success mb-3 mx-2" onClick={() => play("signUpStart")}>Test Sign Up Start Volume</button>
              <button type="button" className="btn btn-success mb-3 mx-2" onClick={stopCurrentSound}>Stop the Currently Playing Sound</button>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="checkRaceStart" ref={raceStartCheckboxRef} checked={raceSoundOn} onChange={muteToggle} />
                <label className="form-check-label fs-6 fw-bold">
                  Notify me when the race starts
                </label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="checkSignUp" ref={signUpCheckboxRef} checked={signupSoundOn} onChange={muteToggle} />
                <label className="form-check-label fs-6 fw-bold">
                  Notify me when signing up for the race is available
                </label>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className='col'></div>
    </div>

  )

}

export function Upcomming(props) {
  const [nextFirst, setNextFirst] = useState();
  const [nextRaces, setNextRaces] = useState([]);
  const [raceNotified, setRaceNotified] = useState(false);
  const [signupNotified, setSignupNotified] = useState(false);

  const { raceStartAudioRef, signUpAudioRef } = useContext(AudioContext);

  useEffect(() => {
    let lastTime = Date.now();
    const timer = setInterval(() => {
      let now = new Date();

      //testing if sound works better here:
      let minutes = now.getMinutes();
      if (minutes == 0 || minutes == 30) {
        setRaceNotified((oldValue) => {
          let value = true;
          if (!oldValue) {
            raceStartAudioRef.current.play();
          }
          return value
        })
      } else if (minutes == 55 || minutes == 25) {
        //sign ups are happening now!
        setSignupNotified((oldValue) => {
          let value = true;
          if (!oldValue) {
            signUpAudioRef.current.play();
          }
          return value
        });
      }
      else {
        setRaceNotified(false);
        setSignupNotified(false);
      }
      // end of test

      let timeDiff = now - lastTime;
      if (timeDiff >= 1000) {
        let nextBuffer = findNext(new Date(), 18, RACEDATA, serverTimeTable, serverDay).map((race, index) => (
          <Tabs race={race[0]} raceTime={race[1]} key={index} />
        ));
        setNextFirst(nextBuffer.shift());
        setNextRaces(nextBuffer);
        lastTime += now;
      }
    }, 100)
    return () => clearInterval(timer);
  }, [nextFirst,nextRaces]);


  return (
    <div className='row'>
      <div className='col'></div>
      <div className='col-8 m-0 p-2'>
        <h1 className='text-center text-light mx-4'>{(props.output === "nextFirst") ? "Next Race:" : "Following Races:"}</h1>
        <div className='card text-center' id="highlightFirst">
          {(props.output === "nextFirst") ? nextFirst : nextRaces}
        </div>
      </div>
      <div className='col'></div>
    </div>
  );
}

export function Tabs(props) {
  return (
    <div className='row d-flex justify-content-center'>
      <div className='col-10 p-1'>
        <div className='card'>
          <h1>{props.race} @ {props.raceTime}</h1>
        </div>
      </div>
    </div>
  )
}

export function Title() {

  return (
    <div style={{ minHeight: "500px", backgroundColor: "pink", minWidth: "500px" }}>

    </div>
  )
}