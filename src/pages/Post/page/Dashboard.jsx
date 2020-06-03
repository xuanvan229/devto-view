/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { BrowserRouter as Router, Redirect, Switch, Route, NavLink, Link, withRouter } from "react-router-dom";
import * as combine from "../../../utils/config";
import screen from "./childrenRouter";
import axios from 'axios';
import { Select, Typography, Divider } from 'antd';
import {
  ClockCircleOutlined,
  CloseOutlined,
  HeartFilled
} from '@ant-design/icons'
import https from 'https';
import moment from 'moment';
import logo from '../../../assets/images/logo.png'
import loadingIMG from '../../../assets/images/loading.svg';
import loadingDarkIMG from '../../../assets/images/loading_dark.svg';
import 'highlight.js/styles/hopscotch.css'
import hljs from "highlight.js";

import {post, get, put, download} from '../../../utils/api';

const getData = (path) => {
  const instance = axios.create({
    httpsAgent: new https.Agent({  
      rejectUnauthorized: false
    })
  });
  const url = `https://devto-backend.herokuapp.com/get-post`
  return instance.get(url, {
    params: {
      path: path
    }
  })
};

const DashBoard = props => {
  const [data, setData] = React.useState({})
  React.useEffect(() => {
    getPost()
  },[])

  React.useEffect(() => {
    updateCodeSyntaxHighlighting()
  },[data])

  const updateCodeSyntaxHighlighting = () => {
    document.querySelectorAll("pre code").forEach(block => {
      hljs.highlightBlock(block);
    });
  };

  const getPost = async() => {
    const result = await getData(props.location.pathname.replace("/post", ""))
    setData(result.data);
    console.log("reuslt", result)
  }
  console.log("props", );
  return (
    <div className="flex min-h-screen flex-col bg-gray-200 items-center">
      <div className="container shadow-xs p-4 bg-white post">
        <h1 className="text-3xl font-bold mb-8">
          {data.title}
        </h1>
        <div dangerouslySetInnerHTML={{__html : data.content}}>
        </div>
      </div>
    </div>

  )
}

export default withRouter(DashBoard)
