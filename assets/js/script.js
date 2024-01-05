const saveBtn = $('.saveBtn');
const textEl = document.querySelector('.row');
const currentDayEl = $('#currentDay');

saveBtn.on('click', function() {
    console.log(textEl.value);
})

//Header
//display current day

const currentDay = dayjs();
currentDayEl.text(currentDay);

//Table
//Take value and save it to local storage, display in the text area
//based on time change the colors of the textarea rows