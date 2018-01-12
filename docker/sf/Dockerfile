FROM php:7.2-alpine

# Add tool for waiting available of other service
COPY /docker/wait-for /usr/local/bin/wait-for
RUN chmod +x /usr/local/bin/wait-for

COPY /docker/sf/php.ini /usr/local/etc/php/
COPY /sf /srv/sf
