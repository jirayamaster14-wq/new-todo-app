import { useEffect, useState } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { auth, signInWithEmailAndPassword, onAuthStateChanged, signOut, sendPasswordResetEmail, signInWithPopup, GoogleAuthProvider, googleProvider } from "../Config/firebase";

const signin = (values) => {
  signInWithEmailAndPassword(auth, values.email, values.password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(user);

    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage)
    });
}

const onFinish = (values) => {
  // console.log('Success:', values);
  signin(values)
};
const onFinishFailed = errorInfo => {
  console.log('Failed:', errorInfo);
};


const login = () => {

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user;
        console.log(uid)
      } else {
        // User is signed out
        console.log("user not found!")
      }
    });
  }, [])


  const onclick = () => {
    signOut(auth).then(() => {
      console.log("signout succesfull");

    }).catch((error) => {


    });

  }

  const resetpass = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        console.log("reset email sent");

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);

      });
  }

  const signinWithgoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {

        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        const user = result.user;
        console.log(user);

      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorMessage);

      });

  }

  return (


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
        <Button type="primary" onClick={() => onclick()}>
          Signout
        </Button>
      </Form.Item>

      <Form.Item label={null}>
        <Button type="primary" onClick={() => resetpass()}>
          reset Password
        </Button>
      </Form.Item>

      <Form.Item label={null}>
        <Button type="primary" onClick={() => signinWithgoogle()}>
          sign in With Google
        </Button>
      </Form.Item>




    </Form>




  )
}
export default login;