import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import ChairIcon from "@mui/icons-material/Chair";
import "../Seat.css";
import { useDispatch } from 'react-redux';

import { setSeatStatus } from "../redux/seatsSlice";

function Seat({ index,status, onClick }) {
    const dispatch = useDispatch();
  const [timeLeft, setTimeLeft] = useState(null);
  useEffect(() => {
    if (status.status === "pending") {
      const endTime = status.startTime + 120000;
      const interval = setInterval(() => {
        const timeDiff = endTime - Date.now();
        setTimeLeft(Math.ceil(timeDiff / 1000));

        if (timeDiff <= 0) {
          clearInterval(interval);
          setTimeLeft(null);
          const newStatus = Math.random() > 0.5 ? "sold" : "free"; // 50% chance of being sold or free
           dispatch(setSeatStatus({ index:index, status: newStatus })); // Update the seat status
        }
      }, 1000);

      return () => clearInterval(interval);
    }
}, [status.status, dispatch,index]);


  const getStatusIconColor = () => {
    const seatStatus = status.status;
    if (seatStatus === "free") return "black";
    if (seatStatus === "pending" || seatStatus === "sold") return "lightgrey";
    if (seatStatus === "selected") return "red";
    return "black";
  };

  return (
    <Button variant="outlined" color='secondary' className='seats' onClick={onClick}>
        <div className="seat">

      <ChairIcon style={{ color: getStatusIconColor() }} />
      {status.status === "pending" && timeLeft ? `${timeLeft}s ` : ""}
        </div>
    </Button>
  );
}

export default Seat;
