from seed import seed
from models import Race, RaceTime
from app import app, db
from seed_data import RACES
from datetime import datetime
import random


def test_seed_row_creation():
    with app.app_context():
        seed()

        assert Race.query.count() == len(RACES)
        assert RaceTime.query.count() == 336


        for n in range(3):
            WEEKDAYS = [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
            ]
            day_index = random.randint(0,6)
            race_index = random.randint(0,len(RACES)-1)
            race_day = RACES[race_index].get(WEEKDAYS[day_index])
            start_time_string = race_day[random.randint(0,len(race_day)-1)]
            start_time = datetime.strptime(start_time_string,"%H:%M").time()
            database_race = RaceTime.query.filter_by(weekday=day_index,start_time_local=start_time).first()
            race = db.session.get(Race,database_race.race_id)
            assert race.serialize()["name"] == RACES[race_index].get("raceName")