import React, { useState } from 'react';
import { Form, Input, Button, Select, Upload, notification } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import server from '../../utils/server';
import axios from 'axios';
import { useCookies } from 'react-cookie';

function AddEvent() {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [event, setEvent] = useState({});
    const [cookies] = useCookies(['x-auth-token']);


    const handleFileChange = (info) => {
        const { file } = info;
        if (file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (file.status === 'done' || file.status === 'error') {
            setLoading(false);
        }
    };

    const onFinish = async (values) => {
        const { eventPoster } = values;
        const base64Image = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(eventPoster[0].originFileObj);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });

        setEvent({ ...values, eventPoster: " ", participants: [] });
        console.log(event);

        try {
            setLoading(true);
            const response = await axios.post(`${server}/api/user/add-event`, event, {
                headers: {
                    'x-auth-token': cookies['x-auth-token'],
                },
            });
            notification.success({
                message: 'Event Added',
                description: 'Event has been added successfully',
            });
            console.log(response);
            setLoading(false);
        }
        catch (error) {
            console.error(error);
            setLoading(false);
            notification.error({
                message: 'Failed to add event',
                description: 'An error occurred while adding the event',
            });
        }

    };


    return (
        <div className="max-w-md mx-auto mt-10 p-5 border rounded shadow-lg bg-white">
            <Form
                form={form}
                layout='vertical'
                name='addEvent'
                onFinish={onFinish}
            >
                <Form.Item
                    label='Event Name'
                    name='eventName'
                    rules={[
                        {
                            required: true,
                            message: 'Please input the event name!',
                        },
                    ]}
                >
                    <Input className="w-full px-3 py-2 border rounded" />
                </Form.Item>
                <Form.Item
                    label='Event Description'
                    name='eventDescription'
                    rules={[
                        {
                            required: true,
                            message: 'Please input the event description!',
                        },
                    ]}
                >
                    <Input.TextArea className="w-full px-3 py-2 border rounded" />
                </Form.Item>
                <Form.Item
                    label='Event Details'
                    name='eventDetails'
                    rules={[
                        {
                            required: true,
                            message: 'Please input the event details!',
                        },
                    ]}
                >
                    <Input.TextArea className="w-full px-3 py-2 border rounded" />
                </Form.Item>

                <Form.Item
                    label='Initiative Deadline'
                    name='eventDate'
                    rules={[
                        {
                            required: true,
                            message: 'Please input the event date!',
                        },
                    ]}
                >
                    <Input type='date' className="w-full px-3 py-2 border rounded" />
                </Form.Item>

                <Form.Item
                    label='Event Tags'
                    name='eventTags'
                    rules={[
                        {
                            required: true,
                            message: 'Please input the event tags!',
                        },
                    ]}
                >
                    <Select
                        mode='tags'
                        style={{ width: '100%' }}
                        tokenSeparators={[',']}
                        placeholder='Enter tags'
                    ></Select>
                </Form.Item>

                <Form.Item
                    label='Helping'
                    name='helping'
                    rules={[
                        {
                            required: true,
                            message: 'Please input the helped parties!',
                        },
                    ]}
                >
                    <Select
                        mode='tags'
                        style={{ width: '100%' }}
                        tokenSeparators={[',']}
                        placeholder='Enter helped parties'
                    ></Select>
                </Form.Item>

                <Form.Item
                    label='Event Poster'
                    name='eventPoster'
                    rules={[
                        {
                            required: true,
                            message: 'Please upload the event poster!',
                        },
                    ]}
                    valuePropName="fileList"
                    getValueFromEvent={e => Array.isArray(e) ? e : e && e.fileList}
                >
                    <Upload
                        name="file"
                        listType="picture"
                        onChange={handleFileChange}
                        beforeUpload={() => false} // Prevent automatic upload
                    >
                        <Button icon={<UploadOutlined />} className="w-full px-3 py-2 border rounded">
                            Click to Upload
                        </Button>
                    </Upload>
                </Form.Item>
                <Form.Item>
                    <Button loading={loading} type='primary' htmlType='submit' className="w-full px-3 py-2 mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded">
                        Add Event
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default AddEvent;
