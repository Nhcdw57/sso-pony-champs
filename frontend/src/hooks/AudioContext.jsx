import { createContext, useRef } from "react";
import RaceStartSound from "../assets/RaceStart.mp3"
import SignUpStartSound from "../assets/SignUpStart.mp3"


export const AudioContext = createContext(null)


export function AudioProvider({ children }) {
    const raceStartAudioRef = useRef(new Audio(RaceStartSound));
    const signUpAudioRef = useRef(new Audio(SignUpStartSound));
    return (
        <AudioContext.Provider value={{ raceStartAudioRef, signUpAudioRef }}>
            {children}
        </AudioContext.Provider>
    );
}