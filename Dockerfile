FROM node:16

WORKDIR /dockerimage
COPY package*.json ./
RUN npm install
COPY ./ ./
EXPOSE 4000
CMD [ "node", "src/index.js" ]