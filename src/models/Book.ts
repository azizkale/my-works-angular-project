import { BookType } from "./BookTypes";

export class Book {
    bookId: any;
    name: string | any;
    totalPage: number;
    readPage: number | any;
    startDate: Date | any;
    endDate: Date | any;
    author: string | any;
    bookType: BookType;

    constructor(
        name: string,
        totalpage: number,
        startdate: Date,
        booktype: BookType,
        enddate?: Date,
        readpage?: number,
        author?: string,
        bookId?: any) {
        this.name = name
        this.totalPage = totalpage
        this.startDate = startdate;
        this.bookType = booktype;
        this.endDate = enddate
        this.readPage = readpage;
        this.author = author;
        this.bookId = bookId;
    }
};