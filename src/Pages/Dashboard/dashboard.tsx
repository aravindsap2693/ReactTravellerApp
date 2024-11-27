import React from "react"
//import TimerIcon from "../../../assets/images/Timer.svg"; // Adjust path as needed
import DashboardSales from "../../assets/icons/DashboardSalesIcon.svg"
import DashboardBookings from "../..//assets/icons/DashboardBookings.svg"
import DashboardRevenue from "../../assets/icons/DashboardRevenueIcon.svg"
import DashboardCustomers from "../../assets/icons/DashboardCustomersIcon.svg"
import Indigo from "../../assets/images/Indigo.svg"
import Vistara from "../../assets/images/Vistara.svg"
import AirIndia from "../../assets/images/AirIndia.svg"
import { Calendar, Col, Panel, Progress, Tooltip, Whisper } from "rsuite"






interface CircleProgressProps {
    percent: number;
    bookedPercent: number;
    cancelledPercent: number;
}

const CircleProgressWithTooltip: React.FC<CircleProgressProps> = ({ bookedPercent, cancelledPercent }) => {
    const radius = 90;
    const circumference = 2 * Math.PI * radius;

    // Adjusted values for booked and cancelled portions to create a gap
    const bookedStroke = (bookedPercent / 100) * circumference - 5; // Small gap adjustment
    const cancelledStroke = (cancelledPercent / 100) * circumference - 5; // Small gap adjustment

    return (
        <div style={{ position: 'relative', width: '200px', height: '200px', marginLeft: '40px', marginTop: '50px' }}>
            <Whisper
                trigger="hover"
                speaker={
                    <Tooltip>
                        <div>
                            <strong>{bookedPercent}%</strong> booked
                        </div>
                        <div>
                            <strong>{cancelledPercent}%</strong> cancelled
                        </div>
                    </Tooltip>
                }
            >
                <svg width="200" height="200" viewBox="0 0 200 200">
                    <circle
                        cx="100"
                        cy="100"
                        r={radius}
                        fill="none"
                        stroke="#E5E5E5" // Background color for remaining portion
                        strokeWidth="20"
                    />

                    {/* Cancelled Portion */}
                    <circle
                        cx="100"
                        cy="100"
                        r={radius}
                        fill="none"
                        stroke="#FF5656" // Color for the cancelled portion
                        strokeWidth="20"
                        strokeDasharray={`${cancelledStroke} ${circumference}`}
                        strokeDashoffset="0"
                        strokeLinecap="round"
                        transform="rotate(-90 100 100)"
                    />

                    {/* Booked Portion */}
                    <circle
                        cx="100"
                        cy="100"
                        r={radius}
                        fill="none"
                        stroke="#04CE00" // Color for the booked portion
                        strokeWidth="20"
                        strokeDasharray={`${bookedStroke} ${circumference}`}
                        strokeDashoffset={-cancelledStroke - 5} // Offset booked portion and add gap
                        strokeLinecap="round"
                        transform="rotate(-90 100 100)"
                    />

                    {/* Text for booked and cancelled percentages */}
                    <text x="50%" y="50%" textAnchor="middle" dy="-0.3em" fontSize="1rem" fill="#333">
                        {`Booked: ${bookedPercent}%`}
                    </text>
                    <text x="50%" y="60%" textAnchor="middle" dy=".3em" fontSize="1rem" fill="#333">
                        {`Cancelled: ${cancelledPercent}%`}
                    </text>
                </svg>


            </Whisper>




        </div>
    );
};

const Dashboard = () => {
    

    const panelData = [
        {
            id: 1,
            image: DashboardSales,
            title: "Total sales",
            value: "₹44,5000",
            color: "#A69AEE"
        },
        {
            id: 2,
            image: DashboardBookings,
            title: "Bookings",
            value: "520",
            color: "#FF9A9F"
        },
        {
            id: 3,
            image: DashboardRevenue,
            title: "Total Revenue",
            value: "₹10,8500",
            color: "#7DA0DA"
        },
        {
            id: 4,
            image: DashboardCustomers,
            title: "Customers",
            value: "542",
            color: "#50C878"
        }
    ];

    const topBookings = [
        {
            id: 1,
            image: Indigo,
            title: "IndiGo",
            value: 100,
        },
        {
            id: 2,
            image: Vistara,
            title: "Air Vistara",
            value: 10,


        },
        {
            id: 3,
            image: AirIndia,
            title: "Air India Express IX",
            value: 52,

        },
        {
            id: 4,
            image: Indigo,
            title: "Coupon IndiGo",
            value: 32,
        }
    ]

    // const CircleProgressWithTooltip = ({ }) => {
    //     return (
    //         <div>
    //             {/* Tooltip for progress information */}
    //             <Whisper
    //                 trigger="hover"
    //                 speaker={
    //                     <Tooltip>
    //                         <div>
    //                             <strong>{bookedPercent}%</strong> booked
    //                         </div>
    //                         <div>
    //                             <strong>{cancelledPercent}%</strong> cancelled
    //                         </div>
    //                     </Tooltip>
    //                 }
    //             >

    //                 <svg width="200" height="200" viewBox="0 0 200 200">
    //                     <circle
    //                         cx="100"
    //                         cy="100"
    //                         r={radius}
    //                         fill="none"
    //                         stroke="#E5E5E5" // Background color for remaining portion
    //                         strokeWidth="20"
    //                     />

    //                     {/* Cancelled Portion */}
    //                     <circle
    //                         cx="100"
    //                         cy="100"
    //                         r={radius}
    //                         fill="none"
    //                         stroke="#FF5656" // Color for the cancelled portion
    //                         strokeWidth="20"
    //                         strokeDasharray={`${cancelledStroke} ${circumference}`}
    //                         strokeDashoffset="0"
    //                         transform="rotate(-90 100 100)"
    //                     />

    //                     {/* Booked Portion */}
    //                     <circle
    //                         cx="100"
    //                         cy="100"
    //                         r={radius}
    //                         fill="none"
    //                         stroke="#04CE00" // Color for the booked portion
    //                         strokeWidth="20"
    //                         strokeDasharray={`${bookedStroke} ${circumference}`}
    //                         strokeDashoffset={-cancelledStroke} // Offset booked to start after cancelled
    //                         transform="rotate(-90 100 100)"
    //                     />

    //                     {/* Text for booked and cancelled percentages */}
    //                     <text x="50%" y="50%" textAnchor="middle" dy=".3em" fontSize="1rem" fill="#333">
    //                         {`Booked: ${bookedPercent}%`}
    //                     </text>
    //                     <text x="50%" y="60%" textAnchor="middle" dy=".3em" fontSize="1rem" fill="#333">
    //                         {`Cancelled: ${cancelledPercent}%`}
    //                     </text>
    //                 </svg>

    //             </Whisper>



    //             {/* Legend for booked and cancelled status */}
    //             <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
    //                 <div style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}>
    //                     <span
    //                         style={{
    //                             display: 'inline-block',
    //                             width: '10px',
    //                             height: '10px',
    //                             borderRadius: '50%',
    //                             backgroundColor: '#04CE00',
    //                             marginRight: '5px'
    //                         }}
    //                     ></span>
    //                     <span style={{ fontSize: '0.8rem', color: '#333' }}>Booked</span>
    //                 </div>
    //                 <div style={{ display: 'flex', alignItems: 'center' }}>
    //                     <span
    //                         style={{
    //                             display: 'inline-block',
    //                             width: '10px',
    //                             height: '10px',
    //                             borderRadius: '50%',
    //                             backgroundColor: '#FF5656',
    //                             marginRight: '5px'
    //                         }}
    //                     ></span>
    //                     <span style={{ fontSize: '0.8rem', color: '#333' }}>Cancelled</span>
    //                 </div>
    //             </div>
    //         </div>
    //     )
    // }



    return (
        <div style={{ position: "relative", width: "100%", backgroundColor: "#F4F9FF" }}>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    padding: "0", // Optional padding for smaller screens
                    margin: "0"
                }}
            >
                <Panel
                    style={{
                        backgroundColor: "#F4F9FF",
                        position: "relative",
                        overflow: "visible",
                        color: "lightgrey",
                        padding: "0",
                        maxWidth: "1200px", // Set a max-width for the panel
                        width: "100%",      // Make it responsive to screen size
                    }}
                >
                    {/* <Col xs={24} sm={12} md={3} style={{ border: "1px solid red" }} /> */}
                    {panelData.map((card) => (
                        <>

                            <Col key={card.id} xs={24} sm={12} md={6}>
                                <div
                                    style={{
                                        background: "#F4F9FF",
                                        color: "#FFF",
                                        borderRadius: "10px",
                                        textAlign: "center",
                                        padding: "0px",
                                        cursor: "pointer", // Make it look clickable
                                        transition: "transform 0.3s ease-in-out", // Apply smooth transition
                                    }}
                                >
                                    <Panel
                                        bodyFill
                                        style={{
                                            padding: "0",
                                            textAlign: "center",
                                            display: "flex",
                                            flexDirection: "column",
                                            width: "90%",
                                            boxSizing: "border-box",
                                            flex: "1 1 300px",
                                            marginTop: "20px",
                                            border: "0px",
                                            borderRadius: "18px",
                                            background: "#FFF",
                                        }}
                                    >
                                        <div
                                            style={{
                                                display: "flex",
                                                // justifyContent: "space-around",
                                                flexDirection: "row",
                                                marginTop: "5px",
                                                marginBottom: "5px",
                                            }}
                                        >
                                            <div style={{ marginBottom: "5px", marginLeft: "20px" }}>
                                                <img
                                                    src={card.image}
                                                    alt="Airline Icon"
                                                    width={50}
                                                    height={50}
                                                    style={{ objectFit: "cover" }}
                                                />
                                            </div>
                                            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", marginLeft: "15px" }}>
                                                <span
                                                    style={{ fontWeight: "bold", color: card.color, fontSize: "17px", textAlign: "left" }}
                                                >
                                                    {card.value}
                                                </span>
                                                <p style={{ fontWeight: 400, fontSize: "12px", margin: 0, textAlign: "left", color: "#666" }}>
                                                    {card.title}
                                                </p>
                                            </div>
                                        </div>
                                    </Panel>
                                </div>
                            </Col>

                        </>
                    ))}


                    {/* top bookings */}
                    <Col xs={24} sm={24} md={12}>
                        <div
                            style={{
                                // background: "#F4F9FF",
                                color: "#FFF",
                                borderRadius: "10px",
                                textAlign: "center",
                                padding: "0px",
                                cursor: "pointer",
                                transition: "transform 0.3s ease-in-out",
                            }}
                        >
                            <Panel
                                header="Top bookings" collapsible
                                defaultExpanded
                                style={{
                                    padding: "0",
                                    textAlign: "center",
                                    display: "flex",
                                    flexDirection: "column",
                                    width: "100%",
                                    boxSizing: "border-box",
                                    marginTop: "20px",
                                    border: "0px",
                                    borderRadius: "18px",
                                    background: "#fff",
                                    color: "#2E2E30"
                                }}
                            >
                                {topBookings.map((card, index) => (
                                    <div
                                        key={card.id}
                                        style={{
                                            display: "flex",
                                            // justifyContent: "space-around",
                                            flexDirection: "row",
                                            marginTop: index === 0 ? "20px" : "10px", // Extra top margin for the first item
                                            marginBottom: "10px",
                                            padding: "10px",
                                            // borderBottom: "1px solid #E0E0E0", // Optional: Adds a divider between items
                                            backgroundColor: "#F4F9FF",
                                            color: "#000"
                                        }}
                                    >
                                        <div style={{ marginBottom: "5px", marginLeft: "15px" }}>
                                            <img
                                                src={card.image}
                                                alt="Airline Icon"
                                                width={50}
                                                height={50}
                                                style={{ objectFit: "cover" }}
                                            />
                                        </div>
                                        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                                            {/* <span
                                            style={{
                                                fontWeight: "bold",
                                                fontSize: "14px",
                                                textAlign: "left",
                                                width: "125px",
                                            }}
                                        > */}
                                            {/* <Progress.Line percent={card.value} strokeColor={color} /> */}
                                            {/* </span> */}

                                            <p style={{ fontSize: "12px", marginLeft: "10px", textAlign: "left", color: "#222222", width: "150px" }}>
                                                {card.title}
                                            </p>
                                        </div>


                                        <div style={{ transform: "scaleX(-1)", width: "100%", marginTop: "10px" }}>
                                            <Progress.Line percent={card.value} strokeColor="#04CE00" showInfo={false} />

                                        </div>
                                        <span style={{ marginTop: "10px" }}>{card.value}</span>


                                    </div>
                                ))}
                            </Panel>
                        </div>
                    </Col>

                    {/* booking performance */}

                    <Col xs={24} sm={24} md={6}>
                        <div
                            style={{
                                background: "#FFF",
                                color: "#FFF",
                                borderRadius: "10px",
                                textAlign: "center",
                                padding: "0px",
                                cursor: "pointer",
                                transition: "transform 0.3s ease-in-out",
                                height: "430px"
                            }}
                        >
                            <Panel
                                header="Booking Performance" collapsible
                                defaultExpanded
                                bodyFill
                                style={{
                                    padding: "0",
                                    textAlign: "center",
                                    display: "flex",
                                    flexDirection: "column",
                                    width: "100%",
                                    boxSizing: "border-box",
                                    marginTop: "20px",
                                    border: "0px",
                                    borderRadius: "18px",
                                    background: "#fff",
                                    color: "#2E2E30"
                                }}
                            >
                                <CircleProgressWithTooltip percent={72} bookedPercent={72} cancelledPercent={38} />

                                {/* Legend for booked and cancelled status */}
                                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}>
                                        <span
                                            style={{
                                                display: 'inline-block',
                                                width: '10px',
                                                height: '10px',
                                                borderRadius: '50%',
                                                backgroundColor: '#04CE00',
                                                marginRight: '5px'
                                            }}
                                        ></span>
                                        <span style={{ fontSize: '0.8rem', color: '#333' }}>Booked</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <span
                                            style={{
                                                display: 'inline-block',
                                                width: '10px',
                                                height: '10px',
                                                borderRadius: '50%',
                                                backgroundColor: '#FF5656',
                                                marginRight: '5px',
                                                color: "#000"
                                            }}
                                        ></span>
                                        <span style={{ fontSize: '0.8rem', color: '#333' }}>Cancelled</span>
                                    </div>
                                </div>
                            </Panel>



                        </div>
                    </Col>

                    {/* Calendar */}

                    <Col xs={24} sm={24} md={6}>
                        <div
                            style={{
                                background: "#F4F9FF",
                                color: "#FFF",
                                borderRadius: "10px",
                                textAlign: "center",
                                padding: "0px",
                                cursor: "pointer",
                                transition: "transform 0.3s ease-in-out",
                                

                            }}
                        >
                            <Panel
                                bodyFill
                                style={{
                                    padding: "0",
                                    textAlign: "center",
                                    display: "flex",
                                    flexDirection: "column",
                                    width: "100%",
                                    boxSizing: "border-box",
                                    marginTop: "20px",
                                    border: "0px",
                                    borderRadius: "18px",
                                    background: "#fff",
                                    color: "#2E2E30",
                                }}
                            >
                                <Calendar bordered compact />
                            </Panel>
                        </div>
                    </Col>


                </Panel>
            </div>
        </div>
    )
}

export default Dashboard