import React, { useState, useEffect } from "react";
import styles from "./Navbar.module.css";
import { AiFillDashboard } from "react-icons/ai";
import { BsFillCartFill } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";
import { IconContext } from "react-icons";
import { Link, useNavigate } from "react-router-dom";
import { modifyIsLoggedOut } from "../../action";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import { useUserAuth } from "../../Context/UserAuthContext";


function Navbar(data) {
  const logoutStatus = data.data.reducer.LoginStatus;
  const [isActiveDash, setisActiveDash] = useState(false);
  const [isActivePro, setisActivePro] = useState(false);
  const [isActiveAcc, setisActiveAcc] = useState(false);
  const a = JSON.parse(localStorage.getItem("IsLoggedIn"));
  console.log(a);

  const navigate = useNavigate();

  useEffect(() => {
    if (a == true) {
      setisActiveDash(true);
    } else {
      setisActiveDash(false);
      setisActiveAcc(false);

      setisActivePro(false);
    }
  }, [a]);

  function LoginBtnfunc() {
    if (logoutStatus == true) {
      return (
        <button
          className={styles.loginBtn}
          onClick={() => {
            logout();
          }}
        >
          Admin,
          <span className={styles.loginState}>Logout</span>
        </button>
      );
    } else {
      return (
        <button className={styles.loginBtn}>
          <span className={styles.loginState}></span>
        </button>
      );
    }
  }

  function logout() {
    data.logout(false);
    navigate("/");
  }

  const handleClickDash = () => {
    if (logoutStatus == true) {
      setisActiveDash(true);

      setisActiveAcc(false);

      setisActivePro(false);
    }
  };

  const handleClickPro = () => {
    if (logoutStatus == true) {
      setisActiveDash(false);

      setisActiveAcc(false);

      setisActivePro(true);
    }
  };

  const handleClickAcc = () => {
    if (logoutStatus == true) {
      setisActiveDash(false);

      setisActiveAcc(true);

      setisActivePro(false);
    }
  };
  const { logOut, user } = useUserAuth();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div id={styles.navbarContainer}>
       <h2 className={styles.navbarText}>Warehouse App </h2> 
      <IconContext.Provider value={{ size: "30px" }}>
        <div className={styles.iconContainer}>
          <Link
            to="/dashboard"
            className={styles.link1}
            style={{
              background: isActiveDash ? "#F5A623" : "",
              color: isActiveDash ? "white" : "",
            }}
            onClick={() => {
              handleClickDash();
            }}
          >
            <AiFillDashboard />
            <p className={styles.link}>Dashboard</p>
          </Link>

          <Link
            to="/product"
            className={styles.link2}
            style={{
              background: isActivePro ? "#F5A623" : "",
              color: isActivePro ? "white" : "",
            }}
            onClick={() => {
              handleClickPro();
            }}
          >
            <BsFillCartFill />
            <p className={styles.link}>Products</p>
          </Link>

          <Link
            to="/account"
            className={styles.link3}
            style={{
              background: isActiveAcc ? "#F5A623" : "",
              color: isActiveAcc ? "white" : "",
            }}
            onClick={() => {
              handleClickAcc();
            }}
          >
            <FaRegUser />
            <p className={styles.link}>Accounts</p>
          </Link>


        </div>
      </IconContext.Provider>
      <LoginBtnfunc />
      <div className={styles.logoutBtn}>
        <Button onClick={handleLogout}>
          Log out
        </Button>
      </div>
    </div>
  );
}

const mapstateToProps = (props) => ({
  data: props,
});

const mapDispatchToProps = (dispatch) => ({
  logout: (data) => {
    dispatch(modifyIsLoggedOut(data));
  },
});

export default connect(mapstateToProps, mapDispatchToProps)(Navbar);
