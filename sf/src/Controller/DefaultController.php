<?php

namespace App\Controller;


use App\Service\NatsManager;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class DefaultController extends AbstractController
{
    /**
     * @Route("/pub", name="pub")
     */
    public function pub()
    {
        return $this->render('pub.html.twig');
    }

    /**
     * @Route("/ajax/pub", name="ajax_pub")
     */
    public function pubAjax(NatsManager $natsManager, Request $request)
    {
        $requestData = $request->request->all();
        $msg = $requestData['msg'];
        $num = $requestData['num'];

        $msg = '# ' . $num . '_' . $msg . ' [sf1]';
        $natsManager->publishMsg($msg);

        return $this->json(['status' => true]);
    }

//    /**
//     * @Route("/sub", name="sub")
//     */
//    public function sub()
//    {
//        return $this->render('sub.html.twig');
//    }
//
//
//    /**
//     * @Route("/ajax/sub", name="ajax_sub")
//     */
//    public function subAjax(NatsManager $natsManager)
//    {
//        return $this->json(['msg' => $natsManager->gwtMsg()]);
//    }
}
