const REALTIME_DOMAIN = 'zevvk6dlwbevva4gkf6jv3deju.appsync-realtime-api.us-east-1.amazonaws.com'
const HTTP_DOMAIN = 'zevvk6dlwbevva4gkf6jv3deju.appsync-api.us-east-1.amazonaws.com'
const API_KEY = 'da2-jtftu76bmzeghgjf4tghyatqby'

const authorization = { 'x-api-key': API_KEY, host: HTTP_DOMAIN }

function getAuthProtocol() {
  const header = btoa(JSON.stringify(authorization))
    .replace(/\+/g, '-') // Convert '+' to '-'
    .replace(/\//g, '_') // Convert '/' to '_'
    .replace(/=+$/, '') // Remove padding `=`
  return `header-${header}`
}

const socket = await new Promise((resolve, reject) => {
  const socket = new WebSocket(
    `wss://${REALTIME_DOMAIN}/event/realtime`,
    ['aws-appsync-event-ws', getAuthProtocol()])
  socket.onopen = () => {
    socket.send(JSON.stringify({ type: 'connection_init' }))
    resolve(socket)
  }
  socket.onclose = (evt) => reject(new Error(evt.reason))
  socket.onmessage = (event) => console.log('=>', JSON.parse(event.data))
})


socket.send(JSON.stringify({
  type: 'subscribe',
  id: crypto.randomUUID(),
  channel: '/default/dummy',
  authorization
}))