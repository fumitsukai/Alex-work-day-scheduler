const saveBtn = $('.saveBtn');
const textEl = $('.textarea');
const currentDayEl = $('#currentDay');
const clear = $('#clear');

//Header
//display current day
function displaytime() {
const currentDay = dayjs();
currentDayEl.text(currentDay);
}

setInterval(displaytime(), 1000);

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
saveBtn.each(function(btn) {
    saveBtn[btn].addEventListener('click', function() {
        for (let i = 0; i < textEl.length; i++) {
        if(saveBtn[btn].getAttribute('name') === textEl[i].id) {
            const savedDataArr = JSON.parse(localStorage.getItem('data')) || [];
            const data = {
                hour: textEl[i].id,
                text: textEl[i].value.trim()
            };
            savedDataArr.push(data);
            localStorage.setItem('data', JSON.stringify(savedDataArr));
        }
        }
    })
})

//get from storage
const savedData = JSON.parse(localStorage.getItem('data'));

//update colours every hour
setInterval(updateHoursChange(), (1000 * 60) * 60);

for (let i = 0; i < textEl.length; i++) {
    for (let j = 0; j < savedData.length; j++) {
        if (textEl[i].id === savedData[j].hour) {
            textEl[i].value = savedData[j].text;
        }
    }
 }




clear.on('click', function() {
    localStorage.clear();
})