import React, { useState } from 'react';
import { Input, Button, Form, Select } from 'antd';

function AddEvent() {
    const [form] = Form.useForm();
    return (
        <div className="max-w-md mx-auto mt-10 p-5 border rounded shadow-lg bg-white">
            <Form
                form={form}
                layout='vertical'
                onFinish={(values) => console.log(values)}
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
                    label='Event Date'
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
                    label='Event Time'
                    name='eventTime'
                    rules={[
                        {
                            required: true,
                            message: 'Please input the event time!',
                        },
                    ]}
                >
                    <Input type='time' className="w-full px-3 py-2 border rounded" />
                </Form.Item>
                <Form.Item
                    label='Event Location'
                    name='eventLocation'
                    rules={[
                        {
                            required: true,
                            message: 'Please input the event location!',
                        },
                    ]}
                >
                    <Input className="w-full px-3 py-2 border rounded" />
                </Form.Item>
                <Form.Item
                    label='Event Type'
                    name='eventType'
                    rules={[
                        {
                            required: true,
                            message: 'Please select the event type!',
                        },
                    ]}
                >
                    <Select className="w-full px-3 py-2 border rounded">
                        <Select.Option value='online'>Online</Select.Option>
                        <Select.Option value='offline'>Offline</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button type='primary' htmlType='submit' className="w-full px-3 py-2 mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded">
                        Add Event
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default AddEvent;
