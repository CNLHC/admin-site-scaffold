FROM node:lts-buster
WORKDIR /fasteval_jacinth
# RUN apt update && apt install git openssh

COPY . .
RUN NODE_OPTIONS=--max_old_space_size=8192 yarn 
RUN yarn add git+https://github.com/CNLHC/jacinth-core#dev
RUN yarn jacinth build
CMD yarn jacinth start 



