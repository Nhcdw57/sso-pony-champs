import { useContext, createContext, useState } from "react";


const TimerContext = createContext()


export function TimerProvider({children}){
    const [timer,setTimer] = useState();
    return <TimerContext.Provider value={{timer, setTimer}}>
        {children}
    </TimerContext.Provider>
}