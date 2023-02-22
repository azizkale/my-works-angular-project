import { BookType } from "./BookTypes";

export class Book {
    name: string;
    totalPage: number;
    readPage: number | undefined;
    startDate: Date | undefined;
    endDate: Date | undefined;
    author: string | undefined;
    bookType: BookType;

    constructor(
        name: string,
        totalpage: number,
        startdate: Date,
        booktype: BookType,
        enddate?: Date,
        readpage?: number,
        author?: string) {
        this.name = name
        this.totalPage = totalpage
        this.startDate = startdate;
        this.bookType = booktype;
        this.endDate = enddate
        this.readPage = readpage;
        this.author = author

    }
};