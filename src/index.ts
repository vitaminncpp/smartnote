import $ from 'jquery';
import {Converter} from 'showdown';
import ClickEvent = JQuery.ClickEvent;
import type {Notebook} from "./notebook/notes";

const converter = new Converter();

export const notebook: Notebook = {
    title: "demo",
    content: [],
    size: 0,
    currSec: -1,
    currChapt: -1
};

$('.btn-preview').on('click', (event: ClickEvent) => {
    parent = event.target.parentElement.id;
    let contentSelection: string = `#${parent} > .markdown-input > textarea`;
    let content: string = ($(contentSelection).val()).toString();
    let previewSelection: string = `#${parent} > .markdown-preview`;
    let preview: string = converter.makeHtml(content);
    $(previewSelection).html(preview);
});

const addSection = (title: string) => {
    notebook.content.push({
        index: notebook.size,
        title: title,
        size: 0,
        chapters: []
    });
    notebook.size++;
}
const addChapter = (title: string) => {
    notebook.content[notebook.currSec].chapters.push({
        index: notebook.content[notebook.currSec].size,
        title: title,
        notes: [],
        size: 0
    });
    notebook.content[notebook.currSec].size++;
}


