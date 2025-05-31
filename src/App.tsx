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

interface Config {
    discordLink: string;
    translations: Translations;
}

const App: React.FC = () => {
    const [language, setLanguage] = useState('ua');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [config, setConfig] = useState<Config>({ discordLink: '', translations: {} });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const response = await fetch(
                    'https://raw.githubusercontent.com/pavlotech/Hutsuls/master/config.json'
                );
                if (!response.ok) {
                    throw new Error('Failed to load configuration');
                }
                const content = await response.json();
                setConfig(content);
                setLoading(false);
            } catch {
                setError('Failed to load configuration');
                setLoading(false);
            }
        };
        fetchConfig();
    }, []);

    useEffect(() => {
        if (config.translations[language]) {
            document.title = config.translations[language].title;
        }
    }, [language, config]);

    const flagMap: { [key: string]: string } = {
        en: 'circle-flags:gb',
        ua: 'circle-flags:ua',
    };

    const updateContent = (lang: string) => {
        setLanguage(lang);
        setDropdownOpen(false);
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', color: '#FFFFFF' }}>
                <div className="lds-grid">
                    <div></div><div></div><div></div>
                    <div></div><div></div><div></div>
                    <div></div><div></div><div></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', color: '#FFFFFF' }}>
                <p style={{ fontSize: '24px', fontWeight: '600' }}>{error}</p>
            </div>
        );
    }

    return (
        <div className="app-container">
            <div className="glow-effect"></div>
            <header>
                <div id="logo-container">
                    <a href="/" id="logo-text">{config.translations[language]?.logo || 'HUTSULS'}</a>
                </div>
                <div className="language-dropdown-wrapper">
                    <div className="language-display" onClick={() => setDropdownOpen(!dropdownOpen)}>
                        <Icon icon={flagMap[language]} />
                        <span>{language.toUpperCase()}</span>
                        <Icon icon="mdi:menu-down" />
                    </div>
                    {dropdownOpen && (
                        <div className="language-options">
                            {Object.keys(config.translations).map((lang) => (
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
                <img alt="Logo" id="logo-center" src="logo.svg" />
                <h1 id="welcome-message">{config.translations[language]?.welcomeMessage || 'Welcome'}</h1>
                <a href={config.discordLink} id="join-button" target="_blank">
                    {config.translations[language]?.joinButton || 'Join'}
                </a>
            </div>
            <footer>© hutsuls {new Date().getFullYear()}</footer>
        </div>
    );
};

export default App;