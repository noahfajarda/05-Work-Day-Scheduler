// Select elements
var currentDay = $('#currentDay');
var currentTime = $('#currentTime');
var today = moment();
var hourToday = Number(today.format("H"));
var hourEl;
var saveButtons = $('.saveBtn');
var currentTextArea;
var elementID;
var retrievedText;
var textUponSave = $('#textUponSave');
var clearBtn = $('#clear');

// initiate list of hours
var hourList = [9, 10, 11, 12, 13, 14, 15, 16, 17];

// Set text of current day & time
currentDay.text(today.format("dddd, MMMM Do, YYYY"));
$(document).ready(function() {
    currentTime.text(today.format("h:mm:ss A"));
    setInterval(function() {
        today = moment();
        currentTime.text(today.format("h:mm:ss A"));
    }, 1000);
});

// WE DOING MILITARY TIME
for (var i in hourList) {
    // get the current hour element
    hourEl = $('#' + hourList[i]);

    // check if hour equals the element
    if (hourToday == hourList[i]) {
        hourEl.addClass('present');
    } else if (hourToday >= hourList[i]) {
        hourEl.addClass('past');
    } else {
        hourEl.addClass('future');
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
    textUponSave.css({'opacity': '1'}).text('SAVED!');
    var secondsLeft = 2;
    var timerInterval = setInterval(function() {
        secondsLeft--;
        if (secondsLeft === 0) {
            clearInterval(timerInterval);
            textUponSave.css('opacity', '0');
        }
    }, 1000);
});

// event listener for clear button
clearBtn.on('click', function(event) {
    // clear items in local storage & update display
    localStorage.clear();
    for (var i in hourList) {
        hourEl = $('#' + hourList[i]);
        console.log(hourList[i]);
        hourEl.text("");
    }

    // 'CLEARED' text displayed
    textUponSave.css({'opacity': '1'}).text('CLEARED!');
    var secondsLeft = 2;
    var timerInterval = setInterval(function() {
        secondsLeft--;
        if (secondsLeft === 0) {
            clearInterval(timerInterval);
            textUponSave.css('opacity', '0');
        }
    }, 1000);
});