import Slider from "react-slick";
import { Button, Panel } from "rsuite";
import styles from "../../../assets/styles/flight-listing.module.css";
import ArrowDownLineIcon from "@rsuite/icons/ArrowDownLine";
import { useLocation } from "react-router-dom";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function SampleNextArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "green",
        width: "30px",
        height: "30px",
        borderRadius: "50%",
      }}
      onClick={onClick}
    />
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function SamplePrevArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "green",
        width: "30px",
        height: "30px",
        borderRadius: "50%",
      }}
      onClick={onClick}
    />
  );
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomSlide = ({ index, ...otherProps }: any) => (
  <div {...otherProps}>
    <div style={{ width: "100%", padding: "1em" }}>
      <div style={{ border: "1px solid black", width: "100%", padding: "1em" }}>
        {index}
        <div className={styles.text}>
          <Panel
            className={styles.border}
            style={{ marginBottom: "10px", backgroundColor: "#fff" }}
          >
            <div style={{ display: "flex" }}>
              <div style={{ flex: 1, padding: "10px", textAlign: "center" }}>
                <h5>
                  <span style={{ flex: "0 0 auto", marginRight: "10px" }}>
                    <img
                      // src={`https://static.tripjack.com/img/airlineLogo/v1/${airlineCode}.png`}
                      alt="Airline Icon"
                      width={28.65}
                      height={28.65}
                      style={{ borderRadius: "4px", marginRight: "10px" }}
                    />
                    AIR INDIA
                  </span>
                </h5>
              </div>
              <div style={{ flex: 1, padding: "10px", textAlign: "center" }}>
                <p
                  style={{
                    fontSize: "22px",
                    fontWeight: "600",
                    color: "#222222",
                  }}
                >
                  {/* {flight.departure} */}
                </p>
                <p style={{ color: "#9E9E9E", textAlign: "center" }}>Chennai</p>
              </div>
              <div style={{ flex: 1, padding: "10px", textAlign: "center" }}>
                <p
                  style={{
                    fontSize: "22px",
                    fontWeight: "600",
                    color: "#222222",
                  }}
                >
                  {/* {flight.duration} */}
                </p>
                {/* <p>
                  {flight.durationDetails === "Non Stop" ? (
                    <img src={stop} alt="rect" />
                  ) : (
                    <img src={OnestopIcon} alt="rect" />
                  )}
                </p>
                <p style={{ color: "#9E9E9E", textAlign: "center" }}>
                  {flight.durationDetails}
                </p> */}
              </div>
              <div style={{ flex: 1, padding: "10px", textAlign: "center" }}>
                <p
                  style={{
                    fontSize: "22px",
                    fontWeight: "600",
                    color: "#222222",
                  }}
                >
                  {/* {flight.arrival} */}
                </p>
                <p style={{ color: "#9E9E9E", textAlign: "center" }}>Delhi</p>
              </div>
              <div style={{ flex: 1, padding: "10px", textAlign: "center" }}>
                <div
                  style={{
                    fontSize: "22px",
                    fontWeight: "600",
                    color: "#222222",
                  }}
                >
                  <p style={{ position: "relative", display: "inline-block" }}>
                    {/* {flight.minprice}{" "} */}
                    {/* <Whisper
                      trigger="hover"
                      placement="bottomEnd"
                      // speaker={createFareDetailsPopover(
                      //   flight.pricingOptions[0].breakdown,
                      //   flight.pricingOptions[0]
                      // )}
                    >
                      <img
                        // src={Iicon}
                        alt="I-icon"
                        width={15}
                        height={15}
                        style={{
                          position: "absolute",
                          top: "-5px", // Adjust as needed
                          right: "-20px", // Adjust as needed
                          cursor: "pointer",
                        }}
                      />
                    </Whisper> */}
                  </p>
                </div>
                <Button
                  appearance="link"
                  // onClick={() => setShowPricingOptions(!showPricingOptions)}
                  style={{
                    textDecoration: "none",
                    color: "#0770E3",
                    fontWeight: "600",
                  }}
                >
                  View Fares <ArrowDownLineIcon />
                </Button>
              </div>
            </div>
            {/* {showPricingOptions && (
              <Panel bordered style={{ backgroundColor: "#fbfbfb" }}>
                {flight.pricingOptions.map((option, optionIndex) => (
                  <PricingOptionRow
                    key={optionIndex}
                    option={option}
                    showFare={showFare}
                    // flightId={flight.id}
                  />
                ))}
              </Panel>
            )} */}
          </Panel>
        </div>
      </div>
    </div>
  </div>
);
function FlightMultiCity() {
  const location = useLocation();
  const payload = location.state?.payload;

  console.log("Received payload:", payload);
  const settings = {
    // dots: true,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <div className="slider-container" style={{ width: "50%", margin: "2em" }}>
      <Slider {...settings}>
        <CustomSlide index={1} />
        <CustomSlide index={2} />
        <CustomSlide index={3} />
        <CustomSlide index={4} />
        <CustomSlide index={5} />
        <CustomSlide index={6} />
      </Slider>
    </div>
  );
}

export default FlightMultiCity;
