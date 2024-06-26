import React, { useEffect, useReducer, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../styles/Button";
import axios from "axios";
import { useValid } from "../Context/ValidContext";
import Alert from "react-bootstrap/Alert";
import Button1 from "react-bootstrap/Button";

const Wrapper = styled.section`
  .main {
    height: 100vh;
    // background-color: #59d5e0;
    background: linear-gradient(60deg, red, #59d5e0, pink);
  }
  .signup-btn {
    // background-color: #59d5e0;
    background: linear-gradient(60deg, #eb4034, #34a1eb, #34eb40);
    &:hover {
      color: white;
      border: 1px solid white;
    }
  }
  .inner-div {
    width: 400px;
    height: 70%;
  }
`;

let initialState = {
  fullname: "",
  email: "",
  password: "",
  cpassword: "",
};

const reducer = (state, action) => {
  if (action.type === "inputEvent") {
    var { name, value } = action.payload;
    return {
      ...state,
      [name]: value,
    };
  }
  return state;
};

const Register = () => {
  const { updateShowNav, updateData, updateStatus } = useValid();

  const [state, dispatch] = useReducer(reducer, initialState);

  const nevigate = useNavigate();

  const location = useLocation();

  const [show, setShow] = useState();

  const [msg, setMsg] = useState();

  useEffect(() => {
    if (location.pathname === "/register") {
      updateShowNav("login");
    }
  }, []);

  const inputEvent = (e) => {
    var { name, value } = e.target;
    dispatch({ type: "inputEvent", payload: { name, value } });
  };

  const postRegisterData = (event) => {
    event.preventDefault();
    let fromField = new FormData();
    fromField.append("name", state.fullname);
    fromField.append("email", state.email);
    fromField.append("password", state.password);
    if (state.password !== state.cpassword) {
      setShow(true);
      setMsg("Password and Confirm Password must have same");
    } else {
      axios({
        method: "post",
        url: "http://127.0.0.1:8000/api/register",
        data: fromField,
      })
        .then((res) => {
          console.log(res.data);
          updateData(res.data);
          setShow(true);
          setMsg("Register Successfully");
          // alert("Register Successfully...");
        })
        .catch((err) => {
          console.log(err);
          console.log(err.response.status);
          if (err.response.status === 400) {
            setShow(true);
            setMsg("Email Already Exist");
            // alert("User Already Exsist....");
          }
        });
    }
  };
  return (
    <>
      <Wrapper>
        <div className="coninter-fluid d-flex justify-content-center align-items-center flex-column main">
          <div className="border shadow rounded p-3 px-5 bg-light inner-div">
            <h3 className="text-center my-2">Welcome</h3>
            <form
              onSubmit={postRegisterData}
              className="form-group d-flex flex-column row-gap-2"
            >
              <label htmlFor="">Fullname :</label>
              <input
                className="form-control"
                type="text"
                name="fullname"
                value={state.fullname}
                onChange={inputEvent}
                required
              />
              <label htmlFor="">Email :</label>
              <input
                className="form-control"
                type="email"
                name="email"
                value={state.email}
                onChange={inputEvent}
                required
              />
              <label htmlFor="">Password :</label>
              <input
                className="form-control"
                type="password"
                name="password"
                value={state.password}
                onChange={inputEvent}
                required
              />
              <label htmlFor="">Confirm Password :</label>
              <input
                className="form-control"
                type="password"
                name="cpassword"
                value={state.cpassword}
                onChange={inputEvent}
                required
              />
              <Button type="submit" className="w-100 signup-btn">
                Sign Up
              </Button>
              <p className="form-text">
                Already have an Account?
                <Link to="/login">Login</Link>
              </p>
            </form>
          </div>
        </div>
      </Wrapper>
      {show && (
        <Alert
          variant="primary"
          className="position-absolute top-50 start-50 translate-middle-x px-5"
        >
            {msg === "Register Successfully" && (
              <Alert.Heading>A Success Message!</Alert.Heading>
            )}
          <div className="text-center">{msg}</div>
          <div className="d-flex justify-content-center">
            <Button1
              variant="outline-primary"
              className="mt-2"
              onClick={() => {
                setShow(false);
                updateStatus("login");
                updateShowNav("register");
                updateData({ name: state.fullname, email: state.email });
                msg === "Register Successfully" && nevigate("/login");
              }}
            >
              Close
            </Button1>
          </div>
        </Alert>
      )}
    </>
  );
};
export default Register;
