import React, { useRef } from 'react' ;
import Editor from '@monaco-editor/react' ;
import { useSelector, useDispatch } from 'react-redux';
import { XCircle, PlusCircle, ArrowRepeat} from 'react-bootstrap-icons' ;
import { changeTab, modifyTab, removeTab, addTab } from '../../actions/actions';

function EditorComponent(){
    const editorRef = useRef(null) ;
    
    const { currentTab, tabNumCount, tabs  } = useSelector(state => state.tabState) ;
    const dispatch = useDispatch() ;

    // functions
    const onChange = (newCode, e) => {
        dispatch(modifyTab({
            id: currentTab.id,
            code: newCode
        }));
    } ;

    const editorDidMount = (editor, monaco) => {
        editor.focus() ;
        editorRef.current = editor ;
    }

    const switchTab = (tabId) => {
        dispatch(changeTab(tabId)) ;
        editorRef.current.focus() ;
    }

    const closeTab = (tab_num) => {
        dispatch(removeTab(tab_num)) ;
    }

    const addNewTab = (event) => {
        dispatch(addTab({
            id: `tab${tabNumCount}`,
            name: `NewTab${tabNumCount}.js`,
            code: '/* enter code here */'
        })) ;
    }

    // code
    const code = tabs[currentTab.index].code ;

    const options = {
        selectOnLineNumbers: true,
        automaticLayout: true,
        minimap: {
            enabled: false
        },
        wordWrap: true,
        acceptSuggestionOnEnter: true,
        scrollbars: {
            vertical: 'hidden',
            horizontal: 'hidden'
        }
    } ;

    return (
        <>
        
            <div className="py-2 Editor-tabs-container">
                {
                    tabs.map( (value, index) => {
                        return (
                            <div key={value.id} className="Editor-tab d-inline-block pb-1 px-2 mr-2">
                                <a onClick={
                                    (e) => switchTab(value.id)
                                }>{value.name}</a>
                                <div className="Editor-button d-inline ml-2">
                                    {
                                        index ? <button onClick={ (e) => closeTab(value.id)} className="Editor-tab-close"><XCircle /></button> : '' 
                                    }
                                </div>
                            </div>
                        ) ;
                    })
                }

                <div className="Editor-newtab">
                    <button onClick={addNewTab} id="addTab"><PlusCircle size={20} /></button>
                </div>
                
                <div className="text-right apply-container">
                    <button id="applyChanges" className="btn btn-dark"><ArrowRepeat size={16} /> Apply Changes</button>
                </div>
            </div>

            <div className="editor">
                <Editor id="editorMain" defaultLanguage="javascript" defaultValue="" value={code} theme="vs-dark" options={options} onChange={onChange} onMount={editorDidMount} loading="Loading..." />
            </div>

        </>
    ) ;
}

export default EditorComponent ;