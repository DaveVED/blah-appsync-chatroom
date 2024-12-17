# appsync-chatroom

Serverless Websocket Chatroom

https://x.com/thdxr/status/1854520013501206755

used the new aws websocket service for a week now

i haven't seen this good of a release from aws in a while - it's well thought through for advanced cases but also simple and lets you avoid heavy aws patterns if you want

and it's reliable and performant

the interesting bit is the fact that it's not called "aws websockets" but instead it's under the appsync brand as "appsync events"

appsync is a typically a very specific set of services for a narrower use case. whoever was in charge managed to overreach and ship a general purpose service so kudos for navigating aws bureaucracy - they should be given broader scope

# TODO

- [ ] The login works for create and loign but we need to manage states?
- [ ] logout
- [ ] profile picture
- [ ] App Bar when logged in shoudl show user profile on the bottom
- [ ] Show all logged in users
- [ ] Change chat theme to black and white.
- [ ] need to store the session info in a db table
- [ ] need a me endoint with basic user details
- [ ] need to query for email and username to make sure they are nto takne. 