
import React, {Component, useState} from "react";

import {EditorState, EditorView, basicSetup} from "@codemirror/basic-setup"
import CodeMirror from '@uiw/react-codemirror';
import {python} from '@codemirror/lang-python';
import {sql} from '@codemirror/lang-sql';
import {markdown} from '@codemirror/lang-markdown';
import { oneDarkTheme } from "@codemirror/theme-one-dark";

import { Col, Row } from 'antd';
import Button from "antd/es/button";

import { NotebookTable } from "./NotebookTable";
import {NotebookEvalConsole} from "./NotebookEvalConsole";
import { NotebookPlot } from "./NotebookPlot";

import { isConstructorDeclaration } from "typescript";
import { highlightSpecialChars } from "@codemirror/view";

import NotebookCellMenu from "./NotebookCellMenu";




// class NotebookCell extends Component {
export const NotebookCell: React.FC = (props) => {


    

    const [showPlot, setShowPlot] = useState(false);
    const [showTable, setShowTable] = useState(false);
    const [showConsole, setShowConsole] = useState(false);
    const [cellEditorHeight, setCellEditorHeight] = useState("400px");
    const [editorValue, setEditorValue] = useState(props.cellContent.cellContent);
    const [outputValue, setOutputValue] = useState("");
    const [tablesInCell, setTablesInCell] = useState([]);

    console.log(props);
    
    
    // React.useEffect(() => {
    //     const current = codeMirrorRef.current.editor.display.wrapper.style.height = "1000px";
    // })



    function onChange(newContent: string)  {
        console.log(newContent)

        const numLines = newContent.split(/\r?\n/);
        console.log(numLines.length);

        const newNumLines = Math.max(numLines.length, 8);
        const newHeight = (23*newNumLines).toString() + "px";

        // this.setState({cellEditorHeight: newHeight,
        //                 editorValue: newContent});

        setCellEditorHeight(newHeight);
        setEditorValue(newContent);
        

        // const codeMirrorRef = React.useRef();
        // const current = codeMirrorRef.current.editor.display.wrapper.style.height = "1000px";
    }
    

    function subcomponentTabSelected(selectedTab: string) {

        // close all tabs and open a new one, if a new tab has been selected
        // if the selected tab is already open, close it instead

        subcomponentTabClose();

        if (selectedTab == "plot" && !showPlot)
            setShowPlot(true);
        else if (selectedTab == "table" && !showTable)
            setShowTable(true);
        else if (selectedTab == "expression" && !showConsole)
            setShowConsole(true);

    } 

    function subcomponentTabClose() {
        // close all subcomponent tabs
        setShowPlot(false);
        setShowTable(false);
        setShowConsole(false);

    }

    function getTablesInCell() {
        return tablesInCell;
    }

    function menuItemSelected(key: string) {
        console.log(key);
        if (key === "plot" || key === "table" || key === "expression")
            subcomponentTabSelected(key);
        else if (key === "run") {
            runCell();
        }
    }

    async function runCell() {
        console.log("running! " + editorValue);

        const currentCellContent = props.cellContent;
        currentCellContent.cellContent = editorValue;

        
        const address = props.notebookMetaData.backendAddress + 'workspace/notebooks/execute'

        const res = await fetch(address, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "notebookName": props.notebookMetaData.notebookName,
                "cellContent": currentCellContent
            })
        });

        if (!res.ok) {
            throw new Error("cell execution failed");
        }

        const data = await res.json();

        console.log(data);
        
        props.setEnvironment(data.environment);
        setOutputValue(data.output);
        setTablesInCell(data.tablesInCell);
    }





    
    
    

    
    return (
        
        <>

        


        <Row>      
        <div style={{  
                        display: "grid",  
                        gridTemplateColumns: "1fr 1fr"  
                    }}>
        <CodeMirror
            value={editorValue}
            height={cellEditorHeight}
            width="600px"
            extensions={[python(), oneDarkTheme]}
            onChange={onChange}
            />
            
            <NotebookCellMenu menuItemSelected={menuItemSelected}/>
            </div>

</Row>
<Row>
            {/* <Button type="primary" onClick={() => this.subcomponentTabSelected("plot")}>Plot</Button>
            <Button type="primary" onClick={() => this.subcomponentTabSelected("table")}>Table</Button>
            <Button type="primary" onClick={() => this.subcomponentTabSelected("expression")}>Expression</Button> */}
            
            <p>{outputValue}</p>
</Row>

<Row>
        { showPlot && <NotebookPlot  getTablesInCell={getTablesInCell}></NotebookPlot> }
        { showTable && <NotebookTable notebookMetaData={props.notebookMetaData} subcomponentTabClose={subcomponentTabClose} getTablesInCell={getTablesInCell}></NotebookTable> }
        { showConsole && <NotebookEvalConsole subcomponentTabClose={subcomponentTabClose}></NotebookEvalConsole> }
</Row>
</>



      );
    
    }



// export default NotebookCell;

