FROM node:lts-buster
WORKDIR /fasteval_jacinth
# RUN apt update && apt install git openssh

COPY . .
RUN  yarn 
RUN yarn jacinth build
CMD NODE_ENV=production yarn jacinth start 



