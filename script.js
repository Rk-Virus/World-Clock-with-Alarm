//reference to time interval
let timeInterval = null;
window.onload = () => {
    timeInterval = setInterval(()=>getTime('Asia/Kolkata'), 1000); // Update time every second
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
        clearInterval(timeInterval);
        timeInterval = setInterval(()=>getTime(value, text), 1000);
    } else {
        alert('Please select a time zone.');
    }
});