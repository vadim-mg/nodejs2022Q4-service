FROM node:18.14-alpine
LABEL author="vadim-mg"

RUN apk update && apk upgrade 

WORKDIR /usr/app
COPY package*.json ./

RUN npm ci && npm cache clean --force

COPY . .

EXPOSE ${PORT}

CMD [ "npm", "run", "start:migrate"]