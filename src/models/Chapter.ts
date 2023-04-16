export class Chapter {
    chapterId: any;
    editorId: any;
    pirId: any;
    createDate: Date;
    chapterName: string;
    chapterContent: string;

    constructor(
        chapterName: string,
        chapterContent: string,
        chapterId: any,
        editorId: any,
        pirId: any,
        createDate: Date) {
        this.chapterName = chapterName
        this.chapterContent = chapterContent
        this.chapterId = chapterId
        this.editorId = editorId
        this.pirId = pirId
        this.createDate = createDate
    }
}