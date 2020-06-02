import React, {useState, useEffect} from 'react';
// import {FaPhoenixFramework} from 'react-icons/md';
import {FaPhoenixFramework ,FaMoneyCheck, FaRegUserCircle} from 'react-icons/fa';
import logo from '../../../assets/images/logo.png'
// import logo from '../../../assets/i'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {IoMdKey} from 'react-icons/io';
import Input from '../../../components/Input';
import { Redirect, Route } from "react-router-dom";

const Login= (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const submitLogin = (e) => {
    e.preventDefault();
    props.sendLogin({username, password}, toast);
  }
  console.log("props =>", props);
  if(props.isLogin) {
    return <Redirect to="/" />;
  }
  return (
    <div className="flex w-screen h-screen">
      <ToastContainer />
        <div className="xl:w-2/4 lg:w-2/3 w-full flex flex-col">
          <div className="p-8 flex flex-row justify-between bg-primary">
            <div className="flex font-flex items-center cursor-pointer ">
              {/* <FaPhoenixFramework className="w-6 h-6"/>  */}
              <FaMoneyCheck className="text-white w-6 h-6"/>
              {/* <img className="w-6" src={logo} /> */}
              <h2 className="ml-2 text-lg font-semibold text-white">
                Man-Money
              </h2>
            </div>
            <div className="font-sans text-pink-900 cursor-pointer">
            </div>
          </div>
          <div className="flex flex-1 items-center justify-center">
            <form onSubmit={submitLogin} className="flex flex-col lg:w-5/12 w-11/12 md:w-5/12 sm:w-8/12">
              <h1 className="font-flex font-semibold text-2xl mt-1">
                Sign in
              </h1>
              <Input label="Username" type="text" icon={<FaRegUserCircle />} onChange={(e) => setUsername(e.target.value)}/>
              <Input label="Password" type="password" icon={<IoMdKey />} onChange={(e) => setPassword(e.target.value)}/>
              <div className="mt-6 flex flex-row justify-between">
                <button type="submit" className="rounded-full py-2 px-10 bg-teal-400 text-white outline-none focus:outline-none bg-gradient-brand" onClick={submitLogin}>
                  Login 
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="xl:w-2/4 lg:w-4/12 lg:block hidden login-bg w-full h-screen bg-top bg-no-repeat bg-cover">
        </div>
    </div>
  );
} 

export default Login;
