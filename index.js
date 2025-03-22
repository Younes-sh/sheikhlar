// تاریخ شروع: 2 بهمن 1403 ساعت 11 صبح
const startDateJalali = moment('1403/11/02 11:00:00', 'jYYYY/jMM/jDD HH:mm:ss');

// گرفتن عناصر HTML برای نمایش
const yearsElement = document.getElementById('years');
const monthsElement = document.getElementById('months');
const daysElement = document.getElementById('days');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const totalDaysElement = document.getElementById('total-days');

// تابع برای به‌روزرسانی فاصله زمانی
function updateCounter() {
    const now = moment(); // تاریخ و زمان فعلی

    // مدت زمان سپری شده از شروع تا الان
    const duration = moment.duration(now.diff(startDateJalali));

    // محاسبه بخش‌های زمانی
    const totalSeconds = Math.floor(duration.asSeconds());
    const seconds = totalSeconds % 60;
    const totalMinutes = Math.floor(duration.asMinutes());
    const minutes = totalMinutes % 60;
    const totalHours = Math.floor(duration.asHours());
    const hours = totalHours % 24;

    // محاسبه کل روزها
    const totalDays = Math.floor(duration.asDays());

    // محاسبه سال و ماه و روز شمسی با استفاده از moment-jalali
    const startDateClone = startDateJalali.clone();
    const jalaliNow = now.clone();

    // فاصله سال و ماه و روز به صورت شمسی
    const diffYears = jalaliNow.jYear() - startDateClone.jYear();
    const diffMonths = jalaliNow.jMonth() - startDateClone.jMonth();
    const diffDays = jalaliNow.jDate() - startDateClone.jDate();

    let years = diffYears;
    let months = diffMonths;
    let days = diffDays;

    // اصلاح ماه و روز اگر منفی شد
    if (days < 0) {
        months -= 1;
        const previousMonth = jalaliNow.clone().subtract(1, 'jMonth');
        days += previousMonth.daysInMonth();
    }
    if (months < 0) {
        years -= 1;
        months += 12;
    }

    // به‌روزرسانی مقادیر در صفحه
    yearsElement.textContent = years;
    monthsElement.textContent = months;
    daysElement.textContent = days;
    hoursElement.textContent = hours;
    minutesElement.textContent = minutes;
    secondsElement.textContent = seconds;
    totalDaysElement.textContent = totalDays;
}

// هر ثانیه به‌روزرسانی کن
setInterval(updateCounter, 1000);
updateCounter(); // نمایش اولیه
