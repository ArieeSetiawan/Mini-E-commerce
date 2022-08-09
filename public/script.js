const socket = io('http://localhost:3000')
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

function addMessage(message) {
  const messageElement = document.createElement('div')
  messageElement.innerText = message
  messageContainer.append(messageElement)
}

const name = prompt('Enter your Name')
addMessage('You have joined')
socket.emit('new-user', name)

socket.on('chat-message', data => {
  addMessage(`${data.name}: ${data.message}`)
})

socket.on('user-connected', name => {
  addMessage(`${name} connected`)
})

socket.on('user-disconnected', name => {
  addMessage(`${name} disconnected`)
})

messageForm.addEventListener('submit', e => {
  e.preventDefault()
  const message = messageInput.value
  addMessage(`You: ${message}`)
  socket.emit('send-chat-message', message)
  messageInput.value = ''
})