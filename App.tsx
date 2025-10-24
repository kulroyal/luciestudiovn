
import React, { useState, useEffect, useCallback } from 'react';
import { View, Theme, themes } from './types';
import { eventImageUrls } from './constants';
import Header from './components/Header';
import Hero from './components/Hero';
import ThemeSwitcher from './components/ThemeSwitcher';
import PackageDetails from './components/PackageDetails';
import PackageComparison from './components/PackageComparison';
import Gallery from './components/Gallery';
import EventFilm from './components/EventFilm';
import PrintingPricelist from './components/PrintingPricelist';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ImageModal from './components/ImageModal';
import ScrollReveal from './components/ScrollReveal';
import ParticleBackground from './components/ParticleBackground';

const hexToRgb = (hex: string): string => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) {
        return '0, 0, 0'; // fallback to black
    }
    const r = parseInt(result[1], 16);
    const g = parseInt(result[2], 16);
    const b = parseInt(result[3], 16);
    return `${r}, ${g}, ${b}`;
};


const App: React.FC = () => {
    const [currentView, setCurrentView] = useState<View>('view-details');
    const [theme, setTheme] = useState<Theme>('theme-default');
    const [selectedPackageId, setSelectedPackageId] = useState<string>('lucie4');
    const [animationClass, setAnimationClass] = useState('view-enter-active');

    const [modalState, setModalState] = useState<{ isOpen: boolean; images: string[]; currentIndex: number }>({
        isOpen: false,
        images: [],
        currentIndex: 0,
    });

    useEffect(() => {
        const currentTheme = themes[theme];
        // The animated background is now in CSS, we only manage variables here
        document.documentElement.style.setProperty('--accent-color', currentTheme.accent);
        document.documentElement.style.setProperty('--brand-dark-color', currentTheme.text); // Use 'text' for main dark color
        document.documentElement.style.setProperty('--accent-rgb', hexToRgb(currentTheme.accent));
        document.body.style.color = currentTheme.text;
    }, [theme]);

    const handleSwitchView = useCallback((view: View) => {
        if (currentView === view) return;

        setAnimationClass('view-exit-active'); // Start exit animation
        
        setTimeout(() => {
            setCurrentView(view);
            setAnimationClass('view-enter-active'); // After switching, start enter animation
             // Scroll to the top of the content area
            const mainElement = document.querySelector('main');
            if (mainElement) {
                mainElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 250); // Duration of exit animation
    }, [currentView]);

    const handleOpenModal = useCallback((images: string[], index: number) => {
        setModalState({ isOpen: true, images, currentIndex: index });
        document.body.style.overflow = 'hidden';
    }, []);

    const handleCloseModal = useCallback(() => {
        setModalState({ isOpen: false, images: [], currentIndex: 0 });
        document.body.style.overflow = 'auto';
    }, []);

    const handleNextImage = useCallback(() => {
        setModalState(prev => ({
            ...prev,
            currentIndex: (prev.currentIndex + 1) % prev.images.length
        }));
    }, []);

    const handlePrevImage = useCallback(() => {
        setModalState(prev => ({
            ...prev,
            currentIndex: (prev.currentIndex - 1 + prev.images.length) % prev.images.length
        }));
    }, []);

    const renderView = () => {
        switch (currentView) {
            case 'view-details':
                return (
                    <PackageDetails 
                        selectedPackageId={selectedPackageId}
                        onSelectPackage={setSelectedPackageId}
                    />
                );
            case 'view-comparison':
                return <PackageComparison onSelectPackage={setSelectedPackageId} onSwitchView={handleSwitchView} theme={theme} />;
            case 'view-gallery':
                return <Gallery onOpenModal={handleOpenModal} />;
            case 'view-event-film':
                return <EventFilm />;
            case 'view-printing':
                return <PrintingPricelist />;
            default:
                return <PackageDetails selectedPackageId={selectedPackageId} onSelectPackage={setSelectedPackageId} />;
        }
    };
    
    const currentThemeDetails = themes[theme];

    return (
        <div className="text-slate-800">
            <ParticleBackground accentColor={currentThemeDetails.accent} />
            <div className="relative z-10">
                <Header currentView={currentView} onSwitchView={handleSwitchView} />

                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <ThemeSwitcher currentTheme={theme} onSetTheme={setTheme} />

                    <ScrollReveal>
                        <section className="text-center mb-16">
                            <h2 className="text-5xl md:text-6xl font-extrabold text-brand-dark mb-4" style={{textShadow: '0 2px 10px rgba(0,0,0,0.1)'}}>🌿 LucieStudio – Trân trọng từng khoảnh khắc, kể bằng trái tim</h2>
                            <p className="text-xl text-slate-700 max-w-4xl mx-auto">Tại LucieStudio, chúng tôi tin rằng mỗi khoảnh khắc đều có một câu chuyện riêng — chỉ cần được nhìn thấy và lưu giữ bằng tất cả sự chân thành. Chúng tôi không đơn thuần chụp hay dựng, mà ghi lại cảm xúc, giữ lại hơi thở của thời gian, và biến chúng thành những thước phim, những khung hình mang linh hồn thật sự. Mỗi dự án là một hành trình. Chúng tôi hết mình từ ý tưởng đến khâu cuối cùng, chăm chút từng chi tiết, để khi bạn nhìn lại, bạn sẽ thấy không chỉ là hình ảnh – mà là một phần ký ức, một phần cảm xúc của chính mình..</p>
                            <div className="mt-8 mx-auto w-20 h-0.5 bg-accent"></div>
                        </section>
                    </ScrollReveal>

                    <Hero images={eventImageUrls.slice(0, 8)} />
                    
                    <div id="contentWrapper" className={`space-y-12 ${animationClass}`}>
                        {renderView()}
                    </div>

                    <Contact />
                </main>

                <Footer />
            </div>

            <ImageModal 
                isOpen={modalState.isOpen}
                onClose={handleCloseModal}
                images={modalState.images}
                currentIndex={modalState.currentIndex}
                onNext={handleNextImage}
                onPrev={handlePrevImage}
            />
        </div>
    );
};

export default App;