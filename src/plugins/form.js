const usertime = parseInt(new Date().getTime() / 2000)

export default {
    async init() {
        const libs = await Promise.all([
            import('@/api/actions.js'),
            import('imask/esm/imask'),
            import('imask/esm/masked/number'),
        ])
        const { sendRequestForm } = libs[0]
        const { default: IMask } = libs[1]

        this.sendData = sendRequestForm

        this.maskTelnum = (
            input,
            mask = '+{7} (000) 000-00-00'
        ) => {
            if (!input) return

            return IMask(input, { mask })
        }
    },
    applyTo(form) {
        const formPopup = document.getElementById('form-popup')
        const success = document.getElementById('form-success')
        const error = document.getElementById('form-error')

        let isBeenFocused = false

        success.addEventListener('hide', e => {
            form.reset()

            // Если открыта форма во всплывающем окне
            if (formPopup && formPopup.opened) {
                formPopup.toggle(false)
            }
        })

        const telnum = form.querySelector('.js-form-telnum')
        this.maskTelnum(telnum)

        telnum.addEventListener('focusin', e => {
            isBeenFocused = true
        })

        form.addEventListener('submit', e => {
            e.preventDefault()

            if (!isBeenFocused) {
                error.toggle(true)
                return
            }

            const data = new FormData(form)
            data.set('usertime', usertime)

            this.sendData(data, (status) => {
                if (status === 200) {
                    success.toggle(true)
                } else {
                    console.log(status, 'send error')
                    error.toggle(true)
                }
            })
        })
    }
}
