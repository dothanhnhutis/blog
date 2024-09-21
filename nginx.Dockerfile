FROM nginx:1.27.1

COPY nginx.conf /etc/nginx/conf.d/default.conf
# EXPOSE 80