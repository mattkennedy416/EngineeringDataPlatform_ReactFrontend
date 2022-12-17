
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
import { isConstructorDeclaration } from "typescript";



class NotebookCell extends Component {


    constructor(props) {
        super(props);
        this.state = {showPlot: false,
                        showTable: false,
                        showConsole: false}
    }


    onChange(e) {
        console.log(e)
    }
    

    buttonSelectPlotTab = () => {
        this.setState({showPlot: true,
                        showTable: false,
                        showConsole: false})
    } 

    dropdownSelectPlot() {
        alert('selected item to plot!');
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
            <Button type="primary" onClick={this.buttonSelectPlotTab}>Plot</Button>



            <Button type="primary" onClick={this.buttonSelectPlotTab}>Table</Button>

            <Button type="primary" onClick={this.buttonSelectPlotTab}>Console</Button>
            
</Row>

<Row>
        { this.state.showPlot && <NotebookTable></NotebookTable> }
</Row>
</>



      );
    
    }
}


export default NotebookCell;

