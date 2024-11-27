/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { Container, Content, Form, Panel, Stack, VStack, Modal } from "rsuite";
import Background from "../../assets/Images/jumbo.svg";
import Logo from "../../assets/Images/Tripvista_Logos.svg";
import styles from "../../assets/styles/login.module.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import TForm from "../../Component/Common/TForm";
import TButton from "../../Component/Common/TButton";
import { REGISTER } from "../../Utils/Constant/constant";
import { LoginCredentials, LoginRef } from "../../Interfaces/models/login.model";
import { login } from "../../Api/login.api";

const initialState: LoginCredentials = {
  username: "",
  password: "",
};

const Login = forwardRef<LoginRef>((props, ref) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState<LoginCredentials>(initialState);
  const [validationError, setValidationErrors] =
    useState<LoginCredentials>(initialState);
  const [open, setOpen] = useState(false);
  const [forgotpwd, setForgotpwd] = useState(false);

  useEffect(() => {
    // Logic for redirecting if authenticated can be added here
  }, [navigate]);

  // Expose methods to the parent component
  useImperativeHandle(ref, () => ({
    openModal: () => setOpen(true),
    closeModal: handleModalClose,
  }));

  const handleModalClose = () => {
    setOpen(false);
    setFormValues(initialState);
    setValidationErrors(initialState);
    setForgotpwd(false);
  };

  const validateField = (name: string, value: string): string => {
    if (name === "username" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return "Please enter a valid email address.";
    } else if (name === "password" && value.length < 8) {
      return "Password must be at least 8 characters long.";
    }
    return ""; // No errors
  };

  const handleChange = (name: string, value: number | boolean | string) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
    const errorMsg = validateField(name, value as string);
    setValidationErrors((prev) => ({
      ...prev,
      [name]: errorMsg,
    }));
  };

  const handleSignIn = async() => {
    const usernameError = validateField("username", formValues.username);
    const passwordError = validateField("password", formValues.password);
    if (!usernameError && !passwordError) {
      const payload = {
        username: formValues.username,
        password: formValues.password,
      };
      // dispatch(login(payload) as any);
      // Dispatch the login action and wait for the result
    const result = await dispatch(login(payload) as any);
    console.log("result",result)

    if (result?.status === "Success") {
      navigate('/home'); // Navigate to home if login is successful
    } else {
      navigate('/'); // Navigate to login page if login fails
    }
      handleModalClose();
    } else {
      setValidationErrors({
        username: usernameError,
        password: passwordError,
      });
    }
  };

  const handleSignUp = () => {
    setOpen(false);
    navigate(REGISTER);
  };

  const handleForgotPassword = () => {
    setForgotpwd(true);
    setValidationErrors(initialState);
  };

  return (
    <Container>
      <Stack
        alignItems="center"
        justifyContent="center"
        style={{ height: "100%" }}
      >
        <Modal
          open={open}
          onClose={handleModalClose}
          size="lg"
          id="login-dialog"
          className={styles.panel}
          style={{ marginTop: "80px" }}
        >
          <Modal.Body>
            <div style={{ display: "flex" }}>
              <div
                style={{
                  flex: 2,
                  position: "relative",
                  backgroundImage: `url(${Background})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  color: "white",
                }}
              >
                {!forgotpwd && (
                  <span
                    style={{
                      color: "white",
                      position: "absolute",
                      top: "375px",
                      left: "23px",
                      fontSize: "32px",
                      lineHeight: "1.4",
                    }}
                  >
                    Login Now
                    <span style={{ display: "block", fontSize: "22px" }}>
                      to join the club of
                    </span>
                    <span style={{ display: "block", fontSize: "22px" }}>
                      10,000+ Happy Travellers
                    </span>
                  </span>
                )}
              </div>
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Content>
                  <Stack
                    alignItems="center"
                    justifyContent="center"
                    style={{ height: "100%" }}
                  >
                    <Panel style={{ width: 400, height: 500 }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          marginTop: "30px",
                        }}
                      >
                        <img src={Logo} alt="Login Image" />
                      </div>
                      <div style={{ marginTop: "10px" }}>
                        {!forgotpwd ? <h4>Login</h4> : <h4>Forgot password</h4>}
                      </div>

                      <br />

                      <Form fluid>
                        <TForm
                          title="Email"
                          placeholder="Enter your email"
                          name="username"
                          type="input"
                          value={formValues.username}
                          onChange={handleChange}
                          validationMessage={validationError.username}
                        />
                        {!forgotpwd ? (
                          <>
                            <TForm
                              title="Password"
                              placeholder="Password"
                              name="password"
                              type="password"
                              value={formValues.password}
                              validationMessage={validationError.password}
                              onChange={handleChange}
                            />
                            <Stack
                              alignItems="center"
                              justifyContent="flex-end"
                              style={{ height: "100%" }}
                            >
                              <a
                                href="#"
                                style={{ textDecoration: "none" }}
                                onClick={handleForgotPassword}
                              >
                                Forgot password?
                              </a>
                            </Stack>
                            <br />
                            <VStack alignItems="center" justifyContent="center">
                              <div style={{ width: "100%" }}>
                                <TButton
                                  label="Login"
                                  type="primary"
                                  padding="10px 0"
                                  block={true}
                                  onClick={handleSignIn}
                                />
                              </div>
                            </VStack>
                            <div
                              style={{ textAlign: "center", marginTop: "10px" }}
                            >
                              <span>Don’t have an account? </span>
                              <TButton
                                onClick={handleSignUp}
                                type="link"
                                label="Sign up"
                              />
                            </div>
                          </>
                        ) : (
                          <TButton
                            label="Submit"
                            type="primary"
                            padding="10px 0"
                            block={true}
                            onClick={handleSignIn}
                          />
                        )}
                      </Form>
                    </Panel>
                  </Stack>
                </Content>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </Stack>
    </Container>
  );
});

Login.displayName = "Login";

export default Login;