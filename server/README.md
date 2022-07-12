# mox

# Description
Mox is an API mocking solution. Currently, only implemented to mock existing APIs. 

API mocking is a potent concept that has become a crucial part of the software development and testing cycle. 
It lets you test a range of probable situations and generates required use cases, and thus, 
contributes significantly to future-proofing og your software or app, and streamlines the development process.

# How to run

* Start using docker
// TODO: option one => run docker image

* Step by step using console and package manager
1. Start radis server run ==> docker run -d --name moxito-redis -p 6379:6379 redis/redis-stack-server:latest
2. Start the proxy Node.js server ==> npm run start
3. If needed start redis ui in the console to have access to radis preview ==> npm run gui
4. Add script in voyager-authoring-ui package.json so API calls can point to proxy server ==> "start:mox": "REACT_APP_VYG_AUTHORING_API_URL=http://localhost:3000/authoring yarn start"
5. Start voyager-authoring-ui using ==> yarn start:mox
6. // TODO: run proxy server ui