

function findNext(input = new Date(), amount = 4) {
    //returns an array of X <Tab> divs, X being the amount which also defaults to 4
    let time = new Date(input);
    let conversion = () => [serverTimeTable.format(roundedTime(time)), serverDay.format(roundedTime(time))];
    let nextRaceTimes = [];
    for (let i = 0; i < amount; i++) {
        nextRaceTimes.push(conversion());
        time.setMinutes(time.getMinutes() + 30);
    }
    let timeTable = checkRaceData(raceData())[1];
    let nextFoundRaces = []
    for (let raceTimeArray of nextRaceTimes) {
        let raceTime = raceTimeArray[0];
        let day = raceTimeArray[1];
        let race = timeTable[raceTime][day];
        nextFoundRaces.push([race.raceName, raceTime]);
    }

    return nextFoundRaces.map((race, index) => (
        <Tabs race={race[0]} raceTime={race[1]} key={index} />
    ))
}


//all set to export I think
function roundedTime(input = new Date()) {

    let time = new Date(input);
    let minutes = time.getMinutes();
    let seconds = time.getSeconds();

    // if (minutes == 0 || minutes == 30 || !raceNotified) { //remember to remove after debugs
    //   //race is happening now!
    //   if(!raceNotified){
    //     raceStartAudioRef.current.play();
    //   }
    //   setRaceNotified(true);
    // } else if (minutes == 55 || minutes == 25 || raceNotified) { //remember to remove after debugs
    //   //sign ups are happening now!
    //   if(signupNotified){
    //     signUpAudioRef.current.play();
    //   }
    //   setSignupNotified(true);
    //   //remember to remove the following after debugs
    //   setRaceNotified(false);
    // }
    // else{
    //   setRaceNotified(false);
    //   setSignupNotified(false);
    // }

    if (minutes < 30) {
        time.setMinutes(30);
    } else if (minutes > 30) {
        time.setHours(time.getHours() + 1);
        time.setMinutes(0);
    }
    return time
}

function checkRaceData(raceList) {
    let days = ["Monday", 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    let raceTimeList = [
        '00:00', '00:30',
        '01:00', '01:30',
        '02:00', '02:30',
        '03:00', '03:30',
        '04:00', '04:30',
        '05:00', '05:30',
        '06:00', '06:30',
        '07:00', '07:30',
        '08:00', '08:30',
        '09:00', '09:30',
        '10:00', '10:30',
        '11:00', '11:30',
        '12:00', '12:30',
        '13:00', '13:30',
        '14:00', '14:30',
        '15:00', '15:30',
        '16:00', '16:30',
        '17:00', '17:30',
        '18:00', '18:30',
        '19:00', '19:30',
        '20:00', '20:30',
        '21:00', '21:30',
        '22:00', '22:30',
        '23:00', '23:30'
    ];
    let check = {};
    let problems = [];
    for (let timeSlot of raceTimeList) {
        check[timeSlot] = {};
        for (let day of days) {
            for (let race of raceList) {
                let raceTimes = Array.from(race[day]);
                if (Array.isArray(raceTimes)) {
                    if (raceTimes.indexOf(timeSlot) !== -1 && Object.hasOwn(check[timeSlot], day)) {
                        problems.push(`There is a conflict of time on ${day} ${timeSlot} between ${race.raceName} and ${check[timeSlot][day].raceName}`);
                        problems.push({ "day": day, "time": timeSlot, "existingRace": check[timeSlot][day].raceName, "conflictingRace": race.raceName })
                        return [false, problems];
                    } else if (raceTimes.indexOf(timeSlot) !== -1) {
                        check[timeSlot][day] = race;

                    }
                }
            }
        }
        if (Object.keys(check[timeSlot]).length !== 7) {
            problems.push(`${timeSlot} doesn't have 7 days, it has ${Object.keys(check[timeSlot]).length} days and it has the following:`);
            problems.push(check[timeSlot]);
            return [false, problems];
        }
    }
    return [true, check];
}