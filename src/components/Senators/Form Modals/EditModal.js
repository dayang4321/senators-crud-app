import React, { useState } from 'react';
import { Button, Modal, Form, Input, Radio,Select } from 'antd';

const EditModal = (props) => {
    const [form] = Form.useForm();
    console.log(props.initialValues);
   const initValues = props.initialValues;
  return (
    <Modal
      visible={props.visible}
      title="Edit Senator Profile"
      okText="Save"
      cancelText="Cancel"
      onCancel={props.onCancel}
      onOk={() => {
          form
              .validateFields()
              .then(values => {
            
                  props.onCreate(values);
           
          //         form.setFieldsValue({firstName: initValues.firstName,
          //             lastName: initValues.lastName,
          //             state: initValues.state,
          //             constituency: initValues.constituency,
          //             phone: initValues.phone,
          //             email: initValues.email})
             
           })
          .catch(info => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
              form={form}
              
        layout="vertical"
        hideRequiredMark name="Senator Edit Form"
        initialValues={
      {firstName: initValues.firstName,
        lastName: initValues.lastName,
        state: initValues.state,
        constituency: initValues.constituency,
        phone: initValues.phone,
        email: initValues.email}
        }
      >

        <Form.Item  shouldUpdate label="Senator Name" style={{ marginBottom: 0 }}>
        <Form.Item hasFeedback  name="firstName"
          rules={[{ required: true, pattern: /^[a-z ]+$/i, message: "Enter a valid First name"}]}
          style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}>
          <Input placeholder="First Name"    />
        </Form.Item>
        <Form.Item hasFeedback  name="lastName" rules={[{ required: true, pattern: /^[a-z ]+$/i, message: "Enter a valid Last name" }]}
          style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }} >
          <Input placeholder="Last Name" ></Input >
        </Form.Item>
        </Form.Item>    

        <Form.Item  shouldUpdate  name="state" label="Senator Home State"
            rules={[{ required: true}]} >
        <Select  
          placeholder="Select the senator's home state" >
         {props.stateMenu}
        </Select>
        </Form.Item>
        <Form.Item  shouldUpdate name="constituency" label="Senator's Constituency" 
            rules={[{ required: true}]} >
          <Select
            placeholder="Select the senatorial district/constituency"  >
            {props.constituencyMenu}
          </Select>
        </Form.Item>

        <Form.Item  shouldUpdate name="email" label="Senator's Email" hasFeedback 
          rules={[{            
          required: false, type:"email", message: "Enter a valid email address",}]}>
          <Input type="email" />
        </Form.Item>      

        <Form.Item  shouldUpdate name="phone" label="Phone No." hasFeedback 
          rules={[{            
          required: false, pattern: /^\+?(\d.*){11,}$/, min:11,
          message: "Enter a valid phone number", 
              },]}>
          <Input type="tel"  maxLength={11}/>
        </Form.Item>

      </Form>
    </Modal>
  );
};

export default EditModal