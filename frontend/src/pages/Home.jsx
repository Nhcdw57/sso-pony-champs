import { Controls, Timer, Title, Upcomming } from "../App";

export function Home(){
    return(<>
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
          </>)
}