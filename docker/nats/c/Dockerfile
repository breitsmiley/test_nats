FROM nats:1.0.4-linux
COPY /docker/nats/c/gnatsd.conf /tmp/cluster.conf

# Run via the configuration file
ENTRYPOINT ["/gnatsd"]
CMD ["-c", "/tmp/cluster.conf"]