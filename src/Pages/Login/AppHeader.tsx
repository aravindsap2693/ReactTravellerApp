/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef } from "react";
import { Navbar, Nav, Dropdown, Avatar, Tag, IconButton } from "rsuite";
import MoreIcon from "../../assets/Images/Trippledot.svg"
import Logo from "../../assets/Images/Tripvista_Logos.svg";
import "../../assets/styles/home.module.css";
import "../../App.css";
import DetailIcon from "@rsuite/icons/Detail";
import TButton from "../../Component/Common/TButton";
import { HOME } from "../../Utils/Constant/constant";
import Login from "./Login";


interface User {
  balance?: number;
  Profile?: string; // Change this to string | null if the profile can be null
  first_name?: string;
  last_name?: string;
}

const renderIconButton = (props: any, ref: React.Ref<HTMLButtonElement>) => {
  return (
    <IconButton
      {...props}
      ref={ref}
      icon={<img src={MoreIcon} alt="More" />}
      circle
      style={{ marginLeft: "15px", width: "100%" }}
    />
  );
};
const loginMenu = [
  { label: "Get Started", eventKey: "getstarted" },
  { eventKey: "subusers", label: "Sub users" },
  { label: "Careers", eventKey: "careers" },
  { label: "Contact us", eventKey: "contactus" },
];

const AppHeader: React.FC = () => {
  const [isLoggedin, setIsLoggedin] = useState<boolean>(false);

  const user: User = {
    balance: 45000,
    first_name: "John",
    last_name: "Doe",
    Profile: Logo, // or path to the user's profile image
  };

  // Create a ref to control the Login component
  const loginRef = useRef<{ openModal: () => void }>(null);

  const handleLogOut = () => {
    setIsLoggedin(false);
  };

  const handleLoginClick = () => {
    if (loginRef.current) {
      loginRef.current.openModal(); 
    }
  };

  return (
    <>
      <Navbar
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem",
          minHeight: "10vh",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            padding: "0px 20px",
          }}
        >
          {/* Logo section aligned to the left */}
          <Nav style={{ cursor: "pointer", justifyContent: "flex-start" }}>
            <a href={HOME}>
              <img src={Logo} alt="Logo" style={{ maxHeight: "50px" }} />
            </a>
          </Nav>

          {/* Navigation and user section aligned to the right */}
          <Nav
            style={{
              display: "flex",
              justifyContent: "flex-end",
              cursor: "pointer",
              gap: "15px",
            }}
          >
            {!isLoggedin ? (
              <>
                {loginMenu.map((item) => (
                  <Nav.Item key={item.eventKey} eventKey={item.eventKey}>
                    {item.label}
                  </Nav.Item>
                ))}
                {/* Login Button opens the Login modal */}
                <TButton label="Login" type="primary" onClick={handleLoginClick} />
              </>
            ) : (
              <>
                <Tag size="lg" color="blue">
                  My Balance: {user.balance ? `$${user.balance}` : "$0"}
                </Tag>
                <div
                  className="user_section"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginLeft: "10px",
                  }}
                >
                  <Avatar src={user.Profile || undefined} circle />
                  <span style={{ marginLeft: "10px" }}>
                    {user.first_name && user.last_name
                      ? `${user.first_name} ${user.last_name}`
                      : "Guest"}
                  </span>
                  <div id="icon-dropdown">
                    <Dropdown
                      renderToggle={renderIconButton}
                      placement="bottomEnd"
                    >
                      <Dropdown.Item icon={<DetailIcon />}>
                        My Profile
                      </Dropdown.Item>
                      <Dropdown.Item icon={<DetailIcon />} onClick={handleLogOut}>
                        Log Out
                      </Dropdown.Item>
                    </Dropdown>
                  </div>
                </div>
              </>
            )}
          </Nav>
        </div>
      </Navbar>

      {/* Render Login component and pass ref */}
      <Login ref={loginRef} />
    </>
  );
};
export default AppHeader;








