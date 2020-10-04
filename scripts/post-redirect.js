export function postRedirect(url, data, method = 'POST', target = '_self') {
    const form = document.createElement('form')
    form.style.visibility = 'hidden'
    form.setAttribute('method', method)
    form.setAttribute('action', url)
    form.setAttribute('target', target)
    for (const key in data) {
        const hiddenField = document.createElement('input')
        hiddenField.setAttribute('type', 'hidden')
        hiddenField.setAttribute('name', key)
        hiddenField.setAttribute('value', data[key])
        form.appendChild(hiddenField)
    }
    document.body.appendChild(form)
    form.submit()
    document.body.removeChild(form)
}
