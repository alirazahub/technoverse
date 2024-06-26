import React, { useState } from 'react';
import axios from 'axios';
import {
    Button,
    Form,
    Select,
    Input,
    DatePicker,
    notification,
    Row, Col
} from 'antd';
import server from '../../utils/server';
import { useNavigate, Link } from 'react-router-dom';


const App = () => {
    const [form] = Form.useForm();
    const { Option } = Select;
    const navigate = useNavigate();


    const onFinish = async (values) => {
        console.log('Received values of form: ', values);
        try {
            const res = await axios.post(`${server}/api/user/register`, values);
            if (res?.data?.success) {
                notification.success({
                    message: 'Success',
                    description: res?.data?.message,
                });
                form.resetFields();
                navigate('/login');
            } else {
                notification.error({
                    message: 'Error',
                    description: res?.data?.message,
                });
            }
        } catch (error) {
            notification.error({
                message: 'Error',
                description: error?.response?.data?.message,
            });
        }
    };
    return (
        <Form
            layout="vertical"
            form={form}
            name="register"
            onFinish={onFinish}
            style={{
                maxWidth: 600,
            }}
            scrollToFirstError
        >
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        label="First Name"
                        name="fName"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your first name!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label="Last Name"
                        name="lName"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your last name!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        label="Date of Birth"
                        name="dateOfBirth"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your date of birth!',
                            },
                        ]}
                    >
                        <DatePicker className='w-[100%]' />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="gender"
                        label="Gender"
                        rules={[
                            {
                                required: true,
                                message: 'Please select your gender!',
                            },
                        ]}
                    >
                        <Select placeholder="Select your gender">
                            <Option value="male">Male</Option>
                            <Option value="female">Female</Option>
                            <Option value="other">Other</Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="email"
                        label="E-mail"
                        rules={[
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                            {
                                required: true,
                                message: 'Please input your E-mail!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="phone"
                        label="Phone Number"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your phone number!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                        hasFeedback
                    >
                        <Input.Password />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="confirm"
                        label="Confirm Password"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('The new password that you entered do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                </Col>
            </Row>

            <Form.Item>
                <Button type="primary" htmlType="submit" className='w-full rounded-full'>
                    Register
                </Button>
                <Link className='text-center' to='/login'>
                    <div>Already on EcoEmpower? Log in</div>
                </Link>
            </Form.Item>
        </Form>
    );
};
export default App;