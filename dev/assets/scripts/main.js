// import Swiper from 'swiper'
// import IMask from 'imask'
// import validator from 'validator'
// https://addmorescripts.github.io/hystModal/index_ru.html


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

function simpleSlider() {
    const blockSliders = document.querySelectorAll('[data-simple-slider="main"]')

    if (!blockSliders.length) return

    blockSliders.forEach(blockSlider => {
        const slider = blockSlider.querySelector('[data-simple-slider="slider"]')
        const btnPrev = blockSlider.querySelector('[data-simple-slider="btn-prev"]')
        const btnNext = blockSlider.querySelector('[data-simple-slider="btn-next"]')

        const swiper = new Swiper(slider, {
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
// services()
mainSlider()