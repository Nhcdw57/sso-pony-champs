from sqlalchemy.orm import relationship
from extensions import db

class Server(db.Model):
    __tablename__ = "servers"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False, unique=True)
    timezone = db.Column(db.String, nullable=False)  # e.g. "America/New_York"

    def serialize(self):
        return{
            "id": self.id,
            "name":self.name,
            "timezone":self.timezone
        }

class Race(db.Model):
    __tablename__ = "races"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False, unique=True)
    fastTravel = db.Column(db.String, nullable=False, server_default="Unknown")
    imageUrl = db.Column(db.String, nullable=True)
    locationImageUrl = db.Column(db.String, nullable=True)

    times = relationship("RaceTime", back_populates="race")

    def serialize(self):
        return{
            "id": self.id,
            "name":self.name,
            "fastTravel":self.fastTravel,
            "imageUrl":self.imageUrl,
            "locationImageUrl":self.locationImageUrl,
        }

class RaceTime(db.Model):
    __tablename__ = "race_times"
    __table_args__ = (
        db.UniqueConstraint("weekday", "start_time_local", name="uq_race_times_weekday_start_time"),
    )

    id = db.Column(db.Integer, primary_key=True)

    race_id = db.Column(db.Integer, db.ForeignKey("races.id"), nullable=False)
    weekday = db.Column(db.Integer, nullable=False)        # 0=Mon ... 6=Sun
    start_time_local = db.Column(db.Time, nullable=False)  # e.g. 06:00
    enabled = db.Column(db.Boolean, nullable=False, default=True)

    race = relationship("Race", back_populates="times")

    def serialize(self):
        return{
            "id": self.id,
            "race_id":self.race_id,
            "weekday":self.weekday,
            "start_time_local":self.start_time_local.strftime("%H:%M"),
            "enabled": self.enabled,
            "race": self.race.serialize()
        }