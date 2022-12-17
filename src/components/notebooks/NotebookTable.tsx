
import React from 'react';

import BaseTable, { Column } from 'react-base-table'
import 'react-base-table/styles.css'

import {Dropdown, MenuProps, Space} from 'antd';
import { DownOutlined } from "@ant-design/icons";
import { Button } from 'antd';

export const NotebookTable: React.FC = (props) => {
    
    // propTypes: {
    //     subcomponentTabClose: React.PropTypes.func
    // }
    

    const items: MenuProps['items'] = [
        {
            key: '0',
            label: 'hello'
        }
    ]

    function hidePanel() {
        console.log("hiding table panel!");
        props.subcomponentTabClose();
    }


    const notebookTable = (
        <>
        <Dropdown menu={{ items }}>
        <a onClick={(e) => e.preventDefault()}>
        <Space>
            Select Variable
            <DownOutlined />
        </Space>
        </a>
        </Dropdown>


        <Button type="primary" onClick={hidePanel}>Hide</Button>

        <BaseTable data={[{"id": 0, "col0": "c0", "col1": "c1"}, {"id": 1, "col0": "row1", "col1": "row1"}]} width={600} height={400}>
        <Column key="col0" dataKey="col0" width={100} />
        <Column key="col1" dataKey="col1" width={100} />
        
        </BaseTable>
        </>

        
    )




    return(
        <>
         {notebookTable}
        </>
    )


}
