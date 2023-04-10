export class SHB {
    shbId: any;
    shbName: string;
    shbInfo: string[];
    shbHistory: string[];
    editorId: any; //userId
    createDate: Date;

    constructor(shbName: string, editorId: any, createDate: Date, shbInfo: string[], shbHistory: string[]) {
        this.shbName = shbName,
            this.shbInfo = shbInfo,
            this.shbHistory = shbHistory
        this.editorId = editorId,
            this.createDate = createDate
    }
}