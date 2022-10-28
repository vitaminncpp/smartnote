import $ from 'jquery';
import {Converter} from 'showdown';
import {addChapter, addNote, addSection, createNotebook, Notebook} from "./notebook/notes";
import {renderChapterList, renderNotebook, renderNotes, renderSectionList} from "./render/Render";
import ClickEvent = JQuery.ClickEvent;
import {eraseCookie, getCookie, setCookie} from "./util/util";

const converter = new Converter();
let notebook: Notebook = createNotebook("New Notebook");

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
    renderNotebook(notebook);

    $('.section-list li').on('click', onSectionClick);
    $('.chapter-list li').on('click', onChapterClick);
}


const onChapterClick = (event: ClickEvent) => {
    $(`#ch-${notebook.currChapt.index}`).removeClass('active-chapter');
    notebook.currChapt = notebook.currSec.chapters[event.target.getAttribute("key")];
    notebook.currSec.currChapt = notebook.currChapt;
    $(`#ch-${notebook.currChapt.index}`).addClass('active-chapter');
    renderChapterList(notebook);
    renderNotes(notebook);

    $('.chapter-list li').on('click', onChapterClick);
}


const init = () => {
    $('#btn-save').on('click', (event: ClickEvent) => {
        setCookie('notebook', JSON.stringify(notebook), 1);
        renderNotebook(notebook);

        $('.section-list li').on('click', onSectionClick);
        $('.chapter-list li').on('click', onChapterClick);
    });
    $('#btn-load').on('click', (event: ClickEvent) => {
        notebook = JSON.parse(getCookie('notebook'));
        renderNotebook(notebook);

        $('.section-list li').on('click', onSectionClick);
        $('.chapter-list li').on('click', onChapterClick);
    });
    $('#btn-delete').on('click', (event: ClickEvent) => {
        eraseCookie('notebook');
        notebook = createNotebook("New Notebook");
        renderNotebook(notebook);

        $('.section-list li').on('click', onSectionClick);
        $('.chapter-list li').on('click', onChapterClick);
    });

    $('#btn-add-section').on('click', (event: ClickEvent) => {
        addSection(notebook, `Section ${notebook.size + 1}`);
        renderNotebook(notebook);

        $('.section-list li').on('click', onSectionClick);
        $('.chapter-list li').on('click', onChapterClick);
    });

    $('#btn-add-chapter').on('click', (event: ClickEvent) => {
        addChapter(notebook.currSec, `Chapter ${notebook.currSec.size + 1}`);

        //TODO a hacky temporary solution
        notebook.currChapt = notebook.currSec.currChapt;

        renderChapterList(notebook);
        renderNotes(notebook);

        $('.chapter-list li').on('click', onChapterClick);
    })

    $('#btn-add-note').on('click', (event: ClickEvent) => {
        addNote(notebook.currChapt, "Note Title", "Note Content");
        renderNotes(notebook);
    });
    renderNotebook(notebook);

    $('.section-list li').on('click', onSectionClick);
    $('.chapter-list li').on('click', onChapterClick);
}
init();

