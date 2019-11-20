FROM node:12-alpine
WORKDIR /fasteval_jacinth
RUN apk update && apk upgrade && \
    apk add --no-cache git openssh


COPY . .
RUN yarn 
RUN yarn jacinth build
CMD yarn jacinth start 



