import type {Chapter, Notebook} from "../notebook/notes";
import $ from 'jquery';

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
                                    <span>
                                        <div class="edit">
                                            <button>+</button>
                                            <button>+</button>
                                        </div>
                                    </span>
                                </div>
                                <div class="note-content">${x.content}</div>
                            </div>
                        </li>`;
    });

    $('#canvas ul').html(htmlString);
}
