FROM node:20-alpine

WORKDIR /app

COPY landing/package*.json ./
RUN npm install

COPY shared /shared
COPY landing .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
