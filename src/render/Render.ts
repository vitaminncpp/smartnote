import type {Notebook} from "../notebook/notes";
import $ from 'jquery';

export const renderSectionList = (notebook: Notebook) => {
    let htmlString: string = '';
    notebook.content.forEach((x, i) => {
        htmlString += `<li id="sec-${i}">${x.title}</li>`;
    });
    $('#section-list').html(htmlString);
    $(`#sec-${notebook.currSec}`).addClass('active-section');
}

export const renderChapterList = (notebook: Notebook) => {
    let htmlString: string = '';
    notebook.content[notebook.currSec].chapters.forEach((x, i) => {
        htmlString += `<li id="ch-${i}">${x.title}</li>`;
    });
    $('#chapter-list').html(htmlString);
    $(`#ch-${notebook.currChapt}`).addClass('active-chapter');
}

export const renderNotes = (notebook: Notebook) => {
    let htmlString: string = '';
    //TODO Rendering Notes
}