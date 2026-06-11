class ReviewModel {
    constructor() {
        this.reviews = StorageService.get(APP_CONFIG.STORAGE_KEYS.REVIEWS, []);
    }
    saveReviews() { StorageService.set(APP_CONFIG.STORAGE_KEYS.REVIEWS, this.reviews); }
    addReview(data) {
        var newReview = {
            id: Helpers.generateId(),
            createdAt: new Date().toISOString(),
            helpful: 0
        };
        for (var key in data) { newReview[key] = data[key]; }
        this.reviews.push(newReview);
        this.saveReviews();
        return newReview;
    }
    getProductReviews(productId) {
        return this.reviews.filter(function(r) { return r.productId == productId; });
    }
    getUserReviews(userId) {
        return this.reviews.filter(function(r) { return r.userId === userId; });
    }
    getAverageRating(productId) {
        var reviews = this.getProductReviews(productId);
        if (reviews.length === 0) return 0;
        var sum = 0;
        for (var i = 0; i < reviews.length; i++) {
            sum += reviews[i].rating;
        }
        return sum / reviews.length;
    }
}
