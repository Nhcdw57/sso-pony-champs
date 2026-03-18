import { useContext, useRef, useState } from "react";

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