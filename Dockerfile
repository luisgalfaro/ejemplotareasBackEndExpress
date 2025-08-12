FROM node:12.22-alpine3.15

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

COPY . .
EXPOSE 3000
CMD [ "node", "server.js" ]

#defino la variable de entor para la base de datos MONGO_URI
ENV MONGO_URL=mongodb://host.docker.internal:27017/ejemplo

# para crear la imagen ejecute
#sudo docker build -t mirepo/ejemplobackend:latest .