export class WordPair {
    wordPairId: any;
    word: string;
    meaning: string;
    chapterId: any
    pirId: any;
    editorId: any

    constructor(wordPairId: any, word: string, meaning: string, chapterId: any, pirId: any, editorId: any) {
        this.wordPairId = wordPairId;
        this.word = word;
        this.meaning = meaning
        this.chapterId = chapterId
        this.pirId = pirId
        this.editorId = editorId
    }
}