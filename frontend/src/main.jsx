import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Timer, Upcomming, Title, Controls } from './App.jsx'
import { AudioProvider } from "./hooks/AudioContext.jsx"



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AudioProvider>
      <>
      {/* everything in this blank tag will be moved to App.jsx, from here:... */}
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
        {/*... to here */}
      </>
    </AudioProvider>



  </StrictMode>,
)
