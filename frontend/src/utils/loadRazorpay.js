// INFO: Loads Razorpay's checkout script once, only when a shopper pays online
let scriptPromise

const loadRazorpay = () => {
  if (window.Razorpay) return Promise.resolve(true)
  if (!scriptPromise) {
    scriptPromise = new Promise((resolve) => {
      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.onload = () => resolve(true)
      script.onerror = () => {
        scriptPromise = null
        resolve(false)
      }
      document.body.appendChild(script)
    })
  }
  return scriptPromise
}

export default loadRazorpay
