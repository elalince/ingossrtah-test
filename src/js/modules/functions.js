export function showNav() {
    document.addEventListener("DOMContentLoaded", () => {
        const burger = document.querySelector(".header__burger");
        const header = document.querySelector("header");
        const nav = document.querySelector(".header__nav");
        const links = nav.querySelectorAll("a");
        const offset = 80; // отступ сверху

        // клик по бургеру
        burger.addEventListener("click", e => {
            e.stopPropagation();
            burger.classList.toggle("active");
            header.classList.toggle("nav-active");
            header.classList.remove("dropdown-active");
            nav.classList.toggle("open");

            document.querySelectorAll(".header__dropdown.open").forEach(d => {
                if (d !== dropdown) d.classList.remove("open");
            });
        });

        // клик по ссылке в меню
        links.forEach(link => {
            link.addEventListener("click", e => {
                e.preventDefault();
                const targetId = link.getAttribute("href").slice(1);
                const target = document.getElementById(targetId);

                if (target) {
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
                    window.scrollTo({
                        top: targetPosition - offset,
                        behavior: "smooth"
                    });
                }

                burger.classList.remove("active");
                header.classList.remove("nav-active");
                nav.classList.remove("open");
            });
        });

        // закрытие по клику вне nav
        document.addEventListener("click", e => {
            if (
                nav.classList.contains("open") &&
                !nav.contains(e.target) &&
                !burger.contains(e.target)
            ) {
                burger.classList.remove("active");
                header.classList.remove("nav-active");
                nav.classList.remove("open");
            }
        });
    });
}



export function headerBg() {
    document.addEventListener("DOMContentLoaded", () => {
        const header = document.querySelector("header");

        window.addEventListener("scroll", () => {
            if (window.scrollY > 0) {
                header.classList.add("fixed");
            } else {
                header.classList.remove("fixed");
            }
        });
    });
}

export function showDropdown() {
    // триггеры у .header__location и .header__lang
    document.querySelectorAll(".header__location, .header__lang").forEach(wrapper => {
        const trigger = wrapper.querySelector("span");
        const dropdown = wrapper.querySelector(".header__dropdown");

        trigger.addEventListener("click", e => {
            e.stopPropagation();

            // закрываем все остальные открытые дропдауны
            document.querySelectorAll(".header__dropdown.open").forEach(d => {
                if (d !== dropdown) d.classList.remove("open");
            });

            // переключаем текущий
            dropdown.classList.toggle("open");
        });
    });

    // логика для мобильных контролов
    document.addEventListener("DOMContentLoaded", () => {
        const controls = document.querySelector(".header__controls--mobile");
        const header = document.querySelector("header");
        const dropdowns = document.querySelectorAll(".header__dropdown");
        const nav = document.querySelector(".header__nav");
        const burger = document.querySelector(".header__burger");

        controls.addEventListener("click", e => {
            e.stopPropagation(); // чтобы глобальный клик не закрыл

            header.classList.toggle("dropdown-active");
            header.classList.remove("nav-active");
            nav.classList.remove("open");
            burger.classList.remove("active");
            dropdowns.forEach(drop => drop.classList.toggle("open"));
        });
    });

    // закрыть дропдауны при клике вне (только если нет активного header)
    document.addEventListener("click", () => {
        const header = document.querySelector("header");
        if (header.classList.contains("dropdown-active")) {
            document.querySelectorAll(".header__dropdown.open").forEach(d => {
                d.classList.remove("open");
            });
            header.classList.remove("dropdown-active");
        }
    });
}



export function mainSlider() {
const solutionsSlider = new Swiper('.solutions__slider', {
    slidesPerView: 'auto',
    spaceBetween: 12,

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    scrollbar: {
        el: '.solutions__scrollbar',
        draggable: true,
    },
    breakpoints: {
        768: {
            scrollbar: { enabled: false },
            navigation: { enabled: true },
        },
        0: {
            scrollbar: { enabled: true },
            navigation: { enabled: false },
        }
    }
});
const solutionsSlider2 = new Swiper('.reviews__slider', {
    slidesPerView: 'auto',
    spaceBetween: 12,

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    scrollbar: {
        el: '.reviews__scrollbar',
        draggable: true,
    },
    breakpoints: {
        768: {
            scrollbar: { enabled: false },
            navigation: { enabled: true },
        },
        0: {
            scrollbar: { enabled: true },
            navigation: { enabled: false },
        }
    }
});
}

export function instructionReveal() {
    if (window.innerWidth <= 768) return; // ❌ на мобильных не запускаем

    const items = document.querySelectorAll(".instruction__item");

    items.forEach(item => {
        const text = item.querySelector(".instruction__text");
        const btn = item.querySelector(".instruction__btn");

        item.addEventListener("mouseenter", () => {
            // Убираем active у всех элементов
            items.forEach(i => {
                if (i !== item) i.classList.remove("active");
            });

            // Добавляем active текущему элементу
            item.classList.add("active");

            // Сброс таймера
            clearTimeout(item._revealTimeout);

            // Ждём окончания transition (0.3s)
            item._revealTimeout = setTimeout(() => {
                if (text) {
                    text.style.position = "relative";
                    text.style.opacity = "1";
                    text.style.transform = "translateY(0)";
                }
                if (btn) {
                    btn.style.opacity = "1";
                    btn.style.visibility = "visible";
                }
            }, 300);
        });

        item.addEventListener("mouseleave", () => {
            clearTimeout(item._revealTimeout);
            if (text) {
                text.style.position = "absolute";
                text.style.opacity = "0";
                text.style.transform = "translateY(30px)";
            }
            if (btn) {
                btn.style.opacity = "0";
                btn.style.visibility = "hidden";
            }

            // Убираем active при уходе мыши
            item.classList.remove("active");
        });
    });
}



export function faqOpening() {
    const faqItems = document.querySelectorAll('.faq__item');

    faqItems.forEach(faqItem => {
        faqItem.addEventListener('click', () => {
            faqItem.classList.toggle('open');
        });

    });
}
export function dropdown() {
    document.querySelectorAll(".dropdown").forEach(dropdown => {
        const selected = dropdown.querySelector(".dropdown-selected");
        const list = dropdown.querySelector(".dropdown-list");

        // открыть/закрыть по клику на весь блок
        dropdown.addEventListener("click", e => {
            // если кликнули по LI — выбираем значение
            if (e.target.tagName.toLowerCase() === "li") {
                selected.textContent = e.target.textContent;
                dropdown.classList.remove("open");
            } else {
                dropdown.classList.toggle("open");
            }
        });

        // клик вне дропдауна — закрыть
        document.addEventListener("click", e => {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove("open");
            }
        });
    });
}

export function callLink() {
    document.addEventListener("scroll", () => {
        const callLink = document.querySelector(".call-link");
        const triggerHeight = window.innerHeight;

        if (window.scrollY >= triggerHeight) {
            callLink.classList.add("visible");
        } else {
            callLink.classList.remove("visible");
        }
    });
}

// export function topBlockScroll() {
//     const topBlock = document.querySelector('.top-block');
//     if (!topBlock) return;

//     // Только для десктопа
//     let isScrolling = false;

//     window.addEventListener('wheel', function(e) {
//         if (isScrolling) return;
//         if (window.scrollY > 10) return; // Только если наверху страницы

//         // Только если скроллим вниз
//         if (e.deltaY > 0) {
//             isScrolling = true;
//             const target = topBlock.offsetHeight;
//             const start = window.scrollY;
//             const duration = 700;
//             const startTime = performance.now();

//             function animateScroll(currentTime) {
//                 const elapsed = currentTime - startTime;
//                 const progress = Math.min(elapsed / duration, 1);
//                 const ease = 0.5 - Math.cos(progress * Math.PI) / 2; // easeInOut

//                 window.scrollTo(0, start + (target - start) * ease);

//                 if (progress < 1) {
//                     requestAnimationFrame(animateScroll);
//                 } else {
//                     isScrolling = false;
//                 }
//             }

//             requestAnimationFrame(animateScroll);
//         }
//     }, { passive: false });
// }
