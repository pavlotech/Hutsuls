import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';

interface Translations {
    [key: string]: {
        logo: string;
        welcomeMessage: string;
        joinButton: string;
        title: string;
    };
}

const translations: Translations = {
    en: {
        logo: 'HUTSULS',
        welcomeMessage: 'Welcome to our Discord server',
        joinButton: 'Join the Server',
        title: 'HUTSULS',
    },
    ua: {
        logo: 'ГУЦУЛИ',
        welcomeMessage: 'Ласкаво просимо до нашого сервера Discord',
        joinButton: 'Приєднатися до сервера',
        title: 'ГУЦУЛИ',
    },
};

const App: React.FC = () => {
    const [language, setLanguage] = useState('en');
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        document.title = translations[language].title;
    }, [language]);

    const flagMap: { [key: string]: string } = {
        en: 'circle-flags:gb',
        ua: 'circle-flags:ua',
    };

    const updateContent = (lang: string) => {
        setLanguage(lang);
        setDropdownOpen(false);
    };

    return (
        <div className="app-container">
            <div className="glow-effect"></div>
            <header>
                <div id="logo-container">
                    <a href="/" id="logo-text">{translations[language].logo}</a>
                </div>
                <div className="language-dropdown-wrapper">
                    <div className="language-display" onClick={() => setDropdownOpen(!dropdownOpen)}>
                        <Icon icon={flagMap[language]} />
                        <span>{language.toUpperCase()}</span>
                        <Icon icon="mdi:menu-down" />
                    </div>
                    {dropdownOpen && (
                        <div className="language-options">
                            {['en', 'ua'].map((lang) => (
                                <div key={lang} className="language-option" onClick={() => updateContent(lang)}>
                                    <Icon icon={flagMap[lang]} />
                                    <span>{lang.toUpperCase()}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </header>
            <div className="content-wrapper">
                <img alt="Logo" id="logo-center" src="src/assets/logo.svg" />
                <h1 id="welcome-message">{translations[language].welcomeMessage}</h1>
                <a href="https://discord.gg/GHYDFC9fyV" id="join-button" target="_blank">
                    {translations[language].joinButton}
                </a>
            </div>
            <footer>© hutsuls 2025</footer>
        </div>
    );
};

export default App;