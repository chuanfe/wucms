import React, { useState } from "react"
import { Outlet, useNavigate } from 'react-router-dom';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
const { Header, Sider, Content } = Layout;
const LayoutWrap = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const onClick = (item, v) => {
    console.log('onClick', item, v)
    navigate(item.key)
  }
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">野生葆后台管理中心</div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          onClick={onClick}
          items={[
            {
              key: '/home',
              icon: <UserOutlined />,
              label: '首页',
            },
            {
              key: '/user',
              icon: <UserOutlined />,
              label: '用户管理',
            },
            {
              key: '/categories',
              icon: <UserOutlined />,
              label: '栏目分类',
            },
            {
              key: '/posts',
              icon: <VideoCameraOutlined />,
              label: '产品管理',
            },
            {
              key: '/news',
              icon: <UploadOutlined />,
              label: '新闻列表',
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
          }}
        >
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

export default LayoutWrap