import { useContext, useEffect, useState } from 'react';
import { RaceCard } from '../betacomponents/RaceCard.jsx';


export function Upcomming({ output, onNav, raceList, signupStatus }) {
  return (
      <div className='' style={{ minWidth: "350px" }}>
        <h1 className='text-center text-light mx-4'>{(output === "nextFirst") ? "Next Race:" : "Following Races:"}</h1>
        <div className='card text-center' id="highlightFirst" style={{backgroundColor: "#eedbe7"}} >
          {raceList?.map((race, index) => (
            <RaceCard race={race} onNav={onNav} variant={(output === "nextFirst") ? "nextRace" : "following"} signupStatus={output === "nextFirst" ? signupStatus : null} key={index} />
          ))}
        </div>
      </div>
  );
}
