# Blah

Blah is an open-source _communications platform_ built in _TypeScript_ with _JavaScript runtimes_ such as _Node.js_ and _Bun_.

Originally built to explore [_AWS AppSync Serverless WebSockets_](https://docs.aws.amazon.com/aurora-dsql/latest/userguide/what-is-aurora-dsql.html), _Blah_ started as a simple idea—a _global chat_ where _anyone_ from _anywhere_ could connect. But, it quickly grew into much more as _my needs_ expanded and my _curiosity_ to _explore new AWS services_ kicked in, as _re:Invent_  was happening at the time (_December 2024_). So naturally _Blah_ also now uses more _new_ services such as [_Aurora DSQL_](https://docs.aws.amazon.com/aurora-dsql/latest/userguide/what-is-aurora-dsql.html) 

## Current Support

The following items are _currently supported_ in _Blah_ today. This means that if it's listed here, you can you it at [blah.davedennis.dev](https://blah.davedennis.dev).

- ___🌍 Global Chat___: A single, massive chat room where everyone can connect and talk in real-time—fun, chaotic, and open to the world!
- ___🔐 Custom Authentication___:
A homegrown authentication system with email/password login and token-based security, built to learn and grow.
- ___👤 User Profiles___: Update your email, username, and profile picture with ease.

## Comming Soon

The following items are _comming soon_.

- ___✉️ Private Messages___: Secure one-on-one direct messaging.
- ___👥 Group Chats___: Create dedicated rooms for smaller communities or teams.
- ___🔒Encryption___: AEnsuring all communication is secure.
- ___🏢 Add teams___: Collaborative spaces for teams (under consideration).
- ___🔔 Notifications___: Real-time updates to enhance user engagement.

## Packages

_Blah_ is comprised of _many_ supporting pacakges that enable it to run.

- Web - Vite/React web application supporting the _blah_ web frontend.
- API - Serverless Express API supporting all backend needs
- Infra - AWS CDK using _DSQR_ to manage deployments of infrastrute/services to aws. 
- Core - Common and shared main functionly to be used throught the app (thnk shared?) 

## Why Nix?

Because you can get started with `nix-shell`. Just do it.