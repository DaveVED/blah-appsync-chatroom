# Socket

This package provides integraton logic for AWS AppSync with our chat applicaiotn. 

## Architecture Backgroungd

Initially, building a live chat application required running [WebSocket servers](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket) on dedicated infrastructure (e.g., using ECS or custom servers). By using AWS AppSync, you can offload the complexity to a serverless, fully managed service. This approach simplifies the development process and scales seamlessly, allowing real-time communication without manual server orchestration. I can think of a million great ideas for this service. Where has it been hiding? 

const REALTIME_DOMAIN = 'wss://zevvk6dlwbevva4gkf6jv3deju.appsync-realtime-api.us-east-1.amazonaws.com/graphql';
const HTTP_DOMAIN = 'https://zevvk6dlwbevva4gkf6jv3deju.appsync-api.us-east-1.amazonaws.com/graphql';
const API_KEY = 'da2-jtftu76bmzeghgjf4tghyatqby';

const authorization = { 'x-api-key': API_KEY, host: HTTP_DOMAIN };

function getAuthProtocol() {
  const header = btoa(JSON.stringify(authorization))
    .replace(/\+/g, '-') // Convert '+' to '-'
    .replace(/\//g, '_') // Convert '/' to '_'
    .replace(/=+$/, ''); // Remove padding `=`
  return `header-${header}`;
}

const socket: WebSocket = await new Promise<WebSocket>((resolve, reject) => {
  const socket = new WebSocket(
    `wss://${REALTIME_DOMAIN}/event/realtime`,
    ['aws-appsync-event-ws', getAuthProtocol()]
  );

  socket.onopen = () => {
    socket.send(JSON.stringify({ type: 'connection_init' }));
    resolve(socket);
  };

  socket.onclose = (evt) => reject(new Error(evt.reason));

  socket.onmessage = (event) => {
    console.log('=>', JSON.parse(event.data));
  };
});

// Send a subscription message
socket.send(
  JSON.stringify({
    type: 'subscribe',
    id: crypto.randomUUID(),
    channel: '/default/*',
    authorization,
  })
);
