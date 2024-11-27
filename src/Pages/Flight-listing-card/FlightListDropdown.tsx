/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useRef, useEffect } from "react";
import { Dropdown, Button } from "rsuite";
import styles from "../../assets/styles/flight-card.module.css"; // CSS module import
import User from "../../../src/assets/images/User.svg";
import { useDispatch, useSelector } from "react-redux";
import { setCabinClass, setPassengers } from "../../Store/Slice/flightBannerSlice";

interface PassengerCounts {
  adults: number;
  children: number;
  infants: number;
}

const buttonList: string[] = ["Economy", "Premium Economy", "Business", "First Class"];

const FlightListDropdown: React.FC = () => {
  const dispatch = useDispatch();
  const [accordionOpen, setAccordionOpen] = useState<boolean>(false);
  const [, setCounts] = useState<PassengerCounts>({
    adults: 1,
    children: 0,
    infants: 0,
  });

  const [type, setType] = useState<string>("Economy");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { cabinClass, passengers } = useSelector((state: any) => state?.flightBanner);

  const MAX_PASSENGERS = 9;

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle click outside the dropdown
  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setAccordionOpen(false);
    }
  };

  // Add event listener on component mount
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleIncrement = (type: keyof PassengerCounts) => {
    setCounts((prevCounts) => {
      if (prevCounts[type] < MAX_PASSENGERS) {
        const newCounts = { ...prevCounts, [type]: prevCounts[type] + 1 };
        dispatch(setPassengers(newCounts));
        return newCounts;
      }
      return prevCounts;
    });
    setAccordionOpen(true);
  };

  const handleDecrement = (type: keyof PassengerCounts) => {
    setCounts((prevCounts) => {
      const newCounts = { ...prevCounts, [type]: Math.max(prevCounts[type] - 1, 0) };
      dispatch(setPassengers(newCounts));
      return newCounts;
    });
    setAccordionOpen(true);
  };

  const handleCabinClass = (item: string) => {
    setType(item);
    dispatch(setCabinClass(item));
    // Close the dropdown after selecting cabin class
    setAccordionOpen(false);
  };

  return (
    <div ref={dropdownRef} className={styles.dropdownContainer} style={{ width: "330px" }}>
      <Dropdown
        className={styles.dropdown}
        title={
          <div style={{
            display: "flex",
            alignItems: "center",
            fontSize: "12px",
            color: "black",
            width: "330px",
            fontWeight: "500"
          }}>
            <img src={User} alt="User" width={22} height={22} className={styles.userIcon} />
            Adults {passengers.adults || 0}, Children {passengers.children || 0}, Infants {passengers.infants || 0}, {cabinClass}
          </div>
        }
        open={accordionOpen}
        onClick={() => setAccordionOpen(!accordionOpen)}
        style={{
          border: "1px solid lightgrey",
          lineHeight: "0px",
          width: "100%",
          backgroundColor: "white",
          borderRadius: "5px",
          display: "grid",
          height: "39px",
        }}
      >
        <Dropdown.Item style={{ backgroundColor: "white", width: "100%", height: "auto" }}>
          {/* Passengers controls */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #d1d1d1",
            padding: "10px 0px 10px 7px",
            flexWrap: "wrap",
            width: "100%"
          }}>
            <div className={styles.passengerType}>
              <span>Adults</span>
              <div className={styles.passengerAge}>(Aged 12+ yrs)</div>
            </div>
            <div className={styles.passengerControls}>
              <Button onClick={() => handleDecrement("adults")}>-</Button>
              <span className={styles.passengerCount} style={{ fontWeight: "bold" }}>{passengers.adults || 0}</span>
              <Button onClick={() => handleIncrement("adults")}>+</Button>
            </div>
          </div>

          {/* Repeat for children and infants */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #d1d1d1",
            padding: "10px 0px 10px 7px",
            flexWrap: "wrap",
            width: "100%"
          }}>
            <div className={styles.passengerType}>
              <span>Children</span>
              <div className={styles.passengerAge}>(Aged 2-12 yrs)</div>
            </div>
            <div className={styles.passengerControls}>
              <Button onClick={() => handleDecrement("children")}>-</Button>
              <span className={styles.passengerCount} style={{ fontWeight: "bold" }}>{passengers.children || 0}</span>
              <Button onClick={() => handleIncrement("children")}>+</Button>
            </div>
          </div>

          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #d1d1d1",
            padding: "10px 0px 10px 7px",
            flexWrap: "wrap",
            width: "100%"
          }}>
            <div className={styles.passengerType}>
              <span>Infants</span>
              <div className={styles.passengerAge}>(Below 2 yrs)</div>
            </div>
            <div className={styles.passengerControls}>
              <Button onClick={() => handleDecrement("infants")}>-</Button>
              <span className={styles.passengerCount} style={{ fontWeight: "bold" }}>{passengers.infants || 0}</span>
              <Button onClick={() => handleIncrement("infants")}>+</Button>
            </div>
          </div>

          {/* Cabin class options */}
          <div 
            className={styles.cabinClassOptions} 
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "10px 0 5px",
              flexWrap: "wrap",
            }}
          >
            {buttonList.map((item, i: number) => (
              <Button
                key={i}
                onClick={() => handleCabinClass(item)}
                appearance="ghost"
                style={{
                  color: type === item ? "#FA503F" : "#666666",
                  backgroundColor: type === item ? "#FEF6F5" : "#FFF",
                  border: "1px solid #E5E5E5",
                }}
                className={type === item ? styles.selectedCabinClass : ""}
              >
                {item}
              </Button>
            ))}
          </div>
        </Dropdown.Item>
      </Dropdown>
    </div>
  );
};

export default FlightListDropdown;
