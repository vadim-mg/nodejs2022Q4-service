# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker [Dowload & Install Docker](https://www.docker.com/)

## Downloading

```
git clone https://github.com/vadim-mg/nodejs2022Q4-service
```

## Installing NPM modules

```
git checkout dev
npm install
```
copy env.example to .env and setup variables if you need

## Running application in Docker (recommended)

```
docker compose up --build
```

Wait while install will be complete, and app say "Service started on Port:..."
You can use api ...



After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.


---
### Docker advanced

 Built images are pushed to DockerHub:

```
vadikm1981/library-service-db
vadikm1981/library-service-app
```

Implemented npm script for vulnerabilities scanning (free solution)
```
npm run docker:scan-app
npm run docker:scan-postgress
```


---
## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging


---
## Optional running application locally (for advanced user)

you need install postgress on your system and decide all problem self :)
```
npm start
```
After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.
