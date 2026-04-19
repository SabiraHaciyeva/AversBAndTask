//!!!  Business Development & Innovation OLAN HISSE!!! 
// ============ BUSINESS SECTION RENDER ============ Sebire yazdi
function renderBusinessSection() {
    fetch("https://69e2d0313327837a1552a346.mockapi.io/admin/slider/AboutInfo")
        .then(res => {
            if (!res.ok) throw new Error('Network response was not ok');
            return res.json();
        })
        .then(data => {
            console.log('API-dən gələn data:', data);

            // Business Development & Innovation kateqoriyalı bütün məlumatları filter et
            const businessItems = data.filter(item => 
                item.category === 'Business Development & Innovation'
            );
            
            console.log('Filterlənmiş məlumatlar:', businessItems);
            
            if (businessItems.length === 0) {
                console.log('Business məlumatı tapılmadı');
                return;
            }

            // Title yenilə (ilk məlumatın CoreTitle-ı ilə)
            const titleEl = document.getElementById('businessTitle');
            if (titleEl && businessItems[0].CoreTitle) {
                titleEl.textContent = businessItems[0].CoreTitle;
            }

            // Grid-i tap
            const grid = document.getElementById('businessGrid');
            if (!grid) {
                console.error('businessGrid tapılmadı!');
                return;
            }

            // Hər məlumat üçün KART YARAT
            grid.innerHTML = businessItems.map((item, index) => {
                // Icon class-ını yoxla - əgər "fas fa-" ilə başlamırsa, default icon istifadə et
                let iconClass = item.Icon || 'fas fa-briefcase';
                if (iconClass && !iconClass.includes('fa-')) {
                    iconClass = 'fas fa-briefcase'; // Default icon
                }
                
                // Başlıq üçün CoreTitle istifadə et (AltTitle1 null olduğu üçün)
                const title = item.AltTitle1 || item.CoreTitle || 'Başlıq';
                
                return `
                <div class="ins-card reveal delay-${index + 1}">
                    <div class="ins-icon new-glow-pulse" style="animation-delay:${index * 0.5}s;">
                        <i class="${iconClass}"></i>
                    </div>
                    <div class="ins-content">
                        <h3>${title}</h3>
                        <p>${item.Description || 'Açıqlama'}</p>
                    </div>
                </div>
            `}).join('');

            // Reveal animasiyasını yenidən işlət (yeni əlavə olunan elementlər üçün)
            initRevealForNewElements();
        })
        .catch(err => {
            console.error('Business məlumatı yüklənmədi:', err);
        });
}

// Yeni əlavə olunan elementlər üçün reveal animasiyası
function initRevealForNewElements() {
    const newElements = document.querySelectorAll('.ins-card.reveal:not(.active)');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => { 
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });
    
    newElements.forEach(el => revealObserver.observe(el));
}

// Səhifə yüklənəndə
document.addEventListener('DOMContentLoaded', renderBusinessSection);


//!!!  SERVICES XITMETLER HISSESI !!!
// Services bölməsini API-dən yüklə
async function loadServices() {
    try {
        const res = await fetch('https://69b3c525e224ec066bdd09b4.mockapi.io/services');
        const services = await res.json();
        
        // Yalnız aktiv olanları göstər (status = 1)
        const activeServices = services.filter(item => item.status == 1);
        
        const container = document.getElementById('servicesGrid');
        
        container.innerHTML = activeServices.map(item => `
            <div class="s2-card new-tilt-card" data-tilt>
                <div class="s2-card-img" style="background-image: url('${item.image}');"></div>
                <div class="s2-card-content">
                    <div class="s2-icon-circle">
                        <i class="${item.icon}"></i>
                    </div>
                    <h3>${item.title}</h3>
                </div>
                <div class="new-tilt-glare"></div>
            </div>
        `).join('');
        
    } catch (err) {
        console.error('Xəta:', err);
    }
}

// Səhifə yüklənəndə çağır
document.addEventListener('DOMContentLoaded', loadServices);

//!! NEWS JS GULAY
// ============ NEWS LOADER - Загрузка новостей из API ============

document.addEventListener('DOMContentLoaded', function() {
    loadNews();
});

// Загрузка новостей с сервера
function loadNews() {
    console.log('Загрузка новостей...');
    
    fetch('https://69b3c525e224ec066bdd09b4.mockapi.io/news')
        .then(function(response) {
            return response.json();
        })
        .then(function(news) {
            console.log('Получены данные:', news);
            
            // Фильтруем только активные (status = 1) и берём первые 3
            let activeNews = news.filter(function(item) {
                return item.status == 1;
            }).slice(0, 3);
            
            console.log('Активные новости:', activeNews);
            
            // Генерируем HTML карточек
            let container = document.getElementById('newsGrid');
            container.innerHTML = activeNews.map(function(item, index) {
                return `
                    <article class="s6-blog-card new-tilt-card" data-tilt>
                        <div class="s6-blog-image-wrapper">
                            <img src="${item.image || 'https://via.placeholder.com/600x400'}" alt="${item.title}" class="s6-blog-image">
                            <div class="s6-blog-date">
                                <span class="s6-blog-date-day">${item.day || '01'}</span>
                                <span class="s6-blog-date-month">${item.month || 'JAN'}</span>
                            </div>
                        </div>
                        <div class="s6-blog-content">
                            <div class="s6-blog-meta">
                                <span class="s6-blog-meta-item"><i class="fas fa-folder"></i> ${item.category || 'General'}</span>
                                <span class="s6-blog-meta-item"><i class="fas fa-user"></i> ${item.author || 'Admin'}</span>
                            </div>
                            <h3 class="s6-blog-card-title">${item.title}</h3>
                            <a href="#" class="s6-read-more">READ MORE</a>
                        </div>
                        <div class="new-tilt-glare"></div>
                    </article>
                `;
            }).join('');
            
            // Переинициализируем tilt-эффект для новых карточек
            initTiltEffect();
            
            console.log('Новости загружены:', activeNews.length);
        })
        .catch(function(error) {
            console.error('Ошибка загрузки новостей:', error);
            // Fallback - показываем сообщение об ошибке
            document.getElementById('newsGrid').innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: #666;">
                    <i class="fas fa-exclamation-circle" style="font-size: 48px; margin-bottom: 15px; color: #4c5fd7;"></i>
                    <p>Новости не загружены. Пожалуйста, попробуйте позже.</p>
                </div>
            `;
        });
}

// Tilt эффект для новых карточек
function initTiltEffect() {
    document.querySelectorAll('[data-tilt]').forEach(function(card) {
        var glare = card.querySelector('.new-tilt-glare');
        
        card.addEventListener('mousemove', function(e) {
            var rect = this.getBoundingClientRect();
            var x = (e.clientX - rect.left) / rect.width;
            var y = (e.clientY - rect.top) / rect.height;
            
            var tiltX = (y - 0.5) * 10;
            var tiltY = (x - 0.5) * -10;
            
            this.style.transform = 'perspective(800px) rotateX(' + tiltX + 'deg) rotateY(' + tiltY + 'deg) scale3d(1.02,1.02,1.02)';

            if (glare) {
                var glareAngle = Math.atan2(y - 0.5, x - 0.5) * (180 / Math.PI) + 180;
                glare.style.background = 'linear-gradient(' + glareAngle + 'deg, rgba(255,255,255,0.15) 0%, transparent 80%)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale3d(1,1,1)';
        });
    });
}


//!!!
// ============ RAPID PROTOTYPE SECTION RENDER ============
function renderRapidPrototypeSection() {
    fetch("https://69e2d0313327837a1552a346.mockapi.io/admin/slider/AboutInfo")
        .then(res => {
            if (!res.ok) throw new Error('Network response was not ok');
            return res.json();
        })
        .then(data => {
            console.log('API-dən gələn data:', data);

            // Rapid Prototype and Development kateqoriyalı məlumatı tap
            const rapidItem = data.find(item => 
                item.category === 'Rapid Prototype and Development'
            );
            
            console.log('Rapid Prototype məlumatı:', rapidItem);
            
            if (!rapidItem) {
                console.log('Rapid Prototype məlumatı tapılmadı');
                return;
            }

            // Content div-i tap
            const contentEl = document.querySelector('.ins-design-content');
            if (!contentEl) {
                console.error('ins-design-content tapılmadı!');
                return;
            }

            // HTML yarat
            contentEl.innerHTML = `
                <span class="ins-subtitle reveal-right active">${rapidItem.UstTitle || 'DESIGN MATTERS'}</span>
                <h2 class="ins-title reveal-right delay-1 active">${rapidItem.CoreTitle || 'Rapid Prototype and Development'}</h2>
                
                <p class="ins-design-text reveal-right delay-2 active">${rapidItem.Description || 'Default description...'}</p>
                
                <p class="ins-design-text reveal-right delay-3 active">${rapidItem.Description2 || 'Default description 2...'}</p>
                
                <a href="#" class="ins-btn-primary reveal-right delay-4 new-magnetic active" style="position: relative; overflow: hidden;">Learn More</a>
            `;

            // Reveal animasiyasını yenidən işlət
            initRevealForRapidElements();
        })
        .catch(err => {
            console.error('Rapid Prototype məlumatı yüklənmədi:', err);
        });
}

// Yeni əlavə olunan elementlər üçün reveal animasiyası
function initRevealForRapidElements() {
    const newElements = document.querySelectorAll('.ins-design-content .reveal-right:not(.active)');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => { 
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });
    
    newElements.forEach(el => revealObserver.observe(el));
}

// Səhifə yüklənəndə
document.addEventListener('DOMContentLoaded', renderRapidPrototypeSection);

//!!! About olan
// ============ GROW BUSINESS SECTION RENDER ============
function renderGrowBusinessSection() {
    fetch("https://69e2d0313327837a1552a346.mockapi.io/admin/slider/AboutInfo")
        .then(res => {
            if (!res.ok) throw new Error('Network response was not ok');
            return res.json();
        })
        .then(data => {
            console.log('API-dən gələn data:', data);

            // Grow Your Business with Avers Today kateqoriyalı məlumatı tap
            const growItem = data.find(item => 
                item.category === 'Grow Your Business with Avers Today'
            );
            
            console.log('Grow Business məlumatı:', growItem);
            
            if (!growItem) {
                console.log('Grow Business məlumatı tapılmadı');
                return;
            }

            // Content div-i tap
            const contentEl = document.querySelector('.ins-about-content');
            if (!contentEl) {
                console.error('ins-about-content tapılmadı!');
                return;
            }

            // HTML yarat
            contentEl.innerHTML = `
                <span class="ins-subtitle reveal-left active">${growItem.UstTitle || 'WE ARE PIONEER'}</span>
                <h2 class="ins-title reveal-left delay-1 active">${growItem.CoreTitle || 'Grow Your Business with Avers Today'}</h2>
                
                <p class="ins-about-text reveal-left delay-2 active">${growItem.Description || 'Default description...'}</p>
                
                <div class="ins-about-features">
                    <div class="ins-left-text reveal-left delay-3 active">
                        ${growItem.Description2 || 'Default description 2...'}
                    </div>
                    <div class="ins-right-features reveal-left delay-4 active">
                        <div class="ins-feature-item">
                            <i class="fas fa-check"></i>
                            <span>${growItem.AltTitle1 || 'Business automation'}</span>
                        </div>
                        <div class="ins-feature-item">
                            <i class="fas fa-check"></i>
                            <span>${growItem.AltTitle2 || 'Critical Analytics'}</span>
                        </div>
                        <div class="ins-feature-item">
                            <i class="fas fa-check"></i>
                            <span>${growItem.AltTitle3 || 'Full detailed report'}</span>
                        </div>
                        <div class="ins-feature-item">
                            <i class="fas fa-check"></i>
                            <span>${growItem.AltTitle4 || 'Qualtiy Management'}</span>
                        </div>
                    </div>
                </div>
                
                <!-- Testimonial dəyişməz -->
                <div class="ins-testimonial-box reveal-left delay-4 active">
                    <p class="ins-testimonial-text">Adip isicing elit, sed do eiusmod tem por inci didunt ut labore dolore</p>
                </div>
                
                <!-- Actions dəyişməz -->
                <div class="ins-about-actions reveal-left delay-5 active">
                    <a href="#" class="ins-btn-primary new-magnetic" style="position: relative; overflow: hidden;">Learn More</a>
                    <div class="ins-video-btn new-magnetic new-badge-float">
                        <i class="fas fa-play"></i>
                    </div>
                </div>
            `;

            // Reveal animasiyasını yenidən işlət
            initRevealForGrowElements();
        })
        .catch(err => {
            console.error('Grow Business məlumatı yüklənmədi:', err);
        });
}

// Yeni əlavə olunan elementlər üçün reveal animasiyası
function initRevealForGrowElements() {
    const newElements = document.querySelectorAll('.ins-about-content .reveal-left:not(.active)');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => { 
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });
    
    newElements.forEach(el => revealObserver.observe(el));
}

// Səhifə yüklənəndə
document.addEventListener('DOMContentLoaded', renderGrowBusinessSection);

//!!Simple easy
// ============ SIMPLE EASY STEPS SECTION RENDER ============
function renderStepsSection() {
    fetch("https://69e2d0313327837a1552a346.mockapi.io/admin/slider/AboutInfo")
        .then(res => {
            if (!res.ok) throw new Error('Network response was not ok');
            return res.json();
        })
        .then(data => {
            console.log('API-dən gələn data:', data);

            // Simple Easy Steps to Follow kateqoriyalı bütün məlumatları filter et
            const stepItems = data.filter(item => 
                item.category === 'Simple Easy Steps to Follow'
            );
            
            console.log('Filterlənmiş addımlar:', stepItems);
            
            if (stepItems.length === 0) {
                console.log('Addım məlumatı tapılmadı');
                return;
            }

            // Grid-i tap
            const grid = document.querySelector('.s3-steps-grid');
            if (!grid) {
                console.error('s3-steps-grid tapılmadı!');
                return;
            }

            

            // Hər məlumat üçün kart yarat
            const cardsHTML = stepItems.map((item, index) => {
                // Icon class-ını yoxla
                let iconClass = item.Icon || 'fas fa-check';
                if (iconClass && !iconClass.includes('fa-')) {
                    iconClass = 'fas fa-check';
                }
                
                // Başlıq üçün CoreTitle istifadə et
                const title = item.CoreTitle || `Step ${index + 1}`;
                const description = item.Description || 'Default description...';
                
                return `
                    <div class="s3-step-card">
                        <div class="s3-step-number new-badge-float" style="animation-delay:${index * 0.3}s;">
                            <i class="${iconClass}"></i>
                        </div>
                        <h3 class="s3-step-title">${title}</h3>
                        <p class="s3-step-description">${description}</p>
                    </div>
                `;
            }).join('');

            grid.innerHTML = cardsHTML;

            // Reveal animasiyasını yenidən işlət
            initRevealForStepElements();
        })
        .catch(err => {
            console.error('Addım məlumatı yüklənmədi:', err);
        });
}

// Yeni əlavə olunan elementlər üçün reveal animasiyası
function initRevealForStepElements() {
    const newElements = document.querySelectorAll('.s3-step-card');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => { 
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });
    
    newElements.forEach(el => revealObserver.observe(el));
}

// Səhifə yüklənəndə
document.addEventListener('DOMContentLoaded', renderStepsSection);

//!! A Great
// ============ ACCORDION SECTION RENDER ============
function renderAccordionSection() {
    fetch("https://69e2d0313327837a1552a346.mockapi.io/admin/slider/AboutInfo")
        .then(res => {
            if (!res.ok) throw new Error('Network response was not ok');
            return res.json();
        })
        .then(data => {
            console.log('API-dən gələn data:', data);

            // A Great Team for Quality Results kateqoriyalı bütün məlumatları filter et
            const accordionItems = data.filter(item => 
                item.category === 'A Great Team for Quality Results'
            );
            
            console.log('Filterlənmiş accordion məlumatları:', accordionItems);
            
            if (accordionItems.length === 0) {
                console.log('Accordion məlumatı tapılmadı');
                return;
            }

            // Container tap
            const container = document.querySelector('.s4-accordion');
            if (!container) {
                console.error('s4-accordion tapılmadı!');
                return;
            }

            // Hər məlumat üçün accordion item yarat - mövcud strukturu saxla
            container.innerHTML = accordionItems.map((item, index) => {
                const title = item.CoreTitle || `Başlıq ${index + 1}`;
                const description = item.Description || 'Default description...';
                
                return `
                    <div class="s4-accordion-item">
                        <div class="s4-accordion-header" onclick="s4ToggleAccordion(this)">
                            <div class="s4-accordion-icon"></div>
                            <h3 class="s4-accordion-title">${title}</h3>
                        </div>
                        <div class="s4-accordion-content">
                            <p>${description}</p>
                        </div>
                    </div>
                `;
            }).join('');

        })
        .catch(err => {
            console.error('Accordion məlumatı yüklənmədi:', err);
        });
}

// Səhifə yüklənəndə
document.addEventListener('DOMContentLoaded', renderAccordionSection);

//!! What People say
// ============ LOAD SLIDERS TO HERO SECTION ============

// Данные слайдеров и текущий индекс
var sliderData = [];
var currentSlideIdx = 0;
var autoplayInterval;

// Запускаем когда страница загрузилась
document.addEventListener('DOMContentLoaded', function() {
    loadSliders();
});

// Загрузка слайдеров с сервера
function loadSliders() {
    console.log('Загрузка слайдеров...');
    
    fetch('https://69e2d0313327837a1552a346.mockapi.io/admin/slider/slider')
        .then(function(response) {
            return response.json();
        })
        .then(function(sliders) {
            console.log('Получены данные:', sliders);
            
            // Фильтруем только активные (status = 1) и сортируем по sira
            var activeSliders = sliders.filter(function(item) {
                return item.status == 1;
            }).sort(function(a, b) {
                return a.sira - b.sira;
            });
            
            console.log('Активные слайды:', activeSliders);
            
            if (activeSliders.length === 0) {
                console.log('Нет активных слайдов');
                return;
            }
            
            // Сохраняем данные глобально
            sliderData = activeSliders;
            currentSlideIdx = 0;
            
            // Показываем первый слайд
            showSlide(0);
            
            // Создаем точки навигации
            createDots(activeSliders.length);
            
            // Запускаем автоплей
            startAutoplay();
        })
        .catch(function(error) {
            console.error('Ошибка загрузки:', error);
        });
}

// Показать слайд по индексу
function showSlide(index) {
    var slide = sliderData[index];
    console.log('Показываем слайд:', slide);
    
    // Находим элементы
    var titleEl = document.querySelector('.hero-content .title');
    var subtitleEl = document.querySelector('.hero-content .subtitle');
    var imgEl = document.querySelector('.hero-image');
    
    // Обновляем текст и картинку
    if (titleEl && slide.title) {
        titleEl.textContent = slide.title;
    }
    
    if (subtitleEl && slide.icon) {
        subtitleEl.textContent = slide.icon;
    }
    
    if (imgEl && slide.image) {
        imgEl.src = slide.image;
        imgEl.alt = slide.title || 'Slide';
    }
    
    // Обновляем активную точку
    updateDots(index);
    currentSlideIdx = index;
}

// Создать точки навигации
function createDots(count) {
    var container = document.querySelector('.slider-dots');
    if (!container) return;
    
    var dotsHtml = '';
    for (var i = 0; i < count; i++) {
        var activeClass = (i === 0) ? 'active' : '';
        dotsHtml += '<span class="dot ' + activeClass + '" onclick="goToSlide(' + i + ')"></span>';
    }
    
    container.innerHTML = dotsHtml;
}

// Обновить активную точку
function updateDots(activeIndex) {
    var dots = document.querySelectorAll('.slider-dots .dot');
    dots.forEach(function(dot, index) {
        if (index === activeIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Перейти к слайду
function goToSlide(index) {
    // Проверяем границы
    if (index < 0) {
        index = sliderData.length - 1;
    }
    if (index >= sliderData.length) {
        index = 0;
    }
    
    showSlide(index);
    resetAutoplay();
}

// Сменить слайд (влево/вправо)
function changeSlide(direction) {
    goToSlide(currentSlideIdx + direction);
}

// Автоплей
function startAutoplay() {
    autoplayInterval = setInterval(function() {
        changeSlide(1);
    }, 5000);
}

// Сбросить автоплей
function resetAutoplay() {
    clearInterval(autoplayInterval);
    startAutoplay();
}
// // ============ TESTIMONIAL SECTION RENDER ============
// function renderTestimonialSection() {
//     fetch("https://69e2d0313327837a1552a346.mockapi.io/admin/slider/AboutInfo")
//         .then(res => {
//             if (!res.ok) throw new Error('Network response was not ok');
//             return res.json();
//         })
//         .then(data => {
//             console.log('API-dən gələn data:', data);

//             // What People Say kateqoriyalı bütün məlumatları filter et
//             const testimonialItems = data.filter(item => 
//                 item.category === 'What People Say'
//             );
            
//             console.log('Filterlənmiş testimonial məlumatları:', testimonialItems);
            
//             if (testimonialItems.length === 0) {
//                 console.log('Testimonial məlumatı tapılmadı');
//                 return;
//             }

//             // Slider container tap
//             const slider = document.querySelector('.s5-testimonial-slider');
//             if (!slider) {
//                 console.error('s5-testimonial-slider tapılmadı!');
//                 return;
//             }

//             // Pagination dots container tap
//             const pagination = document.querySelector('.s5-pagination-dots');
//             if (!pagination) {
//                 console.error('s5-pagination-dots tapılmadı!');
//                 return;
//             }

//             // Slide-ları yarat
//             const slidesHTML = testimonialItems.map((item, index) => {
//                 const description = item.Description || 'Default quote text...';
//                 const authorName = item.AltTitle1 || 'John Doe';
//                 const authorRole = item.AltTitle2 || 'Customer';
//                 const imageUrl = item.Icon || 'https://via.placeholder.com/100x100';
                
//                 // İlk slide active olsun
//                 const activeClass = index === 0 ? 's5-active' : '';
                
//                 return `
//                     <div class="s5-testimonial-slide ${activeClass}" data-slide="${index}">
//                         <p class="s5-quote-text">${description}</p>
//                         <div class="s5-author-info">
//                             <div class="s5-author-avatar">
//                                 <img src="${imageUrl}" alt="${authorName}">
//                             </div>
//                             <div class="s5-author-details">
//                                 <h4>${authorName}</h4>
//                                 <p>${authorRole}</p>
//                             </div>
//                         </div>
//                     </div>
//                 `;
//             }).join('');

//             // Pagination dots yarat
//             const dotsHTML = testimonialItems.map((_, index) => {
//                 const activeClass = index === 0 ? 's5-active' : '';
//                 return `<span class="s5-dot ${activeClass}" onclick="s5GoToSlide(${index})"></span>`;
//             }).join('');

//             // HTML əlavə et
//             slider.innerHTML = slidesHTML;
//             pagination.innerHTML = dotsHTML;

//         })
//         .catch(err => {
//             console.error('Testimonial məlumatı yüklənmədi:', err);
//         });
// }

// // Səhifə yüklənəndə
// document.addEventListener('DOMContentLoaded', renderTestimonialSection);