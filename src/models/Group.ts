import { User } from "./User";
import { cuz } from "./cuz";

export class Group {
    mentorId: any;
    users: [User]
    groupName: any;
    groupId: any;
    works: {
        hatim: cuz[],
        pirs: any[]// just pirIds
    }

    constructor(groupName: any, mentorId: any) {
        this.groupName = groupName,
            this.mentorId = mentorId
    }
}