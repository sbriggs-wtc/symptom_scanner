FROM node:16-alpine
RUN mkdir /server
WORKDIR /server
EXPOSE 3000
COPY package.json /server
COPY package-lock.json /server
RUN npm install
COPY . /server
CMD ["npm", "run", "start:dev"]
