
import BaseTable, { Column } from 'react-base-table'
import 'react-base-table/styles.css'

import {Dropdown, MenuProps, Space} from 'antd';
import { DownOutlined } from "@ant-design/icons";
import { Button } from 'antd';

export const NotebookTable: React.FC = () => {
    
    

    const items: MenuProps['items'] = [
        {
            key: '0',
            label: 'hello'
        }
    ]

    function hidePanel() {
        console.log("hiding table panel!");
    }


    const notebookTable = (
        <>
        <Dropdown menu={{ items }}>
        <a onClick={(e) => e.preventDefault()}>
        <Space>
            Select Plot
            <DownOutlined />
        </Space>
        </a>
        </Dropdown>


        <Button type="primary" onClick={hidePanel}>Hide</Button>
        </>
    )




    return(
        <>
         {notebookTable}
        </>
    )


}
