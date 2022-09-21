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

    header()
}