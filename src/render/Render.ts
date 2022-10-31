import type {Chapter, Notebook} from "../notebook/notes";
import $ from 'jquery';
import ClickEvent = JQuery.ClickEvent;
import {editNote} from "../index";
import {Converter} from "showdown";

let converter = new Converter({tables: true});

export const renderNotebook: (notebook: Notebook) => void = (notebook: Notebook) => {
    renderSectionList(notebook);
    renderChapterList(notebook);
    renderNotes(notebook);
}

export const renderSectionList: (notebook: Notebook) => void = (notebook: Notebook) => {
    let htmlString: string = '';
    notebook.content.forEach((x, i) => {
        htmlString += `<li id="sec-${i}" key="${i}">${x.title}</li>`;
    });
    $('#section-list').html(htmlString);
    $(`#sec-${notebook.currSec.index}`).addClass('active-section');
}

export const renderChapterList: (notebook: Notebook) => void = (notebook: Notebook) => {
    let htmlString: string = '';
    notebook.currSec.chapters.forEach((x, i) => {
        htmlString += `<li id="ch-${i}" key="${i}">${x.title}</li>`;
    });
    $('#chapter-list').html(htmlString);
    $(`#ch-${notebook.currChapt.index}`).addClass('active-chapter');
}

export const renderNotes: (notebook: Notebook) => void = (notebook: Notebook) => {
    let htmlString: string = '';
    let chapter: Chapter = notebook.currChapt;
    chapter.notes.forEach((x, i) => {
        htmlString += `<li id="note-${i}" key="${i}">
                            <div class="note">
                                <div class="note-title">
                                    <div class="title">
                                        ${x.index}. ${x.title}
                                    </div>
                                        <div class="edit">
                                            <button class="note-edit" key="${i}"></button>
                                        </div>
                                </div>
                                <hr />
                                <div class="note-content markdown" contenteditable="false">${converter.makeHtml(x.content)}</div>
                                <textarea cols="30" rows="10" class="note-editor"></textarea>
                            </div>
                        </li>`;
    });
    $('#canvas ul').html(htmlString);
    $('.note button').on('click', editNote);
}

