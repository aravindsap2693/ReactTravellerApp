
import React from "react";
import {
  Row,
  Col,
  Stack,
  Panel,
  Text,
  TagGroup,
  Tag,
  Button,
  ButtonToolbar,
} from "rsuite";

import ResortImage from "../../assets/images/PrimilageImg.svg";
import HotelImage from "../../assets/images/HotelImage.svg";
import FlightImageone from "../../assets/images/FlightImage-one.svg";
import FlightImagetwo from "../../assets/images/FlightImage-Two.svg";
import styles from "../../assets/styles/offerforyou.module.css";
import Calendar from "../../assets/images/Calendar.svg";
import TimerAlert from "../../assets/images/TimeRedIcon.svg";



const optionFilter = [
  { value: "all", key: "1", name: "All" },
  { value: "flights", key: "2", name: "Flights" },
  { value: "hotels", key: "3", name: "Hotels" },
  { value: "cabs", key: "4", name: "Cabs" },
  { value: "bus", key: "5", name: "Bus" },
  { value: "train", key: "6", name: "Train" },
];

const cardData = [
  {
    image: ResortImage,
    text: "Pilgrimage Special: Upto 50% off on stays",
    subtext: "Valid till 30 Sep 24",
    tags: ["Flight", "Hotels", "Train", "Cabs"],
    icon: Calendar,
  },
  {
    image: HotelImage,
    text: "Book Hotel Royal Park  Starting @upto 20%",
    subtext: "Limited Period Offer",
    tags: ["Hotels"],
    icon: TimerAlert,
  },
  {
    image: FlightImageone,
    text: "Get 24x7 Live Assistance for int’t Flight Bookings!",
    subtext: "Valid till 30 Sep 24",
    tags: ["Flight"],
    icon: Calendar,
  },
  {
    image: FlightImagetwo,
    text: "Book Akasa Air Flights Starting @upto 20%",
    subtext: "Limited Period Offer",
    tags: ["Flights"],
    icon: TimerAlert,
  },
];

interface CardProps {
  image: string;
  text: string;
  subtext: string;
  tags: string[];
  icon: string;
}

const Card: React.FC<CardProps> = ({ image, text, subtext, tags, icon }) => (
  <div>
  <Panel bodyFill className={styles.card}
  style={{
    background:"#fff",
  }}
  >
    {/* <div className="card"> */}
    <div className="card-image">
      <img src={image} alt="Card Icon"  />
    </div>
    <div className="card-content" style={{height:"100px", marginTop:"15px", textAlign:"start", marginLeft:"20px"}}>
      <TagGroup className="card-tag-group">
        <div className="noscrollbar">
          {tags.map((tag) => (
            <Tag
              key={tag}
              size="sm"
              style={{ margin: "5px", border: "1px solid lightgrey" }}
            >
              {tag}
            </Tag>
          ))}
        </div>
      </TagGroup>
      <Stack
        style={{
          display: "block",
          marginTop: "10px",
        }}
      >
        <Text
          className="card-text"
          style={{
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textWrap: "nowrap",
            fontWeight:"bold",
            color:"#000"
          }}
        >
          {text}
        </Text>
      </Stack>
      <Stack
        style={{
          display: "flex",
          marginLeft: "0px",
          marginTop: "5px",
          justifyContent: "flex-start",
        }}
      >
        <Text className="card-subtext">
          <img src={icon} alt="Calendar Icon" width={20} height={20} />
          <small
            style={{
              marginLeft: "5px",
              color: subtext === "Limited Period Offer" ? "red" : "#0770E3",
              fontWeight: "400px",
            }}
          >
            {subtext}
          </small>
        </Text>
      </Stack>
    </div>
    {/* </div> */}
  </Panel>
  </div>
);

const OffersforYou: React.FC = () => {
  const [activeFilter, setActiveFilter] = React.useState("all");

  return (
    <div style={{ width: "100%", padding: "20px", boxSizing: "border-box" }}>
      <div style={{ textAlign: "center" }}>
        <Stack className="heading">
          <h3>
            <span style={{ color: "#FA503F" }}>Offers</span> for you
          </h3>
        </Stack>
        <Stack style={{ margin: "20px 0px" }}>
          <ButtonToolbar>
            {optionFilter.map((item) => (
              <Button
                key={item.key}
                active={activeFilter === item.value}
                onClick={() => setActiveFilter(item.value)}
                appearance={activeFilter === item.value ? "primary" : "default"}
                size="md"
                style={activeFilter === item.value ? { backgroundColor: '#FA503F', borderColor: '#FA503F', color: '#fff' } : {}}

              >
                {item.name}
              </Button>
            ))}
          </ButtonToolbar>
        </Stack>
        <Row gutter={16}>
          {cardData
            .filter((card) =>
              activeFilter === "all"
                ? true
                : card.tags.some((tag) => tag.toLowerCase() === activeFilter)
            )
            .map((card, index) => (
              <Col
                key={index}
                xs={24}
                sm={12}
                md={12}
                lg={8}
                xl={6}
                style={{ marginBottom: "20px" }}
              >
                <Card
                  image={card.image}
                  text={card.text}
                  subtext={card.subtext}
                  tags={card.tags}
                  icon={card.icon}
                />
              </Col>
            ))}
        </Row>
      </div>
    </div>
  );
};

export default OffersforYou;
