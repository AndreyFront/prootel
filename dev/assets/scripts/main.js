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

    function scrollbarWidth() {
        const documentWidth = parseInt(document.documentElement.clientWidth)
        const windowsWidth = parseInt(window.innerWidth)
        const scrollbarWidth = windowsWidth - documentWidth
        return scrollbarWidth
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

        const listSliders = []

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

            listSliders.push(swiper)
        })

        return listSliders
    }

    function reviews() {
        const reviews = document.querySelector('[data-reviews="reviews"]')

        if (!reviews) return

        const slider = reviews.querySelector('[data-reviews="slider"]')
        const btnPrev = reviews.querySelector('[data-reviews="btn-prev"]')
        const btnNext = reviews.querySelector('[data-reviews="btn-next"]')

        var swiper = new Swiper(slider, {
            slidesPerView: 1.15,
            spaceBetween: 10,
            navigation: {
                nextEl: btnNext,
                prevEl: btnPrev,
            },
            breakpoints: {
                1200: {
                    slidesPerView: 2,
                    spaceBetween: 48,
                },
                992: {
                  slidesPerView: 1.5,
                  spaceBetween: 48,
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
            }
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

    function sectionMainSlider() {
        const main = document.querySelector('[data-section-main-slider="main"]')

        if (!main) return

        if (window.matchMedia("(min-width: 1200px)").matches) {
            const decoreBlock = main.querySelector('[data-section-main-slider="decore-block"]')
            const logoHeader = document.querySelector('.header .logo')
    
            if (logoHeader) {
                const logoHeaderDistance = logoHeader.getBoundingClientRect()
                decoreBlock.style.width = `${(logoHeader.offsetWidth + (window.screen.availWidth - logoHeaderDistance.right)) - scrollbarWidth()}px`
            } else {
                decoreBlock.style.width = '23.4%'
            }
        }
    }

    function whyWe() {
        const main = document.querySelector('[data-why-we="main"]')

        if (!main) return

        if (window.matchMedia("(max-width: 992px)").matches) {
            const blockDecore = main.querySelector('[data-why-we="decore-block"]')
            const slogan = main.querySelector('[data-why-we="slogan"]')
            
            const clonedNode = slogan.cloneNode(true)

            if (blockDecore) {
                blockDecore.appendChild(clonedNode)
                slogan.remove()
            }
        }
    }

    function project() {
        const main = document.querySelector('[data-project="main"]')

        if (!main) return

        if (window.matchMedia("(max-width: 992px)").matches) {
            const blockDecore = main.querySelector('[data-project="block-decore"]')
            const title = main.querySelector('[data-project="title"]')
            
            const clonedNode = title.cloneNode(true)

            if (blockDecore) {
                blockDecore.appendChild(clonedNode)
                title.remove()
            }
        }
    }

    function geographyObjects() {
        const main = document.querySelector('[data-geography-objects="main"]')

        if (!main) return

        if (window.matchMedia("(max-width: 992px)").matches) {
            const blockDecore = main.querySelector('[data-geography-objects="decore-block"]')
            const description = main.querySelector('[data-geography-objects="description"]')
            
            const clonedNode = description.cloneNode(true)

            if (blockDecore) {
                blockDecore.appendChild(clonedNode)
                description.remove()
            }
        }
    }

    function services() {
        const main = document.querySelector('[data-services="main"]')

        if (!main) return

        if (window.matchMedia("(max-width: 992px)").matches) {
            const slider = main.querySelector('[data-main-slider="slider"]')
            const btnPrev = main.querySelector('[data-main-slider="btnPrev"]')
            const btnNext = main.querySelector('[data-main-slider="btnNext"]')

            // const swiper = new Swiper(slider, {
            //     slidesPerView: 1.1,
            //     spaceBetween: 10,
            //     autoplay: false,
            //     navigation: {
            //         nextEl: btnNext,
            //         prevEl: btnPrev,
            //     },
            // })
        }
    }

    function select() {
        const select = document.querySelectorAll('[data-select="select"]')

        if (!select.length) return

        document.addEventListener('click', (event) => {
            const el = event.target

            if (el.closest('[data-select="select"]')) {
                const select = el.closest('[data-select="select"]')
                const title = select.querySelector('[data-select="title"]')
                const titleContent = title.textContent
                
                if (el.closest('[data-select="block-title"]')) {
                    select.classList.toggle('active')
                }

                // if (el.closest('[data-select="list"] > li')) {
                //     const li = el.closest('[data-select="list"] > li')
                //     const liContent = li.textContent
                //     title.textContent = liContent
                //     li.textContent = titleContent
                //     select.classList.remove('active')
                // }
            } else {
                select.forEach(elSelect => {
                    elSelect.classList.remove('active')
                })
            }
        })
    }

    header()
    reviews()
    menu()
    sectionMainSlider()
    whyWe()
    project()
    geographyObjects()
    select()
    // services()
    mainSlider()
}