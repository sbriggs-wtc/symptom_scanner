FROM node:16-alpine
RUN mkdir /client
WORKDIR /client
EXPOSE 8080
COPY package.json /client
COPY package-lock.json /client
RUN npm install
COPY . /client
CMD ["npm", "run", "serve"]
