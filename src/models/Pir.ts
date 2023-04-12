export class Pir {
    bookId: any;
    name: string | any;
    description: string;
    chapters: {
        chapterName: string;
        chapterContent: string;
    }[]

    constructor(
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

    }
};