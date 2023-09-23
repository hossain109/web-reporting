<?php

session_start();
//
if(!isset($_SESSION['admin'])){

      header('Location: localhost/admin/index.php');
      exit;
}

if(isset($_SESSION['admin'] )){
include_once __DIR__ . '../../vendor/autoload.php';

require_once 'adminData.php';


$templateAdmin = '../views/admin.pug';

$renderer = new Phug\Renderer();

$renderer->displayFile($templateAdmin,$adminVariable);
}
?>