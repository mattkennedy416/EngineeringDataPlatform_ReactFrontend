
import React, {useState} from 'react';

import BaseTable, { Column } from 'react-base-table'
import 'react-base-table/styles.css'

import {Dropdown, MenuProps, Space} from 'antd';
import { DownOutlined } from "@ant-design/icons";
import { Button } from 'antd';
import { Select } from 'antd';

export const NotebookTable: React.FC = (props) => {
    
    const [tableData, setTableData] = useState([]);
    const [tableHeaders, setTableHeaders] = useState([]);


    async function selectNewVariableToShow(value: string) {
        console.log(value + props.notebookMetaData.notebookName);

        const address = props.notebookMetaData.backendAddress + 'workspace/notebooks/inspect'

        const res = await fetch(address, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "notebookName": props.notebookMetaData.notebookName,
                "type": "tableView",
                "tableView": {"variable": value,
                                "maxRows": -1}
            })
        });

        const data = await res.json();
        console.log(data);

        setTableData(data.data);
        setTableHeaders(data.headers);
    }
    



    function hidePanel() {
        console.log("hiding table panel!");
        props.subcomponentTabClose();
    }

    function formatAvailableTableVariables() {
        let vars = props.getTablesInCell();
        let options = [];
        for (let i=0; i<vars.length; i++) {
          options.push({value: vars[i], label: vars[i]});
        }
        return options
      }

      const notebookColumns = [<Column key="col0" dataKey="col0" width={100} />
      ,<Column key="col1" dataKey="col1" width={100} />]

      function generateColumnComponents() {
        
        const colComponents = [];
        for (let i=0; i<tableHeaders.length; i++) {
            colComponents.push(<Column key={tableHeaders[i]} dataKey={tableHeaders[i]} width={100} />)
        }
        return colComponents;
        
      }

    const notebookTable = (
        <>

        <Select
            defaultValue="lucy"
            style={{ width: 120 }}
            onChange={selectNewVariableToShow}
            options={formatAvailableTableVariables()} />


        <Button type="primary" onClick={hidePanel}>Hide</Button>

        <BaseTable style={{color:'green'}} data={tableData} width={600} height={400}>
        
        {generateColumnComponents()};
        
        </BaseTable>
        </>

        
    )




    return(
        <>
         {notebookTable}
        </>
    )


}
