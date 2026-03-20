import { useContext, useState } from 'react';
import { Tabs } from '../App.jsx';


export function Upcomming({output, raceList}) {
  const [nextFirst, setNextFirst] = useState();
  const [nextRaces, setNextRaces] = useState([]);
  const [raceNotified, setRaceNotified] = useState(false); // this state is utilized to sense a change in valid alert time to prevent repeated sound playing
  const [signupNotified, setSignupNotified] = useState(false); // this state is utilized to sense a change in valid alert time to prevent repeated sound playing

  // const { raceStartAudioRef, signUpAudioRef } = useContext(AudioContext);

  // useEffect(() => {
  //   let lastTime = Date.now();
  //   const timer = setInterval(() => {
  //     let now = new Date();

  //     //testing if sound works better here:
  //     let minutes = now.getMinutes();
  //     if (minutes == 0 || minutes == 30) { //race is happening now!
  //       setRaceNotified((oldValue) => {
  //         let value = true;
  //         if (!oldValue) {
  //           raceStartAudioRef.current.play();
  //         }
  //         return value
  //       })
  //     } else if (minutes == 55 || minutes == 25) { //sign ups are happening now!
  //       setSignupNotified((oldValue) => {
  //         let value = true;
  //         if (!oldValue) {
  //           signUpAudioRef.current.play();
  //         }
  //         return value
  //       });
  //     }else {
  //       setRaceNotified(false);
  //       setSignupNotified(false);
  //     }
  //     // end of test

  //     let timeDiff = now - lastTime;
  //     if (timeDiff >= 1000) {
  //       let nextBuffer = findNext(new Date(), 18, RACEDATA, serverTimeTable, serverDay).map((race, index) => (
  //         <Tabs race={race[0]} raceTime={race[1]} key={index} />
  //       ));
  //       setNextFirst(nextBuffer.shift());
  //       setNextRaces(nextBuffer);
  //       lastTime += now;
  //     }
  //   }, 100)
  //   return () => clearInterval(timer);
  // }, []);


  return (
    <div className='row'>
      <div className='col'></div>
      <div className='col-8 m-0 p-2'>
        <h1 className='text-center text-light mx-4'>{(output === "nextFirst") ? "Next Race:" : "Following Races:"}</h1>
        <div className='card text-center' id="highlightFirst">
          {raceList.map((race, index) => (
          <Tabs race={race[0]} raceTime={race[1]} key={index} />
        ))}
        </div>
      </div>
      <div className='col'></div>
    </div>
  );
}