import { Nav } from 'rsuite';
import NoRecordsFountFlight from '../../../src/assets/images/NoRecordsFountFlight.svg'
import TButton from "../../../src/Component/Common/TButton";


const NoRouteFound = () => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "80vh", // Adjust container height to fill the viewport
                textAlign: "center",
            }}
        >
            <img src={NoRecordsFountFlight} alt="Logo" style={{ maxWidth: "100%" }} />
            <h4 style={{ color: "#222222", marginTop: "16px" }}>Flight Not Found</h4>
            <h6 style={{ color: "#757D80", margin: "8px 0" }}>
                There were no flights found for this date & route combination
            </h6>
            <Nav
                style={{
                    display: "flex",
                    justifyContent: "center",
                    cursor: "pointer",
                    borderRadius: "5px",
                    width: "130px",
                    height: "36px",
                    marginTop: "20px"
                }}
            >
                <TButton label="Search again" type="primary" />
            </Nav>
        </div>

    )
}

export default NoRouteFound