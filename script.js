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
var hourList = [9, 10, 11, 12, 1, 2, 3, 4, 5];

// Set text of current day
currentDay.text(today.format("dddd, MMMM Do, YYYY"));

for (var i in hourList) {
    // get the current hour element
    hourEl = $('#' + hourList[i]);
    
    // convert today's hour to military time
    if (hourToday <= 9) {
        hourToday += 12;
    }
    // convert iterated hour to military time
    if (hourList[i] < 9) {
        hourList[i] += 12;
    }
    
    // check if hour equals the element
    if (hourToday == hourList[i]) {
        hourEl.addClass('present');
    } else if (hourToday >= hourList[i]) {
        hourEl.addClass('past');
    } else {
        hourEl.addClass('future');
    }

    if (hourList[i] > 12) {
        hourList[i] -= 12;
    }
    retrievedText = localStorage.getItem("time-" + hourList[i]);
    hourEl.text(retrievedText);
};

// event listener for all elements
saveButtons.on('click', function(event) {
    // get text of selected element
    elementID = this.parentNode.children[1].id;
    currentTextArea = $('#' + elementID);

    // store text in local storage based on id
    localStorage.setItem("time-" + elementID, currentTextArea.val());

    // display 'SAVED' text in header upon save
    textUponSave.text('SAVED!');
    textUponSave.css('color', 'red');
    var secondsLeft = 1;
    var timerInterval = setInterval(function() {
        secondsLeft--;
        if (secondsLeft === 0) {
            clearInterval(timerInterval);
            textUponSave.css('color', 'white');
            textUponSave.text('.');
        }
    }, 1000);
});