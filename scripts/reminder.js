// take the user back to the previous page
function goBack() {
    window.history.back();
}

function submitTime() {
    console.log('hi there')
    let alarmTime = document.getElementById('alarmtime').value;
    let newAlarmTime = new Date(alarmTime);
    
    var year = newAlarmTime.getFullYear();
    var month = newAlarmTime.getMonth() + 1; // 月份是从0开始的，所以要加1
    var day = newAlarmTime.getDate();
    var hours = newAlarmTime.getHours();
    var minutes = newAlarmTime.getMinutes();
    document.getElementById('alarm-goes-here').innerHTML = `<div>${year} - ${month} - ${day} - ${hours} - ${minutes}</div>`
}
