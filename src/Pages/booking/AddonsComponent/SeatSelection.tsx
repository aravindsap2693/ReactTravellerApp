import React, { useState, useEffect } from "react";

import Flightimg from "../../../assets/images/FlightImagee.svg";
import { useSelector, useDispatch } from "react-redux";
import { setErrorCode } from "../../../Store/Slice/bookingPayloadSlice";
import { fetchSeatData } from "../../../Api/seat.api";
import { toast } from "react-toastify";
import { RootState } from "../../../Store/store";
import {
  setSeatTotalAmount,
  setSsrSeatInfos,
} from "../../../Store/Slice/seatSlice";
interface Seat {
  seatNo: string;
  isBooked: boolean;
  amount: number;
  isLegroom?: boolean;
  isAisle?: boolean;
  seatPosition: {
    row: number;
    column: number;
  };
}

interface SeatResponse {
  status: {
    success: boolean;
    httpStatus: number;
  };
  errors: { errCode: string; message: string; details: string }[];
  tripSeatMap: {
    tripSeat: {
      [key: string]: {
        sData: { row: number; column: number };
        sInfo: Seat[];
      };
    };
  };
}

const FlightSeatSelection: React.FC = () => {
  const passengers = useSelector(
    (state: any) => state.flightBanner?.totalPassengers
  );
  const bookingId = useSelector(
    (state: any) => state.bookingPayload?.bookingId
  );
  const flightdata = useSelector((state: RootState) => state.flightList.data);
  const [seats, setSeats] = useState<Seat[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [rows, setRows] = useState<number>(0);
  const [columns, setColumns] = useState<number>(0);

  const dispatch = useDispatch();

  // Get bookingId from Redux store

  console.log(bookingId, "bookingId");
  // Check if bookingId is correct before API call

  // const fetchSeats = async () => {
  //   try {
  //     const data = await fetchSeatData(bookingId);
  //     // Check if the response indicates seat selection is not applicable
  //     console.log("DATAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",data)
  //     if (data.status && !data.status.success) {
  //       const error = data.errors[0];
  //       if (error.errCode === "1056") {
  //         // Assuming dispatch(setErrorCode) is still being used for Redux-based error handling
  //         dispatch(setErrorCode(error.message));
  //         alert(error.message);
  //         return;
  //       }
  //     }
  //     // Handle successful seat data here
  //     console.log("Seat data:", data);
  //     if (data && data.tripSeatMap && data.tripSeatMap.tripSeat) {
  //       Object.keys(data.tripSeatMap.tripSeat).forEach((tripSeatKey) => {
  //         const seatData = data.tripSeatMap.tripSeat[tripSeatKey].sData;
  //         const seatInfo = data.tripSeatMap.tripSeat[tripSeatKey].sInfo;
  //         setRows(seatData.row);
  //         setColumns(seatData.column);
  //         setSeats((prevSeats) => [...prevSeats, ...seatInfo]);
  //       });
  //     } else {
  //       console.error("Invalid seat data structure");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching seat data:", error);
  //   }
  // };

  const fetchSeats = async () => {
    try {
      const data: SeatResponse = await fetchSeatData(bookingId);
      if (data.status && !data.status.success) {
        const error = data.errors[0];
        if (error.errCode === "1056") {
          dispatch(setErrorCode(error.message));
          alert(error.message);
          return;
        }
      }

      if (data && data.tripSeatMap && data.tripSeatMap.tripSeat) {
        const allSeats: Seat[] = [];
        let totalRows = 0;
        let totalColumns = 0;
        Object.keys(data.tripSeatMap.tripSeat).forEach((tripSeatKey) => {
          const seatData = data.tripSeatMap.tripSeat[tripSeatKey].sData;
          const seatInfo = data.tripSeatMap.tripSeat[tripSeatKey].sInfo;
          totalRows = seatData.row;
          totalColumns = seatData.column;
          allSeats.push(...seatInfo);
        });
        setRows(totalRows);
        setColumns(totalColumns);
        setSeats(allSeats);
      } else {
        console.error("Invalid seat data structure");
      }
    } catch (error) {
      console.error("Error fetching seat data:", error);
      toast.error("Failed to fetch seat data.");
    }
  };

  useEffect(() => {
    fetchSeats();
  }, [bookingId, dispatch]);

  const handleSeatClick = (seat: Seat) => {
    if (seat.isBooked) return;
    const isSelected = selectedSeats.find((s) => s.seatNo === seat.seatNo);
    if (!isSelected && selectedSeats.length >= passengers) {
      toast.error(`You can only select up to ${passengers} seats.`);
      return;
    }
    if (isSelected) {
      setSelectedSeats(selectedSeats.filter((s) => s.seatNo !== seat.seatNo));
    } else {
      const updatedSelectedSeats = [...selectedSeats, seat];
      console.log("updatedSelectedSeats", updatedSelectedSeats);
      setSelectedSeats(updatedSelectedSeats);
      const totalAmount = updatedSelectedSeats.reduce(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (total: any, s: Seat) => total + s.amount,
        0
      );
      dispatch(setSeatTotalAmount(totalAmount));
      console.log("Total amount for selected seats:", totalAmount);
      if (updatedSelectedSeats.length > 0) {
        const payload = updatedSelectedSeats.map((s) => ({
          code: s.seatNo,
          key: flightdata[0].flightid,
        }));
        console.log("555", payload);
        dispatch(setSsrSeatInfos(payload));
      }
    }
  };

  const renderSeats = () => {
    return seats.map((seat) => {
      const isSelected = selectedSeats.some((s) => s.seatNo === seat.seatNo);
      const seatStyle = {
        width: "45px",
        height: "25px",
        backgroundColor: seat.isBooked
          ? "#F44336"
          : isSelected
          ? "#FF9800"
          : "#8BC34A",
        border: "2px solid #ccc",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: seat.isBooked ? "not-allowed" : "pointer",
        margin: "2px",
        gridRow: seat.seatPosition.row,
        gridColumn: seat.seatPosition.column,
        transition: "background-color 0.3s",
      };

      return (
        <div
          key={seat.seatNo}
          style={seatStyle}
          onClick={() => handleSeatClick(seat)}
          title={`Seat ${seat.seatNo}, Fare: ${seat.amount}`}
        >
          {seat.seatNo}
        </div>
      );
    });
  };
  console.log("passengers", passengers);
  return (
    <div
      style={{ background: "aliceblue", padding: "20px", position: "relative" }}
    >
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          zIndex: 2,
        }}
      >
        <h3>Selected Seats:</h3>
        <ul style={{ listStyle: "none", padding: "20px 0px 0px" }}>
          {selectedSeats.map((seat, index) => (
            <li key={index}>
              {index + 1}. Seat No.{seat.seatNo} - Amount :{seat.amount}
            </li>
          ))}
        </ul>
      </div>

      <div
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          zIndex: 2,
        }}
      >
        <h4>Legend:</h4>
        <div style={{ marginBottom: "10px" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                width: "20px",
                height: "20px",
                backgroundColor: "#8BC34A",
                marginRight: "10px",
              }}
            ></div>
            <span>Available Seat</span>
          </div>
          <div
            style={{ display: "flex", alignItems: "center", marginTop: "5px" }}
          >
            <div
              style={{
                width: "20px",
                height: "20px",
                backgroundColor: "#FF9800",
                marginRight: "10px",
              }}
            ></div>
            <span>Selected Seat</span>
          </div>
          <div
            style={{ display: "flex", alignItems: "center", marginTop: "5px" }}
          >
            <div
              style={{
                width: "20px",
                height: "20px",
                backgroundColor: "#F44336",
                marginRight: "10px",
              }}
            ></div>
            <span>Booked Seat</span>
          </div>
        </div>
      </div>

      <div
        style={{
          width: rows > 6 ? "1250px" : "350px",
          height: "1600px",
          position: "relative",
          left: rows > 6 ? "-87px" : "50px",
          top: "20px",
        }}
      >
        <img src={Flightimg} alt="FlightImage" width={rows > 6 ? 1250 : 350} />
      </div>

      <div
        style={{
          position: "absolute",
          top: "250px",
          left: rows > 6 ? "396px" : "432px",

          backgroundColor: "#fff",
          backgroundSize: "cover",
          backgroundPosition: "center",
          overflow: "hidden",
          display: "grid",
          gridTemplateRows: `repeat(${rows}, auto)`,
          gridTemplateColumns: `repeat(${columns}, auto)`,
          gap: "5px",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        {renderSeats()} {/* Render the seats dynamically */}
      </div>
    </div>
  );
};

export default FlightSeatSelection;
