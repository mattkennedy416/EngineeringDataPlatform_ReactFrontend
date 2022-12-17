
import BaseTable, { Column } from 'react-base-table'
import 'react-base-table/styles.css'

import {EditorState, EditorView, basicSetup} from "@codemirror/basic-setup"
import CodeMirror from '@uiw/react-codemirror';
import {python} from '@codemirror/lang-python';
import {sql} from '@codemirror/lang-sql';
import {markdown} from '@codemirror/lang-markdown';
import { oneDarkTheme } from "@codemirror/theme-one-dark";

import {Dropdown, MenuProps, Space} from 'antd';
import { DownOutlined } from "@ant-design/icons";
import { Button } from 'antd';
import NotebookVariableDetailsTree from './NotebookVariableDetailsTree';


export const NotebookEvalConsole: React.FC = (props) => {

    function onChange(e: string) {
        console.log(e);
    }

    function evaluate() {
        console.log("evaluating code fragment!")
    }

    function hide() {
        props.subcomponentTabClose();
    }

    return(
        <>
        Code Fragment:

        <CodeMirror
            value="print('hello world!');"
            height="50px"
            width="600px"
            extensions={[python(), oneDarkTheme]}
            onChange={onChange}
            />

        Result:
        <NotebookVariableDetailsTree />

        <Button type="primary" onClick={evaluate}>Evaluate</Button>

        <Button type="primary" onClick={hide}>Close</Button>


        </>
    )

}