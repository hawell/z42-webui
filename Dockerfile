FROM node:16-alpine3.17

WORKDIR /usr/src/app

COPY . .

RUN npm install
RUN npm run build

EXPOSE 8000
CMD ["npm", "run", "start"]
