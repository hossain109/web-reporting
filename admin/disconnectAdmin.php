<?php
session_start();
//if session existe or cookie existe then delete cookie and session 
if(isset($_SESSION['admin'])){
      unset($_SESSION['admin']);
      session_destroy();

      header('Location: localhost/admin/index.php');
      exit;
}

?>