FROM node:12-alpine
WORKDIR /fasteval_jacinth
COPY . .
RUN yarn 
RUN yarn jacinth build
CMD yarn jacinth start 



