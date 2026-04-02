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
    (function() {
        // تاریخ دقیق فوت: ۲ بهمن ۱۴۰۳ ساعت ۱۱:۰۰:۰۰
        // تبدیل به آبجکت moment جلالی
        const deathJalali = moment('1403-11-02 11:00:00', 'jYYYY-jMM-jD HH:mm:ss');
        // گرفتن معادل میلادی برای محاسبه تفاوت دقیق (اختیاری ولی قابل اطمینان)
        const deathGregorian = deathJalali.toDate(); // تبدیل به Date میلادی
        
        // تابع برای بروزرسانی اعداد بر اساس الان
        function updateElapsedTime() {
            const now = new Date(); // زمان حال میلادی
            const diffMs = now - deathGregorian;
            
            if (diffMs < 0) {
                // اگر هنوز زمان فوت نرسیده (احتمال خطا)
                document.getElementById('seconds').innerText = '0';
                document.getElementById('minutes').innerText = '0';
                document.getElementById('hours').innerText = '0';
                document.getElementById('days').innerText = '0';
                document.getElementById('months').innerText = '0';
                document.getElementById('years').innerText = '0';
                document.getElementById('total-days').innerText = '0';
                return;
            }
            
            // محاسبات بر حسب میلی ثانیه
            const totalSeconds = Math.floor(diffMs / 1000);
            const seconds = totalSeconds % 60;
            const totalMinutes = Math.floor(totalSeconds / 60);
            const minutes = totalMinutes % 60;
            const totalHours = Math.floor(totalMinutes / 60);
            const hours = totalHours % 24;
            const totalDaysRaw = Math.floor(totalHours / 24);
            
            // --- محاسبه سال و ماه و روز بر اساس اختلاف دو تاریخ جلالی (دقیق) ---
            // روش: بدست آوردن تاریخ جلالی امروز و مقایسه با تاریخ فوت
            const nowJalali = moment(); // تاریخ و زمان الان به شمسی (از پلاگین)
            const deathJ = moment('1403-11-02 11:00:00', 'jYYYY-jMM-jD HH:mm:ss');
            
            // اختلاف سال، ماه، روز بدون احتساب ساعت (برای نمایش کامل)
            let years = nowJalali.jYear() - deathJ.jYear();
            let months = nowJalali.jMonth() - deathJ.jMonth();
            let days = nowJalali.jDate() - deathJ.jDate();
            
            // تنظیم منفی‌ها
            if (days < 0) {
                // تعداد روزهای ماه قبل
                let prevMonthDate = deathJ.clone().add(months, 'months').jDate();
                // راه ساده: بریم سراغ ماژولار
                const tempDate = deathJ.clone().add(years, 'years').add(months, 'months');
                const daysInPrevMonth = tempDate.daysInMonth(); // تعداد روزهای ماه قبل
                days += daysInPrevMonth;
                months--;
            }
            if (months < 0) {
                months += 12;
                years--;
            }
            if (years < 0) years = 0;
            
            // همچنین اطمینان از روزهای منفی نشده
            if (days < 0) days = 0;
            
            // برای نمایش کل روزهای سپری شده (بر حسب روز کامل از تاریخ فوت تا الان)
            const totalDays = totalDaysRaw;
            
            // بروزرسانی المان‌ها
            document.getElementById('seconds').innerText = seconds;
            document.getElementById('minutes').innerText = minutes;
            document.getElementById('hours').innerText = hours;
            document.getElementById('days').innerText = days;
            document.getElementById('months').innerText = months;
            document.getElementById('years').innerText = years;
            document.getElementById('total-days').innerText = totalDays;
        }
        
        // ساخت کارت‌های زمان به صورت داینامیک با طراحی زیبا
        function buildTimeCards() {
            const container = document.getElementById('time-cards-container');
            if (!container) return;
            // لیست آیتم‌ها برای نمایش در قالب کارت
            const items = [
                { label: 'سال', id: 'years', icon: '📆' },
                { label: 'ماه', id: 'months', icon: '📅' },
                { label: 'روز', id: 'days', icon: '☀️' },
                { label: 'ساعت', id: 'hours', icon: '⏰' },
                { label: 'دقیقه', id: 'minutes', icon: '⌛' },
                { label: 'ثانیه', id: 'seconds', icon: '⚡' }
            ];
            
            container.innerHTML = '';
            items.forEach(item => {
                const card = document.createElement('div');
                card.className = 'time-card';
                card.innerHTML = `
                    <p>${item.icon} ${item.label}</p>
                    <span id="${item.id}">0</span>
                `;
                container.appendChild(card);
            });
        }
        
        // تابع اصلی که هر ثانیه آپدیت می‌کند
        function startTimer() {
            buildTimeCards();   // ساخت کارت‌ها در DOM
            updateElapsedTime(); // مقداردهی اولیه
            setInterval(() => {
                updateElapsedTime();
            }, 1000);
        }
        
        // در صورتی که کتابخانه moment جلالی لود شده باشد، اجرا کن
        if (typeof moment !== 'undefined') {
            startTimer();
        } else {
            window.addEventListener('load', function() {
                if (typeof moment !== 'undefined') startTimer();
                else console.warn('jalali-moment لود نشد');
            });
        }
    })();