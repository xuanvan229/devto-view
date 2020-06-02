import React from 'react'
import { BrowserRouter as Router, Redirect, Switch, Route, NavLink, Link, withRouter } from "react-router-dom";
import * as combine from "../../../utils/config";
import screen from "./childrenRouter";
import { Select, Typography, Divider } from 'antd';
import {
  ClockCircleOutlined,
  CloseOutlined,
  HeartFilled
} from '@ant-design/icons'
import moment from 'moment';
import logo from '../../../assets/images/logo.png'
import loadingIMG from '../../../assets/images/loading.svg';
import {post, get, put, download} from '../../../utils/api';

function debounce(func, wait, immediate) {
  // 'private' variable for instance
  // The returned function will be able to reference this due to closure.
  // Each call to the returned function will share this common timer.
  var timeout;

  // Calling debounce returns a new anonymous function
  return function() {
    // reference the context and args for the setTimeout function
    var context = this,
      args = arguments;

    // Should the function be called now? If immediate is true
    //   and not already in a timeout then the answer is: Yes
    var callNow = immediate && !timeout;

    // This is the basic debounce behaviour where you can call this 
    //   function several times, but it will only execute once 
    //   [before or after imposing a delay]. 
    //   Each time the returned function is called, the timer starts over.
    clearTimeout(timeout);

    // Set the new timeout
    timeout = setTimeout(function() {

      // Inside the timeout function, clear the timeout variable
      // which will let the next execution run when in 'immediate' mode
      timeout = null;

      // Check if the function already ran with the immediate flag
      if (!immediate) {
        // Call the original function with apply
        // apply lets you define the 'this' object as well as the arguments 
        //    (both captured before setTimeout)
        func.apply(context, args);
      }
    }, wait);

    // Immediate mode and no wait timer? Execute the function..
    if (callNow) func.apply(context, args);
  }
}

const getArticles = (tags) => {
  const url = `/articles`
  let params = {per_page: 100};
  if(tags) {
    params = {per_page: 100, tag: tags}
  }
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
  const [loading, setLoading] = React.useState(false);
  const [openDropDown, setOpenDropDown] = React.useState(false);
  const [tagQuery, setTagQuery] = React.useState([]);
  const [tagQueryPrevious, setTagQueryPrevious] = React.useState([]);
  const [tags, setTags] = React.useState([]);
  React.useEffect(() => {
    getData();
    getDataTags();
  }, []);


  const getData = async () => {
    setLoading(true);
    try {
      const result = await getArticles()
      setArticles(result.data)
      setLoading(false);
    } catch(e) {
      console.log("e", e);
    }
  }

  const getDataTags = async () => {
    try {
      const result = await getTags()
      const data = result.data.map(item => {
        return {...item, value: item.name}
      });
      setTags(data)
    } catch(e) {
      console.log("e", e);

    }
  }

  const findColorBG = (name) => {
    let result = tags.find(item => item.name === name);
    // console.log(result);
    if(result) {
      return result.bg_color_hex
    }
    return ""
  }

  const findColorText = (name) => {
    let result = tags.find(item => item.name === name);
    // console.log(result);
    if(result) {
      return result.text_color_hex
    }
    return ""
  }



  const checkActive = (match, location) => {
    //some additional logic to verify you are in the home URI
    if(!location) return false;
    const {pathname} = location;
    // console.log(pathname);
    return pathname === "/";
  }


 

  const handleBlur = async() => {
    let result;
    const is_same = (tagQuery.length === tagQueryPrevious.length) && tagQuery.every(function(element, index) {
      return element === tagQueryPrevious[index]; 
    });
    if(!is_same) {
      setTagQueryPrevious(tagQuery);
      setLoading(true);
      if(tagQuery.length !== 0) {
        result= await getArticles(tagQuery.join(", "))
      } else {
        result=  await getArticles()
      }
      setArticles(result.data)
      setLoading(false);
      // console.log("blur");
    }
    
  }

  const handleChange =(value) => {
    setTagQuery(value);
    // console.log("handleChange", value);
  }

  function tagRender(props) {
    const { label, value, closable, onClose } = props;
    return (
      <div className="flex flex-row items-center mr-2 text-md bg-gray-400 rounded-md p-1 inline-block" style={{backgroundColor: findColorBG(value), color: findColorText(value)}}>
        <span className="mr-1">
          {label}
        </span>
        <CloseOutlined onClick={onClose} />
      </div>
    );
  }

  const removeItemOnce = (arr, value) => { 
    var index = arr.indexOf(value);
    if (index > -1) {
        arr.splice(index, 1);
    }
    return arr;
}

  const dropDownChange = (open) => {
    setOpenDropDown(open);
    // console.log("dropDownChange", open);
  }

  const getArtilesData = async () => {
    let result;
    setLoading(true);
    if(tagQuery.length !== 0) {
      result= await getArticles(tagQuery.join(", "))
    } else {
      result=  await getArticles()
    }
    setArticles(result.data)
    setLoading(false);
  }

  const onDeselect = (item) => {
    setTagQuery()
    if(!openDropDown) {
      let newTagQuery = removeItemOnce(tagQuery, item);
      setTagQuery(newTagQuery);
      setTagQueryPrevious(newTagQuery);
      // setLoading(true);
      // console.log("onDeselect", item);
      setTimeout( getArtilesData, 1000);
    }
  }

  const listView = () => {
    if(articles.length === 0) {
      return (
        <div className="container">
          <p className="text-center mt-4">
            No results match that query
          </p>
        </div>
      )
    }
    return (
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
                    <div className="flex ml-3 flex-row items-center">
                      <HeartFilled className="text-red-500" />
                      <span className="ml-1">
                        {item.public_reactions_count}
                      </span>
                    </div>
                  </div>

                </div>
              </div>
            </a>
          </div>
        ))
      }
    </div>
    )
  }

  return (
    <div className="flex flex-col h-screen items-center">
      <div className="container p-2 mt-8">
        <Select
          mode="multiple"
          style={{ width: '100%' }}
          placeholder="Fillter by tag"
          defaultValue={[]}
          tagRender={tagRender}
          onDropdownVisibleChange={dropDownChange}
          onMouseLeave={handleBlur}
          onBlur={handleBlur}
          onDeselect={onDeselect}
          onChange={handleChange}
          options={tags}
        />
      </div>
      {
        loading ? (
          <div>
            <img src={loadingIMG} alt="loading" />
          </div>
        ): listView()
      }

    </div>
  )
}

export default withRouter(DashBoard)
