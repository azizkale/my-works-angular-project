export class Pir {
    bookId: any;
    name: string | any;
    chapters: {
        chapterName: string;
        chapterContent: string;
    }[]

    constructor(
        name: string | any,
        chapters: [{
            chapterName: string;
            chapterContent: string;
        }]
    ) {
        this.name = name
        this.chapters = chapters

    }
};