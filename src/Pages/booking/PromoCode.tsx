import React from "react";
import { Panel } from "rsuite";
import TForm from "../../Component/Common/TForm";


const PromoCode: React.FC = () => {
  const promoFeild = [
    {
      title: "Promo Code",
      placeholder: "Promo Code",
      name: "promo_code",
      type: "input_btn",
    },
  ];
  return (
    <Panel
      bordered
      style={{
        borderRadius: "14px",
        border: "1px solid lightgrey",
        background: "#fff",
      }}
    >
      <div style={headerStyle}>Promo Code</div>
      {promoFeild.length > 0 && (
        <div style={rowStyle}>
          {promoFeild.map((field, idx) => (
            <TForm
              key={idx}
              title={field.title}
              placeholder={field.placeholder}
              name={field.name}
              type={field.type as "input" | "select" | "checkbox"}
            />
          ))}
        </div>
      )}
    </Panel>
  );
};

const headerStyle: React.CSSProperties = {
  fontWeight: "bold",
  borderBottom: "1px solid lightgrey",
  backgroundColor: "#f2f4f5",
  borderTopLeftRadius: "14px",
  borderTopRightRadius: "14px",
  fontSize: "16px",
  padding: "10px 15px",
  margin: "-20px -20px 0 -20px", // Removes any extra margin
};
const rowStyle: React.CSSProperties = {
  display: "flex",
  gap: "16px",
  paddingTop: "20px",
};

export default PromoCode;
