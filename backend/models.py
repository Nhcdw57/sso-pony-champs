from sqlalchemy import Column, Integer, String, Time, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from db import Base

class Server(Base):
    __tablename__ = "servers"
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False, unique=True)
    timezone = Column(String, nullable=False)  # e.g. "America/New_York"

    def serialize(self):
        return{
            "id": self.id,
            "name":self.name,
            "timezone":self.timezone
        }

class Race(Base):
    __tablename__ = "races"
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False, unique=True)

    times = relationship("RaceTime", back_populates="race", cascade="all, delete-orphan")

    def serialize(self):
        return{
            "id": self.id,
            "name":self.name
        }

class RaceTime(Base):
    __tablename__ = "race_times"
    id = Column(Integer, primary_key=True)

    race_id = Column(Integer, ForeignKey("races.id"), nullable=False)
    weekday = Column(Integer, nullable=False)        # 0=Mon ... 6=Sun
    start_time_local = Column(Time, nullable=False)  # e.g. 06:00
    enabled = Column(Boolean, nullable=False, default=True)

    race = relationship("Race", back_populates="times")

    def serialize(self):
        return{
            "id": self.id,
            "race_id":self.race_id,
            "weekday":self.weekday,
            "start_time_local":self.start_time_local.strftime("%H:%M:%S"),
            "enabled": self.enabled
        }