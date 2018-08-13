var animals = [ 'cat', 'dog', 'horse', 'goat', 'rabbit', 'chicken', 'turtle',
                'bear', 'pig', 'koala', 'kangaroo', 'whale', 'dolphine',
                'shark', 'eagle', 'goldfish', 'fox', 'monkey', 'elephant',
            ];

// Clean the buttons first not to repeat the entries.
// Draw buttons with each element in Animal arrays.
animals.forEach (function(animal) {
    drawButton(animal);
});

function drawButton(name) {
    console.log("drawButton for : " + name);
    var div = $('<div class="btn-group" role="group" aria-label="First group">');
    div.html(`<button type="button" class="btn btn-secondary" data-value="${name}">${name}</button>`);
    $(".btn-toolbar").append(div);
}

function drawGiphyResults(data) {

    data.forEach(function(obj) {
        // Using bootstrap card. http://getbootstrap.com/docs/4.1/components/card/#images

        var div = $('<div class="card" style="width: 18rem;">');
        var img = $('<img class="card-img-top">');
        img.attr('src', obj.images.original_still.url);

        var div_p = $('<div class="card-body">');
        div_p.html(`<p class="card-text"> Ratings: ${obj.rating} </p>`);

        div.append(img, div_p);
        $(".btn-toolbar").append(div);

    });
}

// When button is clicked, determine what animal it corresponds to
// then make giphy API calls.  Use event deleation to add callback event
// to buttons created after page rendering.
$(".btn-toolbar").on("click", ".btn", function (event){

    var api_key = 'DnKDEbL6X89zDU7delnZ4Avu8a0kURZn';
    /* For the params
        q=<search term>
        limit=max number of recs to return (default: 25)
        rating: filters results by specified rating
    */
    var url = 'https://api.giphy.com/v1/gifs/search?api_key=' + api_key +
              '&q=' + $(this).attr("data-value");
    console.log("pressed button " + $(this).attr("data-value"));

    $.ajax({
        url: url,
        method: "GET"
    }).then(function(response) {
        console.log(response.data);
        // Display giphy images and meta data
        drawGiphyResults(response.data);
    });
});


// For each of API async calls, parse through the JSON objects and contruct
// data structure for images and meta data.


// For constructed meta data, draw image objects and show corresponding Meta
// data to the user.


// When the user enters a text form, do the following:
// 1) Append the new entry to list.
// 2) Append a new button with the new entry text.
// 3) Make giphy call and draw the returned data object's image and meta data.
