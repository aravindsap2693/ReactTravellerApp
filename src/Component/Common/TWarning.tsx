import Image from "next/image";
import React from "react";
import InfoIcon from "../../assets/icons/InfoIcon.svg";

const TWarning: React.FC<{ content: string }> = ({ content }) => {
  return (
    <div style={infoBoxStyle}>
      <Image src={InfoIcon} alt="Info Icon" width={26} height={26} />
      <span>{content}</span>
    </div>
  );
};

const infoBoxStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  marginTop: "15px",
  padding: "10px",
  borderRadius: "52px",
  backgroundColor: "#f7f7f7",
  border: "1px solid lightgrey",
  gap: "10px",
  width: "fit-content",
};

export default TWarning;
