// import { TButtonProps } from "@/src/models/common.model";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "rsuite";
import { TButtonProps } from "../../Interfaces/models/common.model";

const TButton: React.FC<TButtonProps> = ({
  children,
  label,
  link,
  onClick,
  disabled,
  icon,
  type = "primary",
  padding = "10px 20px",
  block = false, // Default is not full-width
  background = "#FA503F",
  style,
  submit = false,
}) => {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (link) {
        navigate(link); 
    }
  };

  const buttonStyle = {
    borderRadius: "4px",
    padding: type === "link" ? "0px" : padding,
    cursor: "pointer",
    textDecoration: "none",
    width: block ? "100%" : "auto", // Full-width if block is true
    ...(type === "primary" && {
      background: background,
      border: "none",
      color: background === "white" ? "#0770E3" : "white",
    }),
  };

  return (
    <Button
      appearance={type}
      style={{ ...buttonStyle, ...style }}
      disabled={disabled}
      onClick={link ? handleClick : onClick}
      type={submit ? "submit" : "button"}
    >
      {children || label || icon}
    </Button>
  );
};

export default TButton;
