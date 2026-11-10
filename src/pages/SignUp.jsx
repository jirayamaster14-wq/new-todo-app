import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import {auth, createUserWithEmailAndPassword, sendEmailVerification,  } from "../Config/firebase";


const signUp = (values) => {
  createUserWithEmailAndPassword(auth,  values.email, values.password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    console.log(user)
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(error)
  });
}



const onFinish = (values) => {
  // console.log('Success:', values);
  signUp(values)
};
const onFinishFailed = errorInfo => {
  console.log('Failed:', errorInfo);
};
const sendgmail = () => {
  sendEmailVerification(auth.currentUser)
  .then(() => {
    // Email verification sent!
    console.log('send email');
    
  });

}

const Signup = () => (
  <Form
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item
      label="FullName"
      name="FullName"
      rules={[{ required: true, message: 'Please input your FullName!' }]}
    >
      <Input />
    </Form.Item>

       <Form.Item
      label="Email"
      name="email"
      rules={[{ required: true, message: 'Please input your Email!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[{ required: true, message: 'Please input your password!' }]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item name="remember" valuePropName="checked" label={null}>
      <Checkbox>Remember me</Checkbox>
    </Form.Item>

    <Form.Item label={null}>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
   
    </Form.Item> 

   <Form.Item label={null}>
      <Button type="primary" 
       onClick={() => sendgmail()} >
        send link
      </Button>
    </Form.Item>
  </Form>
);
export default Signup;