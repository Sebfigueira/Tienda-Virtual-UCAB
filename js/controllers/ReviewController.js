class ReviewController {
    constructor(reviewModel) {
        this.reviewModel = reviewModel;
    }
    addReview(productId, userId, userName, rating, comment) {
        if (rating < 1 || rating > 5) {
            Helpers.showNotification('Calificación inválida', 'error');
            return null;
        }
        if (!comment || comment.trim() === '') {
            Helpers.showNotification('Escribe un comentario', 'warning');
            return null;
        }
        var review = this.reviewModel.addReview({
            productId: productId,
            userId: userId,
            userName: userName,
            rating: rating,
            comment: comment
        });
        Helpers.showNotification('Gracias por tu reseña', 'success');
        return review;
    }
    getProductReviews(productId) {
        return this.reviewModel.getProductReviews(productId);
    }
    getAverageRating(productId) {
        return this.reviewModel.getAverageRating(productId);
    }
}
