import React, {useState} from 'react';

import BaseTable, { Column } from 'react-base-table'
import 'react-base-table/styles.css'

import {Dropdown, MenuProps, Space} from 'antd';
import { DownOutlined } from "@ant-design/icons";
import { Button, Select, Modal } from 'antd';

import Plot from 'react-plotly.js'

export const NotebookPlot: React.FC = () => {


  
  const [showingModal, setShowingModal] = useState(false); // this seems to default to false? it works
  const [inlineDiagramWidth, setInlineDiagramWidth] = useState(320);
  const [inlineDiagramHeight, setInlineDiagramHeight] = useState(240);
  const [modalDiagramWidth, setModalDiagramWidth] = useState(1000);
  const [modalDiagramHeight, setModalDiagramHeight] = useState(800);

  console.log(inlineDiagramWidth.toString() + " -- " + inlineDiagramHeight.toString());
  console.log(modalDiagramWidth.toString() + " -- " + modalDiagramHeight.toString());

  let allLoadedData = {'x': [1,2,3],
                      'y': [2,6,3]};

  function generateScatterData(xVar, yVar) {
    return {x: allLoadedData[xVar],
            y: allLoadedData[yVar],
            type: 'scatter',
            mode: 'lines+markers',
            marker: {color: 'red'}}
  }

  function generateBarData(xVar, yVar) {
    return {x: allLoadedData[xVar],
            y: allLoadedData[yVar],
            type: 'bar'}
  }

  let currentPlots = [generateScatterData('x','y'),
                      generateBarData('x','y')]

  // {
  //   x: [1, 2, 3],
  //   y: [2, 6, 3],
  //   type: 'scatter',
  //   mode: 'lines+markers',
  //   marker: {color: 'red'},
  // },


  function handleSelectVariable(value: string) {
    console.log(value);
}

  function openModal() {
    setShowingModal(true);
  }

  function closeModal() {
    setShowingModal(false);
  }

  const inlineLayout = (
    <>

    {/* do we also need to add tabs in here so we can have multiple images per cell?z */}

            {/* <Plot
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
        layout={ {width: {diagramWidth}, height: {diagramHeight}, title: 'A Fancy Plot'} }
      /> */}

        <Plot
            data={currentPlots}
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

      <Button type="primary" onClick={openModal}>Expand</Button>
    </>
  )

  const modalLayout = (
    <>
    {/* <p>hello world!</p>

    <Button type="primary" onClick={toggleModal}>Close</Button> */}
    
    <Modal title="Basic Modal" 
          style={{top:5}}
          open={showingModal} 
          onOk={closeModal} 
          onCancel={closeModal}
          width={1200}
          footer={null}
          >
        
        <Plot
            data={currentPlots}
            layout={ {width: 1000, height: 800, title: 'A Fancy Plot'} }
          />

        
      </Modal>
    
    </>
  )

    return(
        <>


        
            {showingModal ? modalLayout : inlineLayout}
        




        </>
    )

}