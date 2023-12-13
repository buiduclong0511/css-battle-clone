FROM node:18
WORKDIR /app
COPY . .
EXPOSE 5173
RUN npm i
CMD npm run dev -- --host 0.0.0.0 --port 5173