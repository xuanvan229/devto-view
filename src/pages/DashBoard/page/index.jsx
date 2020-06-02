import React from 'react'
import { Icon } from 'antd';

import {getListUser} from "../../User/redux/selector";
import {requestUser} from "../../User/redux/action";
import { bindActionCreators } from "redux";
import {connect} from "react-redux";
import {get} from "../../../utils/api";

const getUserInfoAPI = user_id => {
    const token = localStorage.getItem('token');
    const url = `/user/${user_id}`;
    return get({ url });
};

const DashBoard = props => {
  const [userInfo, setUserInfor] = React.useState({});

  const getUserInfo = async() => {
    try {
      const result = await getUserInfoAPI(props.login.user.user_id);
      if(result.status === 200) {
        setUserInfor(result.data.user);
      }
    }catch(error) {
      console.log(error);
    }
  }
  React.useEffect(() => {
    // getUserInfo()
  }, [])
  console.log("props", props, userInfo);
  return (
    <div className={"flex flex-col p-4 flex-1"}>
        <div className="py-10 px-4 shadow-lg w-1/2">
            <div className="flex items-center flex-col">
              <img src={userInfo.avatar} className="w-20 h-20 object-cover rounded-full" alt=""/>
              <h1 className="mt-2 text-lg">
                {userInfo.username}
              </h1>
              <div className="w-full flex flex-row mt-4 flex-wrap">
                <div className="w-1/2 flex flex-row items-center">
                  <span className="ml-2 font-bold">
                   Phone :
                  </span>
                  <span className="ml-2">
                   {userInfo.phone}
                  </span>
                </div>
                <div className="w-1/2 flex flex-row items-center">
                  <span className="ml-2 font-bold">
                   Email :
                  </span>
                  <span className="ml-2">
                   {userInfo.email}
                  </span>
                </div>
                <div className="w-1/2 flex flex-row items-center">
                  <span className="ml-2 font-bold">
                   Levels :
                  </span>
                  <span className="ml-2">
                   {userInfo.levels}
                  </span>
                </div>
                <div className="w-1/2 flex flex-row items-center">
                  <span className="ml-2 font-bold">
                   Experience :
                  </span>
                  <span className="ml-2">
                   {userInfo.experience}
                  </span>
                </div>
              </div>
            </div>
        </div>
    </div>
  )
};

const mapStateToProps = state => ({
    users: getListUser(state),
    login: state.login,
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            requestUser,
        },
        dispatch,
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(DashBoard);
