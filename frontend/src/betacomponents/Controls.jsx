import { useContext, useEffect, useRef, useState } from "react";
import { AudioContext } from "../hooks/AudioContext";

export function Controls({timeZone, changeTimeZone, changeFollowingAmount}) {
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
        <div className="card w-100 top-0 start-50 translate-middle-x" style={{ minHeight: "188px", minWidth: "336px", backgroundColor: "pink" }}>

          <div className="accordion my-accordion" id="settingsAccordion">
            <div className="accordion-item my-shad" style={{ backgroundColor: "pink" }}>
              <h2 className="accordion-header">
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                  <h5>Volume & Sounds</h5>
                </button>
              </h2>
              <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#settingsAccordion">
                <div className="accordion-body">
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
            </div>
            <div className="accordion-item my-shad" style={{ backgroundColor: "pink" }}>
              <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                  <h5>Server Timezone Selection</h5>
                </button>
              </h2>
              <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#settingsAccordion">
                <div className="accordion-body">
                  <div className="mb-3">Unsure what timezone your server is in? Check the SSO Server Status page!
                  </div>

                  <select className="form-select" value={timeZone} onChange={(event) => changeTimeZone(event.target.value)}>
                    {Intl.supportedValuesOf("timeZone").map((tz) => (
                      <option key={tz} value={tz}>
                        {tz}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="accordion-item my-shad" style={{ backgroundColor: "pink" }}>
              <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                  <h5>Other</h5>
                </button>
              </h2>
              <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#settingsAccordion">
                <div className="accordion-body">
                  <strong>This is the third item’s accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It’s also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>

  )

}