import { Chapter } from "./Chapter";
import { EditedWord } from "./editedWord";

export class Pir {
    pirId: any;
    editorId: any;
    name: string | any;
    description: string;
    chapters: Chapter[]
    wordPairs: EditedWord[]

    constructor(
        pirId: any,
        editorId: any,
        name: string | any,
        description: string,
        chapters: Chapter[],
        wordPairs: EditedWord[]
    ) {
        this.pirId = pirId
        this.editorId = editorId
        this.name = name
        this.description = description
        this.chapters = chapters
        this.wordPairs = wordPairs

    }

};