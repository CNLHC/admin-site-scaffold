FROM node:12-alpine
WORKDIR /fasteval_jacinth
COPY . .
RUN yarn 
RUN cd node_modules/@jacinth/jacinth-dev; yarn add @babel/runtime-corejs2
RUN yarn jacinth build
CMD yarn jacinth start 



