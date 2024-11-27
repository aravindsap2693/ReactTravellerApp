/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef } from "react";
import { Navbar, Nav, Dropdown, Avatar, Tag, IconButton } from "rsuite";
import MoreIcon from "../../assets/images/Trippledot.svg";
import Logo from "../../assets/images/Tripvista_Logos.svg";
import "../../assets/styles/home.module.css";
import "../../App.css";
import DetailIcon from "@rsuite/icons/Detail";
import TButton from "../../Component/Common/TButton";
import { HOME } from "../../Utils/Constant/constant";
import Login from "./Login";
import { useDispatch, useSelector } from "react-redux";
// import { handleLogout } from "../../Api/login.api";
import { useLocation, useNavigate } from "react-router-dom";
import { logout } from "../../Api/login.api";
import { AppDispatch } from "../../Store/store";

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
// const loginMenu = [
//   { label: "Get Started", eventKey: "getstarted" },
//   { eventKey: "subusers", label: "Sub users" },
//   { label: "Careers", eventKey: "careers" },
//   { label: "Contact us", eventKey: "contactus" },
// ];
const AppHeader: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();
  const showLogin = !location.pathname.includes("/register"); // Hide footer if URL contains "/register"

  // const router = useRouter();
  const loginRef = useRef<any>(null); // Create a ref for Login component
  const user = useSelector((state: any) => state.auth.data);
  const isLogedin = useSelector((state: any) => state.auth.isAuthenticated);

  const authToken: string | null = useSelector(
    (state: any) => state.auth.token
  );
  console.log("user", user);
  console.log("isLogedin", isLogedin);
  console.log("authToken", authToken);
  
  const handleLogOut = () => {
    dispatch(logout(navigate)); // Pass navigate to the thunk
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
            // display: "flex",
            // justifyContent: "space-between",
            // alignItems: "center",
            width: "100%",
            padding: "0px 50px",
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
            {!isLogedin && (
              <Nav style={{ cursor: "pointer" }}>
                {/* {loginMenu.map((item) => (
                <Nav.Item key={item.eventKey} eventKey={item.eventKey}>
                  {item.label}
                </Nav.Item>
              ))} */}
              </Nav>
            )}
            {!isLogedin ? (
              <Nav
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  marginRight: "0px",
                }}
              >
                {showLogin && (
                  <TButton
                    label="Agent Login"
                    type="primary"
                    onClick={() => {
                      loginRef.current.openModal();
                    }}
                    style={{ fontWeight: 600 }}
                  />
                )}
              </Nav>
            ) : (
              <>
                <Nav>
                  <div
                    className="user_section"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginLeft: "10px",
                    }}
                  >
                    <Nav style={{ cursor: "pointer", marginRight: "10px" }}>
                      <Tag size="lg" color="blue">
                        MyBalance :{" "}
                        {user.response.currentWalletBalance
                          ? user.response.currentWalletBalance
                          : "$45000"}
                      </Tag>
                    </Nav>
                    <Avatar src={user.Profile ? user.Profile : null} circle />
                    <span style={{ marginLeft: "10px", fontWeight: "bold" }}>
                      {user
                        ? user.response.userModel.firstName +
                          " " +
                          user.response.userModel.lastName
                        : "Guest"}
                    </span>
                    <div id="icon-dropdown">
                      <Dropdown
                        renderToggle={renderIconButton}
                        placement="bottomEnd"
                      >
                        <Dropdown.Item icon={<DetailIcon />}>
                          My profile
                        </Dropdown.Item>
                        <Dropdown.Item
                          icon={<DetailIcon />}
                          onClick={handleLogOut}
                        >
                          Log out
                        </Dropdown.Item>
                      </Dropdown>
                    </div>
                  </div>
                </Nav>
              </>
            )}
          </div>
        </div>
      </Navbar>
      <Login ref={loginRef} />
    </>
  );
};
export default AppHeader;
