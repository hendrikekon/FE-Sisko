import React, { useEffect, useState } from 'react';
import './index.css';

const BannerSlide = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = [
        "https://static.vecteezy.com/system/resources/previews/000/178/023/original/vector-modern-sale-and-promotion-banner-design-template.jpg",
        "https://static.vecteezy.com/system/resources/previews/000/176/229/original/vector-grand-offer-sale-and-discount-banner-template-for-promotion.jpg",
        "https://static.vecteezy.com/system/resources/previews/000/178/337/original/flash-sale-promotional-banner-template-for-marketing-vector.jpg",
        "https://static.vecteezy.com/system/resources/previews/000/178/364/original/super-sale-offer-and-discount-banner-template-for-marketing-and-vector.jpg"
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [slides.length]);

    const prevSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
    };

    const nextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    };

    const getSlideClass = (index) => {
        if (index === currentSlide) return 'slide current';
        if (index === (currentSlide - 1 + slides.length) % slides.length) return 'slide previous';
        if (index === (currentSlide + 1) % slides.length) return 'slide next';
        return 'slide';
    };

    return (
        <div className="banner-slide">
            <button className="arrow left-arrow" onClick={prevSlide}>{"<"}</button>
            <div className="slide-container">
                {slides.map((slide, index) => (
                    <div key={index} className={getSlideClass(index)}>
                        <img src={slide} alt={`Banner ${index + 1}`} />
                    </div>
                ))}
            </div>
            <button className="arrow right-arrow" onClick={nextSlide}>{">"}</button>
        </div>
    );
};

export default BannerSlide;
