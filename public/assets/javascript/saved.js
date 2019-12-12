function displaySaved() {
    // grab the articles as json
    $.getJSON("/api/articles/saved", function (data) {

        for (var i = 0; i < data.length; i++) {
            // display each article as a bootstrap card
            $(".article-container").prepend("<div class='card m-4' data-id='" +
                data[i]._id + "'><div class='card-body'><h5 class='card-title'>" +
                data[i].headline + "</h5><p class='card-text'>" +
                data[i].summary + "</p><a href='https://www.nytimes.com/" +
                data[i].link + "' class='btn btn-primary' target='_blank'>Article</a>" +
                "<button class='btn btn-danger float-right delete-article'>Delete</button></div></div>");
        }
        $(".delete-article").on("click", unsaveArticle);
    });
}

function unsaveArticle() {
    let id = $(this).parent().parent().attr("data-id");
    
    $.post("/api/unsave/" + id)
    .then(function(data) {
        // log the response
        console.log(data);
        $(".article-container").empty();
        displaySaved();
    });
}

$(displaySaved);