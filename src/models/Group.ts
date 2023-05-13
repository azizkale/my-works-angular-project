import { User } from "./User";

export class Group {
    mentorId: any;
    users: [User]
    groupName: any;
    groupId: any;

    constructor(groupName: any, mentorId: any) {
        this.groupName = groupName,
            this.mentorId = mentorId
    }
}