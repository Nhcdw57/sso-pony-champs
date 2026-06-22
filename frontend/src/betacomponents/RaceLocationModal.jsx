import { useEffect } from "react";
import placeholder from "../assets/placeholder.png";

export function RaceLocationModal({race, onClose}) {
    return (
        <div className="">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header text-center">
                        <h1 className="modal-title fs-5">Race Location:</h1>
                        <button type="button" className="btn-close" onClick={()=>onClose(false)}></button>
                    </div>
                    <div className="modal-body">
                        <h5 className="" style={{fontStyle: "italic"}}>{race?`${race.raceName}:`:""}</h5>
                        <img src={placeholder} className="img-fluid rounded-start" alt="..."></img>
                    </div>
                    <div className="modal-footer d-flex justify-content-center">
                        <div className="">
                            <span className="mx-1" style={{fontWeight: "bold"}}>Closest Fast Travel:</span> <span style={{textDecoration: "underline"}}>{race?race.fastTravel:""}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}