/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Text } from "rsuite";
import BackPack from "../../../assets/images/BackPack.svg";

import PlusIcon from "@rsuite/icons/Plus";
import MinusIcon from "@rsuite/icons/Minus";
import { useSelector } from "react-redux";
import { RootState } from "../../../Store/store";
import TButton from "../../../Component/Common/TButton";

// Define a type for the baggage item
interface BaggageItem {
  title: string;
  price: number;
  isSelected: boolean;
  quantity: number;
  Image: string;
  value?: number;
}
const BaggageList: React.FC<{ flightId: string }> = () => {
  const flightId = useSelector((state: RootState) => state.booking.flightId);
  console.log(flightId, "flightIdss");
  const [baggageType, setBaggageType] = useState<BaggageItem[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalWeight, setTotalWeight] = useState<number>(0);
  useEffect(() => {
    if (flightId) {
      callBookingApi(flightId);
    }
  }, [flightId]);
  const callBookingApi = async (flightId: string) => {
    const payload = {
      priceIds: [flightId],
    };
    try {
      const response = await fetch(
        "https://traveller.mroot.in/backend/api/v1/booking/review",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data, "FlightDetails");
        // Extract baggage data from the API response
        const baggageData: BaggageItem[] = [];
        let initialTotalPrice = 0;
        let initialTotalWeight = 0;
        data.tripInfos.forEach((tripInfo: any) => {
          tripInfo.sI.forEach((segment: any) => {
            segment.ssrInfo.BAGGAGE.forEach((item: any) => {
              baggageData.push({
                title: item.desc,
                price: item.amount,
                isSelected: false,
                quantity: 0,
                value: parseInt(item.code.replace(/\D/g, "")), // Extract numeric value from code
                Image: BackPack,
              });
              initialTotalWeight += parseInt(item.code.replace(/\D/g, "")) || 0;
            });
          });
        });
        initialTotalPrice = data.totalPriceInfo.totalFareDetail.fC.TF;
        setBaggageType(baggageData);
        setTotalPrice(initialTotalPrice);
        setTotalWeight(initialTotalWeight);
      }
    } catch (error) {
      console.error("Error fetching booking data:", error);
    }
  };
  const handleAddDish = (index: number) => {
    const updatedItems = [...baggageType];
    updatedItems[index].quantity += 1;
    updatedItems[index].isSelected = true;
    setTotalPrice((prevPrice) => prevPrice + updatedItems[index].price);
    setTotalWeight(
      (prevWeight) => prevWeight + (updatedItems[index].value || 0)
    );
    setBaggageType(updatedItems);
  };
  const handleRemoveDish = (index: number) => {
    const updatedItems = [...baggageType];
    if (updatedItems[index].quantity > 0) {
      updatedItems[index].quantity -= 1;
      updatedItems[index].isSelected = updatedItems[index].quantity > 0;
      setTotalPrice((prevPrice) => prevPrice - updatedItems[index].price);
      setTotalWeight(
        (prevWeight) => prevWeight - (updatedItems[index].value || 0)
      );
      setBaggageType(updatedItems);
    }
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px",
          background: "#EFEFEF",
        }}
      >
        <div>
          <div>
            <Text>
              Bangalore <span>&rarr;</span> Delhi
            </Text>
          </div>
          <span>
            <Text muted>{totalWeight} kg Added</Text>
          </span>
        </div>
        <div>
          <div>
            <Text weight="semibold">₹{totalPrice}</Text>
          </div>
          <span>Added to fare</span>
        </div>
      </div>
      {baggageType.map((item, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px",
            borderBottom: "1px solid #EFEFEF",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <div
              style={{
                background: "#EFEFEF",
                borderRadius: "10px",
                padding: "10px",
              }}
            >
              <img
                src={item.Image}
                alt={`${item.title}`}
                width={55}
                height={55}
              />
            </div>
            <Text size="lg" weight="semibold">
              {item.title}
            </Text>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Text size="lg" weight="semibold">
              ₹{item.price}
            </Text>
            <>
              <TButton
                type="ghost"
                padding="5px 10px"
                icon={<MinusIcon />}
                onClick={() => handleRemoveDish(i)}
              />
              {item.quantity}
              <TButton
                type="ghost"
                padding="5px 10px"
                icon={<PlusIcon />}
                onClick={() => handleAddDish(i)}
              />
            </>
          </div>
        </div>
      ))}
    </>
  );
};
export default BaggageList;