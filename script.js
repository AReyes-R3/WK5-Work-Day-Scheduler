// Displayed current day at the top of the calendar
function myFunction() {
    var d = new Date();
    var n = d.getDay()
    document.getElementById("currentDay").innerHTML = n;
  }

// Timeblocks for standard business hours
const timeSlots = [9, 10, 11, 12, 13, 14, 15, 16, 17];

$(document).ready(function () {
    $("#currentDay").html(moment().format("dddd, MMMM Do"));

    const currentTime = moment();
    timeSlots.forEach(hour => {
        const hourObj = moment().set('hour', hour);
        const hourFormat = moment(hourObj).format("ha");
        if (moment(hourObj).isBefore(currentTime, "hour")) {
            $("#new-task-" + hourFormat).addClass("past");
        } else if (moment(hourObj).isSame(currentTime, "hour")) {
            $("#new-task-" + hourFormat).addClass("present");
        } else if (moment(hourObj).isAfter(currentTime, "hour")) {
            $("#new-task-" + hourFormat).addClass("future");
        }
        $("#save-button-" + hourFormat).click(saveUserInput);
    });
    loadSchedule();
});

function saveUserInput(e) {
    const blankSchedule = [];
    const buttonId = e.currentTarget.id;
    const buttonIdArray = buttonId.split("-");
    const hourSlot = buttonIdArray[buttonIdArray.length - 1];
    const newTask = $("#new-task-" + hourSlot).val();
    const savingEntry = {
        id: "#new-task-" + hourSlot,
        taskDescription: newTask
    };
    if (typeof (Storage) !== "undefined") {
        if (localStorage.scheduler) {
            const currentScheduler = JSON.parse(localStorage.scheduler);

            currentScheduler.push(savingEntry);
            localStorage.scheduler = JSON.stringify(currentScheduler);
        } else {
            blankSchedule.push(savingEntry);
            localStorage.scheduler = JSON.stringify(blankSchedule);
        }
    }
}
function loadSchedule() {
    if (typeof (Storage) !== "undefined") {
        if (localStorage.scheduler) {
            const todaySchedule = JSON.parse(localStorage.scheduler);
            todaySchedule.forEach(entry => {
                $(entry.id).val(entry.taskDescription);
            });
        }

    }
}
