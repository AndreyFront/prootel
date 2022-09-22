// import Swiper from 'swiper'
// import IMask from 'imask'
// import validator from 'validator'
// https://addmorescripts.github.io/hystModal/index_ru.html

window.onload = () => {
    function header() {
        const header = document.querySelector('[data-header="header"]')

        if (!header) return

        const heightHeader = header.offsetHeight
        const page = document.querySelector('[data-page="page"]')
        if (page) page.style.marginTop = `${heightHeader}px`
    }

    function mainSlider() {
        const mainSlider = document.querySelectorAll('[data-main-slider="mainSlider"]')

        if (!mainSlider.length) return

        mainSlider.forEach(itemMainSlider => {
            const slider = itemMainSlider.querySelector('[data-main-slider="slider"]')
            const slides = itemMainSlider.querySelectorAll('[data-main-slider="slide"]')
            const btnNext = itemMainSlider.querySelector('[data-main-slider="btnNext"]')
            const btnPrev = itemMainSlider.querySelector('[data-main-slider="btnPrev"]')
            const pagination = itemMainSlider.querySelector('[data-main-slider="pagination"]')
            const blocksImage = itemMainSlider.querySelectorAll('[data-main-slider="block-image"]')

            const swiper = new Swiper(slider, {
                slidesPerView: 1,
                effect: "fade",
                // loop: true,
                watchSlidesProgress: true,
                autoplay: {
                    delay: 3000,
                    disableOnInteraction: false
                },
                pagination: {
                    el: pagination,
                    type: "fraction",
                },
                navigation: {
                    nextEl: btnNext,
                    prevEl: btnPrev,
                },
            })

            if (blocksImage.length > 1) {
                blocksImage.forEach(blockImage => {
                    blockImage.insertAdjacentHTML('beforeend', `
                        <div class="main-slider__block-progress-line">
                            <div class="main-slider__progress-line" data-main-slider="progress-line"></div>
                        </div>
                    `)
                })


                function slidesFunc() {
                    slides.forEach(slide => {
                        const progressLine = slide.querySelector('[data-main-slider="progress-line"]')
    
                        if (slide.classList.contains('swiper-slide-active')) {
                            progressLine.classList.add('main-slider__progress-line--animate')
                        } else {
                            progressLine.classList.remove('main-slider__progress-line--animate')
                        }
                    })
                }

                slidesFunc()

                let observer = new MutationObserver(mutationRecords => {
                    slidesFunc()
                })
                  
                observer.observe(itemMainSlider, {
                    childList: true,
                    subtree: true,
                    characterDataOldValue: true
                })

                document.addEventListener('mouseenter', event => {
                    const el = event.target
                    if (el.closest('[data-main-slider="slide"]')) {

                        const slide = el.closest('[data-main-slider="slide"]')
                        const slider = slide.closest('[data-main-slider="slider"]')
                        const progressLine = slide.querySelector('[data-main-slider="progress-line"]')

                        swiper.autoplay.stop()
                        slider.classList.add('swiper-paused')
                        progressLine.style.animationPlayState = "paused"
                    }
                }, true)

                document.addEventListener('mouseleave', event => {
                    const el = event.target
                    if (el.closest('[data-main-slider="slide"]')) {

                        const slide = el.closest('[data-main-slider="slide"]')
                        const slider = slide.closest('[data-main-slider="slider"]')
                        const progressLine = slide.querySelector('[data-main-slider="progress-line"]')

                        swiper.autoplay.start()
                        slider.classList.remove('swiper-paused')
                        progressLine.classList.remove('main-slider__progress-line--animate')

                        setTimeout(() => {
                            progressLine.classList.add('main-slider__progress-line--animate')
                            progressLine.style.animationPlayState = "running"
                        }, 10)
                    }
                }, true)
            }
        })
    }

    header()
    mainSlider()
}