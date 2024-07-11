var translations = {
    en: 'locales/en.json',
    vi: 'locales/vi.json'
};

const languageNames = {
    en: 'En',
    vi: 'Vi'
};

function loadJSON(url, callback) {
    fetch(url)
        .then(response => response.json())
        .then(data => callback(data))
        .catch(error => console.error('Error loading JSON:', error));
}

function loadLanguage(lang) {
    fetch(translations[lang])
        .then(response => response.json())
        .then(data => {
            document.querySelectorAll('[data-i18n]').forEach(element => {
                const key = element.getAttribute('data-i18n');
                element.textContent = data[key];
            });
            document.title = data['title'];
            document.querySelector('meta[name="description"]').setAttribute('content', data['description']);
            document.getElementById('current-language').textContent = `${languageNames[lang]}`;
        });
}

function detectUserLanguage() {
    let userLang = navigator.language || navigator.userLanguage;
    let lang = userLang.split('-')[0];
    loadLanguage(lang);
}

// Load language
detectUserLanguage()
