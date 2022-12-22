import React, {Component, useState} from "react";
import ReactDOM from 'react-dom';

import {NotebookCell} from "./NotebookCell";
import Button from "antd/es/button";



export const Notebook: React.FC = (props) => {

    const backendAddress = "http://127.0.0.1:5000/";

    const [notebookName, setNotebookName] = useState('');
    const [notebookPath, setNotebookPath] = useState('');
    const [savedCellContents, setSavedCellContents] = useState('');
    const [cellComponents, setCellComponents] = useState([Component]);

    

    async function readNotebook() {
        console.log(props);

        const address = backendAddress + '/workspace/notebooks?notebookPath='+props.notebookPath
        const res = await fetch(address);

        if (!res.ok) {
            throw new Error("failed to read notebook");
        }

        const data = await res.json();

        console.log("loaded notebook!");
        console.log(data);

        setNotebookName(data.notebookName);
        setNotebookPath(data.notebookPath);
        setSavedCellContents(data.cellContents);

        console.log(savedCellContents);

        const newCells = [];
        for (let i=0; i<data.cellContents.length; i++) {
            newCells.push(<NotebookCell cellContent={data.cellContents[i]}/>);
        }
        setCellComponents(newCells);

        console.log(cellComponents.length);

    }


    
    return(
        <>
        <Button type="primary" onClick={() => readNotebook()}> button </Button>
        
        {/* <NotebookCell /> */}

        {cellComponents};
        
        
        
        </>
    )


}

