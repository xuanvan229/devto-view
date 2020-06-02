import React from 'react'
import { connect } from "react-redux";
import { Table, Divider, Tag, Button, Select} from 'antd'
import { bindActionCreators } from "redux";
import { requestUser } from "../redux/action";
// import Input from '../../../components/Input';
import { getListUser } from "../redux/selector";
import {post, get, put, download} from '../../../utils/api';
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const getUserInfoAPI = user_id => {
  const token = localStorage.getItem('token');
  const url = `/user/${user_id}`;
  return get({ url });
};

const getUserActivityAPI = user_id => {
  const token = localStorage.getItem('token');
  const headersAuthen = `Bearer ${token}`;
  const url = `/user/${user_id}/activities`
  return get({ url, headersAuthen });
};

const updateUserAvatarAPI = (data) => {
  const token = localStorage.getItem('token');
  const url = `/user/avatar`;
  return post({ url, data });
};

const updateUserInfoAPI = (user_id, data) => {
  const token = localStorage.getItem('token');
  const url = `/user/${user_id}`;
  return put({ url, data });
};

const exportExcelAPI = data => {
  const token = localStorage.getItem('token');
  const headersAuthen = `Bearer ${token}`;
  const url = `/users/export`
  return download({ url, data, headersAuthen });
};

const OPTIONS = ['user_id', 'username', 'password', 'email', 'address', 'phone', 'zalo', 'viber', 'line', 'whatsapp', 'facebook', 'twitter', 'instagram', 'pinterest', 'skype', 'linkedin', 'telegram'];


const User = props => {
  const [userDetail, getuserDetail] = React.useState({});
  const [avatar, setAvatar] = React.useState(null);
  const [status, setStatus] = React.useState("init");
  const [isEdit, setIsEdit] = React.useState(false);
  const [selectedItems, setselectedItems] = React.useState([]);
  const [activities, setActivities] = React.useState([]);
  React.useEffect(() => {
    props.requestUser()
  }, []);

  const editUser = () => {
    setIsEdit(true)
  };

  const submitEdit = async () => {
    const data = {
      username: userDetail.username,
      phone: userDetail.phone,
      address: userDetail.address,
      levels:userDetail.levels,
      experience:userDetail.experience,
      reward_point:userDetail.reward_point
    };
    try {
      const result = await updateUserInfoAPI(userDetail.user_id, data);
      console.log("updateUserInfoAPI", result);
      if(result.status === 200) {
        props.requestUser()
        // await onCLickUser()
        // getuserDetail(result.data.user);
        // setStatus("view");
      }
    } catch(error) {
      console.log(error)
    }
    setIsEdit(false)
  };

  const onChangeUser = (e, name) => {
    const coppyUser = Object.assign({}, userDetail);
    coppyUser[name] = e.target.value;
    getuserDetail(coppyUser);
  };

  const onCLickUser = async (id) => {
    try {
      const resutlActivity = await getUserActivityAPI (id); 
      if(resutlActivity .status === 200) {
        setActivities(resutlActivity.data)
      }
      const result = await getUserInfoAPI(id);
       if(result.status === 200) {
         getuserDetail(result.data.user);
         setStatus("view");
       }
    }catch(error) {
      console.log(error);
    }
  };

  const setAvatarUser = (e) => {
    var FileUploadPath = e.target.value;
    const userInfo = Object.assign({}, userDetail);
    //To check if user upload any file
    if (FileUploadPath == '') {
      alert("Please upload an image");

    } else {
      var Extension = FileUploadPath.substring(
          FileUploadPath.lastIndexOf('.') + 1).toLowerCase();
      //The file uploaded is an image

      if (Extension == "gif" || Extension == "png" || Extension == "bmp"
          || Extension == "jpeg" || Extension == "jpg") {

        // To Display
        if (e.target.files && e.target.files[0]) {
          userInfo.avatar = URL.createObjectURL(e.target.files[0]);
          getuserDetail(userInfo);
          setAvatar(e.target.files[0]);
          const formData = new FormData();
          formData.append("user_id", userDetail.user_id);
          formData.append("image", e.target.files[0]);
          updateUserAvatarAPI(formData);
          // var reader = new FileReader();
          // reader.onload = function(e) {
          //   $('#blah').attr('src', e.target.result);
          // }
          //
          // reader.readAsDataURL(fuData.files[0]);
          console.log("it here");
        }
      }
      //The file upload is NOT an image
      else {
        e.target.value = null;
        alert("Photo only allows file types of GIF, PNG, JPG, JPEG and BMP. ");
      }
    }
  }

  console.log("props", props);
  console.log("userDetail", userDetail)

  const columns = [
    {
      title: 'STT',
      dataIndex: 'index',
      key: 'index',
      width: 60,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Levels',
      dataIndex: 'levels',
      key: 'levels',
      width: 80,
    },
    {
      title: 'Experience',
      dataIndex: 'experience',
      key: 'experience',
    },
  ];

  const columnsActivity = [
    {
      title: 'STT',
      dataIndex: 'index',
      key: 'index',
      width: 60,
    },
    {
      title: 'category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'detail',
      dataIndex: 'detail',
      key: 'detail',
    },
    {
      title: 'Time',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (text) => <p>{moment(text).format('MMMM Do YYYY, h:mm:ss a')}</p>
    },
  ];

  const dataSource = props.users.map((item, idx) => {
    return {
      ...item, index:idx
    }
  })

  const activitiesSource = activities.map((item, idx) => {
    return {
      ...item,  index:idx
    }
  })

  const exportEcel = async() => {
    try {
      const data = {
        cols: selectedItems.join(',')
      }
      const response = await exportExcelAPI(data); 
      console.log("response =>", response)
      // const notifications = JSON.parse(response.toString('ISO-8859-1'));
      // console.log("response =>", response.toString())

      // window.open("http://113.190.242.199:1003/users/export")

      // FileDownload(response.data, 'report.xls');
      const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'download.csv');
                document.body.appendChild(link);
                link.click();
                // document.body.removeChild(link);
    }catch(error) {
      toast.error(error.response.data.message);
      console.log({error});
    }
  }

  const handleChange = (selectedItem) => {
    setselectedItems(selectedItem);
  }

  console.log("selectedItems", selectedItems.join(','));
  const filteredOptions = OPTIONS.filter(o => !selectedItems.includes(o));

  return (
      <div className="flex flex-col flex-1">
        <ToastContainer/>
        <div>
          hello  user
          </div>
      </div>
  )
}


const mapStateToProps = state => ({
  users: getListUser(state),
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
)(User);


// export default User
