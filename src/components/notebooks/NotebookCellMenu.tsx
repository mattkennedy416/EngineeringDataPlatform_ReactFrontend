import React, { useState } from 'react';
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  CaretRightOutlined,
  InfoCircleOutlined,
  LineChartOutlined,
  TableOutlined,
  RightOutlined,
  BranchesOutlined,
  MoreOutlined,
  BugOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Menu } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];



function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Option 1', '1', <PieChartOutlined />),
  getItem('Option 2', '2', <DesktopOutlined />),
  getItem('Option 3', '3', <ContainerOutlined />),

  getItem('Navigation One', 'sub1', <MailOutlined />, [
    getItem('Option 5', '5'),
    getItem('Option 6', '6'),
    getItem('Option 7', '7'),
    getItem('Option 8', '8'),
  ]),

  getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
    getItem('Option 9', '9'),
    getItem('Option 10', '10'),

    getItem('Submenu', 'sub3', null, [getItem('Option 11', '11'), getItem('Option 12', '12')]),
  ]),
];

const NotebookCellMenu: React.FC = () => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const itemClicked = (item) => {
    console.log(item);
}


const cellTypeChildren = [
    {label: "Python", key: "cellTypePython", onClick: itemClicked} as MenuItem,
    {label: "SQL", key: "cellTypeSQL", onClick: itemClicked} as MenuItem,
    {label: "Markdown", key: "cellTypeMarkdown", onClick: itemClicked} as MenuItem
]

const optionsChildren = [
    {label: "Change Cell Type", key: "cellType", onClick: itemClicked, children: cellTypeChildren} as MenuItem,
    {label: "Clear Cell", key: "clearCell", onClick: itemClicked} as MenuItem,
    {label: "Delete Cell", key: "deleteCell", onClick: itemClicked} as MenuItem,
    {label: "Insert Cell", key: "insertCell", onClick: itemClicked} as MenuItem
]

const items2 = [
    {label: "Run", key: "run", onClick: itemClicked, icon: <CaretRightOutlined/>} as MenuItem,
    {label: "Debug", key: "debug", onClick: itemClicked, icon: <BugOutlined/>} as MenuItem,
    {label: "Plot", key: "plot", onClick: itemClicked, icon: <LineChartOutlined/>} as MenuItem,
    {label: "Table", key: "table", onClick: itemClicked, icon: <TableOutlined/>} as MenuItem,
    {label: "Expression", key: "expression", onClick: itemClicked, icon: <RightOutlined/>} as MenuItem,
    {label: "Branches", key: "branches", onClick: itemClicked, icon: <BranchesOutlined/>} as MenuItem,
    {label: "Options", key: "options", onClick: itemClicked, icon: <MoreOutlined/>, children: optionsChildren} as MenuItem
]



  return (
    <div style={{ width: 256 }}>
      {/* <Button type="primary" onClick={toggleCollapsed} style={{ marginBottom: 16 }}>
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button> */}
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        items={items2}
      />
    </div>
  );
};

export default NotebookCellMenu;