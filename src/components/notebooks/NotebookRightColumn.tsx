

import NotebookEnvTree from "./NotebookEnvTree";
import NotebookSources from "./NotebookSources";



const NotebookRightColumn: React.FC = () => {


    return(
        <>
        <p>Environment Variables</p>
          <NotebookEnvTree></NotebookEnvTree>

          <p>Sources and Connections</p>
          <NotebookSources/>
        
        </>
    )


}

export default NotebookRightColumn;