import { Chapter } from "./Chapter";

export class Pir {
    pirId: any;
    editorId: any;
    name: string | any;
    description: string;
    chapter: Chapter

    constructor(
        editorId: any,
        name: string | any,
        description: string,
        chapter: Chapter
    ) {
        this.editorId = editorId
        this.name = name
        this.description = description
        this.chapter = chapter

    }

};