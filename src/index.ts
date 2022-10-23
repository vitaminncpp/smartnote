import $ from 'jquery';
import {Converter} from 'showdown';
import ClickEvent = JQuery.ClickEvent;
import type {Chapter, Note, Notebook, Section} from "./notebook/notes";
import {addChapter, addSection} from "./notebook/notes";
import {renderChapterList, renderSectionList} from "./render/Render";

const converter = new Converter();

export const notebook: Notebook = {
    title: "demo",
    content: new Array<Section>(),
    size: 0,
    currSec: -1,
    currChapt: -1,
};

$('.btn-preview').on('click', (event: ClickEvent) => {
    parent = event.target.parentElement.id;
    let contentSelection: string = `#${parent} > .markdown-input > textarea`;
    let content: string = ($(contentSelection).val()).toString();
    let previewSelection: string = `#${parent} > .markdown-preview`;
    let preview: string = converter.makeHtml(content);
    // let preview = marked(content);
    $(previewSelection).html(preview);
});


const init = () => {
    $('#btn-add-section').on('click', (event: ClickEvent) => {
        addSection(notebook, `Section ${notebook.size + 1}`);
        renderSectionList(notebook);
        renderChapterList(notebook);
    });
    $('#btn-add-chapter').on('click', (event: ClickEvent) => {
        addChapter(notebook, `Chapter ${notebook.content[notebook.currSec].size + 1}`);
        renderChapterList(notebook);
    })
}
init();

