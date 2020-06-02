import React from 'react';
// import {MdCardTravel} from 'react-icons/md';
// import {FaRegUserCircle} from 'react-icons/fa';
// import {IoMdKey} from 'react-icons/io';
// interface Props {
//   label: string,
//   type: string,
//   children?: React.ReactNode,
//   icon: React.ReactNode
// }
const Input = (props) => {
  const {label, type, icon, ...rest} = props
  return (
    <div className="mt-5">
      <div className="text-sm text-gray-900">
        {label}
      </div>
      <div className="border-gray-500 border-solid border w-full p-2 flex flex-row items-center rounded-lg mt-2">
        {icon}
        <input type={type} className="w-full outline-none ml-2" {...rest}/>
      </div>
    </div>
  );
} 

export default Input;
