import { WordPair } from "./WordPair";

export class Chapter {
    chapterId: any;
    editorId: any;
    pirId: any;
    createDate: Date;
    chapterName: string;
    chapterContent: string;
    wordPairs: WordPair[]

    constructor(
        chapterName: string,
        chapterContent: string,
        chapterId: any,
        editorId: any,
        pirId: any,
        createDate: Date,
        wordPairs: WordPair[]) {
        this.chapterName = chapterName
        this.chapterContent = chapterContent
        this.chapterId = chapterId
        this.editorId = editorId
        this.pirId = pirId
        this.createDate = createDate
        this.wordPairs = wordPairs
    }
}