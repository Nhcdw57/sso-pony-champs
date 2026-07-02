import { Link } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import { AudioContext } from "../hooks/AudioContext";

export function Controls({ timeZone, changeTimeZone, changeFollowingAmount, amount }) {
  const [volume, setVolume] = useState(50);
  const [raceSoundOn, setRaceSoundOn] = useState(true);
  const [signupSoundOn, setSignupSoundOn] = useState(true);

  const { raceStartAudioRef, signUpAudioRef } = useContext(AudioContext);

  const raceStartCheckboxRef = useRef(null);
  const signUpCheckboxRef = useRef(null);

  const SERVER_TIMEZONES = [
    "Europe/Warsaw",
    "Europe/Stockholm",
    "Europe/Rome",
    "Europe/Prague",
    "Europe/Paris",
    "Europe/Oslo",
    "Europe/Moscow",
    "Europe/Madrid",
    "Europe/London",
    "Europe/Kyiv",
    "Europe/Istanbul",
    "Europe/Helsinki",
    "Europe/Copenhagen",
    "Europe/Budapest",
    "Europe/Berlin",
    "Europe/Athens",
    "Europe/Amsterdam",
    "Australia/Sydney",
    "Australia/Eucla",
    "Asia/Seoul",
    "Asia/Dubai",
    "America/Toronto",
    "America/New York",
    "America/Mexico City",
    "America/Los Angeles",
    "America/Chicago",
    "America/Belem"
  ];


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
        <div className="card w-100 top-0 start-50 translate-middle-x" style={{ minHeight: "188px", backgroundColor: "pink" }}>

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
                  <div className="mb-3">Unsure what timezone your server is in? <Link to={"https://www.starstable.com/server-status"} target="_blank">Check the SSO Server Status page!</Link>
                  </div>

                  <select className="form-select my-shad" value={timeZone} onChange={(event) => changeTimeZone(event.target.value)}>
                    {SERVER_TIMEZONES.sort().map((tz) => (
                      <option key={tz} value={tz.replaceAll(" ","_")}>
                        {tz.replaceAll("_"," ")}
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
                  <div className="mb-3">Amount of Following Races to display:
                  </div>

                  <select className="form-select my-shad" value={amount} onChange={(event) => changeFollowingAmount(event.target.value)}>
                    {new Array(23).fill(null).map((tz, index) => (
                      <option key={index + 2} value={index + 2}>
                        {index + 1}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>

  )

}