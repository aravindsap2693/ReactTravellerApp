import { useState, useEffect, useMemo } from "react";
import { Container, Form, Button, SelectPicker, Grid, Row, Col } from "rsuite";
import { useDispatch, useSelector } from "react-redux";
import { fetchStateListData } from "../../Api/state.api";
import { register } from "../../Api/Register.api";
import { AppDispatch } from "../../Store/store";
import { useNavigate } from "react-router-dom";
import {
  FormValues,
  RegisterPayload,
} from "../../Interfaces/models/register.model";
import { fetchCityListData } from "../../Api/city.api";
import {
  cityItemProps,
  CityResponse,
} from "../../Interfaces/models/city.model";
import EyeIcon from "@rsuite/icons/legacy/Eye";
import EyeSlashIcon from "@rsuite/icons/legacy/EyeSlash";
import { toast } from "react-toastify";
import { FieldOptionProps } from "../../Interfaces/models/common.model";

interface SelectStateProps {
  stateList?: {
    stateList: any[]; // Using specific State type
  };
  districtList?: {
    data: CityResponse[]; // Using specific District type
  };
}
// Define the RegisterForm component
const RegisterForm = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const [isCheckboxEnabled, setIsCheckboxEnabled] = useState<boolean>(false);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState<boolean>(false);

  // Redux selectors for state and district lists
  const stateList = useSelector(
    (state: SelectStateProps) => state.stateList?.stateList || []
  );
  const districtList = useSelector(
    (state: SelectStateProps) => state.districtList?.data || []
  );

  const loadState: FieldOptionProps[] = [{ label: "Loading ...", value: "" }];

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingStates, setLoadingStates] = useState(true);
  const [loadingCities, setLoadingCities] = useState(false);
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const validateName = (name: string) => /^[A-Za-z\s]+$/.test(name);
  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validateMobile = (mobile: string) => {
    return /^\d{10}$/.test(mobile);
  };
  const validatePassword = (password: string) => password.length >= 6;

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

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };
  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible((prev) => !prev);
  };

  const handleChange = (name: keyof FormValues, value: any) => {
    switch (name) {
      case "mobile":
        const sanitizedMobile = value.replace(/[^0-9]/g, "");
        if (sanitizedMobile.length <= 10) {
          setFormValues((prev) => ({
            ...prev,
            [name]: sanitizedMobile,
          }));

          if (
            sanitizedMobile.length === 10 &&
            validateMobile(sanitizedMobile)
          ) {
            setErrors((prevErrors) => ({
              ...prevErrors,
              mobile: "",
            }));
          }
        }
        break;

      case "firstName":
      case "lastName":
        const sanitizedText = value.replace(/[^A-Za-z\s]/g, "");
        setFormValues((prev) => ({
          ...prev,
          [name]: sanitizedText,
        }));

        if (sanitizedText.length > 0) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "",
          }));
        }
        break;

      case "email":
        setFormValues((prev) => ({
          ...prev,
          email: value,
        }));
        if (validateEmail(value)) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            email: "",
          }));
        }
        break;

      case "password":
        setFormValues((prev) => ({
          ...prev,
          password: value,
        }));
        if (value.length >= 8) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            password: "",
          }));
        }
        break;

      case "confirmPassword":
        setFormValues((prev) => ({
          ...prev,
          confirmPassword: value,
        }));
        if (value === formValues.password) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            confirmPassword: "",
          }));
        }
        break;

      case "state":
        setFormValues((prev) => ({
          ...prev,
          state: value,
        }));
        if (value) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            state: "",
          }));
        }
        break;

      case "district":
        setFormValues((prev) => ({
          ...prev,
          district: value,
        }));
        if (value) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            district: "",
          }));
          setIsCheckboxEnabled(true);
          setIsCheckboxChecked(true);
        }
        break;

      default:
        setFormValues((prev) => ({
          ...prev,
          [name]: value,
        }));
        break;
    }

    // Validate form after every input change
    const formIsValid = validateForm();

    // Enable checkbox if form is valid
    setIsCheckboxEnabled(formIsValid);
  };

  // Handle checkbox change
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    console.log("Checkbox checked status:", checked);
    setFormValues((prev) => ({
      ...prev,
      is_accept: checked,
    }));
    setIsCheckboxChecked(event.target.checked);
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formValues.firstName || !validateName(formValues.firstName))
      newErrors.firstName = "First Name is required";
    if (!formValues.lastName || !validateName(formValues.lastName))
      newErrors.lastName = "Last Name is required";
    if (!formValues.mobile || !validateMobile(formValues.mobile))
      newErrors.mobile = "Valid Mobile number is required";
    if (!formValues.email || !validateEmail(formValues.email))
      newErrors.email = "Valid Email is required";
    if (!formValues.password || !validatePassword(formValues.password))
      newErrors.password = "Password must be at least 8 characters";
    if (formValues.password !== formValues.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (!formValues.state) newErrors.state = "Please select a state";
    if (!formValues.district) newErrors.district = "Please select a city";
    // if (!formValues.is_accept)
    //   newErrors.is_accept = "You must accept the terms and conditions";
    console.log("Validation Errors:", newErrors);

    setErrors(newErrors);

    //return Object.keys(newErrors).length === 0;
    const isValid = Object.keys(newErrors).length === 0;
    return isValid;
  };
  // Handle form submission
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    const isValid = validateForm();
    if (!isValid || !isCheckboxChecked) {
      setIsSubmitting(false);
      toast.error("Please fill all the required fields.");
      return;
    }

    const registerPayload: RegisterPayload = {
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      mobile_number: formValues.mobile,
      email: formValues.email,
      password: formValues.password,
      state: formValues.state,
      district: formValues.district,
    };

    dispatch(register(registerPayload))
      .then(() => {
        toast.success("Registration successful!");
        navigate("/");
      })
      .catch((error) => {
        console.error("Registration failed", error);
        toast.error("Registration failed. Please try again.");
      })
      .finally(() => setIsSubmitting(false));
  };
  // Memoized transformation of state and district data
  const stateOptions = useMemo(
    () => transformStateData(stateList as any),
    [stateList]
  );
  const districtOptions = useMemo(
    () => transformCityData(districtList as any),
    [districtList]
  );

  return (
    <Container>
      <div style={{ background: "#fff", padding: "0px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "auto",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "1200px",
              overflowY: "auto",
              padding: "20px",
            }}
          >
            <h2 style={{ textAlign: "center", marginBottom: "25px" }}>
              Register
            </h2>
            <Form fluid>
              <Grid>
                {/* First Name and Last Name */}
                <Row>
                  <Col xs={12}>
                    <Form.Group controlId="firstName">
                      <Form.ControlLabel className="registerColumnHeader">
                        First Name
                      </Form.ControlLabel>
                      <Form.Control
                        name="firstName"
                        value={formValues.firstName}
                        onChange={(value) => handleChange("firstName", value)}
                        placeholder="Enter your first name"
                      />
                      {errors.firstName && (
                        <span style={{ color: "red" }}>{errors.firstName}</span>
                      )}
                    </Form.Group>
                  </Col>
                  <Col xs={12}>
                    <Form.Group controlId="lastName">
                      <Form.ControlLabel className="registerColumnHeader">
                        Last Name
                      </Form.ControlLabel>
                      <Form.Control
                        name="lastName"
                        value={formValues.lastName}
                        onChange={(value) => handleChange("lastName", value)}
                        placeholder="Enter your last name"
                      />
                      {errors.lastName && (
                        <span style={{ color: "red" }}>{errors.lastName}</span>
                      )}
                    </Form.Group>
                  </Col>
                </Row>

                {/* Mobile and Email */}
                <Row className="registerRowheader">
                  <Col xs={12}>
                    <Form.Group controlId="email">
                      <Form.ControlLabel className="registerColumnHeader">
                        Email ID
                      </Form.ControlLabel>
                      <Form.Control
                        name="email"
                        value={formValues.email}
                        onChange={(value) => handleChange("email", value)}
                        placeholder="Enter your email"
                      />
                      {errors.email && (
                        <span style={{ color: "red" }}>{errors.email}</span>
                      )}
                    </Form.Group>
                  </Col>
                  <Col xs={12}>
                    <Form.Group controlId="mobile">
                      <Form.ControlLabel className="registerColumnHeader">
                        Mobile
                      </Form.ControlLabel>
                      <Form.Control
                        name="mobile"
                        value={formValues.mobile}
                        onChange={(value) => handleChange("mobile", value)}
                        placeholder="Enter your mobile number"
                      />
                      {errors.mobile && (
                        <span style={{ color: "red" }}>{errors.mobile}</span>
                      )}
                    </Form.Group>
                  </Col>
                </Row>

                {/* Password and Confirm Password */}
                <Row className="registerRowheader">
                  <Col xs={12}>
                    <Form.Group controlId="password">
                      <Form.ControlLabel className="registerColumnHeader">
                        Password
                      </Form.ControlLabel>
                      <div style={{ position: "relative" }}>
                        <Form.Control
                          name="password"
                          type={isPasswordVisible ? "text" : "password"}
                          value={formValues.password}
                          onChange={(value) => handleChange("password", value)}
                          placeholder="Enter your password"
                        />
                        {errors.password && (
                          <span style={{ color: "red" }}>
                            {errors.password}
                          </span>
                        )}
                        <div
                          onClick={togglePasswordVisibility}
                          style={{
                            position: "absolute",
                            right: 10,
                            top: "15px",
                            transform: "translateY(-50%)",
                            cursor: "pointer",
                          }}
                        >
                          {isPasswordVisible ? <EyeIcon /> : <EyeSlashIcon />}
                        </div>
                      </div>
                    </Form.Group>
                  </Col>
                  <Col xs={12}>
                    <Form.Group controlId="confirmPassword">
                      <Form.ControlLabel className="registerColumnHeader">
                        Confirm Password
                      </Form.ControlLabel>
                      <div style={{ position: "relative" }}>
                        <Form.Control
                          name="confirmPassword"
                          type={isConfirmPasswordVisible ? "text" : "password"}
                          value={formValues.confirmPassword}
                          onChange={(value) =>
                            handleChange("confirmPassword", value)
                          }
                          placeholder="Enter your confirm password"
                        />
                        {errors.confirmPassword && (
                          <span style={{ color: "red" }}>
                            {errors.confirmPassword}
                          </span>
                        )}
                        <div
                          onClick={toggleConfirmPasswordVisibility}
                          style={{
                            position: "absolute",
                            right: 10,
                            top: "15px",
                            transform: "translateY(-50%)",
                            cursor: "pointer",
                            verticalAlign: "middle",
                          }}
                        >
                          {isConfirmPasswordVisible ? (
                            <EyeIcon />
                          ) : (
                            <EyeSlashIcon />
                          )}
                        </div>
                      </div>
                    </Form.Group>
                  </Col>
                </Row>

                {/* State and City */}
                <Row className="registerRowheader">
                  <Col xs={12}>
                    <Form.Group controlId="state">
                      <Form.ControlLabel className="registerColumnHeader">
                        State
                      </Form.ControlLabel>
                      <SelectPicker
                        data={loadingStates ? loadState : stateOptions}
                        value={formValues.state}
                        onChange={(value) => handleChange("state", value)}
                        placeholder="Select a state"
                        // errorMessage={errors.state}
                        block
                      />
                      {errors.state && (
                        <span style={{ color: "red" }}>{errors.state}</span>
                      )}
                    </Form.Group>
                  </Col>
                  <Col xs={12}>
                    <Form.Group controlId="district">
                      <Form.ControlLabel className="registerColumnHeader">
                        City
                      </Form.ControlLabel>
                      <SelectPicker
                        data={loadingCities ? loadState : districtOptions}
                        value={formValues.district}
                        onChange={(value) => handleChange("district", value)}
                        placeholder="Select a city"
                        // errorMessage={errors.district}
                        block
                      />
                      {errors.district && (
                        <span style={{ color: "red" }}>{errors.district}</span>
                      )}
                    </Form.Group>
                  </Col>
                </Row>

                {/* Checkbox in new line */}
                <Row style={{ marginTop: "30px", marginBottom: "30px" }}>
                  <Col xs={24}>
                    <Form.Group controlId="is_accept">
                      <div>
                        <input
                          type="checkbox"
                          // checked={formValues.is_accept}
                          disabled={!isCheckboxEnabled}
                          checked={isCheckboxChecked}
                          onChange={handleCheckboxChange}
                        />

                        <label style={{ marginLeft: "8px" }}>
                          I accept the <a href="#">Terms and Conditions</a>
                        </label>
                      </div>
                    </Form.Group>
                  </Col>
                </Row>

                {/* Register Button */}
                <Row>
                  <Col xs={24}>
                    <Button
                      type="submit"
                      loading={isSubmitting}
                      onClick={handleSubmit}
                      block
                      style={{
                        backgroundColor: "#FA503F",
                        color: "#FFF",
                        width: "10%",
                        //opacity: isCheckboxChecked ? 1 : 0.5,
                      }}
                      //disabled={!isCheckboxChecked}
                    >
                      Register
                    </Button>
                  </Col>
                </Row>
              </Grid>
            </Form>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default RegisterForm;

// Data transformation functions
const transformStateData = (data: { id?: number; states: string }[]) => {
  return data
    ?.filter((item) => item.id !== undefined)
    .map((item) => ({
      label: item.states,
      value: item.id ?? 0,
    }));
};

const transformCityData = (data: CityResponse) => {
  console.log("Data received for transformation:", data); // Debug line
  if (data.response && Array.isArray(data.response)) {
    return data.response.map((item: cityItemProps) => ({
      label: item.city,
      value: item.id,
    }));
  }
  return [];
};
