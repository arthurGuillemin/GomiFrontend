FROM node:18-alpine AS builder

WORKDIR /app


#(mandatory pour node-gyp)
RUN apk add --no-cache python3 make g++ bash

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
