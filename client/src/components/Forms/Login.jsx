import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, notification } from 'antd';
import axios from 'axios';
import server from '../../utils/server';
import { useCookies } from "react-cookie";
import { useUser } from '../../auth/UserContext';
import { useNavigate, Link } from 'react-router-dom';

const App = () => {
    const [cookies, setCookie] = useCookies(["x-auth-token"]);
    const { updateUser } = useUser();
    const navigate = useNavigate();

    const onFinish = async (values) => {
        console.log('Received values of form: ', values);
        try {
            const res = await axios.post(`${server}/api/user/login`, values);
            if (res?.data?.success) {
                updateUser(res?.data?.user);
                notification.success({
                    message: 'Success',
                    description: res?.data?.message,
                });
                setCookie("x-auth-token", res?.data?.token, {
                    path: "/",
                    maxAge: 3600 * 24 * 7,
                    sameSite: true,
                });
                navigate('/dashboard');
            } else {
                notification.error({
                    message: 'Error',
                    description: res?.data?.message,
                });
            }
        } catch (error) {
            console.log(error)
            notification.error({
                message: 'Error',
                description: error?.response?.data?.message || 'Something went wrong',
            });
        }
    };
    return (
        <Form
            name="normal_login"
            className="login-form"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
        >
            <Form.Item
                name="email"
                rules={[
                    {
                        required: true,
                        message: 'Please input your E-mail!',
                    },
                    {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                    }
                ]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Password!',
                    },
                ]}
            >
                <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    placeholder="Password"
                />
            </Form.Item>
            <Link className="login-form-forgot" >
                Forgot password?
            </Link>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button w-full rounded-full">
                    Log in
                </Button>
                <div className='text-center my-2'>Or</div>

                <Link to='/register'>
                    <Button type="primary" htmlType="submit" className="login-form-button w-full rounded-full bg-white text-black border border-black hover:text-white hover:bg-blue-600 hover:border-blue-600">
                        New to EcoEmpower? Join now
                    </Button>
                </Link>
            </Form.Item>
            <Form.Item>
            </Form.Item>
        </Form>
    );
};
export default App;