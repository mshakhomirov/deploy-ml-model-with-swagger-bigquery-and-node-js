# NOTE: This must be executed from the root repo directory
#   You must copy your ~/.npmrc file into the root repo directory first If you use one
#   eg: cp ~/.npmrc .
#       docker build -f Dockerfile  -t service-template .

# NOTE: This can be ran to run the build above
#   eg: docker run  -it your-service
FROM node:12.18.0

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

#Copy info used by npm install
COPY .npmrc .npmrc

# Bundle app source
COPY . /usr/src/app

RUN npm ci
RUN rm -f .npmrc

EXPOSE 80

CMD [ "node", "app.js" ]
