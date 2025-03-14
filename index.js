// تابع برای تبدیل تاریخ میلادی به شمسی
function gregorianToJalali(gy, gm, gd) {
    let g_d_m, jy, jm, jd, gy2, days;
    g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    gy2 = (gm > 2) ? (gy + 1) : gy;
    days = 355666 + (365 * gy) + ~~((gy2 + 3) / 4) - ~~((gy2 + 99) / 100) + ~~((gy2 + 399) / 400) + gd + g_d_m[gm - 1];
    jy = -1595 + (33 * ~~(days / 12053));
    days %= 12053;
    jy += 4 * ~~(days / 1461);
    days %= 1461;
    if (days > 365) {
        jy += ~~((days - 366) / 365);
        days = (days - 1) % 365;
    }
    if (days < 186) {
        jm = 1 + ~~(days / 31);
        jd = 1 + (days % 31);
    } else {
        jm = 7 + ~~((days - 186) / 30);
        jd = 1 + ((days - 186) % 30);
    }
    return [jy, jm, jd];
}

// تاریخ شروع (2 بهمن 1403 ساعت 11 صبح)
const startDate = {
    year: 1403,
    month: 11,
    day: 2,
    hour: 11,
    minute: 0,
    second: 0
};

// عناصر HTML برای نمایش نتایج
const yearsElement = document.getElementById('years');
const monthsElement = document.getElementById('months');
const daysElement = document.getElementById('days');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');

// تابع برای محاسبه و نمایش تفاوت زمان
function updateCounter() {
    const now = new Date();
    const jalaliNow = gregorianToJalali(now.getFullYear(), now.getMonth() + 1, now.getDate());

    const start = new Date(gregorianToJalali(startDate.year, startDate.month, startDate.day));
    start.setHours(startDate.hour, startDate.minute, startDate.second, 0);

    const diff = now - start;

    const seconds = Math.floor(diff / 1000) % 60;
    const minutes = Math.floor(diff / (1000 * 60)) % 60;
    const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;

    let totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    let years = jalaliNow[0] - startDate.year;
    let months = jalaliNow[1] - startDate.month;
    let days = jalaliNow[2] - startDate.day;

    if (days < 0) {
        months--;
        days += 30; // فرض بر 30 روز در ماه
    }
    if (months < 0) {
        years--;
        months += 12;
    }

    yearsElement.textContent = years;
    monthsElement.textContent = months;
    daysElement.textContent = days;
    hoursElement.textContent = hours;
    minutesElement.textContent = minutes;
    secondsElement.textContent = seconds;
}

// به‌روزرسانی شمارشگر هر ثانیه
setInterval(updateCounter, 1000);

// نمایش اولیه شمارشگر
updateCounter();