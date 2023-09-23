<?php

session_start();
if(isset($_SESSION['admin'])){
      header('Location: localhost/admin/adminCrud.php');
      exit;
}


include_once __DIR__ . '../../vendor/autoload.php';

require_once 'adminData.php';


$templateAdmin = '../views/loginAdmin.pug';

$renderer = new Phug\Renderer();

$renderer->displayFile($templateAdmin,$adminVariable);

?>