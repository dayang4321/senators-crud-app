 import React from 'react'

import { Popconfirm, message } from 'antd';



export const MyPopconfirm = (props) => {

  const confirm = (e) => {
    console.log(e);
    message.success(props.confirm);
    props.confirm()
  }
  
const cancel = (e) => {
    console.log(e);
    message.error('Click on No');
  }


  return (
    <Popconfirm 
    placement="topLeft" 
      {...props}
      title={props.title}
      onConfirm={props.confirm ? confirm : null}
      onCancel={props.cancel ? cancel : null}
      okText={props.ok ? props.okText : "I'm sure"}
      cancelText={props.cancelText ? props.cancelText : "No"}
      >
        {props.children}
      </Popconfirm>
        
    )
}




 