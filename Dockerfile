FROM nginx:mainline-alpine
RUN rm -rf /usr/share/nginx/html/*
COPY  /www /usr/share/nginx/html/
COPY default.conf /etc/nginx/conf.d
EXPOSE 80