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
    var div= $('<div class="btn-group" role="group" aria-label="First group">');
    div.html(`<button type="button" class="btn btn-secondary" data-value="${name}">${name}</button>`);
    $(".btn-toolbar").append(div);
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
        console.log(response);
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
