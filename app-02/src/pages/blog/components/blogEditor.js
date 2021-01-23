import { useState, useEffect, useRef } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import ImageTool from '@editorjs/image';
import Underline from '@editorjs/underline';
import Checklist from '@editorjs/checklist';
import Delimiter from '@editorjs/delimiter';
import Embed from '@editorjs/embed';
import InlineCode from '@editorjs/inline-code';
import Link from '@editorjs/link';
import Marker from '@editorjs/marker';
import Quote from '@editorjs/quote';
import Table from '@editorjs/table';
import Warning from '@editorjs/warning';
import Attaches from './editorjsAttaches';
// import Attaches from '@editorjs/attaches';
// import InlineImage from 'editorjs-inline-image';

const DEFAULT_INITIAL_DATA = () => {
  return {
    time: new Date().getTime(),
    blocks: [
      {
        type: 'header',
        data: {
          text: 'This is my awesome editor!',
          level: 1,
        },
      },
    ],
  };
};

const EDITTOR_HOLDER_ID = 'editorjs';

const Editor = (props) => {
  const ejInstance = useRef();
  const [editorData, setEditorData] = useState(DEFAULT_INITIAL_DATA);

  // This will run only once
  useEffect(() => {
    if (!ejInstance.current) {
      initEditor();
    }
    return () => {
      if (ejInstance.current) {
        ejInstance.current.destroy();
        ejInstance.current = null;
      }
    };
  }, []);

  const initEditor = () => {
    const editor = new EditorJS({
      holder: EDITTOR_HOLDER_ID,
      logLevel: 'ERROR',
      data: editorData,
      onReady: () => {
        ejInstance.current = editor;
        props.onReadyEditor(editor);
      },
      autofocus: true,
      tools: {
        header: Header,
        list: List,
        underline: Underline,
        checklist: Checklist,
        delimiter: Delimiter,
        embed: Embed,
        inlineCode: InlineCode,
        marker: Marker,
        quote: Quote,
        table: Table,
        warning: Warning,
        linkTool: {
          class: Link,
          config: {
            endpoint: `${
              process.env.NODE_ENV === 'development'
                ? process.env.REACT_APP_API_URL_DEV
                : process.env.REACT_APP_API_URL_PROD
            }/pagemeta`,
          },
        },
        image: {
          class: ImageTool,
          config: {
            uploader: { uploadByFile: props.onAddImageBlobHook },
          },
        },
        attaches: {
          class: Attaches,
          config: {
            endpoint: `${
              process.env.NODE_ENV === 'development'
                ? process.env.REACT_APP_API_URL_DEV
                : process.env.REACT_APP_API_URL_PROD
            }/attachments/file`,
            field: 'file',
          },
        },
      },
    });
  };

  return (
    <>
      <div id={EDITTOR_HOLDER_ID}> </div>
    </>
  );
};

export default Editor;
