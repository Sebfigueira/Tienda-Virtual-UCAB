const Helpers = {
    formatPrice: function(price) {
        return '$' + Number(price).toFixed(2);
    },
    generateId: function() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    },
    showNotification: function(message, type) {
        type = type || 'success';
        var notification = document.createElement('div');
        notification.className = 'notification';
        if (type === 'success') {
            notification.style.background = '#10b981';
        } else if (type === 'warning') {
            notification.style.background = '#f59e0b';
        } else {
            notification.style.background = '#ef4444';
        }
        notification.style.color = 'white';
        var icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
        notification.innerHTML = '<i class=\"fas ' + icon + '\"></i> ' + message;
        document.body.appendChild(notification);
        setTimeout(function() { notification.remove(); }, 3000);
    },
    validateEmail: function(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    },
    renderStars: function(rating) {
        var full = Math.floor(rating);
        var stars = '';
        for (var i = 0; i < full; i++) stars += '★';
        for (var i = stars.length; i < 5; i++) stars += '☆';
        return '<span style=\"color: #fbbf24;\">' + stars + '</span> <span>(' + rating.toFixed(1) + ')</span>';
    },
    debounce: function(func, wait) {
        var timeout;
        return function() {
            var context = this;
            var args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(function() {
                func.apply(context, args);
            }, wait);
        };
    }
};
