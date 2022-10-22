import $ from 'jquery';
import {Converter} from 'showdown';
import ClickEvent = JQuery.ClickEvent;
import type {Notebook, Section} from "./notebook/notes";
import {marked} from "marked";

const converter = new Converter();

export const notebook: Notebook = {
    title: "demo",
    content: [],
    size: 0,
    currSec: -1,
    currChapt: -1,
    currNote: -1,
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

const addSection = (title: string) => {
    let section: Section = {
        index: notebook.size,
        title: title,
        size: 0,
        chapters: []
    };
    notebook.content.push(section);
    notebook.size++;
    notebook.currChapt = -1;

    let secElem: JQuery.htmlString = `<li>${section.title}</li>`;
    $('.section-list ol').append(secElem);
}
const addChapter = (title: string) => {
    notebook.content[notebook.currSec].chapters.push({
        index: notebook.content[notebook.currSec].size,
        title: title,
        notes: [],
        size: 0
    });
    notebook.content[notebook.currSec].size++;
    notebook.currNote = -1;
}

const addNote = (title: string, content: string) => {
    notebook.content[notebook.currSec].chapters[notebook.currChapt].notes.push({
        index: notebook.content[notebook.currSec].chapters[notebook.currChapt].size,
        title: title,
        content: content
    });
    notebook.content[notebook.currSec].chapters[notebook.currChapt].size++;
}

const init = () => {
    $('#btn-add-section').on('click', (event: ClickEvent) => {
        addSection("New Section");
    });
}
init();
