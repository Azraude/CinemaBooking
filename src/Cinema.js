import React from "react";
import Seat from "./components/Seat";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@mui/material";
import { setSeatStatus } from "./redux/seatsSlice";

function CinemaView() {
  const seats = useSelector((state) => state.seats);
  const dispatch = useDispatch();

  const handleSeatClick = (seatIndex) => {
    const currentStatus = seats[seatIndex].status;
    if (currentStatus === 'free') {
        dispatch(setSeatStatus({ index: seatIndex, status: 'selected' }));
    } else if (currentStatus === 'selected') {
        dispatch(setSeatStatus({ index: seatIndex, status: 'free' }));
    }
};


const handleBuyTickets = () => {
    const startTime = Date.now();
    seats.forEach((seat, index) => {
      if (seat.status === "selected") {
        dispatch(setSeatStatus({ index, status: 'pending', startTime: startTime })); // change the status to pending
      }
    });
};


  return (
    <div className="cinema">
      {seats.map((status, index) => (
      <Seat key={index} index={index} status={status} onClick={() => handleSeatClick(index)} />

      ))}
      <Button variant="contained" color="primary" className="btn" onClick={handleBuyTickets}>
        Acheter des billets
      </Button>
    </div>
  );
}

export default CinemaView;
