const btn = document.getElementById('btn')
const output = document.getElementById('output')

const msgs = ['yo', 'wassup', 'this site lowkey goated', 'html css js moment', 'fr fr', 'no cap', 'ur the 🐐', 'clicked lol']

btn.addEventListener('click', () => {
  const rand = Math.floor(Math.random() * msgs.length)
  output.textContent = msgs[rand]
})
