//reference to time interval
let timeIntervalId = null;
let timeOutId = null;
window.onload = () => {
    timeIntervalId = setInterval(() => getTime('Asia/Kolkata'), 1000); // Update time every second
    const savedAlarmTime = localStorage.getItem('alarmTime');
    let tommStr = "";
    if (savedAlarmTime) {
        const alarmDate = new Date(savedAlarmTime);
        const now = new Date();
        if (alarmDate > now) {
            if (alarmDate.getDate() > now.getDate()) tommStr = " tomorrow";
            document.getElementById('alarmTxt').innerHTML = `Alarm set for ${alarmDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })} (IST)${tommStr}.`;
            timeOutId = setTimeout(() => {
                var audio = new Audio('alarm.mp3');
                audio.play();
            }, alarmDate - now);
            alert('If you have already set an alarm, click Ok then tab anywhere to interact and make the alarm active. Else it will not play due to HTML autoplay policy.');
        } else {
            document.getElementById('alarmTxt').textContent = 'There is no alarm set.';
        }
    }
};

const getTime = (timeZone, text) => {
    const date = new Date();
    const options = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    };
    const timeString = date.toLocaleTimeString('en-US', { ...options, timeZone }).split(',')[0];

    // Getting other countries time zones
    const americaTimeString = date.toLocaleTimeString('en-US', { ...options, timeZone: 'America/New_York' }).split(',')[0];
    const ukTimeString = date.toLocaleTimeString('en-US', { ...options, timeZone: 'Europe/London' }).split(',')[0];
    const japanTimeString = date.toLocaleTimeString('en-US', { ...options, timeZone: 'Asia/Tokyo' }).split(',')[0];

    document.getElementById('time').textContent = timeString;
    document.getElementById('timeStandard').textContent = text || 'Indian Standard Time (IST)';
    document.getElementById('timeZone').textContent = timeZone || 'Asia/Kolkata';
    document.getElementById('country').textContent = text ? text.split(' ')[0] : 'India';

    // Update other time zones
    document.getElementById('americalTime').textContent = americaTimeString;
    document.getElementById('ukTime').textContent = ukTimeString;
    document.getElementById('japanTime').textContent = japanTimeString;
}

// Function to time
document.getElementById('showBtn').addEventListener('click', () => {
    // Get the selected value from the dropdown
    const select = document.querySelector('select');
    // Get the selected option
    const selectedOption = select.options[select.selectedIndex];

    // Get the value
    const value = selectedOption.value;

    // Get the text
    const text = selectedOption.text;

    if (value) {
        clearInterval(timeIntervalId);
        timeIntervalId = setInterval(() => getTime(value, text), 1000);
    } else {
        alert('Please select a time zone.');
    }
});

// Function to set an alarm
document.getElementById('setAlarmBtn').addEventListener('click', (e) => {
    e.preventDefault();
    // Clear any previous timeout
    clearTimeout(timeOutId);

    // Get the alarm time from the input field
    const alarmTime = document.getElementById('alarmTime').value;

    if (!alarmTime) {
        alert('Please set an alarm time.');
        return;
    }

    // Convert the alarm time to a Date object
    const [hours, minutes] = alarmTime.split(':').map(Number);
    const now = new Date();
    const alarmDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, 0);

    // Check if the alarm time is in the past
    let tommStr = "";
    if (alarmDate < now) {
        alarmDate.setDate(alarmDate.getDate() + 1);
        tommStr = " tomorrow";
    }

    // Storing alarm in localStorage
    localStorage.setItem('alarmTime', alarmDate.toISOString());

    document.getElementById('alarmTxt').innerHTML = `Alarm set for ${alarmDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })} (IST)${tommStr}.`;

    // Set a timeout for the alarm
    const timeToAlarm = alarmDate - now;
    timeOutId = setTimeout(() => {
        var audio = new Audio('alarm.mp3');
        audio.play();
        // document.getElementById('alarmTime').value = '';
    }, timeToAlarm);
});