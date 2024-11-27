import React from "react";
import {
  Heading,
  Row,
  Col,
  Grid,
  Text,
  Stack,
  VStack,
  Container,
} from "rsuite";
import "../../assets/styles/landingmodule.css";

import TravelAgent from "../../assets/icons/TravelAgentCountIcon.svg";
import Booking from "../../assets/icons/BookingCountIcon.svg";
import Customer from "../../assets/icons/CustomerCountIcon.svg";
import CupIcon from "../../assets/icons/CupIcon.svg";
import TimerIcon from "../../assets/icons/TimerIcon.svg";
import Income from "../../assets/icons/IncomeIcon.svg";
import Commission from "../../assets/icons/CommissionsIcon.svg";
import AgentsIcon from "../../assets/icons/AgentsIcon.svg";
import latestDeals from "../../assets/icons/LatestDeals.svg";
import AdvantagesBanner from "../../assets/images/AdvantagesBanner.svg";
import ConsolidatorBanner from "../../assets/images/ConsolidatorBanner.png";
import ArrowIcon from "../../assets/icons/ArrowIcon.svg";
import {
  AdvantagesList,
  REGISTER,
  TravelAgentList,
} from "../../Utils/Constant/constant";
import TButton from "../../Component/Common/TButton";
import { IconBoxProps } from "../../Interfaces/models/landing.model";

const statsData = [
  {
    src: Customer,
    alt: "Customers Icon",
    count: "1 Million+",
    label: "Customers",
  },
  {
    src: Booking,
    alt: "Booking Count Icon",
    count: "2 Million+",
    label: "Bookings",
  },
  {
    src: TravelAgent,
    alt: "Travel Agents Icon",
    count: "1000+",
    label: "Travel Agents",
  },
];

const temp = [
  {
    icon: CupIcon,
    color: "#FF5A5F",
    background: "#ffdedf",
    text: "Years of business experience",
    title: "30+",
  },
  {
    color: "#3A6AAB",
    title: "24/7",
    icon: TimerIcon,
    background: "#d8e1ee",
    text: "Agent support helpline",
  },
  {
    icon: Income,
    title: "Multiple Income",
    color: "#58BBFF",
    background: "#def1ff",
    text: "Get Awesome opportunities",
  },
  {
    icon: Commission,
    title: "Good Commissions",
    background: "#f0e8f7",
    color: "#B58ED6",
    text: "Earn good deals and commissions",
  },
  {
    icon: AgentsIcon,
    color: "#F88D02",
    background: "#fee8cc",
    title: "Multiple Agents",
    text: "Interactive exclusive portal",
  },
  {
    icon: latestDeals,
    background: "#dcf4e4",
    color: "#50C878",
    title: "Latest Deals",
    text: "Access to great deals",
  },
];

const LandingBase: React.FC = () => {
  return (
    <>
      <Container className="outerContainer">
        <div>
          {/* <img src={HomePageBackgroundImage} alt="HomePageBackgroundImage" /> */}
          <header
            className="header"
            style={{
              // backgroundImage: `url(${HomePageBackgroundImage})`,
              background:
                "radial-gradient(circle at left center, #922568, #ce3f56)",
              backgroundSize: "cover",
              backgroundPosition: "center",

              display: "flex",
              justifyContent: "space-around", // Space out content and image
              alignItems: "center", // Vertically center content
              padding: "20px", // Add padding as needed
            }}
          >
            <div
              className="headerContent"
              style={{ maxWidth: "100%", marginLeft: "0px" }}
            >
              {/* <Heading> */}

              <Text
                style={{
                  fontSize: "50px",
                  fontWeight: 500,
                  fontFamily: "Plus Jakarta Sans!important",
                  color: "#FFF",
                  lineHeight: "76.8px",
                  marginBottom: "0px",
                }}
              >
                Engaging Agents to Exceptional <br />
                Flight Solutions
              </Text>
              {/* </Heading> */}

              <Text
                // size="md"
                style={{
                  fontFamily: "Plus Jakarta Sans!important",
                  fontSize: "20px",
                  fontWeight: 500,
                  lineHeight: "0px",
                  padding: "10px 0px",
                  color: "#fff",
                  marginBottom: "20px",
                  marginTop: "0px",
                }}
              >
                Welcome to our trusted B2B travel portal, where reliability
                meets innovation!
              </Text>
              <TButton
                label="Register"
                background="white"
                link={REGISTER}
                style={{
                  color: "#FA503F",
                  fontWeight: "600",
                  fontSize: "16px",
                }}
              />
            </div>
            <div style={{ marginRight: "0px" }}>
              <img
                src={ConsolidatorBanner}
                alt="ConsolidatorBanner"
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  marginRight: "100px",
                }}
              />
            </div>
          </header>
        </div>

        <section className="statsSection">
          {statsData.map((stat, index) => (
            <div key={index} className="statItem">
              <img src={stat.src} alt={stat.alt} width={60} height={60} />
              <Heading
                level={2}
                style={{ fontFamily: "Plus Jakarta Sans", fontWeight: 600 }}
              >
                {stat.count}
              </Heading>
              {/* <Text style={{fontFamily:"Plus Jakarta Sans"}}>{stat.count}</Text> */}
              <Text size="md" muted style={{ fontFamily: "Plus Jakarta Sans" }}>
                {stat.label}
              </Text>
            </div>
          ))}
        </section>

        <Container
          style={{
            background: "#fff",
            padding: "30px 0px",
          }}
        >
          <Stack
            alignItems="center"
            justifyContent="space-around"
            spacing={20}
            style={{
              width: "83%",
              margin: "0 auto",
              textAlign: "left",
            }}
          >
            <Stack.Item flex={1}>
              {/* <Heading level={2}> */}
              <Text
                style={{
                  fontFamily: "Amaranth!important",
                  fontSize: "40px",
                  fontWeight: "400!important",
                  lineHeight: "60px",
                  color: "#222!important",
                }}
              >
                Start your profitable business today with the Best{" "}
                <span style={{ color: "#FA503F" }}>B2B Travel </span>
                Portal in India
              </Text>
              {/* </Heading> */}
              <Text
                size="md"
                muted
                style={{
                  fontFamily: "Plus Jakarta Sans",
                  fontSize: "16px",
                  lineHeight: "30px",
                }}
              >
                Travel website is one of India&apos;s foremost B2B travel
                portals, constantly evolving and adding value by providing
                distributors and agents with the best technology, deals, and a
                user-friendly platform to achieve financial freedom.
              </Text>
            </Stack.Item>

            <Stack.Item flex={2}>
              <Grid>
                <Row className="show-grid">
                  {temp.map((item, index) => (
                    <Col
                      key={index}
                      style={{ padding: "20px", borderRadius: "100px" }}
                      xs={12}
                    >
                      <IconBox
                        keyIndex={index}
                        icon={item.icon}
                        title={item.title}
                        color={item.color}
                        background={item.background}
                        text={item.text}
                      />
                    </Col>
                  ))}
                </Row>
              </Grid>
            </Stack.Item>
          </Stack>
        </Container>

        <section className="processSection">
          <Stack
            alignItems="center"
            direction="column"
            justifyContent="center"
            style={{ height: "100%", width: "100%" }}
          >
            {/* font-family: Plus Jakarta Sans;
font-size: 20px;
font-weight: 300;
line-height: 30px;
text-align: center; */}

            {/* <Heading level={3}> */}
            <Text
              style={{
                fontFamily: "Plus Jakarta Sans",
                fontSize: "40px",
                fontWeight: 500,
                lineHeight: "60px",
                textAlign: "center",
                color: "#000",
                marginTop: "50px",
              }}
            >
              How to become a{" "}
              <span style={{ color: "#FA503F" }}>Travel Agent?</span>
            </Text>
            {/* </Heading> */}
            <Text
              size="md"
              style={{
                fontFamily: "Plus Jakarta Sans",
                fontSize: "20px",
                fontWeight: 300,
                lineHeight: "30px",
                textAlign: "center",
                color: "#000",
              }}
            >
              Follow these three simple steps and you are good to go!
            </Text>
          </Stack>
          <Stack
            alignItems="center"
            direction="row"
            justifyContent="center"
            style={{ height: "100%", padding: "20px" }}
          >
            {TravelAgentList.map((step, index) => (
              <div
                key={index}
                style={{
                  padding: "10px",
                  borderBottom: `6px solid ${step.color}`,
                  minHeight: "110px", // Set a minimum height to keep all steps aligned
                }}
              >
                <Stack
                  alignItems="center"
                  direction="row"
                  justifyContent="space-around"
                  spacing={15}
                  style={{ height: "100%", padding: "15px" }}
                >
                  <div
                    style={{
                      padding: "10px",
                      background: "#fff",
                      borderRadius: "50%",
                      width: "45px",
                      height: "45px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      as="b"
                      size="xl"
                      style={{
                        color: step.fontColor,
                      }}
                    >
                      {step.number}
                    </Text>
                  </div>
                  <Text
                    style={{
                      width: "250px",
                      whiteSpace: "normal", // Allow wrapping if the text exceeds one line
                      textAlign: "center", // Optional: Center-align text for a cleaner look
                    }}
                    size="lg"
                  >
                    {step.text}
                  </Text>
                  {TravelAgentList.length - 1 > index && (
                    <img src={ArrowIcon} alt="arrowIcon" />
                  )}
                </Stack>
              </div>
            ))}
          </Stack>
        </section>

        <section
          className="advantagesSection"
          style={{
            background: "#fff",
            width: "100%",
            padding: "0px",
            marginTop: "50px",
          }}
        >
          <Stack
            alignItems="center"
            justifyContent="space-between"
            style={{ height: "100%", width: "100%" }}
          >
            <div>
              <img
                src={AdvantagesBanner}
                alt="Advantages Banner"
                // width={600}
                // height={500}
              />
            </div>
            <div style={{ marginRight: "225px" }}>
              {" "}
              <Heading level={2}>Merits of Travel Website</Heading>
              <div
                style={{ padding: "10px 0px", marginBottom: "50px" }}
                className="t-steps t-steps-vertical"
              >
                {AdvantagesList.map((advantage, index) => (
                  <div key={index} className="t-steps-item-active t-steps-item">
                    <div className="t-steps-item-tail"></div>
                    <div
                      className="t-steps-item-icon-wrapper"
                      style={{
                        backgroundColor: advantage.color,
                        borderColor: advantage.color,
                      }}
                    >
                      <span className="t-steps-item-icon t-steps-item-icon-process"></span>
                    </div>
                    <div className="t-steps-item-content">
                      <div
                        className="t-steps-item-title"
                        style={{ backgroundColor: advantage.color }}
                      >
                        {advantage.title}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Stack>
        </section>
      </Container>
    </>
  );
};

export default LandingBase;

// Reusable IconBox component
const IconBox: React.FC<IconBoxProps> = ({
  icon,
  background,
  text,
  keyIndex,
  color,
  title,
}) => (
  <div
    key={keyIndex}
    className="iconBox"
    style={{ backgroundColor: background }}
  >
    <div className="iconWrapper">
      <img src={icon} alt={text} width={60} height={60} />
    </div>
    <VStack spacing={0}>
      <Heading style={{ color: color }} level={3}>
        {title}
      </Heading>
      <Text size="md">{text}</Text>
    </VStack>
  </div>
);
