import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import LayoutAntd from "../components/Layout";

import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Notfound from "../components/Notfound";
import ProtectedRoute from "../components/ProtectedRoute";

import { auth, onAuthStateChanged } from "../Config/firebase"
import { useEffect, useState } from "react";
import { Spin } from "antd";
import HomePage from "../pages/HomePage";


function Approuter() {

  const [isUser, setIsUser] = useState(false)
  const [loader, setLoader] = useState(true)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      // console.log(user)
      if (user) {
        setIsUser(true)
      } else {
        setIsUser(false)
      }
      setLoader(false)
    });
  }, [])

  return (

    <div>

      {
        loader ? (
          <div className="p-5">
            <Spin size="large" />
          </div>
        ) : (

          <BrowserRouter>
            <Routes>
              <Route path="/" element={
                isUser ? (
                  <LayoutAntd><HomePage /></LayoutAntd>
                ) : (
                  <Navigate to={"/login"} />
                )

              } />
              <Route path="/login" element={
                isUser ? (<Navigate to={"/"} />)
                  : (
                    < LayoutAntd > <Login /></LayoutAntd>
                  )
              }
              />
              <Route path="/signup" element={
                
                <LayoutAntd><Signup /></LayoutAntd>
                }
                 />
              <Route path="*" element={<LayoutAntd><Notfound /></LayoutAntd>} />


            </Routes>
          </BrowserRouter>
        )
      }

    </div >
  )
}


export default Approuter;