# Common build stage
FROM node:19.8.1 as common-build-stage

COPY . /app

WORKDIR /app

RUN npm install

CMD ["yarn", "build"]

EXPOSE 5000


# Development build stage
FROM common-build-stage as development-build-stage

ENV NODE_ENV development

CMD ["yarn", "start:dev"]

# Production build stage
FROM common-build-stage as production-build-stage

ENV NODE_ENV production

CMD ["yarn", "start:prod"]