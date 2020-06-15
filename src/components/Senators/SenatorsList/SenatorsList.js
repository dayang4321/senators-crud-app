import React,{useState} from 'react';
import { Edit, Delete } from '@material-ui/icons';
import EditModal from '../Form Modals/EditModal'
import './SenatorsList.css';
import { IconButton } from '@material-ui/core'
import { Tooltip } from 'antd';
import { Skeleton } from 'antd';
import { Spin } from 'antd';
import { MyPopconfirm } from '../../../components/UI/Popconfirm/Popconfirm'
import {MyPopover} from '../../../components/UI/Popconfirm/SwitchPop'

const SenatorsList = React.memo(props => {
  
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [currentSenator, setCurrentSenator]=useState({})

  const onCreate = values => {
    console.log('Received values of form: ', values);
    setEditModalVisible(false);
    props.onEditItem(values, currentSenator.id, props.senators.indexOf(currentSenator))
setCurrentSenator({})
  };


  const show = (senator) => {
    setCurrentSenator(senator);
    setEditModalVisible(true);
  };
  let senateList = <p>Add senators!</p>;

  if (props.senators) {  senateList = props.senators.map(senator => (
    <li key={senator.id}>
      <p>{'Senator ' + senator.firstName + ' '+ senator.lastName + ' of ' + senator.state + ' ' + senator.constituency}</p>
      <span>
        
        <MyPopover tipTitle="Edit Senator" popTitle={"Edit Senator " + senator.lastName + "'s profile?"}
          confirmAction={
            () => show(senator)
           } >
        <IconButton aria-label="" >
        <Edit />
        </IconButton>  
      </MyPopover>
      
        <MyPopover tipTitle="Impeach Senator" popTitle={"Impeach Senator " + senator.lastName + "?"} confirmMsg={"Senator "+ senator.lastName+ " has been impeached"}
          confirmAction={props.onRemoveItem.bind(this, senator.id)} >
        <IconButton aria-label="" >
        <Delete />
        </IconButton>  
      </MyPopover>
     
      
        
       </span>
    </li>
  ))}
  return (
    <>
   {editModalVisible? <EditModal
        visible={true}
        onCreate={onCreate}
        stateMenu={props.stateMenu} constituencyMenu={props.constituencyMenu}
        initialValues={{...currentSenator }}
        
    onCancel={() => {
      setEditModalVisible(false);
    }} />: null}
    <section className="senators-list">
      <h2>The Senate <span style={{textAlign: 'right'}}>{props.load? <Spin/>:null}</span> </h2>
      <ul>
        {!props.fetchLoad ? senateList : <Skeleton loading={true} />}
      </ul>
      </section>
      </>
  );
})


export default SenatorsList;
