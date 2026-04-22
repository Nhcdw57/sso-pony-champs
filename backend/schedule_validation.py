from datetime import time
import sys

#builds time slots
def generate_times():
    start_times = []
    for weekday in range(7):
        for hour in range(24):
            for minute in (0,30):
                start_times.append({
                    "weekday":weekday,
                    "time":time(hour,minute)
                })
    return start_times

# builds slot-lookup from races & checks for duplicate entries
def race_lookup_builder(races):
    WEEKDAYS = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
    ]
    listed_time_slots = {}

    for race in races:
        race_name = race["raceName"]
    
        for day_index, day in enumerate(WEEKDAYS):
            race_times = race[day]
            for time_string in race_times:
                time_slot = (day_index,time_string)

                if time_slot in listed_time_slots:
                    raise ValueError(f"Duplicate slot: {day} {time_string}")
                
                listed_time_slots[time_slot] = race_name
    return listed_time_slots

# ensures there's a race for every time-slot
def validate_complete_schedule(listed_time_slots):
    for start_time in generate_times():
        start_time_lookup = (start_time["weekday"],start_time["time"].strftime("%H:%M"))
        if start_time_lookup not in listed_time_slots:
            raise ValueError(f"Missing a race @ timeslot: {start_time_lookup}")