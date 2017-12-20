var TimerController = (function () {

    var time = null;
    var currentInterval = 0;
    var currentTime = 0;
    var lastTime = 0;
    var currentDate = null;
    var stop = true;

    var startStopBtn = null;
    var resetBtn = null;
    var saveBtn = null;
    var hourSpan = null;
    var minuteSpan = null;
    var secondSpan = null;

    function getTimeSpan(currentTime) {
        return {
            hour: (currentTime / (1000 * 60 * 60)) | 0,
            minute: (currentTime % (1000 * 60 * 60) / (1000 * 60)) | 0,
            second: (currentTime % (1000 * 60) / 1000) | 0,
            milisecond: (currentTime % 1000 / 1) / 10 | 0
        }
    }
    

    var timer = {
        start: function () {
            var interval = 10;
            time = setInterval(function () {
                currentInterval += interval;

                if (!stop) {
                    var ticker = currentTime > (1000 * 60 * 60) ? 1000 : 10;
                    if ((currentInterval % ticker) == 0) {
                        currentTime = lastTime + (new Date().getTime() - currentDateTime);

                        var timeSpan = getTimeSpan(currentTime);

                        displayTime(timeSpan);
                    }
                }

            }, interval);
        }
    }

    function displayTime (timeSpan) {
        var hourDisplay = timeSpan.hour < 10 ? "0" + timeSpan.hour : timeSpan.hour;
        var minuteDisplay = timeSpan.minute < 10 ? "0" + timeSpan.minute : timeSpan.minute;
        var secondDisplay = timeSpan.second < 10 ? "0" + timeSpan.second : timeSpan.second;
        var milisecondDisplay = timeSpan.milisecond < 10 ? "0" + timeSpan.milisecond : timeSpan.milisecond;
        // hourSpan.html(hourDisplay);
        hourSpan.html(timeSpan.hour <= 0  ? minuteDisplay : hourDisplay);
        minuteSpan.html(timeSpan.hour <= 0 ? secondDisplay : minuteDisplay);
        secondSpan.html(timeSpan.hour <= 0 ? milisecondDisplay : secondDisplay);
    };
    
    function startStopTimer () {
        stop = !stop;
        if (!stop) {
            currentDateTime = new Date().getTime(); 
            startStopBtn.html('Stop');
            if (!currentInterval)
                timer.start();
        } else {
            lastTime = currentTime;
            startStopBtn.html('Start');
            console.log(getTimeSpan(currentTime));
        }
    };

    function resetTimer () {
        if (!stop) {
            stop = true;
            startStopBtn.html('Start');

            console.log(getTimeSpan(currentTime));
        }
        clearInterval(time);
        currentInterval = 0;
        currentTime = 0;
        lastTime = 0;
        displayTime(getTimeSpan(0));
    };

    function saveTimer () {
        
    };



    var controller = function (page) {
        // We want to center the timer in the page on app layout event.
        this.initLayout(page);
        this.initButtons(page);
        this.initTimer(page);
    };

    controller.initLayout = function (page) {
        $(page).on('appLayout', function () {
            var timer = $('#timer', page);;
            var pageHeight = $(page).height();
            var timerHeight = timer.height();
            var marginTop = pageHeight * 0.5;
            marginTop -= timerHeight;// (timerHeight * 0.5);
            timer.css('margin-top', marginTop + "px");
        });

        hourSpan = $(page).find('#hourSpan');
        minuteSpan = $(page).find('#minuteSpan');
        secondSpan = $(page).find('#secondSpan');
    };

    controller.initButtons = function (page) {
        // start timer.
        startStopBtn = $(page).find('#start-button')
            .clickable()
            .click(startStopTimer);
        // The reset button
        resetBtn = $(page).find('#reset-button')
            .clickable()
            .click(resetTimer);
        // The save button
        saveBtn = $(page).find('#save-button')
            .clickable()
            .click(saveTimer);
    };

    controller.initTimer = function (page) {
        // TODO : Check local storage for existing running timer.
        $(page).find('#start-button').show();
    };


    return controller;
}());
/**
 * index.js
 * - All our useful JS goes here, awesome!
 */
App.controller('home', TimerController);

App.controller('timeEntry', function (page) {

});

try {
    App.restore();
} catch (err) {
    App.load('home');
}