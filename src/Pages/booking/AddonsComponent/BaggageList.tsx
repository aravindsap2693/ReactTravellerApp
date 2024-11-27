/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import { Text } from "rsuite";
import BackPack from "../../../assets/images/BackPack.svg";
import PlusIcon from "@rsuite/icons/Plus";
import MinusIcon from "@rsuite/icons/Minus";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../Store/store";
import TButton from "../../../Component/Common/TButton";
import { reviewBooking } from "../../../Api/reviewFlight.api";
import {
  addBaggage,
  removeBaggage,
  setBaggage,
} from "../../../Store/Slice/baggageSlice";

// Define a type for the baggage item
interface BaggageItem {
  title: string;
  price: number;
  isSelected: boolean;
  quantity: number;
  Image: string;
  value?: number;
}

const BaggageList: React.FC = () => {
  const dispatch = useDispatch();
  const flightId = useSelector((state: RootState) => state.booking.flightId);
  const onwardFlightId = useSelector((state: RootState) => state.booking.onwardFlightId);
  const returnFlightId = useSelector((state: RootState) => state.booking.returnFlightId);
  const flightType = useSelector((state: RootState) => state.flight.flightType);

  // Get baggage items, totalPrice and totalWeight from the Redux store
  const baggageType = useSelector(
    (state: RootState) => state.baggage.baggageType
  );
  const totalPrice = useSelector(
    (state: RootState) => state.baggage.totalPrice
  );
  const totalWeight = useSelector(
    (state: RootState) => state.baggage.totalWeight
  );

  useEffect(() => {
    if (flightType === "One Way" ) {
      // Call the API when the component mounts or flightId changes for One Way
      callBookingApi(flightType, flightId, null, null, dispatch);
    } else if (flightType === "Round Trip" ) {
      // Call the API when the component mounts or flight IDs change for round trip
      callBookingApi(flightType, null, onwardFlightId, returnFlightId, dispatch);
    }
 
  }, [dispatch, flightType, flightId, onwardFlightId, returnFlightId]);

  const callBookingApi = async (flightType: string, flightId: string | null, onwardFlightId: string | null, returnFlightId: string | null, dispatch: AppDispatch) => {
    const payload = flightType === "One Way" ? 
    { priceIds: [flightId] } : 
    { priceIds: [onwardFlightId, returnFlightId].filter(Boolean) };

    try {
      const data = await reviewBooking(payload)(dispatch);

      const baggageData: BaggageItem[] = [];

      if (data.tripInfos && data.tripInfos.length > 0) {
        data.tripInfos.forEach((tripInfo: any) => {
          if (tripInfo.sI && tripInfo.sI.length > 0) {
            tripInfo.sI.forEach((segment: any) => {
              if (segment.ssrInfo && segment.ssrInfo.BAGGAGE) {
                segment.ssrInfo.BAGGAGE.forEach((item: any) => {
                  baggageData.push({
                    title: item.desc,
                    price: item.amount,
                    isSelected: false,
                    quantity: 0,
                    value: parseInt(item.code.replace(/\D/g, "")),
                    Image: BackPack,
                  });
                });
              }
            });
          }
        });

        dispatch(setBaggage(baggageData));
      }
    } catch (error) {
      console.error("Error fetching booking data:", error);
    }
  };

  const handleAddBaggage = (index: number) => {
    dispatch(addBaggage(index));
  };

  const handleRemoveBaggage = (index: number) => {
    dispatch(removeBaggage(index));
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
                onClick={() => handleRemoveBaggage(i)}
              />
              {item.quantity}
              <TButton
                type="ghost"
                padding="5px 10px"
                icon={<PlusIcon />}
                onClick={() => handleAddBaggage(i)}
              />
            </>
          </div>
        </div>
      ))}
    </>
  );
};

export default BaggageList;
