export type Note = {
    index: number,
    title: string,
    content: string
}

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
    size: number
};

export type Notebook = {
    title: string,
    content: Array<Section>,
    size: number,
    currSec: number,
    currChapt: number,
}

export const addSection = (notebook: Notebook, title: string) => {
    let section: Section = {
        index: notebook.size,
        title: title,
        chapters: new Array<Chapter>(),
        size: 0
    };
    notebook.content.push(section);
    notebook.size++;
    notebook.currSec = section.index;
    notebook.currChapt = -1;
}