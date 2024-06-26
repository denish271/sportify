import React, { useEffect, useState } from "react";
import { IoCartOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useValid } from "../Context/ValidContext";
import { CgProfile } from "react-icons/cg";

const Wrep = styled.section`
  .cart {
    scale: 2;
    margin: 20px 0px;
  }
  .profile {
    scale: 2;
    margin: 20px 20px;
  }
  nav-click {
    border-bottom: 3px solid white;
    border-radius: 20%;
  }
  li:hover {
    border-bottom: 3px solid white;
    border-radius: 20%;
  }
  li:active {
    border-bottom: 2px solid white;
    font-size: 15px;
  }
`;

export default function Nav() {
  const { updateStatus, status, data, updateData } = useValid();

  const nevigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (status === "Login")
      document.querySelector(".profile").style.display = "none";
    else document.querySelector(".profile").style.display = "block";
  }, [status]);

  const loginClick = () => {
    if (status === "Login") {
      nevigate("/login");
    } else {
      let tmp = window.confirm("Are u Sure?");

      if (tmp) {
        updateData({ name: "", email: "", fullname: "" });
        updateStatus("logout");
      }
    }
  };

  const toggleSlideBar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Wrep>
        <nav
          className="navbar navbar-expand-lg bg-body-dark text-white"
          style={{ backgroundColor: "#154360" }}
        >
          <div className="container-fluid mx-3">
            <Link className="navbar-brand text-white" to="/">
              <img
                src="logo1.jpg"
                alt=""
                srcset=""
                style={{
                  height: "50px",
                  width: "100px",
                  outfit: "cover",
                  mixBlendMode: "screen",
                }}
              />
            </Link>
            {/* <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarScroll"
              aria-controls="navbarScroll"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button> */}
            <div className="collapse navbar-collapse" id="navbarScroll">
              <ul
                className="navbar-nav me-auto my-3 my-lg-0 navbar-nav-scroll"
                style={{ height: "40px" }}
              >
                <li className="nav-item mx-3 item">
                  <Link className="nav-link active text-white" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item mx-3 item">
                  <Link className="nav-link text-white" to="/productList">
                    Products
                  </Link>
                </li>
                <li className="nav-item mx-3 item">
                  <Link className="nav-link text-white" to="/about">
                    About
                  </Link>
                </li>
                <li className="nav-item mx-3 item">
                  <Link className="nav-link text-white" to="/contact">
                    Contact
                  </Link>
                </li>
              </ul>
              <CgProfile className="profile" onClick={toggleSlideBar} />
              <div>
                {isOpen && (
                  <div
                    style={{
                      position: "absolute",
                      right: 0,
                      top: 75,
                      bottom: 0,
                      width: "250px",
                      height: "300px",
                      background: "#154360",
                      padding: "20px",
                    }}
                    className="border border-solid rounded"
                  >
                    <h5 className="text-decoration-underline text-center">
                      Profile
                    </h5>
                    <h6>Username</h6>
                    <p>{data.name}</p>
                    <h6>Email</h6>
                    <p>{data.email}</p>
                    <button
                      className="btn btn-primary position-relative start-50 translate-middle-x"
                      onClick={() => {
                        toggleSlideBar();
                        nevigate("/changepass");
                      }}
                    >
                      Change Password
                    </button>
                    <button
                      className="btn btn-primary position-relative start-50 translate-middle-x my-2"
                      onClick={() => {
                        toggleSlideBar();
                        nevigate("/yourorder");
                      }}
                    >
                      Your Orders
                    </button>
                  </div>
                )}
              </div>
              {/* </Link> */}
              <h6>{data.fullname}</h6>
              <button
                className="btn btn-primary mx-4 px-4"
                onClick={loginClick}
              >
                {status}
              </button>

              <Link className="nav-link" to="/cart">
                <IoCartOutline className="cart" />
              </Link>
            </div>
          </div>
        </nav>
      </Wrep>
    </>
  );
}
