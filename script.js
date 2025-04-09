const btn = document.getElementById('btn')
const output = document.getElementById('output')

const msgs = ['n', 'i', 'g', 'g', 'e', 'r']

btn.addEventListener('click', () => {
  const rand = Math.floor(Math.random() * msgs.length)
  output.textContent = msgs[rand]
})
