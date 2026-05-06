from flask import Blueprint, jsonify, request
from datetime import datetime, timedelta
from zoneinfo import ZoneInfo, ZoneInfoNotFoundError
from models import RaceTime
from extensions import db

races_bp = Blueprint("races", __name__,url_prefix="/api/races")

@races_bp.route("/next",methods=["GET"])
def get_races():
    amount = request.args.get("amount", default=4, type=int)
    if amount < 2 or amount > 24:
        return jsonify({"error":"Invalid amount of races to show","amount":amount}), 400
    timezone = request.args.get("timezone", default="Europe/Copenhagen", type=str)
    try:
        tz = ZoneInfo(timezone)
    except ZoneInfoNotFoundError:
        return jsonify({"error":"Invalid timezone input", "timezoneInput": timezone}), 400
    time = datetime.now()
    server_time = time.astimezone(tz)
    minutes = server_time.minute
    if minutes < 30:
        server_time = server_time.replace(minute=30, second=0, microsecond=0)
    else:
        server_time = (server_time + timedelta(hours=1)).replace(minute=0,second=0,microsecond=0)

    next_races = []
    for i in range(amount):
        command = db.select(RaceTime).filter(RaceTime.weekday == server_time.weekday(), RaceTime.start_time_local == server_time.time())
        query_result = db.session.execute(command)
        race_time = query_result.scalar_one_or_none()
        if race_time is None:
            return jsonify({"error":"No timeslot found in Database","weekday":server_time.weekday(),"locaStartTime":server_time.strftime("%H:%M")}), 500
        next_races.append({"raceName":race_time.serialize()["race"]["name"], "raceTime":race_time.serialize()["start_time_local"]})
        server_time = server_time+timedelta(minutes=30)
    
    return jsonify({"nextRaces":next_races}),200
