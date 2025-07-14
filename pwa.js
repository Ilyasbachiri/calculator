// تسجيل Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then(registration => {
                console.log('ServiceWorker registration successful');
            })
            .catch(err => {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}

// عرض زر التثبيت عند توفر الإمكانية
let deferredPrompt;
const installBtn = document.getElementById('installBtn');

window.addEventListener('beforeinstallprompt', (e) => {
    // منع المتصفح من عرض رسالة التثبيت التلقائية
    e.preventDefault();
    // حفظ الحدث ليتم استخدامه لاحقاً
    deferredPrompt = e;
    // عرض زر التثبيت
    installBtn.style.display = 'block';
});

installBtn.addEventListener('click', () => {
    // إخفاء زر التثبيت
    installBtn.style.display = 'none';
    // عرض رسالة التثبيت
    deferredPrompt.prompt();
    // انتظار اختيار المستخدم
    deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the install prompt');
        } else {
            console.log('User dismissed the install prompt');
        }
        deferredPrompt = null;
    });
});

window.addEventListener('appinstalled', () => {
    console.log('App was installed');
    installBtn.style.display = 'none';
    deferredPrompt = null;
});