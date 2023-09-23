<?php
error_reporting(E_ALL);
ini_set("display_errors", 1);

session_start();
if(isset($_SESSION['username']) || isset($_COOKIE['username'])){
      header('Location: localhost/accueil.php');
      exit;
}


include_once __DIR__ . '/vendor/autoload.php';
require_once 'data.php';


$templateLogin = 'views/login.pug';

$renderer = new Phug\Renderer();

$renderer->displayFile($templateLogin);

//$renderer->displayFile($templateAccueil,$myvariables);




?>