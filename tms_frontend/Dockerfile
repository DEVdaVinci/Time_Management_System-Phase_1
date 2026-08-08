FROM node:26-slim
WORKDIR /app

COPY package*.json .
RUN npm install
RUN npm install bootstrap@latest

COPY . .

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]