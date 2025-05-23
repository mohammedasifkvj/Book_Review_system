export class Review {
    constructor({ id, userId, bookId, rating, comment }) {
        this.id = id;
        this.userId = userId;
        this.bookId = bookId;
        this.rating = rating;
        this.comment = comment;
    }
}  