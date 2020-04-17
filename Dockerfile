### STAGE 1: Build ###

# We label our stage as ‘builder’
FROM node:12.16.2-alpine as builder

COPY package.json package-lock.json ./

## Storing node modules on a separate layer will prevent unnecessary npm installs at each build
RUN npm i && mkdir /ng-app && mv ./node_modules ./ng-app

WORKDIR /ng-app

COPY . .

## Build the angular app in production mode and store the artifacts in dist folder
## --max_old_space_size=8192 To Avoid Node Heap Space Error
RUN node --max_old_space_size=8192 $(npm bin)/ng build --prod --aot --output-path=dist

### STAGE 2: Setup ###

FROM nginx:1.17-alpine

## Copy our default nginx config
COPY nginx/default.conf /etc/nginx/conf.d/ 

## Creation of the upload folder && Remove default nginx website
#RUN rm -rf /usr/share/nginx/html/*

## From ‘builder’ stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=builder /ng-app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]