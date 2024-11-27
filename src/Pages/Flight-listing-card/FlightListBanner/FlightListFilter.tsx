import React, { useState } from "react";
import { Slider, Checkbox, Radio, RadioGroup, Tabs, Placeholder } from "rsuite";
import styles from "../../../assets/styles/sidenav-listing.module.css";
import Vistara from "../../../assets/images/Vistara.svg";
import AirIndia from "../../../assets/images/AirIndia.svg";
import Indigo from "../../../assets/images/Indigo.svg";


interface TabNavItem {
  title: string;
  key: string;
  content: React.ReactNode;
}

interface TTabProps {
  TabNav: TabNavItem[];
}

const TTab: React.FC<TTabProps> = ({ TabNav }) => {
  const [selectedNav, setSelectedNav] = useState<string>(TabNav[0]?.key);

  return (
    <div>
      <Tabs
        defaultActiveKey={selectedNav}
        appearance="subtle"
        onSelect={(key) => setSelectedNav(key as string)}
        className={styles.tabNav}
      >
        {TabNav.map((item) => (
          <Tabs.Tab eventKey={item.key} title={item.title} key={item.key}>
            {item.content || <Placeholder.Paragraph graph="image" />}
          </Tabs.Tab>
        ))}
      </Tabs>
    </div>
  );
};

type FilterOption = {
  value: string;
  icon?: string;
  label: string;
  price?: number;
};

type Filter = {
  type: string;
  label: string;
  options?: FilterOption[];
  minValue?: number;
  maxValue?: number;
};

const filters: Filter[] = [
  {
    type: "departure",
    label: "Departure",
    options: [
      { value: "before6am", icon: Vistara, label: "Before 6AM" },
      { value: "6am-12pm", icon: Vistara, label: "6AM-12PM" },
      { value: "12pm-6pm", icon: Vistara, label: "12PM-6PM" },
      { value: "after6pm", icon: Vistara, label: "After 6PM" },
    ],
  },
  {
    type: "arrival",
    label: "Arrival",
    options: [
      { value: "before6am", icon: Vistara, label: "Before 6AM" },
      { value: "6am-12pm", icon: Vistara, label: "6AM-12PM" },
      { value: "12pm-6pm", icon: Vistara, label: "12PM-6PM" },
      { value: "after6pm", icon: Vistara, label: "After 6PM" },
    ],
  },
  {
    type: "stops",
    label: "Stops",
    options: [
      { value: "nonstop", icon: Vistara, label: "Non stop" },
      { value: "1stop", icon: Vistara, label: "1 Stop" },
      { value: "2plusstop", icon: Vistara, label: "2+ Stops" },
    ],
  },
  {
    type: "price",
    label: "Price",
    minValue: 6196,
    maxValue: 18688,
  },
  {
    type: "duration",
    label: "Onward Duration",
    minValue: 165,
    maxValue: 1080,
  },
  {
    type: "airlines",
    label: "Preferred Airlines",
    options: [
      { value: "airIndia", icon: Indigo, label: "Air India", price: 6196 },
      { value: "indiGo", icon: Vistara, label: "IndiGo", price: 6399 },
      { value: "vistara", icon: AirIndia, label: "Vistara", price: 6448 },
      {
        value: "multiAirline",
        icon: Vistara,
        label: "Multi-Airline",
        price: 7416,
      },
    ],
  },
  {
    type: "faretypes",
    label: "Fare Types",
    options: [
      { value: "normalfare", label: "Normal Fare" },  // No icon needed
      { value: "specialfare", label: "Special Fare" }, // No icon needed
      { value: "branded", label: "Branded Fare" },     // No icon needed
      { value: "published", label: "Published Fare" }, // No icon needed
      { value: "corporate", label: "Corporate Fare" }, // No icon needed
      { value: "others", label: "Others" },            // No icon needed
    ],
  },
  {
    type: "connectingairports",
    label: "Connecting Airports",
    options: [
      { value: "Ahmedabad", label: "Ahmedabad" },  // No icon needed
      { value: "Amritstar", label: "Amritstar" }, // No icon needed
      { value: "bangalore", label: "Bangalore" },     // No icon needed
      { value: "Chandigarh", label: "Chandigarh" }, // No icon needed
     
    ],
  },
];

const FilterPanel: React.FC = () => {

  const [checkedOptions, setCheckedOptions] = useState<Map<string, string>>(
    new Map([
      ["multiAirline", "airlines"], 
    ])
  );
  const [checkedFareTypes, setCheckedFareTypes] = useState<string[]>([]);
  const [checkedConnectingAirports, setCheckedConnectingAirports] = useState<string[]>([]);

  // Function to handle radio button changes
  const handleRadioChange = (type: string, value: string) => {
    setCheckedOptions((prev) => new Map(prev).set(type, value));
  };

  // Function to handle checkbox changes
  const handleCheckboxChange = (value: string) => {
    setCheckedOptions((prev) => {
      const newCheckedOptions = new Map(prev);
      if (newCheckedOptions.has(value)) {
        newCheckedOptions.delete(value);
      } else {
        newCheckedOptions.set(value, value);
      }
      return newCheckedOptions;
    });
  };
  const handleFareTypeChange = (value: string) => {
    setCheckedFareTypes((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value) 
        : [...prev, value] 
    );
  };
  const handleConnectingAirportTypeChange = (value: string) => {
    setCheckedFareTypes((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value) 
        : [...prev, value] 
    );
  };

 
  const tabNavItems: TabNavItem[] = filters
    .filter(
      (filter) =>
        filter.type === "departure" ||
        filter.type === "arrival" ||
        filter.type === "stops"
    )
    .map((filter) => ({
      title: filter.label,
      key: filter.type,
      content: (
        <RadioGroup
          name={filter.type}
          onChange={(value) => handleRadioChange(filter.type, value as string)} // Handle radio selection per group
          value={checkedOptions.get(filter.type) || ""} // Get the selected value for the specific filter type
        >
          {filter.options?.map((option) => (
            <Radio key={option.value} value={option.value}>
              {/* <Image src={option.icon} alt={option.label} width={20} height={20} /> */}
              {option.label}
            </Radio>
          ))}
        </RadioGroup>
      ),
    }));

  return (
    <div
      style={{
        width: 340,
        border: "0px",
        boxShadow: "0px 1.63px 53.13px 0px #00000017",
        borderRadius: 8,
        padding: 16,
        height: "fit-content",
        backgroundColor: "#fff",
        marginTop: "53px",
      }}
    >
      {/* <div style={{borderBottom:"1px solid lightgrey"}}> */}
      <h5 style={{ margin: "0 0 16px", padding: "10px" }}>Filter</h5>
      {/* </div> */}
      <TTab TabNav={tabNavItems} />

      <div style={{ marginTop: 20 }}>
        {filters
          .filter(
            (filter) =>
              filter.type === "price" ||
              filter.type === "duration" ||
              filter.type === "airlines"||
              filter.type === "faretypes"||
              filter.type === "connectingairports"
          )
          .map((filter) => (
            <div key={filter.type} style={{ marginBottom: 16 }}>
              <h5>{filter.label}</h5>
              {filter.type === "price" || filter.type === "duration" ? (
                <div style={{ padding: "10px 0" }}>
                  <Slider
                    progress
                    style={{ width: "100%", margin: "0 auto", whiteSpace:"nowrap"}} // Make slider width 100% to fit container
                    min={filter.minValue}
                    max={filter.maxValue}
                    renderTooltip={(value) => 
                      filter.type === "duration" ? `${value} mins` : `₹${value}`
                    } //Add mins in the tootlip &//Add rs in the tooltip
                  />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      margin: "15px 8px 8px",
                    }}
                  >
                    <span>
                      {filter.type === "price"
                        ? `₹${filter.minValue}`
                        : formatMinutes(filter.minValue ?? 0)}
                    </span>
                    <span>
                      {filter.type === "price"
                        ? `₹${filter.maxValue}`
                        : formatMinutes(filter.maxValue ?? 0)}
                    </span>
                  </div>
                </div>
              ) : filter.type === "airlines"  ? (
                filter.options?.map((option) => (
                  <div key={option.value} style={{ padding: "5px 0" }}>
                    {/* {JSON.stringify(option.value)} */}
                    <Checkbox
                      checked={checkedOptions.has(option.value)}
                      onChange={() => handleCheckboxChange(option.value)}
                      style={{ display: "block" }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          width: "95%",
                          margin: "auto 10px",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center" }}>
                        {option.icon && (
                          <img
                            src={option.icon}
                            alt={option.label}
                            width={20}
                            height={20}
                          />)}
                          <span style={{ marginLeft: "10px" }}>
                            {option.label}
                          </span>
                        </div>
                        <div>₹{option.price ?? 0}</div>
                      </div>
                    </Checkbox>
                  </div>
                ))
              ) : filter.type === "faretypes" ? (
                filter.options?.map((option) => (
                  <div key={option.value} style={{ padding: "5px 0" }}>
                    <Checkbox
                      checked={checkedFareTypes.includes(option.value)}
                      onChange={() => handleFareTypeChange(option.value)}
                      style={{ display: "block" }}
                    >
                      {option.label}
                    </Checkbox>
                  </div>
                ))
              ) : filter.type === "connectingairports" ? (
                filter.options?.map((option) => (
                  <div key={option.value} style={{ padding: "5px 0" }}>
                    <Checkbox
                      checked={checkedConnectingAirports.includes(option.value)}
                      onChange={() => handleConnectingAirportTypeChange(option.value)}
                      style={{ display: "block" }}
                    >
                      {option.label}
                    </Checkbox>
                  </div>
                ))
              ) :null}
            </div>
          ))}
      </div>
    </div>
  );
};

// Utility function to format duration in minutes to HH:mm format
function formatMinutes(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
}

export default FilterPanel;
