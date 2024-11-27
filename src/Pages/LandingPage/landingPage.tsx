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
// import "../LandingPage/landingPageModule.css";
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
import AppHeader from "../Login/AppHeader";


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
     <AppHeader />
   
    <Container className="outerContainer">
      <header className="header">
        <div className="headerContent">
          <Heading level={2}>
            Engaging Agents to Exceptional <br />
            Flight Solutions
          </Heading>
          <Text
            size="md"
            style={{
              padding: "10px 0px",
              color: "#fff",
            }}
          >
            Welcome to our trusted B2B travel portal, where reliability meets
            innovation!
          </Text>
          <TButton
            label="Register"
            background="white"
            link={REGISTER}
            style={{ color: "#FB7B6F", fontWeight: "bold" }}
          />
        </div>
        <div>
          <img src={ConsolidatorBanner} alt="ConsolidatorBanner" />
        </div>
      </header>

      <section className="statsSection">
        {statsData.map((stat, index) => (
          <div key={index} className="statItem">
            <img src={stat.src} alt={stat.alt} width={60} height={60} />
            <Heading level={3}>{stat.count}</Heading>
            <Text size="md" muted>
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
          justifyContent="center"
          spacing={20}
          style={{
            width: "80%",
            margin: "0 auto",
          }}
        >
          <Stack.Item flex={1}>
            <Heading level={2}>
              Start your profitable business today with the Best{" "}
              <span style={{ color: "#FA503F" }}>B2B Travel </span>
              Portal in India
            </Heading>
            <Text size="md" muted>
              Travel website is one of India&apos;s foremost B2B travel portals,
              constantly evolving and adding value by providing distributors and
              agents with the best technology, deals, and a user-friendly
              platform to achieve financial freedom.
            </Text>
          </Stack.Item>

          <Stack.Item flex={2}>
            <Grid>
              <Row className="show-grid">
                {temp.map((item, index) => (
                  <Col key={index} style={{ padding: "20px" }} xs={12}>
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
          style={{ height: "100%" }}
        >
          <Heading level={3}>
            How to become a{" "}
            <span style={{ color: "#FA503F" }}>Travel Agent?</span>
          </Heading>
          <Text size="md">
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
          padding: "30px",
        }}
      >
        <Stack
          alignItems="center"
          justifyContent="space-around"
          style={{ height: "100%" }}
        >
          <div>
            <img
              src={AdvantagesBanner}
              alt="Advantages Banner"
              width={600}
              height={500}
            />
          </div>
          <div>
            {" "}
            <Heading level={2}>Advantages of Travel Website</Heading>
            <div
              style={{ padding: "10px 0px" }}
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
