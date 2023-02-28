FROM postgres:15.2-alpine
WORKDIR /var/lib/postgresql
CMD ["postgres", "-c", "logging_collector=on", "-c", "log_statement=mod"]
EXPOSE ${POSTGRES_CONTAINER_PORT}