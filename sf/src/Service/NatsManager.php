<?php
namespace App\Service;
use Nats\Connection as NatsConnection;

class NatsManager
{
    public function getNatsClient()
    {
        return $client = new NatsConnection();
    }
}