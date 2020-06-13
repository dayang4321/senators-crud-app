import React from 'react';
import { Edit, Delete } from '@material-ui/icons';

import './SenatorsList.css';
import { IconButton } from '@material-ui/core'
import { Tooltip } from 'antd';
import { Spin } from 'antd';

const SenatorsList = React.memo (props => {

  let senateList = <p>Add senators!</p>;

  if (props.senators) {  senateList = props.senators.map(senator => (
    <li key={senator.id}>
      <p>{'Senator ' + senator.firstName + ' '+ senator.lastName + ' of ' + senator.state + ' ' + senator.constituency}</p>
      <span>
        <Tooltip title={"Edit Senator "+ senator.lastName + "'s profile"}>
        <IconButton aria-label="edit" >
        <Edit /></IconButton>
        </Tooltip>
        <Tooltip title={"Delete Senator " + senator.firstName + ' '+ senator.lastName} >
       <IconButton aria-label=""    onClick={props.onRemoveItem.bind(this, senator.id)}>
        <Delete />
        </IconButton>  
       </Tooltip>
        
       </span>
    </li>
  ))}
  return (
    <section className="senators-list">
      <h2>The Senate <span>{props.load? <Spin/>:null}</span> </h2>
      <ul>
        {senateList}
      </ul>
    </section>
  );
})


export default SenatorsList;
