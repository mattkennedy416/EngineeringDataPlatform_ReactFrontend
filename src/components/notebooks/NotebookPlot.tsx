
import BaseTable, { Column } from 'react-base-table'
import 'react-base-table/styles.css'

import {Dropdown, MenuProps, Space} from 'antd';
import { DownOutlined } from "@ant-design/icons";
import { Button, Select, Modal } from 'antd';

import Plot from 'react-plotly.js'

export const NotebookPlot: React.FC = () => {




  function handleSelectVariable(value: string) {
    console.log(value);
}

  function showModal() {
    console.log("showing full screen modal with large plot!")
  }

    return(
        <>


        {/* do we also need to add tabs in here so we can have multiple images per cell? */}
            
        
        <Plot
        data={[
          {
            x: [1, 2, 3],
            y: [2, 6, 3],
            type: 'scatter',
            mode: 'lines+markers',
            marker: {color: 'red'},
          },
          {type: 'bar', x: [1, 2, 3], y: [2, 5, 3]},
        ]}
        layout={ {width: 320, height: 240, title: 'A Fancy Plot'} }
      />


        <Select
            defaultValue="select variable"
            style={{ width: 200 }}
            onChange={handleSelectVariable}
            options={[
                {
                value: 'select variable',
                label: 'Select Variable',
                }
            ]} />

        <Select
            defaultValue="plot type"
            style={{ width: 120 }}
            onChange={handleSelectVariable}
            options={[
                {
                value: 'plot type',
                label: 'Plot Type',
                },
                {
                  value: 'scatter',
                  label: 'Scatter',
                },
                {
                  value: 'line',
                  label: 'Line',
                },
                {
                  value: 'bar',
                  label: 'Bar',
                },
            ]} />

      <Button type="primary" onClick={showModal}>Expand</Button>

      {/* <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal> */}

        </>
    )

}