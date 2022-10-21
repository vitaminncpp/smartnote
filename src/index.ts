import $ from 'jquery';
import {Converter} from 'showdown';
import ClickEvent = JQuery.ClickEvent;

const converter = new Converter();

$('.btn-preview').on('click', (event: ClickEvent) => {
    parent = event.target.parentElement.id;
    let contentSelection: string = `#${parent} > .markdown-input > textarea`;
    let content: string = ($(contentSelection).val()).toString();
    let previewSelection: string = `#${parent} > .markdown-preview`;
    let preview: string = converter.makeHtml(content);
    $(previewSelection).html(preview);

});



