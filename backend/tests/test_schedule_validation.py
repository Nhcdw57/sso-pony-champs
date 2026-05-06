from schedule_validation import generate_times, race_lookup_builder,validate_complete_schedule
from seed_data import RACES
import pytest

def test_good_data_validation():
    listed_time_slots = race_lookup_builder(RACES)
    assert validate_complete_schedule(listed_time_slots) is None

def test_bad_data_validation():
    bad_races = [
        {
            "raceName": "Race A",
            "Monday": ["00:00"],
            "Tuesday": [],
            "Wednesday": [],
            "Thursday": [],
            "Friday": [],
            "Saturday": [],
            "Sunday": [],
        },
        {
            "raceName": "Race B",
            "Monday": ["00:00"],
            "Tuesday": [],
            "Wednesday": [],
            "Thursday": [],
            "Friday": [],
            "Saturday": [],
            "Sunday": [],
        },
    ]
    missing_races = [
        {
            "raceName": "Race A",
            "Monday": ["00:00"],
            "Tuesday": [],
            "Wednesday": [],
            "Thursday": [],
            "Friday": [],
            "Saturday": [],
            "Sunday": [],
        }
    ]

    with pytest.raises(ValueError) as exc_info:
        race_lookup_builder(bad_races)
    assert "Duplicate" in str(exc_info.value)

    with pytest.raises(ValueError) as exc_info:
        validate_complete_schedule(race_lookup_builder(missing_races))
    assert "Missing a race" in str(exc_info.value)



    