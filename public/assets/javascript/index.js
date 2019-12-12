scrapeArticles = () => $.get("/api/scrape");

displayArticles = () => {

    $(".article-container").empty();
    // grab the articles as json
    $.getJSON("/api/articles", function (data) {

        for (var i = 0; i < data.length; i++) {
            // display each article as a bootstrap card
            if (!data[i].saved) {
                $(".article-container").append("<div class='card m-4' data-id='" +
                    data[i]._id + "'><div class='card-body'><h5 class='card-title'>" +
                    data[i].headline + "</h5><p class='card-text'>" +
                    data[i].summary + "</p><a href='https://www.nytimes.com/" +
                    data[i].link + "' class='btn btn-primary' target='_blank'>Article</a>" +
                    "<button class='btn btn-info float-right save-article'>Save</button></div></div>");
            }
        }
        $(".save-article").on("click", saveArticle);
    });
}

function saveArticle() {
    let id = $(this).parent().parent().attr("data-id");

    $.post("/api/save/" + id)
        .then(function (data) {
            // log the response
            console.log(data);
            displayArticles();
        });
}

scrapeThenDisplay = () => {
    scrapeArticles().then(displayArticles);
}

$(".scrape-new").on("click", scrapeThenDisplay);
$(displayArticles);