document.addEventListener('DOMContentLoaded', function() {
  
  // تعریف دکمه‌ها و عنوانی که باید در سایت پیدا کنن
  const buttons = [
    { id: 'very-good', title: 'خیلی خوب' },
    { id: 'good', title: 'خوب' },
    { id: 'medium', title: 'متوسط' },
    { id: 'acceptable', title: 'قابل قبول' },
    { id: 'weak', title: 'ضعیف' }
  ];

  buttons.forEach(btnInfo => {
    const btn = document.getElementById(btnInfo.id);
    btn.addEventListener('click', () => {
      // پیدا کردن تب فعال و اجرای اسکریپت
      chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.scripting.executeScript({
          target: {tabId: tabs[0].id},
          func: selectRadioByTitle,
          args: [btnInfo.title] // فرستادن عنوان به عنوان ورودی تابع
        });
      });
    });
  });
});

// این تابع داخل صفحه دانشگاه اجرا میشه - دقیقاً همون کد اول
function selectRadioByTitle(titleToFind) {
  // پیدا کردن دکمه‌ها بر اساس تایتل
  const radios = document.querySelectorAll(`input[type="radio"][title="${titleToFind}"]`);
  
  if (radios.length === 0) {
    alert('هیچ گزینه‌ای پیدا نشد! مطمئن شوید در صفحه نظرسنجی هستید.');
    return;
  }

  radios.forEach(radio => {
    radio.click();
  });

  // یک پیام کوچیک برای اطمینان (اختیاری)
  console.log(`تمام گزینه‌های "${titleToFind}" انتخاب شدند.`);
}