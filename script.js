// Select elements
var currentDay = $('#currentDay');
var today = moment();
var hourToday = Number(today.format("H"));
var hourEl;
var saveButtons = $('.saveBtn');
var currentTextArea;
var elementID;
var retrievedText;
var textUponSave = $('#textUponSave');

// initiate list of hours
var hourList = [9, 10, 11, 12, 13, 14, 15, 16, 17];

// Set text of current day
currentDay.text(today.format("dddd, MMMM Do, YYYY"));

// WE DOING MILITARY TIME
for (var i in hourList) {
    // get the current hour element
    hourEl = $('#' + hourList[i]);

    // check if hour equals the element
    if (hourToday == hourList[i]) {
        hourEl.addClass('present');
    } else if (hourToday >= hourList[i]) {
        hourEl.addClass('future');
    } else {
        hourEl.addClass('past');
    }

    // set text upon reload
    retrievedText = localStorage.getItem("time-" + hourList[i]);
    hourEl.text(retrievedText);
}

// event listener for all elements
saveButtons.on('click', function(event) {
    // get text of selected element
    elementID = this.parentNode.children[1].id;
    currentTextArea = $('#' + elementID);

    // store text in local storage based on id
    localStorage.setItem("time-" + elementID, currentTextArea.val());

    // display 'SAVED' text in header upon save
    textUponSave.text('SAVED!').css('color', 'red');
    var secondsLeft = 1;
    var timerInterval = setInterval(function() {
        secondsLeft--;
        if (secondsLeft === 0) {
            clearInterval(timerInterval);
            textUponSave.css('color', 'white').text('.');
        }
    }, 1000);
});