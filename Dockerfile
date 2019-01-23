FROM node:10.14.1-alpine
MAINTAINER qarlos23
USER root

RUN apk update
RUN apk fetch openjdk8
RUN apk add openjdk8

CMD [ "node" ]