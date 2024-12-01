import { useState, useRef } from 'react'
import Editor from "@monaco-editor/react"
import * as Y from "yjs"
import { WebrtcProvider } from "y-webrtc"
import { MonacoBinding } from "y-monaco"

function App() {
  const editorRef = useRef(null);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
    const doc = new Y.Doc(); 
    const provider = new WebrtcProvider("test-room", doc);
    const type = doc.getText("monaco");
    const binding = new MonacoBinding(type, editorRef.current.getModel(), new Set([editorRef.current]), provider.awareness);
    
    // ADD THIS BLOCK - Keyboard Shortcuts for Formatting
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyB, () => {
      const selection = editor.getSelection();
      const selectedText = editor.getModel().getValueInRange(selection);
      editor.executeEdits("", [{
        range: selection,
        text: `**${selectedText}**`
      }]);
    });

    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyI, () => {
      const selection = editor.getSelection();
      const selectedText = editor.getModel().getValueInRange(selection);
      editor.executeEdits("", [{
        range: selection,
        text: `*${selectedText}*`
      }]);
    });
    // END OF NEW BLOCK
  }

  return (
    // REPLACE THE EXISTING RETURN WITH THIS
    <div>
      <div style={{
        padding: '10px', 
        backgroundColor: '#080707',
        textAlign: 'center'
      }}>
        Formatting Shortcuts:
        <br />
        Bold: Ctrl/Cmd + B
        <br />
        Italic: Ctrl/Cmd + I
        <br />
      </div>
      <Editor
        height="calc(100vh - 100px)"
        width="100vw"
        theme="vs-dark"
        onMount={handleEditorDidMount}
        defaultLanguage="markdown"
      />
    </div>
  )
}

export default App