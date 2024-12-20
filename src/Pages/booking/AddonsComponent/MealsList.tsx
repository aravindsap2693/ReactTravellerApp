/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import Burger from "../../../assets/images/Burger.svg";
import PlusIcon from "@rsuite/icons/Plus";
import MinusIcon from "@rsuite/icons/Minus";
import { Text } from "rsuite";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../Store/store";
import {
  setSelectedMeals,
  setTotalPrice,
} from "../../../Store/Slice/mealSlice";
import { reviewBooking } from "../../../Api/reviewFlight.api";
import TButton from "../../../Component/Common/TButton";
import TForm from "../../../Component/Common/TForm";

// Define types for meal items and options
interface MealItem {
  dish: string;
  price: number;
  quantity: number;
  Image: string;
}
interface MealOptionList {
  veg: MealItem[];
  non_veg: MealItem[];
}

const MealsList = () => {
  const dispatch = useDispatch();
  const flightId = useSelector((state: RootState) => state?.booking?.flightId);
  const onwardFlightId = useSelector((state: RootState) => state.booking.onwardFlightId);
  const returnFlightId = useSelector((state: RootState) => state.booking.returnFlightId);
  const flightType = useSelector((state: RootState) => state.flight.flightType);
  const totalPrice = useSelector((state: RootState) => state?.meal?.totalPrice);

  const [mealOption, setMealOption] = useState<"veg" | "non_veg">("veg");
  const [mealItems, setMealItems] = useState<MealOptionList>({
    veg: [],
    non_veg: [],
  });
  useEffect(() => {
    if (flightType === "One Way" ) {
      // Call the API when the component mounts or flightId changes for One Way
      callBookingApi(flightType, flightId, null, null, dispatch);
    } else if (flightType === "Round Trip" ) {
      // Call the API when the component mounts or flight IDs change for round trip
      callBookingApi(flightType, null, onwardFlightId, returnFlightId, dispatch);
    }
 
  }, [dispatch, flightType, flightId, onwardFlightId, returnFlightId]);
  // useEffect(() => {
  //   if (flightId) {
  //     callBookingApi(flightId);
  //   }
  // }, [flightId]);

  const callBookingApi = async (flightType: string, flightId: string | null, onwardFlightId: string | null, returnFlightId: string | null, dispatch: AppDispatch) => {
    const payload = flightType === "One Way" ? 
    { priceIds: [flightId] } : 
    { priceIds: [onwardFlightId, returnFlightId].filter(Boolean) };
    try {
      const data = await reviewBooking(payload)(dispatch);

      const meals: MealItem[] = [];
      data.tripInfos.forEach((tripInfo: any) => {
        tripInfo.sI.forEach((serviceInfo: any) => {
          if (serviceInfo.ssrInfo && serviceInfo.ssrInfo.MEAL) {
            const mealData = serviceInfo.ssrInfo.MEAL;
            mealData.forEach((meal: any) => {
              meals.push({
                dish: meal.desc,
                price: meal.amount,
                Image: Burger,
                quantity: 0,
              });
            });
          }
        });
      });

      const vegMeals = meals.filter((meal) =>
        meal.dish.toLowerCase().includes("veg")
      );
      const nonVegMeals = meals.filter(
        (meal) => !meal.dish.toLowerCase().includes("veg")
      );

      setMealItems({
        veg: vegMeals,
        non_veg: nonVegMeals,
      });

      const initialTotalPrice = meals.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      dispatch(setTotalPrice(initialTotalPrice)); // Set initial total price
    } catch (error) {
      console.error("Error fetching meal options:", error);
    }
  };

  const updateTotalPrice = (updatedItems: MealItem[]) => {
    const newTotalPrice = updatedItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    dispatch(setTotalPrice(newTotalPrice)); // Update Redux state for total price
  };

  const handleAddDish = (index: number) => {
    const updatedItems = [...mealItems[mealOption]];

    // Create a new object for the updated meal item to avoid mutation
    const updatedMealItem = {
      ...updatedItems[index],
      quantity: updatedItems[index].quantity + 1,
    };

    updatedItems[index] = updatedMealItem;

    setMealItems({ ...mealItems, [mealOption]: updatedItems });
    updateTotalPrice(updatedItems);
    dispatch(setSelectedMeals(updatedItems));
  };

  const handleRemoveDish = (index: number) => {
    const updatedItems = [...mealItems[mealOption]];

    if (updatedItems[index].quantity > 0) {
      // Create a new object for the updated meal item to avoid mutation
      const updatedMealItem = {
        ...updatedItems[index],
        quantity: updatedItems[index].quantity - 1,
      };

      updatedItems[index] = updatedMealItem;

      setMealItems({ ...mealItems, [mealOption]: updatedItems });
      updateTotalPrice(updatedItems);
      dispatch(setSelectedMeals(updatedItems));
    }
  };

  const handleFieldChange = (_name: string, value: any) => {
    setMealOption(value);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
          padding: "10px",
          background: "#EFEFEF",
        }}
      >
        <div>
          <div>Bangalore &rarr; Delhi</div>
          <span>
            {mealItems[mealOption].filter((item) => item.quantity > 0).length}{" "}
            &rarr; {mealItems[mealOption].length} items selected
          </span>
        </div>
        <div>
          <Text weight="semibold">₹{totalPrice}</Text>{" "}
          {/* Display totalPrice from Redux */}
          <span>Added to fare</span>
        </div>
      </div>

      <TForm
        title="Meal Preference"
        name="mealOption"
        value={mealOption}
        type="radio"
        options={[
          { label: "Veg", value: "veg" },
          { label: "Non-Veg", value: "non_veg" },
        ]}
        onChange={handleFieldChange}
      />

      {/* <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
        {mealItems[mealOption].map((item, index) => (
          <div
            key={index}
            style={{
              flex: "1 1 20%",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              overflow: "hidden",
              textAlign: "center",
              backgroundColor: "#fff",
            }}
          >
            <img
              src={item.Image}
              alt={item.dish}
              style={{ borderRadius: "8px" }}
            />
            <div
              style={{
                display: "flex",
                padding: "10px",
                alignItems: "flex-end",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div style={{ fontSize: "18px" }}>{item.dish}</div>
                <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                  ₹{item.price}
                </div>
              </div>
              {item.quantity < 1 ? (
                <TButton
                  padding="5px 10px"
                  label="Add"
                  onClick={() => handleAddDish(index)}
                />
              ) : (
                <>
                  <TButton
                    type="ghost"
                    padding="5px 10px"
                    icon={<MinusIcon />}
                    onClick={() => handleRemoveDish(index)}
                  />
                  {item.quantity}
                  <TButton
                    type="ghost"
                    padding="5px 10px"
                    icon={<PlusIcon />}
                    onClick={() => handleAddDish(index)}
                  />
                </>
              )}
            </div>
          </div>
        ))}
      </div> */}
        <div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)", // 4 columns with equal width
    gap: "16px",
  }}
>
  {mealItems[mealOption].map((item, index) => (
    <div
      key={index}
      style={{
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
        textAlign: "center",
        backgroundColor: "#fff",
      }}
    >
      <img
              src={item.Image}
              alt={item.dish}
              style={{ borderRadius: "8px" }}
            />
      {/* <div
        style={{
          display: "flex",
          padding: "10px",
          alignItems: "flex-end",
          justifyContent: "space-between",
        }}
      >
        <div>
          <div style={{ fontSize: "18px" }}>{item.dish}</div>
          <div style={{ fontWeight: "bold", fontSize: "15px" }}>
            ₹{item.price}
          </div>
        </div>
        {item.quantity < 1 ? (
          <TButton
            padding="5px 10px"
            label="Add"
            onClick={() => handleAddDish(index)}
          />
        ) : (
          <>
            <TButton
              type="ghost"
              padding="5px 10px"
              icon={<MinusIcon />}
              onClick={() => handleRemoveDish(index)}
            />
            {item.quantity}
            <TButton
              type="ghost"
              padding="5px 10px"
              icon={<PlusIcon />}
              onClick={() => handleAddDish(index)}
            />
          </>
        )}
      </div> */}
      <div
  style={{
    display: "flex",
    padding: "10px",
    alignItems: "center", // Align vertically
    justifyContent: "space-between", // Space between dish/price and buttons
    flexWrap: "wrap",
  }}
>
  <div style={{ display: "flex", flexDirection: "column", flex: "1" }}>
    <div style={{ fontSize: "15px", wordWrap: "break-word" }}>
      {item.dish}
    </div>
    <div
      style={{
        fontWeight: "bold",
        fontSize: "15px",
        marginTop: "5px", // Add spacing between dish and price
      }}
    >
      ₹{item.price}
    </div>
  </div>
  
  
</div>

{item.quantity < 1 ? (
    <TButton
      padding="5px 10px"
      label="Add"
      onClick={() => handleAddDish(index)}
      style={{width:"75px", marginBottom:"20px"}}
    />
  ) : (
    <div style={{ display: "flex", justifyContent:"center" }}>
      <TButton
        type="ghost"
        padding="5px 10px"
        icon={<MinusIcon />}
        onClick={() => handleRemoveDish(index)}
      />
      <span style={{ margin: "5px 10px" }}>{item.quantity}</span>
      <TButton
        type="ghost"
        padding="5px 10px"
        icon={<PlusIcon />}
        onClick={() => handleAddDish(index)}
      />
    </div>
  )}

    </div>
  ))}
</div>
    </div>
  );
};

export default MealsList;
