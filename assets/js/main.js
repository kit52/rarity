
import Accordion from 'accordion-js'
import Swiper, { Navigation, Pagination } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'simplebar'; // or "import SimpleBar from 'simplebar';" if you want to use it manually.
import 'simplebar/dist/simplebar.css';

function timer(id, add) {
    // Timer
    const now = new Date();
    const deadline = new Date(now.setHours(now.getHours() + add))
    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),

            seconds = Math.floor((t / 1000) % 60),
            minutes = Math.floor((t / 1000 / 60) % 60),
            hours = Math.floor((t / (1000 * 60 * 60) % 24));

        return {
            'total': t,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return '0' + num;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000);


        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
                startTimer()
            }
        }
    }

    setClock(id, deadline);
}


function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}
function startTimer() {
    const timers = document.querySelectorAll('.timer');
    timers.forEach((t, i) => {
        const id = t.getAttribute('id');

        timer(`#${id}`, getRandomArbitrary(i + 1, 24), i * 3)
    })
}
document.addEventListener("DOMContentLoaded", () => {
    if (document.querySelector('.main-slider-top-section')) {
        const swiper = new Swiper(".main-slider-top-section .swiper", {
            slidesPerView: 1,
            loop: true,
            modules: [Pagination],
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
        });
    }
    if (document.querySelector('.main-slider-small')) {
        const section = document.querySelector('.main-slider-small')
        const swiper = new Swiper(".main-slider-small .swiper", {
            slidesPerView: 17,
            loop: true,
            watchSlidesProgress: true,
            modules: [Navigation],
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
        });
        const prevPaginationButton = section.querySelector('.slider-prev')
        const nextPaginationButton = section.querySelector('.slider-next')

        prevPaginationButton.addEventListener('click', () => {
            swiper.slideNext();
        })
        nextPaginationButton.addEventListener('click', () => {
            swiper.slidePrev();

        })
    }
    if (document.querySelector('.main-action-section')) {
        startTimer()
    }
    if (document.querySelector('.drop')) {
        const drops = document.querySelectorAll(".drop");

        drops.forEach(dropParent => {
            const dropText = dropParent.querySelector('.drop-text')
            const list = dropParent.querySelectorAll('.item');
            dropParent.addEventListener('click', () => {
                dropParent.classList.toggle('active');
            })
            list.forEach(el => {
                el.addEventListener('click', () => {
                    list.forEach(i => {
                        i.classList.remove('selected');
                    })
                    el.classList.add('selected')
                    const text = el.innerText;
                    dropText.innerHTML = text
                })
            })
        })
    }
    const links = document.querySelectorAll('.link')
    if (links.length) {
        links.forEach(link => {
            link.addEventListener('click', function (e) {
                e.preventDefault()
                const href = this.getAttribute('data-href')
                location.href = href
            })
        })
    }
    const filterBtn = document.querySelectorAll('.filter-btn');
    if (filterBtn) {
        filterBtn.forEach(item => {
            item.addEventListener('click', () => {
                filterBtn.forEach(el => {
                    el.classList.remove('selected')
                })
                item.classList.add('selected')
            })
        })
    }
    const sectionWithBg = document.querySelector('.section-with-bg');
    if (sectionWithBg) {
        const url = sectionWithBg.getAttribute('data-img');
        sectionWithBg.style = `background-image:url(${url})`
    }

    // Accordion
    const filterSection = document.querySelector(".accordion-filter-section");
    if (filterSection) {
        const accordions = filterSection.querySelector('.accordion-container')

        const acc = new Accordion(accordions)
        acc.open(3)
        if (filterSection) {
            const list = [...filterSection.querySelectorAll('li')];
            list.forEach(item => {
                item.addEventListener("click", () => {
                    list.forEach(el => el.classList.remove('selected'));
                    item.classList.add('selected');
                })
            })
        }
    }
    // likes
    const likes = document.querySelectorAll('.likes');
    if (likes.length) {
        likes.forEach(item => {
            item.addEventListener('click', () => {
                item.classList.toggle('select')
            })
        })
    }
});