import { TimerProps } from "@/src/models/common.model";
import React from "react";

const TTimer: React.FC<TimerProps> = ({
  seconds = 0,
  fontColor = "gray",
  timeInSec,
}) => {
  const [time, setTime] = React.useState<number>(timeInSec ?? seconds); // Use timeInSec if provided, otherwise use seconds

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0)); // Decrement the timer until it reaches 0
    }, 1000);

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);

  // Calculate hours, minutes, and seconds from the total seconds
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const secondsRemaining = time % 60;

  // Helper function to determine the color based on value

  const getDisplayStyle: any = (value: number) => ({
    color: value > 600 ? "#50C878" : value > 0 ? fontColor : "gray",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    margin: "0 5px",
    minWidth: "30px",
    textAlign: "center",
    display: "inline-block",
    fontSize: "20px",
    background: "#fff",
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "baseline",
      }}
    >
      <div
        style={{
          padding: "10px 0px",
        }}
      >
        <h5>Time left</h5>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={getDisplayStyle(hours)}>
          {String(hours).padStart(2, "0")}
        </div>
        <div>:</div>
        <div style={getDisplayStyle(minutes)}>
          {String(minutes).padStart(2, "0")}
        </div>
        <div>:</div>
        <div style={getDisplayStyle(secondsRemaining)}>
          {String(secondsRemaining).padStart(2, "0")}
        </div>
      </div>
    </div>
  );
};

export default TTimer;
