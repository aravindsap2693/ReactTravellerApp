
import React, { useState } from "react";
import { Dropdown, Button, Text, Stack } from "rsuite";

import User from "../../../assets/images/User.svg";
import { FlightDropdownProps, PassengerCounts } from "../../../Interfaces/models/flight.model";
import TButton from "../../../Component/Common/TButton";


const buttonList: string[] = [
  "Economy",
  "Premium Economy",
  "Business",
  "First Class",
];

// Abstracting the passenger counter component
const PassengerCounter = ({
  label,
  ageRange,
  count,
  handlePassengerDetails,
}: {
  label: keyof PassengerCounts;
  ageRange: string;
  count: number;
  handlePassengerDetails: (
    field: keyof PassengerCounts,
    action: string | number
  ) => void;
}) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottom: "1px solid #d1d1d1",
      padding: "10px 0",
      flexWrap: "wrap",
    }}
  >
    <div>
      <span>{label}</span>
      <div style={{ fontSize: "12px", color: "#666" }}>({ageRange})</div>
    </div>
    <div
      style={{ display: "flex", alignItems: "center", paddingRight: "25px" }}
    >
      <TButton
        style={{ flex: "1" }}
        onClick={() => handlePassengerDetails(label, "-")}
      >
        -
      </TButton>
      <span style={{ margin: "0 10px", flex: "2" }}>{count}</span>
      <TButton
        style={{ flex: "1" }}
        onClick={() => handlePassengerDetails(label, "+")}
      >
        +
      </TButton>
    </div>
  </div>
);

const FlightDropdown: React.FC<FlightDropdownProps> = ({
  formValues,
  handlePassengerDetails,
}) => {
  
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <Stack direction="column" alignItems="flex-start">
      <Text style={{ marginBottom: "8px", color: "grey" }}>Passengers</Text>
      <Dropdown
        title={
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: "14px",
              color: "black",
            }}
          >
            <img
              src={User}
              alt="User"
              width={22}
              height={22}
              style={{ marginRight: 8 }}
            />
            <span>Adults {formValues.passengerDetails?.adults ?? 0},</span>
            <span> Children {formValues.passengerDetails?.children ?? 0},</span>
            <span> Infants {formValues.passengerDetails?.infants ?? 0},</span>
            <span> {formValues.cabinClass}</span>
          </div>
        }
        open={isOpen}
        onSelect={() => setIsOpen(true)}
        onClick={toggleDropdown}
        style={{
          border: "1px solid lightgrey",
          width: "100%",
          backgroundColor: "white",
          borderRadius: "5px",
          display: "grid",
        }}
      >
        <Dropdown.Item style={{ backgroundColor: "white", width: "100%" }}>
          <>
            <PassengerCounter
              label="adults"
              ageRange="Aged 12+ yrs"
              count={formValues.passengerDetails?.adults ?? 0}
              handlePassengerDetails={handlePassengerDetails}
            />
            <PassengerCounter
              label="children"
              ageRange="Aged 2-12 yrs"
              count={formValues.passengerDetails?.children ?? 0}
              handlePassengerDetails={handlePassengerDetails}
            />
            <PassengerCounter
              label="infants"
              ageRange="Below 2 yrs"
              count={formValues.passengerDetails?.infants ?? 0}
              handlePassengerDetails={handlePassengerDetails}
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px 0 5px",
                flexWrap: "wrap",
              }}
            >
              {buttonList.map((item, i) => (
                <Button
                  key={i}
                  onClick={() => handlePassengerDetails("type", item)}
                  appearance="ghost"
                  style={{
                    background:
                      formValues.cabinClass === item
                        ? "#0770E31A"
                        : "transparent",
                  }}
                >
                  {item}
                </Button>
              ))}
            </div>
          </>
        </Dropdown.Item>
      </Dropdown>
    </Stack>
  );
};

export default FlightDropdown;
