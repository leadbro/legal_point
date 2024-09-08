import { html } from 'lit-html'
import { fadeIn, fadeOut } from '@/directives/fade.js'
import { inlineClasses } from '@/utils/template.js'
import { toggleBodyLock } from '@/directives/body-lock.js'

import styles from './c-popup.css'
import CElement from '@/components/c-element/c-element.js'

const EVENTS = {
    SHOW: 'show',
    HIDE: 'hide',
}

export default class CPopup extends CElement {
    constructor() {
        super()

        if (!this.id) {
            console.error('CPopup: id attribute required', this)
        }

        this.$render()

        // Скролящийся контейнер
        // Используется для toggleBodyLock
        this.scrollWrapper = this.$find('.c-popup__wrapper')

        this.slotContent = this.root?.children[0]

        if (!this.slotContent) return

        this.root.addEventListener('click', e => {
            const isClickInsideContainer = !this.slotContent.contains(e.target)
            if (isClickInsideContainer) return

            this.hide()
        })
    }

    static get observedAttributes() {
        return ['opened']
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this._togglePopup(!!newValue)
    }

    _togglePopup(value) {
        const popup = this.$find('.c-popup')

        const eventName = value
            ? EVENTS.SHOW
            : EVENTS.HIDE

        const params = { value }

        const callback = () => {
            const event = new CustomEvent(eventName, { detail: params })

            this.dispatchEvent(event)
        }

        toggleBodyLock(this.id, value)

        if (value) {
            fadeIn(popup, callback, 10)
        } else {
            fadeOut(popup, callback)
        }
    }

    toggle(value) {
        if (typeof value === 'undefined') {
            this.opened = !this.opened
        } else {
            this.opened = value === true
        }
    }

    show() {
        this.toggle(true)
    }

    hide() {
        this.toggle(false)
    }

    get opened() {
        return this.$get('opened', true)
    }

    set opened(value = false) {
        this.$set('opened', value, true)
    }

    get offsetHeader() {
        return this.$get('offset-header', true)
    }

    get classes() {
        const classes = {
            'c-popup': true,
            'c-popup--offset-header': this.offsetHeader
        }

        return inlineClasses(classes)
    }

    get styles() {
        return styles
    }

    get template() {
        return html`
      <div class="${this.classes}" style="display: none; opacity: 0;">
        <div class="c-popup__overlay"></div>
        <div class="c-popup__wrapper">
          <div class="c-popup__container">
            <button class="c-popup__cross"></button>
            <slot></slot>
          </div>
        </div>
      </div>
    `
    }
}