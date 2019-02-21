FROM        node:8-slim AS compile
LABEL       maintainer="gnagar@deloitte.ca"

RUN         npm install -g webpack webpack-cli 

WORKDIR     /app

COPY        ./app_client/package.json /app/package.json
COPY        ./app_client/package-lock.json /app/package-lock.json

RUN         npm install

COPY        ./app_client /app    

RUN         NODE_ENV=production npm run build --production
#-------------------------------------------------------------#
FROM         nginx:alpine AS template-frontend

COPY         ./deploy/container_scripts/nginx-container.conf /etc/nginx/conf.d/default.conf

COPY         --from=compile /app/build /app/static
# TODO - remove this line as static assets should be compiled using webpack
COPY         --from=compile /app/src/assets/images /app/static/src/assets/images

#HEALTHCHECK --interval=15s --timeout=2s --start-period=30s --retries=2 \
#            CMD nc -z app 8000 || exit 1
#-------------------------------------------------------------#