FROM nginx:latest
COPY ./build/ /usr/share/nginx/www
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]