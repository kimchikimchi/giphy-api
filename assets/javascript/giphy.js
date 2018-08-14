var animals = [ 'cat', 'dog', 'horse', 'goat', 'rabbit', 'chicken', 'turtle',
                'bear', 'pig', 'koala', 'kangaroo', 'whale', 'dolphine',
                'shark', 'eagle', 'goldfish', 'fox', 'monkey', 'elephant',
            ];

// Clean the buttons first not to repeat the entries.
// Draw buttons with each element in Animal arrays.

function drawButtons() {
    $(".btn-toolbar").empty();

    console.log("drawButton for : " + animals);
    animals.forEach (function(animal) {
        var div = $('<div class="btn-group" role="group" aria-label="First group">');
        div.html(`<button type="button" class="btn btn-secondary" data-value="${animal}">${animal}</button>`);
        $(".btn-toolbar").append(div);
    });
}

function drawGiphyResults(data) {
    $(".giphy").empty();

    data.forEach(function(obj) {
        // Using bootstrap card. http://getbootstrap.com/docs/4.1/components/card/#images
        var div = $('<div class="card" style="width: 18rem;">');
        var img = $('<img class="card-img-top giphy_image">');
        img.attr({
            src:  obj.images.original_still.url,
            'data-still': obj.images.original_still.url,
            'data-animate': obj.images.original.url,
            'data-state': "still",
        });
        var div_p = $('<div class="card-body">');
        div_p.html(`<p class="card-text"> Rating: ${obj.rating.toUpperCase()} </p>`);

        div.append(img, div_p);
        $(".giphy").append(div);
    });
}

// When button is clicked, determine what animal it corresponds to
// then make giphy API calls.  Use event deleation to add callback event
// to buttons created after page rendering.
$(".btn-toolbar").on("click", ".btn", function(){

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


// Whenver image is clicked, look up the image state and toggle the src
// between the two choices.

$(".giphy").on("click", ".giphy_image", function() {
    var state = $(this).attr("data-state");

    if ( state === "still" ) {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});


// When the user enters a text form, do the following:
// 1) Append the new entry to list.
// 2) Append a new button with the new entry text.
// 3) Make giphy call and draw the returned data object's image and meta data.

$("#addEntrySubmit").on("click", function(event) {
    event.preventDefault();
    console.log(`Adding: ${ $("#addEntry").val().trim() }`);
    animals.push( $("#addEntry").val().trim() );
    drawButtons();
    $("#addEntry").val("");
});

$(document).ready(function() {
    drawButtons();
});
