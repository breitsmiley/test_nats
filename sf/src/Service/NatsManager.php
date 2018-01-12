<?php
namespace App\Service;

use Nats\{
    Connection as NatsConnection,
    ConnectionOptions as NatsConnectionOptions
};
use Psr\Log\LoggerInterface;

class NatsManager
{
    const NATS_HOST = 'nats';
    const NATS_PORT = 4222;
    const NATS_CHANNEL = 'ch1';

    private $client;
    private $logger;

    /**
     * NatsManager constructor.
     * @param LoggerInterface $logger
     */
    public function __construct(LoggerInterface $logger)
    {
        $this->logger = $logger;

        $connectionOptions = new NatsConnectionOptions();
        $connectionOptions->setHost(self::NATS_HOST)
            ->setPort(self::NATS_PORT);
        $this->client =  new NatsConnection($connectionOptions);
    }

    /**
     * @param $msg
     * @return bool
     */
    public function publishMsg($msg)
    {
        try {
            $this->client->connect();
        } catch (\Exception $e) {
            $this->logger->warn($e->getMessage());
            return false;
        }

        try {
            $this->client->publish(self::NATS_CHANNEL, $msg);
        } catch (\Exception $e) {
            $this->logger->warn($e->getMessage());
            return false;
        }

        return true;
    }


}