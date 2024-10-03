import Headroom from 'headroom.js'
import App from '@/app/App.js'

import CBurgerButton from '@/components/c-burger-button/c-burger-button.js'
import CPopup from '@/components/c-popup/c-popup.js'

import formPlugin from '@/plugins/form.js'

const app = new App({
  plugins: {
    form: formPlugin,
  },

  components: {
    CBurgerButton,
    CPopup,
  },

  methods: { 
    initScrollBehavior() {
      const html = document.querySelector('html')

      setTimeout(() => {
        html.style.scrollBehavior = 'smooth'
      }, 500)
    },

    initHeadroom() {
      const header = document.querySelector('#header')
      const options = {
        offset: 10
      }

      this.headroom = new Headroom(header, options)
      this.headroom.init()

      requestAnimationFrame(() => {
        header.classList.remove('headroom--faded')
      })
    },
    initPolicy() {
      const policy = document.getElementById('form-policy')
      const links = document.querySelectorAll('.js-policy')

      links.forEach(link => {
        link.addEventListener('click', e => {
          e.preventDefault();

          policy.toggle(true)
        })
      })
    },
    async initForms() {
      await this.$form.init()

      const forms = document.querySelectorAll('.js-form')

      forms.forEach(form => {
        this.$form.applyTo(form)
      })

      // this.initPopupForm()
    },
    initBurgerMenu() {
      const menu = document.querySelector('#mobile-menu'),
          burger = document.querySelector('#burger-button'),
          header = document.querySelector('#header'),
          mobileRequestButton = document.querySelector('#mobile-request-button')
      // requestButton = document.querySelector('#request-button')

      burger.addEventListener('click', () => {
        menu.toggle(burger.opened)

        header.classList.toggle('page-header--fixed', burger.opened)
      })

      menu.addEventListener('hide', () => {
        burger.toggle(false)

        header.classList.toggle('page-header--fixed', false)
      })


      mobileRequestButton.addEventListener('click', () => {
        burger.toggle(false)
        menu.toggle(false)

        header.classList.toggle('page-header--fixed', false)
      })

      // requestButton.addEventListener('click', () => {
      //   burger.toggle(false)
      //   menu.toggle(false)

      //   header.classList.toggle('page-header--fixed', false)
      // })
    },
  },

  created() {},

  onresize(oldScreen, newScreen) {},

  onload() {
    // Плавающая шапка
    this.initHeadroom()

    this.initScrollBehavior()

    this.initBurgerMenu()

    this.initPolicy()

    // Форма обратной связи
    this.initForms()
  },
})

// Объект приложения
window.$app = app 
