exports.userView = {
    name:                   'book',
    description:            'Return book info from RethinkDB',
    outputExample:          {},

    run: function(api, data, next){
        api.models.Book.get("56301824138cd73058d42382").then(function(book){
            if(!book) return next(new Error('book not found'));
            data.response.book = book.year;
            next();
        }).catch(next);
    }
};