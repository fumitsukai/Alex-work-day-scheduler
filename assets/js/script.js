const saveBtn = $('.saveBtn');
const textEl = $('.textarea');
const currentDayEl = $('#currentDay');
const clear = $('#clear');

//on page load
$(function () {
    //Header
    //display current day
    function displaytime() {
        const currentDay = dayjs();
        currentDayEl.text(currentDay);
    }
    displaytime();
    setInterval(displaytime, 1000);

    //Table
    //based on time change the colors of the textarea rows
    function updateHoursChange() {
        //store current hour in a variable so we can compare with the id of the textarea
        var currentTime = dayjs().format('H');
        //loop through the textarea elements to check them one by one with the current time
        for (let i = 0; i < textEl.length; i++) {
            //get element id as a string
            var elementID = textEl[i].id;
            //get element by id
            var manipulateID = document.getElementById(elementID);
            //remove any old classes
            $(elementID).removeClass(".present .past .future");
            //apply new class
            if (elementID < currentTime) {
                $(manipulateID).addClass('past');
            } else if (elementID > currentTime) {
                $(manipulateID).addClass('future');
            } else {
                $(manipulateID).addClass('present');
            }
        }

    }
    //Take value and save it to local storage, display in the text area
    //loop through buttons and if the name matches the id of the text area put it into storage
    // saveBtn.each(function (btn) {
    //     saveBtn[btn].addEventListener('click', function () {
    //         for (let i = 0; i < textEl.length; i++) {
    //             if (saveBtn[btn].getAttribute('name') === textEl[i].id) {
    //                 const savedDataArr = JSON.parse(localStorage.getItem('data')) || [];
    //                 const data = {
    //                     hour: textEl[i].id,
    //                     text: textEl[i].value.trim()
    //                 };
    //                 savedDataArr.push(data);
    //                 localStorage.setItem('data', JSON.stringify(savedDataArr));
    //                 addedToStorage();
    //             }
    //         }
    //     })
    // })

    saveBtn.on('click', function () {
        var thisBtn = $(this);
        var textareaID = thisBtn.attr('name');
        var textarea = $('#' + textareaID);
        const savedDataArr = JSON.parse(localStorage.getItem('data')) || [];
        const data = {
            hour: textareaID,
            text: textarea.val().trim()
        };
        savedDataArr.push(data);
        localStorage.setItem('data', JSON.stringify(savedDataArr));
        addedToStorage();

    })

    //get from storage
    const savedData = JSON.parse(localStorage.getItem('data'));

    //update colours every hour
    updateHoursChange();
    setInterval(updateHoursChange, (1000 * 60) * 60);

    //check every text area for matching hour in the local storage object array and if they match show the text
    for (let i = 0; i < textEl.length; i++) {
        for (let j = 0; j < savedData.length; j++) {
            if (textEl[i].id === savedData[j].hour) {
                textEl[i].value = savedData[j].text;
            }
        }
    }

    //clear scheduler
    clear.on('click', function () {
        localStorage.clear();
        location.reload();
    })


    function addedToStorage() {
        const pEl = $('<p>');
        pEl.text("Added to localStorage!");
        $('header').append(pEl);
        pEl.css({ "color": "green", "padding-top": "50px" });
        setTimeout(function () {
            location.reload();
        }, 500);
    }
})