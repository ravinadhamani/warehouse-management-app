import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { allData } from "./action";
import { connect } from "react-redux";
import { useEffect } from "react";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Account from "./components/Account"
import Product from "./components/Product";
import AddProduct from "./components/AddProduct";
import ProtectedRoute from "./components/ProtectedRoute";
import Signup from "./components/Signup";
import { UserAuthContextProvider } from "./Context/UserAuthContext";


function App(data) {
  const CallAPI = data.data.reducer.callApi;
  const loginStatus = data.data.reducer.LoginStatus;
  console.log(loginStatus);

  localStorage.setItem("IsLoggedIn", loginStatus);

  let IsLoggedIn = JSON.parse(localStorage.getItem("IsLoggedIn"));

  useEffect(() => {
    if (CallAPI === true) {
      data.addData();
    }
  }, [IsLoggedIn]);

  return (
    <>
      <BrowserRouter>
        <div id="main-container">
          <UserAuthContextProvider>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route path="/product" element=
                {<ProtectedRoute> <Product /></ProtectedRoute>
                 
                } />
              <Route path="/addProduct" element=
                {
                  <ProtectedRoute> <AddProduct /></ProtectedRoute>
                } />
              <Route path="/account" element={
                <ProtectedRoute>
                <Account /></ProtectedRoute>
              } />


            </Routes>
          </UserAuthContextProvider>
        </div>
      </BrowserRouter>
    </>
  );
}

const mapstateToProps = (props) => ({
  data: props,
});

const mapDispatchToProps = (dispatch) => ({
  addData: (data) => {
    dispatch(allData());
  },
});

export default connect(mapstateToProps, mapDispatchToProps)(App);
