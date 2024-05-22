import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { GetRequest, PostRequest } from '../api';
import { useAtom } from 'jotai';
import { Editor, EditorState, RichUtils, AtomicBlockUtils } from 'draft-js';
import './custom.css';
import 'draft-js/dist/Draft.css';
import FloatingActionButtons from './floating';


export default function Write () {
    const navigate = useNavigate();
    const [userData] = useAtom(authUser)
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
    const [cursorPosition, setCursorPosition] = useState(null);
    const [showToolbar, setShowToolbar] = useState();
    const editorContainerRef = useRef(null);
    const editorRef = useRef(null);
    const toolbarRef = useRef(null);
    const menuRef = useRef(null);
    const fileInputRef = useRef(null);
  
  
    const handleKeyCommand = (command, state) => {
      const newState = RichUtils.handleKeyCommand(state, command);
      if (newState) {
        setEditorState(newState);
        return 'handled';
      }
      return 'not-handled';
    };


    const handleEditorChange = (state) => {
        const contentState = state.getCurrentContent();
        const selection = state.getSelection();
        const blockKey = selection.getStartKey();
        const block = contentState.getBlockForKey(blockKey);
        const blockText = block.getText();
        const blockType = block.getType();
        setShowToolbar(!selection.isCollapsed());

        if (!selection.isCollapsed() && toolbarRef.current) {
          const selectionObj = window.getSelection();
          if (selectionObj.rangeCount === 0) return;
          const range = window.getSelection().getRangeAt(0);
          const rect = range.getBoundingClientRect();
          const editorRect = editorContainerRef.current.getBoundingClientRect();
          const toolbar = toolbarRef.current;
          toolbar.classList.remove('hidden');
          toolbar.classList.add('flex');
          toolbar.style.position = 'absolute'
          toolbar.style.top = `${rect.top - editorRect.top - 40}px`;
          toolbar.style.left = `${rect.left - editorRect.left}px`;
        } else {
            toolbarRef.current.classList.add('hidden');
            toolbarRef.current.classList.remove('flex');
        }
        const orderedListMatch = blockText.match(/^(\d+)\.\s$/);
        if (orderedListMatch && blockType !== 'ordered-list-item') {
            const newState = RichUtils.toggleBlockType(state, 'ordered-list-item');
            setEditorState(newState);
            return;
        }
        const unorderedListMatch = blockText.match(/^(-|\*)$/);
        if (unorderedListMatch && blockType !== 'unordered-list-item') {
            const newState = RichUtils.toggleBlockType(state, 'unordered-list-item');
            setEditorState(newState);
            return;
        }
        setEditorState(state);
        updateCursorPosition(state);
      };

      const updateCursorPosition = (state) => {
        const selectionObj = window.getSelection();
        const selection = state.getSelection();
        if (selectionObj.rangeCount === 0) return;
        const range = selectionObj.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        const editorRect = editorContainerRef.current.getBoundingClientRect();
        const currentContent = state.getCurrentContent();
        const blockKey = selection.getStartKey();
        const block = currentContent.getBlockForKey(blockKey)
        const blockText = block.getText();
        if (blockText.trim() === '') {
            if (menuRef.current) {
                menuRef.current.style.display = 'block';
                menuRef.current.style.top = `${Math.abs(rect.top - editorRect.top + window.scrollY)}px`;
                menuRef.current.style.left = `-10px`;
            }
        } else {
            if (menuRef.current) {
                menuRef.current.style.display = 'none';
            }
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            updateCursorPosition(editorState);
          };
          window.addEventListener('scroll', handleScroll);
      
          return () => {
            window.removeEventListener('scroll', handleScroll);
          };
    }, [editorState]);

  
    const _onBoldClick = () => {
        setEditorState(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
    };

    const _onItalicClick = () => {
        setEditorState(RichUtils.toggleInlineStyle(editorState, 'ITALIC'));
    }

    const onLinkClick = () => {
        setEditorState(RichUtils.toggleLink(editorState, editorState.getSelection(), 'customlink.com'));
    }

    const onHeader = () => {
        setEditorState(RichUtils.toggleBlockType(editorState, 'header-three'));
    }
    
    const onBlockquoteClick = () => {
        setEditorState(RichUtils.toggleBlockType(editorState, 'blockquote'));
    }
  
    const handleAddImage = () => {
        fileInputRef.current.click();
    };

    const onFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const url = e.target.result;
            insertImage(url);
          };
          reader.readAsDataURL(file);
        }
    };

    const insertImage = (url) => {
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity('IMAGE', 'IMMUTABLE', { src: url, caption: '' });
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, ' ');
        setEditorState(EditorState.forceSelection(newEditorState, newEditorState.getCurrentContent().getSelectionAfter()));
    };

    const blockRendererFn = (contentBlock) => {
        const type = contentBlock.getType();
        if (type === 'atomic') {
            return {
                component: Media,
                editable: false,
            };
        }
        return null;
    }

    const Media = (props) => {
        const entity = props.contentState.getEntity(props.block.getEntityAt(0));
        const { src, caption } = entity.getData();
        const type = entity.getType();
        let media;

        if (type === 'IMAGE') {
            media = (
                <div>
                    <img src={src} style={{ maxWidth: '100%' }} alt="media" />
                    <input
                        type="text" 
                        value={caption}
                        placeholder='Enter caption'
                        onChange={(e) => handleCaptionChange(e, props.block.getEntityAt(0))}
                        style={{ fontSize: '12px', textAlign: 'center', width: '100%', marginTop: '5px' }}
                    />
                </div>
            );
            
        }
        return media;
    }

    const handleCaptionChange = (e, entityKey) => {
        const newCaption = e.target.value;
        const contentState = editorState.getCurrentContent();
        const contentStateWithUpdateEntity = contentState.mergeEntityData(entityKey, { caption: newCaption });
        const newEditorState = EditorState.push(editorState, contentStateWithUpdateEntity, 'apply-entity');
        setEditorState(newEditorState);
    }
  
    const handleAddEmbed = () => {
      // Logic to add embed
    };
    
    const handleAddCode = () => {
      // Logic to add code block
    };
    return (
        <>
            <div className='mt-24 mx-auto w-4/5'>
                <div className='editor p-6 text-lg relative text-black bg-white' ref={editorContainerRef} >
                        <div ref={toolbarRef} className='hidden z-10 space-x-2 flex-row w-fit items-center px-2 shadow-inner rounded-md bg-slate-800 text-white'>
                            <button onClick={_onBoldClick} className='flex p-1 text-xl font-manrope'>B</button>
                            <button onClick={_onItalicClick} className='flex p-1 italic font-sans'>
                                i
                            </button>
                            <button onClick={onLinkClick} className='flex p-1'>
                                <span className="prime--link"></span>
                            </button>
                            <button onClick={onHeader} className='flex p-1'>
                                <span className="jam--header"></span>
                            </button>
                            <button onClick={onBlockquoteClick} className='flex p-1'>
                                <span className="f7--quote-bubble"></span>
                            </button>
                        </div>
                        <FloatingActionButtons
                            onAddImage={handleAddImage}
                            onAddEmbed={handleAddEmbed}
                            onAddCode={handleAddCode}
                            ref={menuRef}
                        />
                        <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={onFileChange}
                        />
                    <Editor
                        editorState={editorState}
                        onChange={handleEditorChange}
                        handleKeyCommand={handleKeyCommand}
                        ref={editorRef}
                        blockRendererFn={blockRendererFn}
                        placeholder='Tell your story here...'
                        spellCheck={true}
                        autoCapitalize='true'
                        autoCorrect='true'
                    />
                    {cursorPosition && (
                        <div className="cursor-info">
                            Line: {cursorPosition.line}, Offset: {cursorPosition.offset}
                        </div>
                    )}
                </div>
                
            </div>
        </>
    );
}
