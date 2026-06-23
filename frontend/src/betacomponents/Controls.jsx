import { useContext, useEffect, useRef, useState } from "react";
import { AudioContext } from "../hooks/AudioContext";

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
    <div className=''>
        <form className=''>
          <div className="card w-100 top-0 start-50 translate-middle-x my-shad" style={{ minHeight: "188px", minWidth: "336px" , backgroundColor:"pink"}}>
            <div className="card-body">
              <label className="form-label fs-3 fw-bold">Volume: {volume}</label>
              <input type="range" className="form-range volume-range" id="volumeC" value={volume} min={0} max={100} onChange={volumeAdjust} />
              <button type="button" className="btn mb-3 mx-2 my-btn" onClick={() => play("raceStart")}>Test Race Start Alarm</button>
              <button type="button" className="btn mb-3 mx-2 my-btn" onClick={() => play("signUpStart")}>Test Sign Up Start Alarm</button>
              <button type="button" className="btn mb-3 mx-2 my-btn" onClick={stopCurrentSound}>Stop the Currently Playing Alarms</button>
              <div className="form-check">
                <input className="form-check-input my-check my-shad" type="checkbox" value="" id="checkRaceStart" ref={raceStartCheckboxRef} checked={raceSoundOn} onChange={muteToggle} />
                <label className="form-check-label fs-6 fw-bold">
                  Notify me when the race starts
                </label>
              </div>
              <div className="form-check">
                <input className="form-check-input my-check my-shad" type="checkbox" value="" id="checkSignUp" ref={signUpCheckboxRef} checked={signupSoundOn} onChange={muteToggle} />
                <label className="form-check-label fs-6 fw-bold">
                  Notify me when signing up for the race is available
                </label>
              </div>
            </div>
          </div>
        </form>
      </div>

  )

}