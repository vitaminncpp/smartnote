export type Note = {
    index: number,
    title: string,
    content: string
};

export type Chapter = {
    index: number,
    title: string;
    notes: Array<Note>,
    size: number
};
export type Section = {
    index: number,
    title: string,
    chapters: Array<Chapter>,
    size: number,
    currChapt: Chapter;
};

export type Notebook = {
    title: string,
    content: Array<Section>,
    size: number,
    currSec: Section,
    currChapt: Chapter,
};

export const addSection = (notebook: Notebook, title: string) => {
    let section: Section = {
        index: notebook.size,
        title: title,
        chapters: new Array<Chapter>(),
        size: 0,
        currChapt: null
    };
    addChapter(section, "Chapter 1");
    notebook.content.push(section);
    notebook.size++;
    notebook.currSec = section;
    notebook.currChapt = section.currChapt;
};

export const addChapter = (section: Section, title: string) => {
    let chapter: Chapter = {
        index: section.size,
        title: title,
        notes: new Array<Note>(),
        size: 0
    };
    section.chapters.push(chapter);
    section.size++;
    section.currChapt = chapter;
};


export const addNote = (chapter: Chapter, title: string, content: string) => {
    let note: Note = {
        index: chapter.size,
        title: title,
        content: content
    };
    chapter.notes.push(note);
    chapter.size++;
};


export const createNotebook = (name: string): Notebook => {
    let notebook: Notebook = {
        title: name,
        content: new Array<Section>(),
        currSec: null,
        currChapt: null,
        size: 0
    }
    addSection(notebook, "Section 1");
    return notebook;
};
