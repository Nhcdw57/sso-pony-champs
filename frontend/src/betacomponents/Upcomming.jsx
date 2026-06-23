import { useContext, useEffect, useState } from 'react';
import { RaceCard } from '../betacomponents/RaceCard.jsx';


export function Upcomming({ output, onNav, raceList, signupStatus }) {
  return (
    <div className='row'>
      <div className='col'></div>
      <div className='col-8 m-0 p-2' style={{ minWidth: "475px" }}>
        <h1 className='text-center text-light mx-4'>{(output === "nextFirst") ? "Next Race:" : "Following Races:"}</h1>
        <div className='card text-center' id="highlightFirst" style={{backgroundColor: "#eedbe7"}} >
          {raceList?.map((race, index) => (
            <RaceCard race={race} onNav={onNav} variant={(output === "nextFirst") ? "nextRace" : "following"} signupStatus={output === "nextFirst" ? signupStatus : null} key={index} />
          ))}
        </div>
      </div>
      <div className='col'></div>
    </div>
  );
}
