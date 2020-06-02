import React from 'react'
import { BrowserRouter as Router, Redirect, Switch, Route, NavLink, Link, withRouter } from "react-router-dom";
import * as combine from "../../../utils/config";
import screen from "./childrenRouter";
import { Table, Divider, Tag, Button} from 'antd'
import {
  ClockCircleOutlined,
} from '@ant-design/icons'
import moment from 'moment';
import logo from '../../../assets/images/logo.png'
import {post, get, put, download} from '../../../utils/api';



const getArticles = () => {
  const url = `/articles`
  const params = {per_page: 100}
  return get({ url, params });
};

const getTags = () => {
  const url = `/tags`
  const params = {per_page: 1000  }
  return get({ url, params });
};

const DashBoard = props => {
  const [openMenu, setOpenMenu] = React.useState(true);
  const [articles, setArticles] = React.useState([]);
  const [tags, setTags] = React.useState([]);
  React.useEffect(() => {
    getData();
    getDataTags();
  }, []);


  const getData = async () => {
    try {
      const result = await getArticles()
      setArticles(result.data)
    } catch(e) {
      console.log("e", e);

    }
  }

  const getDataTags = async () => {
    try {
      const result = await getTags()
      setTags(result.data)
    } catch(e) {
      console.log("e", e);

    }
  }

  const findColorBG = (name) => {
    let result = tags.find(item => item.name === name);
    console.log(result);
    if(result) {
      return result.bg_color_hex
    }
    return ""
  }

  const findColorText = (name) => {
    let result = tags.find(item => item.name === name);
    console.log(result);
    if(result) {
      return result.text_color_hex
    }
    return ""
  }



  const checkActive = (match, location) => {
    //some additional logic to verify you are in the home URI
    if(!location) return false;
    const {pathname} = location;
    console.log(pathname);
    return pathname === "/";
}

  return (
    <div className="flex flex-col h-screen items-center">
      <div className="container flex flex-row flex-wrap">
        {
          articles.map(item => (
            <div className=" w-full sm:w-1/2 lg:w-4/12 p-2 flex">
              <a className="border flex flex-col shadow-md w-full rounded-md text-black bg-white hover:bg-gray-200 " href={item.url}>
                {item.cover_image ? (
                  <img className=" sm:w-full border-b sm:h-40 xl:h-56 rounded-tl-md rounded-tr-md object-cover" src={item.cover_image} loading="lazy" alt={item.description}/>
                ): (
                  <img className="sm:w-full border-b sm:h-40 xl:h-56 rounded-tl-md rounded-tr-md object-cover" src={item.social_image} loading="lazy" alt={item.description}/>
                )}
                <div className="flex flex-col flex-1 px-4 py-2">  
                  <div className="flex-1 flex flex-col items-start">
                    <h1 className="text-xl font-semibold">
                      {item.title}
                    </h1>
                    <div>
                      {
                        item.tag_list.map(tag => (
                          <span className="mr-2 text-xs bg-gray-400 rounded-md p-1 mt-1 inline-block" style={{backgroundColor: findColorBG(tag), color: findColorText(tag)}} key={tag}>{tag}</span>
                        ))
                      }
                    </div>
                    <p className="mt-2 text-gray-700">
                      {item.description}
                    </p>
                  </div>

                  <div className="flex justify-between text-gray-700 flex-row mt-4 items-center">
                    <div className="flex flex-row items-center">
                      <img src={item.user.profile_image_90} className="w-8 h-8 rounded-full mr-2" alt={item.user.name}/>
                      <span>
                        {item.user.name}
                      </span>
                    </div>
                    <div className="flex flex-row items-center">
                      <ClockCircleOutlined />
                      <span className="ml-1">
                        {moment(item.published_at).format("MM/DD/YYYY")}
                      </span>
                    </div>

                  </div>
                </div>
              </a>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default withRouter(DashBoard)
