import $ from 'jquery';
import {Converter} from 'showdown';
import {addChapter, addSection, createNotebook} from "./notebook/notes";
import {renderChapterList, renderNotes, renderSectionList} from "./render/Render";
import ClickEvent = JQuery.ClickEvent;

const converter = new Converter();
const notebook = createNotebook("Demo");

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
    $(`#sec-${notebook.currSec.index}`).removeClass('active-section');
    notebook.currSec = notebook.content[event.target.getAttribute("key")];
    $(`#sec-${notebook.currSec.index}`).addClass("active-section");

    notebook.currChapt = notebook.currSec.currChapt;
    renderSectionList(notebook);
    renderChapterList(notebook);
    renderNotes(notebook);

    $('.section-list li').on('click', onSectionClick);
    $('.chapter-list li').on('click', onChapterClick);
}


const onChapterClick = (event: ClickEvent) => {
    console.log(notebook);
    $(`#ch-${notebook.currChapt.index}`).removeClass('active-chapter');
    notebook.currChapt = notebook.currSec.chapters[event.target.getAttribute("key")];
    notebook.currSec.currChapt = notebook.currChapt;
    $(`#ch-${notebook.currChapt.index}`).addClass('active-chapter');
    renderChapterList(notebook);
    renderNotes(notebook);

    console.log(notebook);
    $('.chapter-list li').on('click', onChapterClick);
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
        addChapter(notebook.currSec, `Chapter ${notebook.currSec.size + 1}`);
        renderChapterList(notebook);
        renderNotes(notebook);

        $('.chapter-list li').on('click', onChapterClick);
    })

    renderSectionList(notebook);
    renderChapterList(notebook);
    renderNotes(notebook);

    $('.section-list li').on('click', onSectionClick);
    $('.chapter-list li').on('click', onChapterClick);
}
init();

