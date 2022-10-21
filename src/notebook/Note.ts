type NoteProps = {
    title: string,
    content: string,
    canvas: HTMLElement
}


export class Note {
    private props: NoteProps = null;

    constructor(props: {
        title: string,
        content: string,
        canvas: HTMLElement
    }) {
        this.props = props;
    }


}
