// grab the articles as a json
$.getJSON("/articles", function (data) {
    
    for (var i = 0; i < data.length; i++) {
        // display each article as a bootstrap card
        $(".article-container").append("<div class='card m-4' data-id='" +
            data[i]._id + "'> <div class='card-body'><h5 class='card-title'>" +
            data[i].headline + "</h5><p class='card-text'>" +
            data[i].summary + "</p><a href='https://www.nytimes.com/" +
            data[i].link + "' class='btn btn-primary' target='_blank'>Article</a></div></div>");
    }
});