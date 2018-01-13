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

    private $logger;

    /**
     * NatsManager constructor.
     * @param LoggerInterface $logger
     */
    public function __construct(LoggerInterface $logger)
    {
        $this->logger = $logger;
    }

    private function getClient()
    {
        $connectionOptions = new NatsConnectionOptions();
        $connectionOptions->setHost(self::NATS_HOST)
            ->setPort(self::NATS_PORT);
        $client =  new NatsConnection($connectionOptions);

        try {
            $client->connect();
        } catch (\Exception $e) {
            $client->close();
            $this->logger->warning($e->getMessage());
            return false;
        }

        return $client;

    }

    /**
     * @param $msg
     * @return bool
     */
    public function publishMsg($msg)
    {
        $client = $this->getClient();

        if (empty($client)) {
            return false;
        }

        try {
            $client->publish(self::NATS_CHANNEL, $msg);
        } catch (\Exception $e) {
            $this->logger->warning($e->getMessage());
            return false;
        } finally {
            $client->close();
        }

        return true;
    }

    /**
     *
     */
    public function gwtMsg() {

        $client = $this->getClient();

        if (empty($client)) {
            return false;
        }

//        $client->setStreamTimeout(0);

        $msg = '';
        $client->subscribe(
            self::NATS_CHANNEL,
            function ($message) use (&$msg) {
                $msg = $message->getBody();
//                $this->logger->info($msg);
            }
        );


        $client->wait(1);
        $client->close();

        return $msg;
    }

}