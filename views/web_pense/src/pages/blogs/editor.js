import { ContentState, RichUtils } from "draft-js";

export const orderList = (state, blockText, blockType, contentState) => {
    const orderedListMatch = blockText.match(/^(\d+)\.$/);
    if (orderedListMatch && blockType !== 'ordered-list-item') {
        const newState = RichUtils.toggleBlockType(state, 'ordered-list-item');
        setEditorState(EditorState.push(newState, contentState, 'change-block-type'));
        return;
    }
}


export const unorderList = (state, blockText, blockType, contentState) => {
    const unorderedListMatch = blockText.match(/^(-|\*)$/);
    if (unorderedListMatch && blockType !== 'unordered-list-item') {
        const newState = RichUtils.toggleBlockType(state, 'unordered-list-item');
        setEditorState(EditorState.push(newState, contentState, 'change-block-type'));
        return;
    }
}
