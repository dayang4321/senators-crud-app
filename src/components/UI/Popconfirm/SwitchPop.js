import React,{useState} from 'react';

import { Tooltip,  Popconfirm, message } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

export const MyPopover = props => {
 
  const [show, setShow] = useState({
    clicked: false,
    hovered: false,
  });

 const hide = () => {
      setShow({
        clicked: false,
        hovered: false,
      });
    };
  
 const handleHoverChange = visible => {
      setShow({
        hovered: visible,
        clicked: false,
      });
    };
  
 const handleClickChange = visible => {
      setShow({
        clicked: visible,
        hovered: false,
      });
    };
    const confirm = (e) => {
        console.log(e);
        if (props.confirmMsg) { message.success(props.confirmMsg) };
    props.confirmAction()
    }
    
const cancel = (e) => {
        console.log(e);
        message.error('Click on No');
      }
    

      return (
        <Tooltip
          style={{ width: 500 }}
          {...props.tipProps}
          title={props.tipTitle}
          trigger="hover"
          visible={show.hovered}
          onVisibleChange={handleHoverChange}
        >
          <Popconfirm
           
           icon={<QuestionCircleOutlined style={{color:'red'}}/>}
            trigger="click"
            visible={show.clicked}
            onVisibleChange={handleClickChange}
                  
            {...props.popProps}
            title={props.popTitle}
            onConfirm={props.confirmAction ? confirm : null}
            onCancel={hide}
            okText={props.ok ? props.okText : "Yes"}
            cancelText={props.cancelText ? props.cancelText : "No"}       

          >
          {props.children}
          </Popconfirm>
        </Tooltip>
      );
    
  }
  