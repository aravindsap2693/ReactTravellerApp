import React from "react";
import {
  Container,
  Row,
  Col,
  Panel,
 
} from "rsuite";
import styles from "../../assets/styles/app-footer.module.css"; // Update the path as needed
import Facebook from "../../assets/images/Facebook.svg";
import Instagram from "../../assets/images/Instagram.svg";
import Twitter from "../../assets/images/Twitter.svg";
import Linkedin from "../../assets/images/LinkedIn.svg";

import Background from "../../assets/images/FooterRightImg.svg";
import TButton from "../../Component/Common/TButton";


const Footer: React.FC = () => {
  return (
    <div style={{background: "#F5F6FB"}}>
    <footer className={styles.footer}>
      <div>
      <Container>
      <div 
        style={{
                backgroundImage: `url(${Background})`,
                backgroundSize: "auto",
                backgroundPosition: "right bottom",
                backgroundRepeat: "no-repeat",
            }}
      >
        <Row
          style={{
            boxSizing: "border-box",
          }}
        >
          {/* Newsletter Column */}
          <Col xs={24} sm={12} md={12} lg={8} xl={7}>
            <Panel
              className={styles.panel}
              style={{ textWrap: "wrap", lineHeight: "2", marginLeft: "-20px", textAlign:"left" }}
            >
              {/* <h5>Newsletter</h5>
              <p style={{ padding: "18px 0px" }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt.
              </p> */}
              <div style={{ display: "flex", width: "100%", marginTop:"75px"}}>
                <input
                  type="text"
                  placeholder="Type something"
                  style={{
                    flex: 1,
                    borderRadius: "0",
                    borderTopRightRadius: "0",
                    borderBottomRightRadius: "0",
                    border: "none",
                    paddingLeft: "10px",
                  }}
                />

                <TButton label={"Subscribe"} />
              </div>
            </Panel>
          </Col>

          {/* Our Product Column */}
          <Col xs={24} sm={12} md={12} lg={8} xl={5}>
            <Panel className={styles.panel} style={{textAlign:"left"}}>
              <h5>Our Products</h5>
              <ul
                style={{
                  listStyleType: "none",
                  lineHeight: "2",
                  padding: "5px",
                }}
              >
                <li>
                  <a
                    href="#"
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      cursor: "pointer",
                    }}
                  >
                    <span>Domestic Hotel</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      cursor: "pointer",
                    }}
                  >
                    <span>International Hotel</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      cursor: "pointer",
                    }}
                  >
                    <span>Domestic Flights</span>
                  </a>
                </li>
              </ul>
              <h5>Travel Essentials</h5>
              <ul
                style={{
                  listStyleType: "none",
                  lineHeight: "2",
                  padding: "5px",
                }}
              >
                <li>
                  <a
                    href="#"
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      cursor: "pointer",
                    }}
                  >
                    <span>PNR Status</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      cursor: "pointer",
                    }}
                  >
                    <span>Offers</span>
                  </a>
                </li>
              </ul>
            </Panel>
          </Col>

          {/* More Links Column */}
          <Col xs={24} sm={12} md={12} lg={8} xl={5}>
            <Panel className={styles.panel} style={{textAlign:"left"}}>
              <h5>More Links</h5>
              <ul style={{ listStyleType: "none", lineHeight: "2" }}>
                <li>
                  <a
                    href="#"
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      cursor: "pointer",
                    }}
                  >
                    <span>Cheap Flight</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      cursor: "pointer",
                    }}
                  >
                    <span>Hotels Near Me</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      cursor: "pointer",
                    }}
                  >
                    <span>My Booking</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      cursor: "pointer",
                    }}
                  >
                    <span>Cancellation</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      cursor: "pointer",
                    }}
                  >
                    <span>My Account</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      cursor: "pointer",
                    }}
                  >
                    <span>Wallet</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      cursor: "pointer",
                    }}
                  >
                    <span>Advertise with Us</span>
                  </a>
                </li>
              </ul>
            </Panel>
          </Col>

          {/* Contact Us Column */}

          <Col xs={24} sm={12} md={12} lg={8} xl={7}>
            <Panel className={styles.panel} style={{textAlign:"left"}}>
              <h5>Contact Us</h5>
              <div className={styles.socialMedia}>
                <a
                  href="#"
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    cursor: "pointer",
                  }}
                >
                  <img src={Facebook} alt="Facebook" />
                </a>
                <a
                  href="#"
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    cursor: "pointer",
                  }}
                >
                  <img src={Instagram} alt="Instagram" />
                </a>
                <a
                  href="#"
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    cursor: "pointer",
                  }}
                >
                  <img src={Twitter} alt="Twitter" />
                </a>
                <a
                  href="#"
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    cursor: "pointer",
                  }}
                >
                  <img src={Linkedin} alt="Linkedin" />
                </a>
              </div>
            </Panel>
          </Col>
        </Row>
        </div>
      </Container>
      </div>
    </footer>
    </div>
  );
};

export default Footer;
