<?php

session_start();
//
if(!isset($_SESSION['username']) && !isset($_COOKIE['username'])){

      header('Location: localhost/index.php');
      exit;

}

//echo $_SESSION['password'];
if(isset($_SESSION['username']) || (isset($_COOKIE['username']) )){

include_once __DIR__ . '/vendor/autoload.php';
require_once 'data.php';

$template = 'views/layout.pug';

//$template = 'views/login.pug';

$renderer = new Phug\Renderer();
$renderer->displayFile($template,$myvariables);

}

?>