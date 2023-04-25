import { Chapter } from "./Chapter";
import { WordPair } from "./WordPair";

export class Pir {
    pirId: any;
    editorId: any;
    name: string | any;
    description: string;
    chapters: Chapter[]
    wordPairs: WordPair[]

    constructor(
        pirId: any,
        editorId: any,
        name: string | any,
        description: string,
        chapters: Chapter[],
        wordPairs: WordPair[]
    ) {
        this.pirId = pirId
        this.editorId = editorId
        this.name = name
        this.description = description
        this.chapters = chapters
        this.wordPairs = wordPairs

    }

};