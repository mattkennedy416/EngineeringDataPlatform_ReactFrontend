import React, {Component, useState} from "react";
import ReactDOM from 'react-dom';

import NotebookCell from "./NotebookCell";
import Button from "antd/es/button";



export const Notebook: React.FC = (props) => {

    const backendAddress = "http://127.0.0.1:5000/";

    const [notebookName, setNotebookName] = useState('');
    const [notebookPath, setNotebookPath] = useState('');
    const [savedCellContents, setSavedCellContents] = useState('');

    async function readNotebook() {
        console.log(props);

        const address = backendAddress + '/workspace/notebooks?notebookPath='+props.notebookPath
        const res = await fetch(address);

        if (!res.ok) {
            throw new Error("failed to read notebook");
        }

        const data = await res.json();

        setNotebookName(data.notebookName);
        setNotebookPath(data.notebookPath);
        setSavedCellContents(data.cellContents);

        console.log(savedCellContents);

    }

    
    return(
        <>
        <Button type="primary" onClick={() => readNotebook()}> button </Button>
        
        <NotebookCell />

        <NotebookCell />
        
        </>
    )


}

