FROM node:12-alpine
WORKDIR /fasteval_jacinth
COPY . .
RUN yarn 
RUN yarn jacinth build
RUN cd node_modules/@jacinth/jacinth-dev; yarn add @babel/runtime-corejs2
CMD yarn jacinth start 



