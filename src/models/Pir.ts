import { Chapter } from "./Chapter";

export class Pir {
    pirId: any;
    editorId: any;
    name: string | any;
    description: string;
    chapters: Chapter[]

    constructor(
        pirId: any,
        editorId: any,
        name: string | any,
        description: string,
        chapters: Chapter[]
    ) {
        this.pirId = pirId
        this.editorId = editorId
        this.name = name
        this.description = description
        this.chapters = chapters

    }

};