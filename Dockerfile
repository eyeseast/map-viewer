FROM node:11

COPY . .

#ARG MAPBOX_PUBLIC_TOKEN
#ARG MAPBOX_SECRET_TOKEN
#ARG DEFAULT_USERNAME="chrisamico"

#ENV MAPBOX_PUBLIC_TOKEN=${MAPBOX_PUBLIC_TOKEN}
#ENV MAPBOX_SECRET_TOKEN=${MAPBOX_SECRET_TOKEN}
ENV NPM_CONFIG_LOGLEVEL info
ENV PORT 3000

RUN npm install
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]