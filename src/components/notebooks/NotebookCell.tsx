
import React, {Component} from "react";

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



class NotebookCell extends Component {


    constructor(props) {
        super(props);
        this.state = {showPlot: false,
                        showTable: false,
                        showConsole: false}
    }


    onChange(newContent) {
        console.log(newContent)
    }
    

    subcomponentTabSelected = (selectedTab) => {

        // close all tabs and open a new one, if a new tab has been selected
        // if the selected tab is already open, close it instead

        let newStates = {showPlot: false,
                        showTable: false,
                        showConsole: false}
        if (selectedTab == "plot" && !this.state.showPlot)
            newStates.showPlot = true;
        else if (selectedTab == "table" && !this.state.showTable)
            newStates.showTable = true;
        else if (selectedTab == "console" && !this.state.showConsole)
            newStates.showConsole = true;

        this.setState(newStates);

    } 

    subcomponentTabClose = () => {
        // close all subcomponent tabs

        this.setState({showPlot: false,
            showTable: false,
            showConsole: false});
    }




    
    
    

    render() {

    
    return (
        
        <>

        <Row>      
        <CodeMirror
            value="print('hello world!');"
            height="200px"
            width="600px"
            extensions={[python(), oneDarkTheme]}
            onChange={this.onChange}
            />

</Row>
<Row>
            <Button type="primary" onClick={() => this.subcomponentTabSelected("plot")}>Plot</Button>



            <Button type="primary" onClick={() => this.subcomponentTabSelected("table")}>Table</Button>

            <Button type="primary" onClick={() => this.subcomponentTabSelected("console")}>Evaluate</Button>
            
</Row>

<Row>
        { this.state.showPlot && <NotebookPlot></NotebookPlot> }
        { this.state.showTable && <NotebookTable subcomponentTabClose={this.subcomponentTabClose}></NotebookTable> }
        { this.state.showConsole && <NotebookEvalConsole subcomponentTabClose={this.subcomponentTabClose}></NotebookEvalConsole> }
</Row>
</>



      );
    
    }
}


export default NotebookCell;

