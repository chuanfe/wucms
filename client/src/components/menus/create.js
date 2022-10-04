import { Button, Form, Input, Select, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import React, { useEffect } from 'react';
import moment from 'moment';
import axios from 'axios';

const URL = process.env.REACT_APP_SERVER_URL;

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

const Create = (props) => {
  const [form] = Form.useForm();

  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };

  const onFinish = (values) => {
    console.log(values);
    if (props.editable) {
      props.onUpdate(values);
    } else {
      onSave(values);
    }
  };

  const onCancel = () => {
    props.onCancel();
  };

  const onUploadChange = (info) => {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }

    if (info.file.status === 'done') {
        console.log('info', info)
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const normFile = (e) => {
    console.log('Upload event:', e);
    return e.file.response?.file_url
  }

  const onSave = (values) => {
    axios.post(`${URL}/category/add`, values).then((res) => {
        console.log('values', values)
    })
  }

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
        label="栏目名称"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="key"
        label="栏目ID"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="parentKey"
        label="栏目父级ID"
      >
        <Input />
      </Form.Item>
      {/* <Form.Item
        name="date"
        label="时间"
        rules={[
          {
            required: false,
          },
        ]}
      >
        <DatePicker onChange={onChange} placeholder="选择发布时间" />
      </Form.Item> */}
      <Form.Item
        name="image"
        label="栏目图片"
        rules={[
          {
            required: false,
          },
        ]}
        getValueFromEvent={normFile}
      >
        <Upload name='file' action="http://localhost:5000/upload/file" onChange={onUploadChange}>
    <Button icon={<UploadOutlined />}>点击上传</Button>
  </Upload>
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

export default Create;