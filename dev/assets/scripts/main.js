window.onload = () => {
    welcomeAnimation()
    if (window.matchMedia("(min-width: 992px)").matches) {
        setTimeout(() => {wow()}, 1800)
    }
}

function welcomeAnimation() {
    const main = document.querySelector('[data-welcome-animation="main"]')

    if (!main) return
    
    const wrapperPage = document.querySelector('.wrapper-page')
    const line = main.querySelector('[data-welcome-animation="line"]')

    if (wrapperPage) {
        setTimeout(() => {
            wrapperPage.classList.add('wrapper-page--not-fill')
        }, 100)
    }

    const tl = gsap.timeline()

    tl
    .to(line, {
        width: '100%',
        duration: 1
    })
    .to(line, {
        y: '100%',
        opacity: '0',
        duration: 0.2
    })
    .to(main, {
        backgroundColor: '#1A1E23',
        duration: 0.2,
    }, "-=0.29")
    .to(main, {
        y: '100%',
        duration: 1,
        ease: "sine.out"
    })
}

const myModal = new HystModal({
    linkAttributeName: "data-hystmodal",
    waitTransitions: true,
})

function wow() {
    new WOW({
        offset: 105,
    }).init()
}

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

function validateForm() {
    const forms = document.querySelectorAll('[data-validate-form]')

    if (!forms.length) return

    document.addEventListener('click', (event) => {
        const el = event.target

        if (el.closest('[data-validate-form]')) {
            if (el.closest('button[type="submit"]')) {
                event.preventDefault()

                const form = el.closest('[data-validate-form]')
                const inputs = form.querySelectorAll('.input')
                const textarea = form.querySelectorAll('.textarea')

                const regExpName = /^[A-ZА-ЯЁ]+$/i

                let numberСorrectАields = 0

                const addHeightMessage = () => {
                    setTimeout(() => {
                        inputs.forEach(elInput => {
                            if (elInput.classList.contains('input--error')) {
                                const message = elInput.querySelector('[data-input="message"]')
                                const heightMessage = message.offsetHeight
                                elInput.style.paddingBottom = `${heightMessage}px`
                            } else {
                                elInput.style.paddingBottom = '0'
                            }
                        })
                    }, 0)
                }

                if (inputs.length) {
                    inputs.forEach(elInput => {
                        const input = elInput.querySelector('input')

                        if (input.hasAttribute('required')) {
                            const type = input.getAttribute('data-input-type')
                            const message = elInput.querySelector('[data-input="message"]')

                            if (input.value) {
                                const value = input.value

                                if (type === 'tel') {
                                    if (value.length < 16) {
                                        elInput.classList.add('input--error')
                                        message.innerText = 'Введите полный номер'
                                    } else {
                                        elInput.classList.remove('input--error')
                                    }
                                }

                                if (type === 'name') {
                                    const minlength = +input.getAttribute('minlength')

                                    if (!value.match(regExpName)) {
                                        elInput.classList.add('input--error')
                                        message.innerText = 'Введите имя верно'
                                    } else {
                                        elInput.classList.remove('input--error')
                                    }
                                }

                                if (type === 'surname') {
                                    const minlength = +input.getAttribute('minlength')

                                    if (!value.match(regExpName)) {
                                        elInput.classList.add('input--error')
                                        message.innerText = 'Введите фамилию верно'
                                    } else {
                                        elInput.classList.remove('input--error')
                                    }
                                }

                                if (type === 'patronymic') {
                                    const minlength = +input.getAttribute('minlength')

                                    if (!value.match(regExpName)) {
                                        elInput.classList.add('input--error')
                                        message.innerText = 'Введите отчество верно'
                                    } else {
                                        elInput.classList.remove('input--error')
                                    }
                                }

                                if (type === 'address') {
                                    const minlength = +input.getAttribute('minlength')

                                    if (!value.match(regExpName)) {
                                        elInput.classList.add('input--error')
                                        message.innerText = 'Введите адрес верно'
                                    } else {
                                        elInput.classList.remove('input--error')
                                    }
                                }

                                if (type === 'email') {
                                    if (!validator.isEmail(value)) {
                                        elInput.classList.add('input--error')
                                        message.innerText = 'Введите корректный email'
                                    } else {
                                        elInput.classList.remove('input--error')
                                    }
                                }

                                addHeightMessage()

                            } else {
                                elInput.classList.add('input--error')
                                addHeightMessage()
                                message.innerText = 'Это поле обязательно для заполнения'
                            }
                        }
                    })

                    inputs.forEach(elInput => {
                        if (!elInput.classList.contains('input--error')) {
                            numberСorrectАields++
                        } else {
                            elInput.classList.add('input--error-effect')
                            setTimeout(() => {
                                elInput.classList.remove('input--error-effect')
                            }, 500)
                        }
                    })

                    if (numberСorrectАields === inputs.length) {
                        console.log('Send data')

                        if (form.hasAttribute('action')) {
                            form.submit()
                        }
                    }
                }
            }
        }
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

    mainSlider.forEach(itemMainSlider => {
        const slider = itemMainSlider.querySelector('[data-main-slider="slider"]')
        const btnNext = itemMainSlider.querySelector('[data-main-slider="btnNext"]')
        const btnPrev = itemMainSlider.querySelector('[data-main-slider="btnPrev"]')
        const pagination = itemMainSlider.querySelector('[data-main-slider="pagination"]')
        const blocksImage = itemMainSlider.querySelectorAll('[data-main-slider="block-image"]')
        let effect = slider.getAttribute('data-main-slider-effect')

        if (!effect) effect = "fade"        

        const swiper = new Swiper(slider, {
            slidesPerView: 1,
            lazy: true,
            effect: effect,
            loop: true,
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

        const slides = itemMainSlider.querySelectorAll('.swiper-slide')

        document.addEventListener('mouseover', (event) => {
            const el = event.target
            if (el.closest('[data-main-slider="block-image"]')) {
                swiper.autoplay.stop()
                slides.forEach(slide => {
                    if (slide.classList.contains('swiper-slide-active')) {
                        slide.classList.add('swiper-slide-active--line-paused')
                    } else {
                        slide.classList.remove('swiper-slide-active--line-paused')
                    }
                })
            }
        })
          
        document.addEventListener('mouseout', (event) => {
            const el = event.target
            if (el.closest('[data-main-slider="block-image"]')) {
                swiper.autoplay.start()
                slides.forEach(slide => {
                    if (slide.classList.contains('swiper-slide-active')) {
                        slide.classList.remove('swiper-slide-active--line-paused')
                    }
                })
            }
        })
    })
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
        loop: true,
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
        
        if (slogan) {
            const clonedNode = slogan.cloneNode(true)

            if (blockDecore) {
                blockDecore.appendChild(clonedNode)
                slogan.remove()
            }
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

function ourChannel() {
    const main = document.querySelector('[data-our-channel="main"]')
    if (!main) return

    document.addEventListener('DOMContentLoaded', () => {
        main.insertAdjacentHTML('afterbegin', `
            <div class="our-channel__block-bg">
                <!-- <img src="./assets/images/image-5.jpg" class="our-channel__bg" alt="">-->
                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/RwLE3O52Mzg?autoplay=1&mute=1" loading="lazy" title="Fabulously Beautiful Places on the Planet in 4K video format with Wonderful Relaxing Music" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
        `)
    })
}

function geographyObjects() {
    const main = document.querySelector('[data-geography-objects="main"]')

    if (!main) return

    if (window.matchMedia("(max-width: 992px)").matches) {
        const blockHead = main.querySelector('[data-geography-objects="block-head"]')
        const mainContainer = main.querySelector('[data-geography-objects="main-container"]')

        const clonedNodeBlockHead = blockHead.cloneNode(true)

        const blockDecore = main.querySelector('[data-geography-objects="decore-block"]')
        const description = main.querySelector('[data-geography-objects="description"]')
        
        const clonedNodeDescription = description.cloneNode(true)

        if (blockDecore) {
            blockDecore.appendChild(clonedNodeDescription)
            description.remove()
        }

        if (mainContainer) {
            mainContainer.appendChild(clonedNodeBlockHead)
            blockHead.remove()
        }
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
        } else {
            select.forEach(elSelect => {
                elSelect.classList.remove('active')
            })
        }
    })
}

function serviceCard() {
    const serviceCards = document.querySelectorAll('[data-service-card="main"]')

    if (!serviceCards.length) return

    if (window.matchMedia("(max-width: 992px)").matches) {
        serviceCards.forEach(itemCard => {
            const btn = itemCard.querySelector('[data-service-card="btn"]')
            const blockDescription = itemCard.querySelector('[data-service-card="block-description"]')
            
            const clonedNode = btn.cloneNode(true)

            if (blockDescription) {
                blockDescription.appendChild(clonedNode)
                btn.remove()
            }
        })
    }
}

function formBlock() {
    const formBlocks = document.querySelectorAll('[data-form-block="form-block"]')

    if (!formBlocks.length) return

    const openMessage = (formBlock) => {
        if (formBlock) {
            const blockMessage = formBlock.querySelector('[data-form-block="block-message"]')
            const form = formBlock.querySelector('[data-form-block="form"]')

            blockMessage.classList.add('form-block__block-message--open')
            form.classList.add('form-block__form--hide')
        }
    }

    return {
        openMessage
    }
}

function phoneMask() {
    const phoneMasks = document.querySelectorAll('[data-phone-mask]')

    if (!phoneMasks.length) return

    phoneMasks.forEach(phoneMask => {
        IMask(phoneMask, {
                mask: '+{7}(000)000-00-00'
            }
        )
    })
}

function simpleSlider() {
    const blockSliders = document.querySelectorAll('[data-simple-slider="main"]')

    if (!blockSliders.length) return

    blockSliders.forEach(blockSlider => {
        const slider = blockSlider.querySelector('[data-simple-slider="slider"]')
        const btnPrev = blockSlider.querySelector('[data-simple-slider="btn-prev"]')
        const btnNext = blockSlider.querySelector('[data-simple-slider="btn-next"]')

        const swiper = new Swiper(slider, {
            loop: true,
            lazy: true,
            navigation: {
                nextEl: btnNext,
                prevEl: btnPrev,
            },
        })
    })
}

function partnerCard() {
    const cards = document.querySelectorAll('[data-partner-card="main"]')

    if (!cards.length) return

    cards.forEach(card => {
        const list = card.querySelector('[data-partner-card="list"]')
        const btn = card.querySelector('[data-partner-card="btn"]')
        const btnText = card.querySelector('[data-partner-card="btn-text"]')

        const oldHeight = list.offsetHeight
        list.style.height = 'max-content'
        const newHeight = list.offsetHeight

        if (newHeight > oldHeight) {
            btn.classList.add('show')
            btnText.innerHTML = 'Читать больше'

            smoothView(btn, list, oldHeight)

            btn.addEventListener('click', () => {
                btn.classList.toggle('active')

                if (btn.classList.contains('active')) {
                    btnText.innerHTML = 'Скрыть'
                } else {
                    btnText.innerHTML = 'Читать больше'
                }
            })
        }
    })
}

function sectionReviews() {
    const main = document.querySelector('[data-section-reviews="main"]')

    if (!main) return

    // Slider

    const blockSlider = main.querySelectorAll('[data-section-reviews="block-slider"]')
    

    blockSlider.forEach(itemSlider => {
        const slider = itemSlider.querySelector('[data-section-reviews="slider"]')
        const btnPrev = itemSlider.querySelector('[data-section-reviews="btn-prev"]')
        const btnNext = itemSlider.querySelector('[data-section-reviews="btn-next"]')
    
        const swiper = new Swiper(slider, {
            slidesPerView: 1.05,
            spaceBetween: 10,
            lazy: true,
            loop: true,
            observer: true,
            observeParents: true,
            navigation: {
                nextEl: btnNext,
                prevEl: btnPrev,
            },
            breakpoints: {
                1300: {
                    slidesPerView: 1.15,
                    spaceBetween: 32,
                },
            }
        })
    
        // const slides = slider.querySelectorAll('.swiper-slide')

        // console.log(`Слайдер: ${slides}, Высота слайдера: ${slider.offsetHeight}`)
    
        // slides.forEach(slide => slide.style.height = `${slider.offsetHeight}px`)
    })

    // Tabs

    const itemsNav = main.querySelectorAll('[data-section-reviews="item-nav"]')

    itemsNav.forEach((itemNav, index) => {
        itemNav.setAttribute('data-section-reviews-index', index)
        blockSlider[index].setAttribute('data-section-reviews-index', index)
    })

    document.addEventListener('click', (event) => {
        const el = event.target

        if (el.closest('[data-section-reviews="item-nav"]')) {

            const itemNav = el.closest('[data-section-reviews="item-nav"]')

            itemsNav.forEach((itemNav, index) => {
                itemNav.classList.remove('active')
                blockSlider[index].classList.remove('active')
            })

            const index = itemNav.getAttribute('data-section-reviews-index')

            blockSlider.forEach(itemBlockSlider => {
                const indexSlider = itemBlockSlider.getAttribute('data-section-reviews-index')

                if (indexSlider === index) {
                    itemsNav[index].classList.add('active')
                    itemBlockSlider.classList.add('active')
                }
            })
        }
    })
}

function sectionAboutCompany() {
    const main = document.querySelector('[data-section-about-company="main"]')

    if (!main) return

    if (window.matchMedia("(min-width: 992px)").matches) {
        const wrapperContent = main.querySelector('[data-section-about-company="wrapper-content"]')
        const wrapperNumbers = main.querySelector('[data-section-about-company="wrapper-numbers"]')

        wrapperContent.style.height = `${wrapperNumbers.offsetHeight}px`
    }
}

function ourNumbers() {
    const main = document.querySelector('[data-our-numbers="main"]')

    if (!main) return

    const slider = main.querySelector('[data-our-numbers="slider"]')

    const swiper = new Swiper(slider, {
        effect: "fade",
        lazy: true,
        loop: true,
        autoplay: {
            delay: 3000,
        },
    })
}

function ourRest() {
    const main = document.querySelector('[data-our-rest="main"]')

    if (!main) return

    const slider = main.querySelector('[data-our-rest="slider"]')
    const btnNext = main.querySelector('[data-our-rest="btn-next"]')
    const btnPrev = main.querySelector('[data-our-rest="btn-prev"]')

    const swiper = new Swiper(slider, {
        slidesPerView: 1.1,
        spaceBetween: 10,
        lazy: true,
        loop: true,
        navigation: {
            nextEl: btnNext,
            prevEl: btnPrev,
        },
        breakpoints: {
            576: {
                slidesPerView: 2,
                spaceBetween: 10,
            },
        }
    })
}

function map() {
    ymaps.ready(init)

    function init() {
        const map = document.querySelector('#map')

        if (!map) return

        const htmlMapContent = (name, place, image, url) => {
            return `
                <div class="map-content">
                    <div class="map-content__block-info">
                        <span class="map-content__name">${name}</span>
                        <span class="map-content__place">${place}</span>
                    </div>
                    <div class="map-content__block-image">
                        <img src="${image}" class="map-content__image"/>
                    </div>
                    <div class="map-content__block-link">
                        <a href="${url}" class="map-content__link">Смотреть проект</a>
                    </div>
                </div>
            `
        }

        const myMap = new ymaps.Map(map, {
            center: [55.77101400, 37.63209300],
            zoom: 13,
            controls: ["zoomControl"]
        });

        myMap.controls.add('fullscreenControl', { float: 'left' })

        let pm = new ymaps.Placemark([55.77101400, 37.63209300], {
            balloonContent: htmlMapContent('Гостевой дома “Регата”', 'г. Ростов-на-Дону', './assets/images/image-8.jpg', '#'),
            preset: 'islands#blackStretchyIcon',
            draggable: true,
        }, {
            iconLayout: 'default#image',
            iconImageHref: './assets/images/point.svg',
            iconImageSize: [48, 48],
            iconImageOffset: [-24, -24],
            hideIconOnBalloonOpen: false,
        })

        myMap.geoObjects.add(pm)

        pm.events.add('click', (event) => {
            myMap.setCenter(event.get('target').geometry.getCoordinates())
        })
    }
}

header()
reviews()
menu()
sectionMainSlider()
whyWe()
project()
geographyObjects()
select()
validateForm()
phoneMask()
serviceCard()
simpleSlider()
partnerCard()
sectionReviews()
sectionAboutCompany()
ourNumbers()
ourRest()
ourChannel()
mainSlider()
map()