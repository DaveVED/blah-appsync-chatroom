# Socket

This package provides integraton logic for AWS AppSync with our chat applicaiotn. 

## Architecture Backgroungd

Initially, building a live chat application required running [WebSocket servers](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket) on dedicated infrastructure (e.g., using ECS or custom servers). By using AWS AppSync, you can offload the complexity to a serverless, fully managed service. This approach simplifies the development process and scales seamlessly, allowing real-time communication without manual server orchestration. I can think of a million great ideas for this service. Where has it been hiding? 