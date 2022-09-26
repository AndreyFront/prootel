// import Swiper from 'swiper'
// import IMask from 'imask'
// import validator from 'validator'
// https://addmorescripts.github.io/hystModal/index_ru.html

window.onload = () => {

    function smoothView(btn, el, startHeight = 0) {

        if (!btn && !el) return
    
        let heightEl = el.offsetHeight
        el.classList.add('not-active')
        el.style.height = `${startHeight}px`
    
        if (startHeight > 0) {
            if (heightEl < startHeight) {
                el.classList.remove('not-active')
                el.style.height = `${heightEl}px`
            }
        }
    
        const update = () => {
            el.style.height = 'auto'
            setTimeout(() => {
                heightEl = el.offsetHeight
                el.style.height = `${heightEl}px`
            }, 100)
        }
    
        btn.addEventListener('click', () => {
            if (el.classList.contains('not-active')) {
                el.classList.remove('not-active')
                el.style.height = `${heightEl}px`
            } else {
                el.classList.add('not-active')
                el.style.height = `${startHeight}px`
            }
        })
    
        let observer = new MutationObserver(mutationRecords => {
            update()
        })
          
        observer.observe(el, {
            childList: true, 
            subtree: true,
            characterDataOldValue: true
        })
    }

    function header() {
        const header = document.querySelector('[data-header="header"]')

        if (!header) return

        const heightHeader = header.offsetHeight
        const page = document.querySelector('[data-page="page"]')

        const phone = header.querySelector('[data-header="phone"]')

        if (page) page.style.marginTop = `${heightHeader}px`

        if (window.matchMedia("(max-width: 1200px)").matches) {
            const clonedNode = phone.cloneNode(true)
            const nav = header.querySelector('[data-header="nav"]')

            if (nav) {
                nav.appendChild(clonedNode)
                phone.remove()
            }
        }
    }

    function mainSlider() {
        const mainSlider = document.querySelectorAll('[data-main-slider="main-slider"]')

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

    function reviews() {
        const reviews = document.querySelector('[data-reviews="reviews"]')

        if (!reviews) return

        const slider = reviews.querySelector('[data-reviews="slider"]')
        const btnPrev = reviews.querySelector('[data-reviews="btn-prev"]')
        const btnNext = reviews.querySelector('[data-reviews="btn-next"]')

        var swiper = new Swiper(slider, {
            slidesPerView: 2,
            spaceBetween: 48,
            navigation: {
                nextEl: btnNext,
                prevEl: btnPrev,
            },
        })
    }

    function menu() {
        const blockMenu = document.querySelector('[data-menu="block-menu"]')
    
        if (!blockMenu) return
    
        const content = blockMenu.querySelector('[data-menu="content"]')
        const blockContent = document.querySelectorAll('[data-menu="block-content"]')

        const btn = blockMenu.querySelector('[data-menu="btn"]')
    
        const header = document.querySelector('header')
        const heightHeader = header.offsetHeight
    
        btn.addEventListener('click', (event) => {
            event.preventDefault()
            // content.style.top = `${heightHeader}px`
            header.classList.toggle('active-menu')
            document.body.classList.toggle('scroll-lock')
        })

        if (blockContent.length) {
            blockContent.forEach(itemBlockContent => {
                const header = itemBlockContent.querySelector('[data-menu="header"]')
                const body = itemBlockContent.querySelector('[data-menu="body"]')
    
                smoothView(header, body)

                header.addEventListener('click', () => {
                    header.classList.toggle('active')
                })
            })
        }
    }

    header()
    mainSlider()
    reviews()
    menu()
}