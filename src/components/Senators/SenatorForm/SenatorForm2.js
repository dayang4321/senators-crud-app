import React, { useState, useEffect, useCallback } from 'react';


import Card from '../../UI/Card';
import LoadingIndicator from '../../UI/LoadingIndicator'
import { Form, Input, Button, Select } from 'antd';
import './SenatorForm.css';

import Axios from 'axios'


const { Option } = Select;
const layout = {
 
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};


const SenatorForm = React.memo(props => {
 
  
    //Independent state mgt
    const [inputedFirstName, setInputedFirstName] = useState('');
    const [inputedLastName, setInputedLastName] = useState('');
    const [inputedPhone, setInputedPhone] = useState('');
    const [inputedEmail, setInputedEmail] = useState('');
    const [inputedState, setInputedState] = useState('');
    const [inputedConstituency, setInputedConstituency] = useState('');
    const [fetchedStates, setFetchedStates] = useState([]);
    
    const constituencies = ['North-West','North','North-East','East','South-East', 'South','South-West', 'West', 'Central' ]
  
    useEffect(() => {
      let states = [];
      Axios.get("http://locationsng-api.herokuapp.com/api/v1/states")
        .then(
          res => {
            console.log(res.data);
            
            res.data.map(state => states.push(state.name))
            console.log(states);
            setFetchedStates(states);
          }
         
      )
      .catch(err=>console.log(err))
    },[setFetchedStates])
    
  
    const stateMenu = fetchedStates.map(state => (
      <Option value={state} key={state}>{state}</Option>
    ));
  
    const constituencyMenu = constituencies.map(constituency => (
      <Option value={constituency} key={constituency}>{constituency}</Option>
    ));
    
  
    const submitHandler = event => {
  //   event.preventDefault();
      props.addSenHandler({
        firstName: inputedFirstName,
        lastName: inputedLastName,
        phone: inputedPhone,
        email: inputedEmail,
        state: inputedState,
        constituency: inputedConstituency
      });
      ;
      // ...
    };
  
    return (
      <section className="senator-form">
        <Card>
            <Form layout={'vertical'} hideRequiredMark name="Senator Form" onFinish={submitHandler} >
        
            <Form.Item label="Senator Name" style={{ marginBottom: 0 }}>
        <Form.Item hasFeedback  name="firstName"
          rules={[{ required: true, pattern: /^[a-z ]+$/i, message: "Enter a valid First name"}]}
          style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}>
          <Input placeholder="First Name"  value={inputedFirstName} onChange={event => setInputedFirstName(event.target.value)}  />
        </Form.Item>
        <Form.Item hasFeedback  name="lastName" rules={[{ required: true, pattern: /^[a-z ]+$/i, message: "Enter a valid Last name" }]}
          style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}
        >
          <Input placeholder="Last Name" value={inputedLastName} onChange={event => setInputedLastName(event.target.value)} />
        </Form.Item>
        </Form.Item>    
            
         <Form.Item name="state" label="Senator Home State"
            rules={[{ required: true,},]} value={inputedState}>
        <Select
          placeholder="Select the senator's home state" onChange={setInputedState}  >
         {stateMenu}
        </Select>
        </Form.Item>


        <Form.Item name="constituency" label="Senator's Constituency"
            rules={[{ required: true,},]} value={inputedState}>
          <Select
            placeholder="Select the senatorial district/constituency" onChange={setInputedConstituency}  >
            {constituencyMenu}
          </Select>
        </Form.Item>

        <Form.Item name="email" label="Senator's Email" hasFeedback
          rules={[{            
          required: false, type:"email", message: "Enter a valid email address",}]}>
          <Input type="email" onChange={event => setInputedEmail(event.target.value)}/>
        </Form.Item>      

        <Form.Item name="phone" label="Phone No." hasFeedback
          rules={[{            
          required: false, pattern: /^\+?(\d.*){11,}$/, min:11,
          message: "Enter a valid phone number", 
              },]}>
          <Input type="tel"  maxLength={11} onChange={event => setInputedPhone(event.target.value)} />
        </Form.Item>
      
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit" loading={props.loading}>
                Add Senator
        </Button>
              
      
      </Form.Item>
    </Form>
  </Card>
        
      </section>
    );
  });
  
  export default SenatorForm;
  

