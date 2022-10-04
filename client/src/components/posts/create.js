import { Button, Form, Input, Select, DatePicker } from 'antd';
import React, { useEffect } from 'react';
import moment from 'moment';
const { Option } = Select;
const { TextArea } = Input;
const layout = {
  labelCol: {
    span: 2,
  },
  wrapperCol: {
    span: 22,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 2,
    span: 22,
  },
};

const dateFormat = 'YYYY-MM-DD';

const PostAdd = (props) => {
  const [form] = Form.useForm();

  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };

  const onGenderChange = (value) => {
    switch (value) {
      case 'male':
        form.setFieldsValue({
          note: 'Hi, man!',
        });
        return;

      case 'female':
        form.setFieldsValue({
          note: 'Hi, lady!',
        });
        return;

      case 'other':
        form.setFieldsValue({
          note: 'Hi there!',
        });
    }
  };

  const onFinish = (values) => {
    console.log(values);
    if (props.editable) {
      props.onUpdate(values);
    } else {
      props.onSave(values);
    }
  };

  const onCancel = () => {
    props.onCancel();
  };

  const onFill = () => {
    form.setFieldsValue({
      note: 'Hello world!',
      gender: 'male',
    });
  };

  useEffect(() => {
    console.log('post edit', props)
    if (props.editable) {
      form.setFieldsValue({
        ...props.dataSource,
        date: moment(props.dataSource.date, dateFormat)
      });
    }
  },[])

  return (
    <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
      <Form.Item
        name="title"
        label="标题"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="date"
        label="时间"
        rules={[
          {
            required: false,
          },
        ]}
      >
        <DatePicker onChange={onChange} placeholder="选择发布时间" />
      </Form.Item>
      <Form.Item
        name="caption"
        label="摘要"
        rules={[
          {
            required: false,
          },
        ]}
      >
        <TextArea rows={4} />
      </Form.Item>
      <Form.Item
        name="content"
        label="内容"
        rules={[
          {
            required: false,
          },
        ]}
      >
        <TextArea rows={4} />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          保存
        </Button>
        <Button htmlType="button" onClick={onCancel} style={{marginLeft: 12}}>
          取消
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PostAdd;