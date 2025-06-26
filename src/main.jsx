import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Timer, Upcomming, Title, Controls } from './App.jsx'
import React, { createContext, useRef } from 'react';
import RaceStartSound from "./assets/RaceStart.mp3"
import SignUpStartSound from "./assets/SignUpStart.mp3"


export const AudioContext = createContext(null);

export const AudioProvider = ({ children }) => {
  const raceStartAudioRef = useRef(new Audio(RaceStartSound)); 
  const signUpAudioRef = useRef(new Audio(SignUpStartSound)); 
  return (
    <AudioContext.Provider value={{raceStartAudioRef,signUpAudioRef}}>
      {children}
    </AudioContext.Provider>
  );
};


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AudioProvider>
      <div className='row'>
        <div className='col'>
          <Title />
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <Timer />
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <Upcomming output="nextFirst" />
          <Controls />
        </div>
        <div className='col'>
          <Upcomming output="nextRaces" />
        </div>
      </div>
    </AudioProvider>



  </StrictMode>,
)
