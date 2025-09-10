// Ждем загрузку DOM
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация всех функций
    initParticleSystem();
    initNavigation();
    initModTabs();
    initScrollAnimations();
    initDownloadButtons();
    initMobileMenu();
    initSmoothScrolling();
    initBackgroundEffects();
});

// Навигация и скролл
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // Изменение прозрачности навбара
        if (currentScrollY > 100) {
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        } else {
            navbar.style.background = 'rgba(15, 23, 42, 0.9)';
        }
        
        lastScrollY = currentScrollY;
    });

    // Активный пункт меню
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });
}

// Переключение категорий модов
function initModTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const modCategories = document.querySelectorAll('.mod-category');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetCategory = btn.getAttribute('data-category');
            
            // Убираем активный класс со всех кнопок и категорий
            tabBtns.forEach(b => b.classList.remove('active'));
            modCategories.forEach(c => c.classList.remove('active'));
            
            // Добавляем активный класс к выбранным
            btn.classList.add('active');
            document.querySelector(`.mod-category[data-category="${targetCategory}"]`).classList.add('active');
            
            // Анимация появления
            const activeCategory = document.querySelector(`.mod-category[data-category="${targetCategory}"]`);
            activeCategory.style.opacity = '0';
            activeCategory.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                activeCategory.style.opacity = '1';
                activeCategory.style.transform = 'translateY(0)';
            }, 50);
        });
    });
}

// Анимации при скролле
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Задержка для карточек в сетке
                if (entry.target.classList.contains('mod-card') || 
                    entry.target.classList.contains('about-card') ||
                    entry.target.classList.contains('resourcepack-card')) {
                    
                    const cards = entry.target.parentElement.children;
                    const index = Array.from(cards).indexOf(entry.target);
                    entry.target.style.animationDelay = `${index * 0.1}s`;
                }
            }
        });
    }, observerOptions);

    // Наблюдаем за элементами для анимации
    const animateElements = document.querySelectorAll(`
        .about-card,
        .mod-card,
        .resourcepack-card,
        .download-card,
        .step,
        .hero-text > *
    `);

    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Кнопки скачивания
function initDownloadButtons() {
    // Устанавливаем ссылки на Google Drive файлы
    const downloadFull = document.getElementById('downloadFull');
    const downloadMods = document.getElementById('downloadMods');
    const downloadRP = document.getElementById('downloadRP');
    
    if (downloadFull) {
        // Прямая ссылка Dropbox - скачивается сразу!
        downloadFull.href = 'https://www.dropbox.com/scl/fi/vkvfrs23t75fks7u93rq5/full.zip?rlkey=e9xwjntblcym4qli67ejlid3x&st=nlj7zede&dl=1';
        downloadFull.addEventListener('click', () => {
            showNotification('📦 Скачивание полной сборки началось!', 'success');
        });
    }
    
    if (downloadMods) {
        // Прямая ссылка Dropbox - скачивается сразу!
        downloadMods.href = 'https://www.dropbox.com/scl/fi/p00jh3n38buj1h42fo73b/only-mods.zip?rlkey=nh6h583bug2eesc6muc3pw5u1&st=oxa76sa2&dl=1';
        downloadMods.addEventListener('click', () => {
            showNotification('🧩 Скачивание модов началось!', 'success');
        });
    }
    
    if (downloadRP) {
        // Прямая ссылка Dropbox - скачивается сразу!
        downloadRP.href = 'https://www.dropbox.com/scl/fi/l3wp9pfw263fsr1bk7i0z/only-resourcepacks.zip?rlkey=pdp8g9k3muq3w520m2ho81q6l&st=6vgcqaml&dl=1';
        downloadRP.addEventListener('click', () => {
            showNotification('🎨 Скачивание ресурспаков началось!', 'success');
        });
    }
}

// Мобильное меню
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// Плавная прокрутка
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                e.preventDefault();
                
                const offsetTop = targetSection.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Фоновые эффекты
function initBackgroundEffects() {
    initBlocksHoverEffect();
    initCardsMouseEffect();
}

// Отдельная функция для hover эффекта блоков
function initBlocksHoverEffect() {
    const blocks = document.querySelectorAll('.block');
    
    // Убираем старые обработчики если есть
    blocks.forEach(block => {
        block.removeEventListener('mouseenter', blockHoverHandler);
        block.removeEventListener('mouseleave', blockLeaveHandler);
    });
    
    // Добавляем новые обработчики
    blocks.forEach(block => {
        block.addEventListener('mouseenter', blockHoverHandler);
        block.addEventListener('mouseleave', blockLeaveHandler);
    });
}

// Обработчики для блоков
function blockHoverHandler(e) {
    const block = e.target;
    block.style.transform = 'scale(1.1) rotate(5deg)';
    block.style.animation = 'pulse 1s ease-in-out infinite';
}

function blockLeaveHandler(e) {
    const block = e.target;
    block.style.transform = '';
    block.style.animation = 'pulse 3s ease-in-out infinite';
}

// Функция для карточек
function initCardsMouseEffect() {
    const cards = document.querySelectorAll('.mod-card, .about-card, .resourcepack-card, .download-card');
    
    cards.forEach(card => {
        // Убираем старые обработчики
        card.removeEventListener('mousemove', cardMouseMoveHandler);
        card.removeEventListener('mouseleave', cardMouseLeaveHandler);
        
        // Добавляем новые
        card.addEventListener('mousemove', cardMouseMoveHandler);
        card.addEventListener('mouseleave', cardMouseLeaveHandler);
    });
}

// Обработчики для карточек
function cardMouseMoveHandler(e) {
    const card = e.target.closest('.mod-card, .about-card, .resourcepack-card, .download-card');
    if (!card) return;
    
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
}

function cardMouseLeaveHandler(e) {
    const card = e.target.closest('.mod-card, .about-card, .resourcepack-card, .download-card');
    if (!card) return;
    
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
}

// Уведомления
function showNotification(message, type = 'info') {
    // Создаем уведомление если его нет
    let notification = document.getElementById('notification');
    if (!notification) {
        notification = createNotificationElement();
    }
    
    // Устанавливаем тип и текст
    notification.className = `notification ${type} show`;
    notification.querySelector('.notification-message').textContent = message;
    
    // Убираем через 5 секунд
    setTimeout(() => {
        notification.classList.remove('show');
    }, 5000);
}

function createNotificationElement() {
    const notification = document.createElement('div');
    notification.id = 'notification';
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message"></span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Обработчик закрытия
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.classList.remove('show');
    });
    
    return notification;
}

// Добавляем стили для уведомлений
const notificationStyles = `
    .notification {
        position: fixed;
        top: 100px;
        right: 20px;
        max-width: 400px;
        background: rgba(30, 41, 59, 0.95);
        backdrop-filter: blur(10px);
        border: 1px solid var(--border-color);
        border-radius: 15px;
        padding: 1rem 1.5rem;
        color: var(--text-primary);
        transform: translateX(120%);
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 10000;
        box-shadow: var(--shadow);
    }
    
    .notification.show {
        transform: translateX(0);
        opacity: 1;
        visibility: visible;
    }
    
    .notification.info {
        border-left: 4px solid var(--primary-color);
    }
    
    .notification.success {
        border-left: 4px solid var(--secondary-color);
    }
    
    .notification.warning {
        border-left: 4px solid var(--accent-color);
    }
    
    .notification-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
    }
    
    .notification-message {
        flex: 1;
        font-size: 0.9rem;
        line-height: 1.4;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: var(--text-secondary);
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: color 0.3s ease;
    }
    
    .notification-close:hover {
        color: var(--text-primary);
    }
    
    @media (max-width: 480px) {
        .notification {
            left: 10px;
            right: 10px;
            max-width: none;
        }
    }
`;

// Добавляем стили уведомлений в head
const notificationStyleElement = document.createElement('style');
notificationStyleElement.textContent = notificationStyles;
document.head.appendChild(notificationStyleElement);

// Дополнительные стили для анимаций
const animationStyles = `
    .animate-in {
        animation: fadeInUp 0.8s ease forwards;
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
    
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            top: 70px;
            right: -100%;
            width: 300px;
            height: calc(100vh - 70px);
            background: rgba(15, 23, 42, 0.98);
            backdrop-filter: blur(20px);
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            padding: 2rem 1rem;
            transition: right 0.3s ease;
            border-left: 1px solid var(--border-color);
        }
        
        .nav-menu.active {
            right: 0;
        }
        
        .nav-menu a {
            padding: 1rem;
            font-size: 1.1rem;
            width: 100%;
            text-align: center;
            border-bottom: 1px solid var(--border-color);
        }
        
        .download-btn {
            margin-top: 1rem !important;
            width: 80% !important;
            text-align: center !important;
        }
    }
`;

const animationStyleElement = document.createElement('style');
animationStyleElement.textContent = animationStyles;
document.head.appendChild(animationStyleElement);

// Функция для подсчета модов по категориям
function updateModCounts() {
    const categories = {
        visual: document.querySelectorAll('.mod-category[data-category="visual"] .mod-card').length,
        optimization: document.querySelectorAll('.mod-category[data-category="optimization"] .mod-card').length,
        content: document.querySelectorAll('.mod-category[data-category="content"] .mod-card').length,
        utility: document.querySelectorAll('.mod-category[data-category="utility"] .mod-card').length
    };
    
    // Обновляем счетчики в кнопках табов
    document.querySelectorAll('.tab-btn').forEach(btn => {
        const category = btn.getAttribute('data-category');
        if (categories[category]) {
            const countSpan = btn.querySelector('.mod-count') || document.createElement('span');
            countSpan.className = 'mod-count';
            countSpan.textContent = `(${categories[category]})`;
            if (!btn.querySelector('.mod-count')) {
                btn.appendChild(countSpan);
            }
        }
    });
}

// Инициализируем подсчет модов
setTimeout(updateModCounts, 100);

// Дополнительные интерактивные эффекты
function initAdditionalEffects() {
    // Убрали глючный эффект печатания
    
    // Плавное появление статистики
    const versionBadges = document.querySelectorAll('.version-badge');
    versionBadges.forEach((badge, index) => {
        badge.style.opacity = '0';
        badge.style.transform = 'translateY(20px)';
        badge.style.transition = 'all 0.5s ease';
        
        setTimeout(() => {
            badge.style.opacity = '1';
            badge.style.transform = 'translateY(0)';
        }, 300 * (index + 1));
    });
    
    // Переинициализация hover эффектов при необходимости
    initHoverEffectsWatcher();
}

// Следим за корректностью hover эффектов
function initHoverEffectsWatcher() {
    let lastScrollTime = 0;
    
    window.addEventListener('scroll', () => {
        const now = Date.now();
        
        // Переинициализируем эффекты раз в 2 секунды при скролле
        if (now - lastScrollTime > 2000) {
            lastScrollTime = now;
            initBlocksHoverEffect();
            initCardsMouseEffect();
        }
    });
    
    // Также переинициализируем при изменении размера окна
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            initBlocksHoverEffect();
            initCardsMouseEffect();
        }, 100);
    });
}

// Запускаем дополнительные эффекты после загрузки
setTimeout(initAdditionalEffects, 1500);

// Инициализируем анимацию блоков при скролле
initBlocksScrollAnimation();

// Анимация блоков при скролле
function initBlocksScrollAnimation() {
    const blocks = document.querySelectorAll('.block');
    let lastScrollY = window.scrollY;
    let isScrolling = false;
    let scrollAnimationFrameId;
    
    // Для каждого блока создаем уникальные параметры движения
    const blockData = [];
    blocks.forEach((block, index) => {
        blockData.push({
            element: block,
            originalTransform: window.getComputedStyle(block).transform,
            amplitude: 15 + Math.random() * 25, // Амплитуда движения 15-40px
            frequency: 0.8 + Math.random() * 0.4, // Частота 0.8-1.2
            phase: Math.random() * Math.PI * 2, // Случайная фаза
            direction: Math.random() > 0.5 ? 1 : -1, // Случайное направление
            baseY: 0,
            isHovered: false,
            isLeaving: false,
            hoverStartY: 0,
            hoverStartX: 0
        });
    });
    
    function updateBlocksPosition() {
        const currentScrollY = window.scrollY;
        const scrollDelta = currentScrollY - lastScrollY;
        
        blockData.forEach((data, index) => {
            if (!data.isHovered && !data.isLeaving) { // Не анимируем если блок под hover или выходит из него
                // НОВЫЙ ПОДХОД: используем текущую позицию скролла напрямую, БЕЗ накопления
                const scrollMultiplier = 0.15; // Уменьшили чувствительность
                const maxOffset = 40; // Уменьшили максимальное смещение
                
                // Рассчитываем смещение на основе ТЕКУЩЕЙ позиции скролла
                let scrollBasedY = (currentScrollY * scrollMultiplier * data.direction) % (maxOffset * 2);
                if (scrollBasedY > maxOffset) scrollBasedY = maxOffset * 2 - scrollBasedY;
                if (scrollBasedY < -maxOffset) scrollBasedY = -maxOffset * 2 - scrollBasedY;
                
                // Небольшое хаотичное покачивание для каждого блока
                const time = Date.now() * 0.001;
                const randomFloat = Math.sin(time * data.frequency + data.phase) * 6; // Уменьшили амплитуду
                const randomX = Math.sin(time * data.frequency * 0.7 + data.phase) * 4; // Уменьшили боковое движение
                
                const totalY = scrollBasedY + randomFloat;
                const totalX = randomX;
                
                // Обновляем baseY для использования в hover (но НЕ накапливаем!)
                data.baseY = scrollBasedY;
                
                // Применяем трансформацию только если блок не в hover состоянии
                data.element.style.transform = `translate(${totalX}px, ${totalY}px)`;
            }
        });
        
        lastScrollY = currentScrollY;
        isScrolling = false;
    }
    
    // Обработчик скролла с throttling
    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            isScrolling = true;
            scrollAnimationFrameId = requestAnimationFrame(updateBlocksPosition);
        }
    });
    
    // Лёгкая постоянная анимация только для хаотичного покачивания
    function continuousAnimation() {
        if (!isScrolling) {
            const time = Date.now() * 0.001;
            const currentScrollY = window.scrollY;
            
            blockData.forEach((data, index) => {
                if (!data.isHovered && !data.isLeaving) {
                    // Используем тот же подход без накопления
                    const scrollMultiplier = 0.15;
                    const maxOffset = 40;
                    
                    let scrollBasedY = (currentScrollY * scrollMultiplier * data.direction) % (maxOffset * 2);
                    if (scrollBasedY > maxOffset) scrollBasedY = maxOffset * 2 - scrollBasedY;
                    if (scrollBasedY < -maxOffset) scrollBasedY = -maxOffset * 2 - scrollBasedY;
                    
                    const randomFloat = Math.sin(time * data.frequency + data.phase) * 6;
                    const randomX = Math.sin(time * data.frequency * 0.7 + data.phase) * 4;
                    
                    const totalY = scrollBasedY + randomFloat;
                    const totalX = randomX;
                    
                    // Обновляем baseY для hover
                    data.baseY = scrollBasedY;
                    
                    // Применяем анимацию только если блок не в hover
                    data.element.style.transform = `translate(${totalX}px, ${totalY}px)`;
                }
            });
        }
        requestAnimationFrame(continuousAnimation);
    }
    continuousAnimation();
    
    // Отслеживаем hover состояние блоков
    blocks.forEach((block, index) => {
        const data = blockData[index];
        
        block.addEventListener('mouseenter', () => {
            data.isHovered = true;
            data.isLeaving = false; // Сбрасываем флаг если снова навели
            
            // Запоминаем текущую позицию для плавного hover
            data.hoverStartY = data.baseY;
            data.hoverStartX = Math.sin(Date.now() * 0.001 * data.frequency * 0.7 + data.phase) * 5;
            
            // Применяем hover эффект БЕЗ резкого смещения - остаёмся на текущем месте
            block.style.transform = `translate(${data.hoverStartX}px, ${data.hoverStartY}px) scale(1.1) rotate(5deg)`;
            block.style.transition = 'transform 0.3s ease';
        });
        
        block.addEventListener('mouseleave', () => {
            // Сохраняем информацию о том, что блок выходит из hover
            data.isLeaving = true;
            
            // Возвращаемся к текущей позиции скролла БЕЗ дополнительного смещения
            const returnY = data.baseY + Math.sin(Date.now() * 0.001 * data.frequency + data.phase) * 8;
            const returnX = Math.sin(Date.now() * 0.001 * data.frequency * 0.7 + data.phase) * 5;
            
            // Плавно убираем scale и rotate, возвращаясь к актуальной позиции
            block.style.transform = `translate(${returnX}px, ${returnY}px)`;
            block.style.transition = 'transform 0.6s ease-out';
            
            // Постепенно возвращаем к анимации скролла
            setTimeout(() => {
                data.isHovered = false;
                
                // Ещё немного ждём перед полным возвратом к анимации
                setTimeout(() => {
                    data.isLeaving = false;
                    block.style.transition = 'transform 0.3s ease-out'; // Оставляем лёгкий transition
                    
                    // И через ещё немного убираем его совсем
                    setTimeout(() => {
                        block.style.transition = '';
                    }, 300);
                }, 200);
            }, 100);
        });
    });
}

// Обработка ошибок и фоллбэки
window.addEventListener('error', (e) => {
    console.warn('JavaScript error caught:', e.message);
});

// Система частиц
function initParticleSystem() {
    const particleContainer = document.getElementById('particles-container');
    
    // Определяем количество частиц в зависимости от размера экрана
    let particleCount = 80; // Увеличили количество
    if (window.innerWidth <= 768) {
        return; // Отключаем на мобильных
    } else if (window.innerWidth <= 1024) {
        particleCount = 40; // Больше на планшетах
    }
    
    // Проверяем предпочтения пользователя
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return; // Отключаем анимации для пользователей с ограничениями
    }
    
    const particles = [];
    
    // Создаем частицы постепенно для плавного появления
    for (let i = 0; i < particleCount; i++) {
        setTimeout(() => {
            createParticle();
        }, i * 100); // Уменьшили задержку для быстрого появления
    }
    
    function createParticle() {
        const particle = document.createElement('div');
        const particleType = Math.floor(Math.random() * 4) + 1;
        particle.className = `particle type-${particleType}`;
        
        // Добавляем эффект мерцания для некоторых частиц
        if (Math.random() < 0.3) {
            particle.classList.add('twinkle');
        }
        
        // Случайное положение по X
        const startX = Math.random() * window.innerWidth;
        particle.style.left = startX + 'px';
        
        // Начинаем сверху экрана для красивого движения вниз
        particle.style.top = '-20px';
        
        // Случайная скорость анимации
        const animationDuration = 15 + Math.random() * 20; // 15-35 сек
        particle.style.animationDuration = animationDuration + 's';
        
        // Случайная задержка для плавного появления
        const delay = Math.random() * 3; // Ещё меньше задержки для быстрого старта
        particle.style.animationDelay = delay + 's';
        
        // Добавляем интерактивность
        particle.addEventListener('mouseenter', () => {
            particle.style.animationPlayState = 'paused';
            particle.style.transform = 'scale(1.8)';
        });
        
        particle.addEventListener('mouseleave', () => {
            particle.style.animationPlayState = 'running';
            particle.style.transform = '';
        });
        
        particleContainer.appendChild(particle);
        particles.push(particle);
        
        // Пересоздаем частицу после анимации
        setTimeout(() => {
            if (particle.parentNode) {
                particle.remove();
                const index = particles.indexOf(particle);
                if (index > -1) {
                    particles.splice(index, 1);
                }
                createParticle();
            }
        }, (animationDuration + delay) * 1000);
    }
    
    
    // Обновляем позиции при скролле
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateParticlesOnScroll();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    function updateParticlesOnScroll() {
        const scrollY = window.scrollY;
        particles.forEach((particle, index) => {
            if (particle.parentNode) {
                const offset = (scrollY * 0.1 * (1 + index % 3)) % window.innerHeight;
                particle.style.transform = `translateY(${offset}px)`;
            }
        });
    }
    
    // Пересоздаем частицы при изменении размера окна
    window.addEventListener('resize', () => {
        // Очищаем старые частицы
        particles.forEach(particle => {
            if (particle.parentNode) {
                particle.remove();
            }
        });
        particles.length = 0;
        
        // Создаем новые
        for (let i = 0; i < particleCount; i++) {
            createParticle();
        }
    });
}

// Проверка поддержки IntersectionObserver
if (!window.IntersectionObserver) {
    // Fallback для старых браузеров
    console.warn('IntersectionObserver not supported, using fallback');
    const animateElements = document.querySelectorAll('.about-card, .mod-card, .resourcepack-card');
    animateElements.forEach(el => {
        el.classList.add('animate-in');
    });
}
