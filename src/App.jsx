import { useEffect, useState, useRef, useContext } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import RaceStartSound from "./assets/RaceStart.mp3"
import SignUpStartSound from "./assets/SignUpStart.mp3"
import { AudioContext } from './main'

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

  function findNext(input = new Date(), amount = 4) {
    //returns an array of X <Tab> divs, X being the amount which also defaults to 4
    let time = new Date(input);
    let conversion = () => [serverTimeTable.format(roundedTime(time)), serverDay.format(roundedTime(time))];
    let nextRaceTimes = [];
    for (let i = 0; i < amount; i++) {
      nextRaceTimes.push(conversion());
      time.setMinutes(time.getMinutes() + 30);
    }
    let timeTable = checkRaceData(raceData())[1];
    let nextFoundRaces = []
    for (let raceTimeArray of nextRaceTimes) {
      let raceTime = raceTimeArray[0];
      let day = raceTimeArray[1];
      let race = timeTable[raceTime][day];
      nextFoundRaces.push([race.raceName, raceTime]);
    }

    return nextFoundRaces.map((race, index) => (
      <Tabs race={race[0]} raceTime={race[1]} key={index} />
    ))
  }


  function roundedTime(input = new Date()) {

    let time = new Date(input);
    let minutes = time.getMinutes();
    let seconds = time.getSeconds();

    if (minutes == 0 || minutes == 30) {
      //race is happening now!
      if(!raceNotified){
        raceStartAudioRef.current.play();
      }
      setRaceNotified(true);
    } else if (minutes == 55 || minutes == 25) {
      //sign ups are happening now!
      if(signupNotified){
        signUpAudioRef.current.play();
      }
      setSignupNotified(true);
    }else{
      setRaceNotified(false);
      setSignupNotified(false);
    }

    if (minutes < 30) {
      time.setMinutes(30);
    } else if (minutes > 30) {
      time.setHours(time.getHours() + 1);
      time.setMinutes(0);
    }
    return time
  }

  // function realTimeSetInterval(callBack, delay = 1000){
  //   useEffect(()=>{
  //     let lastTime = Date.now();
  //     let timer;

  //     const timeCheck = () => {
  //       const now = Date.now();
  //       const elapsed = now - lastTime;

  //       if(elapsed >= delay){
  //         let nextBuffer = findNext(new Date(), 10);
  //         setNextFirst(nextBuffer.shift());
  //         setNextRaces(nextBuffer);
  //         lastTime +=delay;
  //       }
  //     }
  //     timer = setTimeout(timeCheck,100);
  //     return () => clearTimeout(timer);
  //   },[callBack,delay]);
  // }



  useEffect(() => {
    let lastTime = Date.now();
    const timer = setInterval(() => {
      let now = Date.now();
      let timeDiff = now - lastTime;
      if (timeDiff >= 1000) {
        let nextBuffer = findNext(new Date(), 10);
        setNextFirst(nextBuffer.shift());
        setNextRaces(nextBuffer);
        lastTime += now;
      }
    }, 100)
    return () => clearInterval(timer);
  }, []);

  // let check = checkRaceData(raceData());
  // console.log(check);

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





function raceData() {
  //contains the race data
  let newHillcrest = {
    raceName: "New Hillcrest",
    Monday: ["05:30", "10:00", "15:00", "22:00"],
    Tuesday: ["05:00", "09:30", "14:30", "21:30"],
    Wednesday: ["04:30", "09:00", "14:00", "21:00"],
    Thursday: ["04:00", "08:30", "13:30", "16:30", "20:30"],
    Friday: ["03:00", "07:30", "12:30", "19:30"],
    Saturday: ["04:30", "09:30", "14:30", "18:30", "23:30"],
    Sunday: ["03:30", "08:30", "13:30", "22:30"]
  };
  let jorvikStables = {
    raceName: "Jorvik Stables",
    Monday: ["02:30", "07:00", "14:30", "22:30"],
    Tuesday: ["02:00", "06:30", "14:00", "22:00"],
    Wednesday: ["01:30", "06:00", "13:30", "21:30"],
    Thursday: ["01:00", "05:30", "13:00", "21:00"],
    Friday: ["00:00", "04:30", "12:00", "15:30", "20:00"],
    Saturday: ["03:30", "06:30", "10:30", "17:30", "19:30"],
    Sunday: ["02:30", "09:30", "14:00", "18:30"]
  };
  let moorland = {
    raceName: "Moorland",
    Monday: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"],
    Tuesday: ["03:30", "07:30", "11:30", "15:30", "19:30", "23:30"],
    Wednesday: ["03:00", "07:00", "11:00", "15:00", '17:00', '19:00', '23:00'],
    Thursday: ['02:30', '06:30', '10:30', '14:30', '18:30', '22:30'],
    Friday: ['01:30', '05:30', '09:30', '13:30', '17:30', '21:30'],
    Saturday: ['01:00', '07:00', '11:30', '16:00', '20:30'],
    Sunday: ['00:00', '04:30', '06:00', '10:30', '15:00', '19:30']
  };
  let silversongPony = {
    raceName: "Silversong Pony",
    Monday: ['01:00', '05:00', '09:00', '13:00', '17:00', '21:00'],
    Tuesday: ['00:30', '04:30', '08:30', '12:30', '16:30', '20:30'],
    Wednesday: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
    Thursday: ['03:30', '07:30', '11:30', '15:30', '19:30', '23:30'],
    Friday: ['02:30', '06:30', '10:30', '14:30', '16:30', '18:30', '22:30'],
    Saturday: ['02:00', '08:00', '12:30', '17:00', '21:30'],
    Sunday: ['01:00', '05:30', '07:00', '11:30', '16:00', '20:30']
  };
  let fortPinta = {
    raceName: "Fort Pinta",
    Monday: ['00:30', '04:30', '08:30', '12:30', '16:30', '18:00', '20:30'],
    Tuesday: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
    Wednesday: ['03:30', '07:30', '11:30', '15:30', '19:30', '23:30'],
    Thursday: ['03:00', '07:00', '11:00', '15:00', '19:00', '23:00'],
    Friday: ['02:00', '06:00', '10:00', '14:00', '18:00', '22:00'],
    Saturday: ['01:30', '07:30', '12:00', '16:30', '21:00'],
    Sunday: ['00:30', '05:00', '06:30', '11:00', '15:30', '20:00']
  };
  let firgrove = {
    raceName: "Firgrove",
    Monday: ['03:30', '09:30', '15:30', '21:30'],
    Tuesday: ['03:00', '09:00', '15:00', '21:00'],
    Wednesday: ['02:30', '08:30', '14:30', '20:30'],
    Thursday: ['02:00', '08:00', '12:00', '14:00', '20:00'],
    Friday: ['01:00', '07:00', '13:00', '19:00'],
    Saturday: ['00:00', '06:00', '10:00', '15:00', '19:00'],
    Sunday: ['04:00', '09:00', '17:30', '23:00']
  };
  let valedale = {
    raceName: "Valedale",
    Monday: ['06:00', '10:30', '14:00', '23:00'],
    Tuesday: ['05:30', '10:00', '13:30', '17:30', '22:30'],
    Wednesday: ['05:00', '09:30', '13:00', '22:00'],
    Thursday: ['04:30', '09:00', '12:30', '21:30'],
    Friday: ['03:30', '08:00', '11:30', '20:30'],
    Saturday: ['03:00', '09:00', '13:30', '22:30'],
    Sunday: ['02:00', '08:00', '12:30', '17:00', '21:30',]
  };
  let silvergladeVillage = {
    raceName: "Silverglade Village",
    Monday: ['03:00', '07:30', '13:30', '17:30', '19:30'],
    Tuesday: ['02:30', '07:00', '17:00', '19:00'],
    Wednesday: ['02:00', '06:30', '16:30', '18:30'],
    Thursday: ['01:30', '06:00', '16:00', '18:00'],
    Friday: ['00:30', '05:00', '15:00', '17:00'],
    Saturday: ['04:00', '05:30', '14:00', '18:00', '23:00'],
    Sunday: ['03:00', '13:00', '18:00', '22:00']
  };
  let baroness = {
    raceName: "Baroness",
    Monday: ['01:30', '11:00', '18:30', '23:30'],
    Tuesday: ['01:00', '10:30', '13:00', '18:00', '23:00'],
    Wednesday: ['00:30', '10:00', '17:30', '22:30'],
    Thursday: ['00:00', '09:30', '17:00', '22:00'],
    Friday: ['08:30', '16:00', '21:00', '23:00'],
    Saturday: ['02:30', '08:30', '13:00', '22:00'],
    Sunday: ['01:30', '07:30', '12:00', '16:30', '21:00']
  };
  let goldenhills = {
    raceName: "Goldenhills",
    Monday: ['02:00', '06:30', '11:30', '19:00'],
    Tuesday: ['01:30', '06:00', '11:00', '18:30'],
    Wednesday: ['01:00', '05:30', '10:30', '12:30', '18:00'],
    Thursday: ['00:30', '05:00', '10:00', '17:30'],
    Friday: ['04:00', '09:00', '11:00', '23:30'],
    Saturday: ['00:30', '05:00', '11:00', '15:30', '20:00'],
    Sunday: ['10:00', '14:30', '19:00', '23:30']
  };
  let unknownRace = {
    raceName: "UNKNOWN",
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: []
  }
  let raceList = [newHillcrest, jorvikStables, moorland, silversongPony, fortPinta, firgrove, valedale, silvergladeVillage, baroness, goldenhills, unknownRace];
  return raceList;
}

function checkRaceData(raceList) {
  let days = ["Monday", 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  let raceTimeList = [
    '00:00', '00:30',
    '01:00', '01:30',
    '02:00', '02:30',
    '03:00', '03:30',
    '04:00', '04:30',
    '05:00', '05:30',
    '06:00', '06:30',
    '07:00', '07:30',
    '08:00', '08:30',
    '09:00', '09:30',
    '10:00', '10:30',
    '11:00', '11:30',
    '12:00', '12:30',
    '13:00', '13:30',
    '14:00', '14:30',
    '15:00', '15:30',
    '16:00', '16:30',
    '17:00', '17:30',
    '18:00', '18:30',
    '19:00', '19:30',
    '20:00', '20:30',
    '21:00', '21:30',
    '22:00', '22:30',
    '23:00', '23:30'
  ];
  let check = {};
  let problems = [];
  for (let timeSlot of raceTimeList) {
    check[timeSlot] = {};
    for (let day of days) {
      for (let race of raceList) {
        let raceTimes = Array.from(race[day]);
        if (Array.isArray(raceTimes)) {
          if (raceTimes.indexOf(timeSlot) !== -1 && Object.hasOwn(check[timeSlot], day)) {
            problems.push(`There is a conflict of time on ${day} ${timeSlot} between ${race.raceName} and ${check[timeSlot][day].raceName}`);
            problems.push({ "day": day, "time": timeSlot, "existingRace": check[timeSlot][day].raceName, "conflictingRace": race.raceName })
            return [false, problems];
          } else if (raceTimes.indexOf(timeSlot) !== -1) {
            check[timeSlot][day] = race;

          }
        }
      }
    }
    if (Object.keys(check[timeSlot]).length !== 7) {
      problems.push(`${timeSlot} doesn't have 7 days, it has ${Object.keys(check[timeSlot]).length} days and it has the following:`);
      problems.push(check[timeSlot]);
      return [false, problems];
    }
  }
  return [true, check];
}


// check = {
//   "0:00" : []
// }

// if(race[day].indexOf(timeSlot)!==-1 && check[timeSlot].indexOf[day] !== -1){
//   return false;
// }else if(race[day].indexOf(timeSlot)!==-1){
//   check[timeSlot][day]=race[raceName];
// }

// check = {
//   "0:00": {
//     Monday: "silversong",
//   }
// }

// if(race[day].indexOf(timeSlot)!==-1 && Object.hasOwn(check[timeSlot],day)){
//   return false;
// }else if(race[day].indexOf(timeSlot)!==-1){
//   check[timeSlot][day]=race[raceName];
// }


export function Title() {

  return (
    <div style={{ minHeight: "500px", backgroundColor: "pink", minWidth: "500px" }}>

    </div>
  )
}