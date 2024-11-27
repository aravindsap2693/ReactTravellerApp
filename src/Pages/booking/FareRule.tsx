import  { useState } from "react";
import { Panel } from "rsuite"; // Ensure you have rsuite installed for UI components

const FareRule = () => {
  const [activeFee, setActiveFee] = useState<string | null>(null); // Track the active fee

  const toggleFeeDetails = (fee: string) => {
    // Toggle the fee details based on the clicked fee
    setActiveFee((prev) => (prev === fee ? null : fee));
  };

  return (
    <Panel
      shaded
      bordered
      style={{
        margin: "20px 0",
        padding: "15px",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
      }}
    >
      <h2 style={{ margin: "0 0 10px", fontSize: "1.5rem" }}>MAA-DEL</h2>
      <h4 style={{ margin: "0 0 10px", fontSize: "1.25rem" }}>Detailed Rules</h4>
      <p style={{ margin: "0 0 10px", fontStyle: "italic" }}>
        * To view charges, click on the below fee sections.
      </p>

      <table style={{ width: "100%", marginTop: "10px" }}>
        <tbody>
          <tr onClick={() => toggleFeeDetails("cancellation")}>
            <td style={{ cursor: "pointer", padding: "10px" }}>
              Cancellation Fee
            </td>
          </tr>
          {activeFee === "cancellation" && (
            <tr>
              <td style={{ padding: "10px" }}>
                <strong>Cancellation Fee:</strong> ₹5,000.00 Refund available with Penalty
              </td>
            </tr>
          )}
          <tr onClick={() => toggleFeeDetails("dateChange")}>
            <td style={{ cursor: "pointer", padding: "10px" }}>
              Date Change Fee
            </td>
          </tr>
          {activeFee === "dateChange" && (
            <tr>
              <td style={{ padding: "10px" }}>
                <strong>Date Change Fee:</strong> (Check the airline policy for specific charges)
              </td>
            </tr>
          )}
          <tr onClick={() => toggleFeeDetails("noShow")}>
            <td style={{ cursor: "pointer", padding: "10px" }}>
              No Show Fee
            </td>
          </tr>
          {activeFee === "noShow" && (
            <tr>
              <td style={{ padding: "10px" }}>
                <strong>No Show Fee:</strong> (Post Departure)
              </td>
            </tr>
          )}
          <tr onClick={() => toggleFeeDetails("seatCharge")}>
            <td style={{ cursor: "pointer", padding: "10px" }}>
              Seat Chargeable Fee
            </td>
          </tr>
          {activeFee === "seatCharge" && (
            <tr>
              <td style={{ padding: "10px" }}>
                <strong>Seat Chargeable Fee:</strong> (Check the airline policy for specific charges)
              </td>
            </tr>
          )}
          <tr>
            <td style={{ padding: "10px" }}>
              <strong>Before Departure:</strong> Mentioned fees are Per Pax Per Sector
            </td>
          </tr>
        </tbody>
      </table>
      <p style={{ margin: "10px 0 0" }}>
        Apart from airline charges, GST + RAF + applicable charges if any, will be charged.
      </p>
    </Panel>
  );
};

export default FareRule;
