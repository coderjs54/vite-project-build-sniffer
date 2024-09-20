window.addEventListener('load', () => {
  let timestamp = ''
  const script = document.querySelector('script[data-sniff-message]')
  const message = script.getAttribute('data-sniff-message')
  const interval = script.getAttribute('data-sniff-interval')

  const timerId = setInterval(() => {
    fetch(`./index.html?t=${Date.now()}`)
        .then(resp => resp.text())
        .then(html => {
          const metaTagRegex = /<meta\s+name="last-modified"\s+content="(.*?)"\s*\/?>/
          const [, time] = html.match(metaTagRegex)

          if (!timestamp) {
            timestamp = time
          } else if (timestamp && timestamp !== time) {
            clearInterval(timerId)
            window.alert(message)
            location.reload()
          }
        })
  }, Math.max(3000, +interval))
}, { once: true })