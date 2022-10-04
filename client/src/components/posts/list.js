import React, { useState, useEffect } from "react";
import { Table, Button, Popconfirm, Space } from 'antd';
import qs from 'qs';
import * as dayjs from 'dayjs'
import usePost from "../hooks/usePost";
import PostAdd from "./create";



const getRandomuserParams = (params) => ({
  results: params.pagination.pageSize,
  page: params.pagination.current,
  ...params,
});

const Post = () => {
  // const post = usePost('62f3ba36e0d703d10a4beb3a')
  // console.log('post', post)
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  const [addFormVisible, setAddFormVisiable] = useState(false);
  const [editFormVisible, setEditFormVisiable] = useState(false);
  const [editRecord, setEditRecord] = useState({});

  const fetchData = (params = {}) => {
    setLoading(true);
    // fetch(`https://randomuser.me/api?${qs.stringify(getRandomuserParams(params))}`)
    fetch(`/post?${qs.stringify(getRandomuserParams(params))}`)
      .then((res) => res.json())
      .then(({ results }) => {
        setData(results);
        setLoading(false);
        setPagination({
          ...params.pagination,
          total: 200, // 200 is mock data, you should read it from server
          // total: data.totalCount,
        });
      });
  };

  useEffect(() => {
    fetchData({
      pagination,
    });
  }, []);

  const handleTableChange = (newPagination, filters, sorter) => {
    fetchData({
      sortField: sorter.field,
      sortOrder: sorter.order,
      pagination: newPagination,
      ...filters,
    });
  };

  const onAdd = () => {
    setAddFormVisiable(true);
  }

  const onCancel = () => {
    setAddFormVisiable(false);
    setEditFormVisiable(false);
  }

  const onSave = (values) => {
    console.log('values', values)
    fetch('/post', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    })
      .then((res) => res.json())
      .then(({ results }) => {
        console.log('results', results)
        setAddFormVisiable(false);
        fetchData({
          pagination,
        });
      });
  }

  const onUpdate = (values) => {
    console.log('values', values, editRecord)
    fetch(`/post/${editRecord._id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    })
      .then((res) => res.json())
      .then(({ results }) => {
        console.log('results', results)
        setEditFormVisiable(false);
        fetchData({
          pagination,
        });
      });
  }

  const handleDelete = (key) => {
    console.log('handleDelete', key);
    fetch(`/post/${key}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    })
      .then((res) => res.json())
      .then(({ results }) => {
        console.log('results', results)
        fetchData({
          pagination,
        });
      });
  }


  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
      width: '20%',
    },
    {
      title: '摘要',
      dataIndex: 'caption',
      width: '20%',
    },
    {
      title: '创建时间',
      dataIndex: 'date',
      render: (time) => dayjs(time).format('YYYY-MM-DD'),
    },
    {
      title: '操作',
      dataIndex: 'operation',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => {
            setEditRecord(record);
            setEditFormVisiable(true);
          }}>编辑</a>
          <Popconfirm title="确认删除?" onConfirm={() => handleDelete(record._id)} okText="确认" cancelText="取消">
            <a>删除</a>
          </Popconfirm>
        </Space>
      ),
    }
  ];



  return (
    <div>
      <div className="table-toolbox">
        {addFormVisible || editFormVisible ? (
          null
        ) : (
          <div>
            <Button type="primary" onClick={onAdd}>新增</Button>
          </div>
        )}
      </div>
      {addFormVisible ? (
        <PostAdd
          onSave={onSave}
          onCancel={onCancel}
        />
      ) : editFormVisible ? (
        <PostAdd
          onSave={onSave}
          onUpdate={onUpdate}
          onCancel={onCancel}
          editable
          dataSource={editRecord}
        />
      ) : (
        <Table
          columns={columns}
          rowKey={(record) => record._id}
          dataSource={data}
          pagination={pagination}
          loading={loading}
          onChange={handleTableChange}
        />
      )}
    </div>
  )
}

export default Post;