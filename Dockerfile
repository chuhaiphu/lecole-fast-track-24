# FROM node:20-alpine AS development-dependencies-env
# COPY . /app
# WORKDIR /app
# RUN yarn install --frozen-lockfile

# FROM node:20-alpine AS production-dependencies-env
# COPY ./package.json yarn.lock /app/
# WORKDIR /app
# RUN yarn install --frozen-lockfile

# FROM node:20-alpine AS build-env
# COPY . /app/
# COPY --from=development-dependencies-env /app/node_modules /app/node_modules
# WORKDIR /app
# RUN yarn build

# FROM node:20-alpine
# COPY ./package.json yarn.lock /app/
# COPY --from=production-dependencies-env /app/node_modules /app/node_modules
# COPY --from=build-env /app/build /app/build

# COPY ./server /app/server
# RUN mkdir -p /app/database

# WORKDIR /app

# VOLUME ["/app/database"]
# CMD ["yarn", "start"]
FROM node:20-alpine
COPY . /app
WORKDIR /app
RUN yarn install
RUN mkdir -p /app/database
CMD ["yarn", "start"]
EXPOSE 5173