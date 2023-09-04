FROM node:16-alpine as build
WORKDIR /usr/src/app
COPY . ./
RUN npm install 
RUN npm run build

FROM node:16-alpine
COPY --from=build /usr/src/app/ .
COPY package.json ./
EXPOSE 3000
RUN npm install
CMD ["npm", "start"]