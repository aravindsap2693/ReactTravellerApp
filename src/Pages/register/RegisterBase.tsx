import { useState, useEffect, useMemo } from "react";
import { Container, Form, Button, SelectPicker, Message } from "rsuite";
import { useDispatch, useSelector } from "react-redux";
import { fetchStateListData } from "../../Api/state.api";
import { register } from "../../Api/Register.api";
import { AppDispatch, RootState } from "../../Store/store";
import { useNavigate } from "react-router-dom";
import { FormValues, RegisterPayload } from "../../Interfaces/models/register.model";
import { fetchCityListData } from "../../Api/city.api";
import { cityItemProps, CityResponse } from "../../Interfaces/models/city.model";

// Define the RegisterForm component
const RegisterForm = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  // Redux selectors for state and district lists
  const stateList = useSelector((state: RootState) => state.stateList.stateList);
  const districtList = useSelector((state: RootState) => state.districtList.data);

  // State for form values, errors, and submission status
  const [formValues, setFormValues] = useState<FormValues>({
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    password: "",
    state: null,
    district: null,
    confirmPassword: "",
    is_accept: false,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [formValid, setFormValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingStates, setLoadingStates] = useState(true);
  const [loadingCities, setLoadingCities] = useState(false);

  // Fetch states on component mount
  useEffect(() => {
    const fetchStates = async () => {
      setLoadingStates(true);
      try {
        await dispatch(fetchStateListData());
      } finally {
        setLoadingStates(false);
      }
    };
    fetchStates();
  }, [dispatch]);

  // Fetch cities when a state is selected
  useEffect(() => {
    if (formValues.state !== null) {
      const fetchCities = async () => {
        setLoadingCities(true);
        try {
          await dispatch(fetchCityListData(formValues.state as any));
        } finally {
          setLoadingCities(false);
        }
      };
      fetchCities();
    }
  }, [formValues.state, dispatch]);

  // Handle input change
  const handleChange = (name: keyof FormValues, value: any) => {
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle checkbox change
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked; // Get the checked status
    console.log("Checkbox checked status:", checked);
    setFormValues((prev) => ({
      ...prev,
      is_accept: checked, // Update to the value received
    }));
  };

  // Handle form submission
  const handleSubmit = () => {
    setIsSubmitting(true);

    const registerPayload: RegisterPayload = {
      first_name: formValues.firstName,
      last_name: formValues.lastName,
      mobile_number: formValues.mobile,
      email: formValues.email,
      password: formValues.password,
      state: formValues.state,
      district: formValues.district,
    };

    dispatch(register(registerPayload))
      .then(() => navigate("/"))
      .catch((error) => console.error("Registration failed", error))
      .finally(() => setIsSubmitting(false));
  };

  // Memoized transformation of state and district data
  const stateOptions = useMemo(() => transformStateData(stateList as any), [stateList]);
  const districtOptions = useMemo(() => transformCityData(districtList), [districtList]);

  return (
    <Container>
      <div style={{ background: "#fff", padding: "20px" }}>
        <h2 style={{ textAlign: "center" }}>Register</h2>
        <Form fluid>
          <Form.Group controlId="firstName">
            <Form.ControlLabel>First Name</Form.ControlLabel>
            <Form.Control
              name="firstName"
              value={formValues.firstName}
              onChange={(value) => handleChange("firstName", value)}
              errorMessage={errors.firstName}
            />
          </Form.Group>

          <Form.Group controlId="lastName">
            <Form.ControlLabel>Last Name</Form.ControlLabel>
            <Form.Control
              name="lastName"
              value={formValues.lastName}
              onChange={(value) => handleChange("lastName", value)}
              errorMessage={errors.lastName}
            />
          </Form.Group>

          <Form.Group controlId="mobile">
            <Form.ControlLabel>Mobile</Form.ControlLabel>
            <Form.Control
              name="mobile"
              value={formValues.mobile}
              onChange={(value) => handleChange("mobile", value)}
              errorMessage={errors.mobile}
            />
          </Form.Group>

          <Form.Group controlId="email">
            <Form.ControlLabel>Email</Form.ControlLabel>
            <Form.Control
              name="email"
              value={formValues.email}
              onChange={(value) => handleChange("email", value)}
              errorMessage={errors.email}
            />
          </Form.Group>

          <Form.Group controlId="password">
            <Form.ControlLabel>Password</Form.ControlLabel>
            <Form.Control
              name="password"
              type="password"
              value={formValues.password}
              onChange={(value) => handleChange("password", value)}
              errorMessage={errors.password}
            />
          </Form.Group>

          <Form.Group controlId="confirmPassword">
            <Form.ControlLabel>Confirm Password</Form.ControlLabel>
            <Form.Control
              name="confirmPassword"
              type="password"
              value={formValues.confirmPassword}
              onChange={(value) => handleChange("confirmPassword", value)}
              errorMessage={errors.confirmPassword}
            />
          </Form.Group>

          <Form.Group controlId="state">
            <Form.ControlLabel>State</Form.ControlLabel>
            <SelectPicker
              data={loadingStates ? [{ label: "Loading states...", value: "" }] : stateOptions}
              value={formValues.state}
              onChange={(value) => handleChange("state", value)}
              placeholder="Select a state"
              errorMessage={errors.state}
              block
            />
          </Form.Group>

          <Form.Group controlId="district">
            <Form.ControlLabel>City</Form.ControlLabel>
            <SelectPicker
              data={loadingCities ? [{ label: "Loading cities...", value: "" }] : districtOptions}
              value={formValues.district}
              onChange={(value) => handleChange("district", value)}
              placeholder="Select a city"
              errorMessage={errors.district}
              block
            />
          </Form.Group>

          <Form.Group controlId="is_accept">
            <div>
              <input
                type="checkbox"
                checked={formValues.is_accept}
                onChange={handleCheckboxChange} // Call the new handler
              />
              <label style={{ marginLeft: '8px' }}>
                I accept the <a href="#">Terms and Conditions</a>
              </label>
            </div>
          </Form.Group>

          <Button
            appearance="primary"
            onClick={handleSubmit}
            loading={isSubmitting}
            block
          >
            Register
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default RegisterForm;

// Data transformation functions
const transformStateData = (data: { id?: number; states: string }[]) => {
  return data?.filter((item) => item.id !== undefined).map((item) => ({
    label: item.states,
    value: item.id ?? 0,
  }));
};

const transformCityData = (data: CityResponse) => {
  console.log('Data received for transformation:', data);  // Debug line
  if (data.response && Array.isArray(data.response)) {
    return data.response.map((item: cityItemProps) => ({
      label: item.city,
      value: item.id,
    }));
  }
  return [];
};
