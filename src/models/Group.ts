import { User } from "./User";

export class Group {
    adminId: any;
    participants: [User]
    groupName: any;
    groupId: any;

    constructor(groupName: any) {
        this.groupName = groupName
    }
}