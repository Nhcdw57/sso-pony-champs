from app import app
from extensions import db
from models import Race, RaceTime, Server
from datetime import time
from seed_data import RACES, SERVERS
from schedule_validation import race_lookup_builder, validate_complete_schedule



def parse_time(t):
    hour, minute = map(int, t.split(":"))
    return time(hour, minute)

def seed():
    with app.app_context():
        #validates starting times & makes sure no duplicate slot listings & makes sure every race starting time has a race
        listed_starting_times = race_lookup_builder(RACES)
        validate_complete_schedule(listed_starting_times)

        RaceTime.query.delete()
        Race.query.delete()
        # Server.query.delete()


        # servers?

        race_objects = {}

        #races
        for race_data in RACES:
            race = Race(name=race_data["raceName"], fastTravel=race_data["fastTravel"])
            db.session.add(race)
            race_objects[race_data["raceName"]] = race
        db.session.flush()

        race_id_lookup = {
            race_name: race.id
            for race_name, race in race_objects.items()
        }
            
        #racetimes
        for starting_time_slot, race_name in listed_starting_times.items():
            weekday, starting_time = starting_time_slot
            race_time = RaceTime(
                race_id = race_id_lookup[race_name],
                weekday = weekday,
                start_time_local = parse_time(starting_time),
                enabled = True
            )
            db.session.add(race_time)
        db.session.commit()
        print("✅ Database seeded!")

if __name__ == "__main__":
    seed()