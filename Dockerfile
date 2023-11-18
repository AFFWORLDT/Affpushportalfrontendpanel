# node block

FROM node:alpine3.18 as nodework
WORKDIR /affiliate_vercel_panel
COPY package.json .
RUN yarn install
COPY . .
RUN yarn run build



# nginx block
FROM nginx:1.25.3-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=nodework /affiliate_vercel_panel/build .
ENTRYPOINT ["nginx", "-g", "daemon off;"]