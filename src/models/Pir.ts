export class Pir {
    pirId: any;
    editorId: any;
    name: string | any;
    description: string;
    chapters: {
        chapterName: string;
        chapterContent: string;
    }[]

    constructor(
        editorId: any,
        name: string | any,
        description: string,
        chapters: [{
            chapterName: string;
            chapterContent: string;
        }]
    ) {
        this.name = name
        this.description = description
        this.chapters = chapters
        this.editorId = editorId

    }
};