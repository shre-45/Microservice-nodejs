FROM node:18
WORKDIR /app
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "index.js"]
