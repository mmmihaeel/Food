
function timer(id, deadline) {

    function getTimeRemaining(endTime) {
        let days, hours, minutes, seconds;
        const totalTime = Date.parse(endTime) - Date.parse(new Date());

        if (totalTime <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {
            days = Math.floor(totalTime / (24 * 60 * 60 * 1000));
            hours = Math.floor(totalTime / (60 * 60 * 1000) % 24);
            minutes = Math.floor(totalTime / (60 * 1000) % 60);
            seconds = Math.floor(totalTime / 1000 % 60);
        }

        return {
            totalTime,
            days,
            hours,
            minutes,
            seconds
        };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return `${num}`;
        }
    }

    function setTime(selector, endTime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector("#days"),
            hours = timer.querySelector("#hours"),
            minutes = timer.querySelector("#minutes"),
            seconds = timer.querySelector("#seconds"),
            timeInterval = setInterval(updateTime, 1000);
        updateTime();

        function updateTime() {
            const t = getTimeRemaining(endTime);
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.totalTime <= 0) {
                clearInterval(timeInterval);
                timer.insertAdjacentHTML('beforeend', '<div class="timer__alert">Время акции истекло!!</div>');
            }
        }
    }

    setTime(id, deadline);
} 


export default timer;