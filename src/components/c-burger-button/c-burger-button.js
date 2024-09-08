import { html } from 'lit-html'
import { fadeIn } from '@/directives/fade.js'
import debounce from '@/utils/debounce.js'
import styles from './c-burger-button.css'

import CElement from '@/components/c-element/c-element.js'

export default class CBurgerButton extends CElement {
    constructor() {
        super()
    }

    getRenderRoot() {
        return this
    }

    static get observedAttributes() {
        return ['opened']
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this._toggleClass(!!newValue)
    }

    connectedCallback() {
        this.$render()

        const button = this.$find('.c-burger-button')

        button.addEventListener('click', debounce(() => {
            this.opened = !this.opened
        }))
    }

    _toggleClass(value) {
        const button = this.$find('.c-burger-button')
        button.classList.toggle('c-burger-button--active', value === true)
    }

    toggle(value) {
        if (typeof value === 'undefined') {
            this.opened = !this.opened
        } else {
            this.opened = value === true
        }
    }

    get opened() {
        return this.$get('opened', true)
    }

    set opened(value = false) {
        this.$set('opened', value, true)
    }

    get styles() {
        return styles
    }

    get template() {
        return html`
      <button class="c-burger-button">
        <svg 
          class="c-burger-button__burger" 
          height="22" 
          width="32" 
          viewBox="0 0 32 22"
          fill="none"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line class="c-burger-button__line" x1="0" y1="0" x2="32" y2="0" />
          <line class="c-burger-button__line" x1="0" y1="10" x2="32" y2="10" />
          <line class="c-burger-button__line" x1="11" y1="20" x2="32" y2="20" />
        </svg>
        
        <svg 
          class="c-burger-button__close" 
          height="30" 
          width="30" 
          viewBox="0 0 30 30"
          fill="none"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line class="c-burger-button__line" x1="5" y1="3" x2="24" y2="23" />
          <line class="c-burger-button__line" x1="5" y1="23" x2="24" y2="3" />
        </svg>
      </button>
    `
    }
}