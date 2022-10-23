import $ from 'jquery';
import {Converter} from 'showdown';
import type {Notebook, Section} from "./notebook/notes";
import {addChapter, addSection} from "./notebook/notes";
import {renderChapterList, renderNotes, renderSectionList} from "./render/Render";
import ClickEvent = JQuery.ClickEvent;

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

const onSectionClick = (event: ClickEvent) => {
    $(`#sec-${notebook.currSec}`).removeClass('.active-section');
    notebook.currSec = event.target.getAttribute("key");
    $(`#sec-${notebook.currSec}`).addClass(".active-section");

    notebook.currChapt = notebook.content[notebook.currSec].currChapt;
    renderChapterList(notebook);
}


const onChapterClick = (event: ClickEvent) => {
    notebook.currChapt = event.target.getAttribute("key");
    notebook.content[notebook.currSec].currChapt = event.target.getAttribute("key");

    renderNotes(notebook);
}


const init = () => {


    $('#btn-add-section').on('click', (event: ClickEvent) => {
        addSection(notebook, `Section ${notebook.size + 1}`);
        renderSectionList(notebook);
        renderChapterList(notebook);
        renderNotes(notebook);

        $('.section-list li').on('click', onSectionClick);
        $('.chapter-list li').on('click', onChapterClick);
    });

    $('#btn-add-chapter').on('click', (event: ClickEvent) => {
        addChapter(notebook, `Chapter ${notebook.content[notebook.currSec].size + 1}`);
        renderChapterList(notebook);
        renderNotes(notebook);
    })
}
init();

