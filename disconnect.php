<?php
session_start();
//if session existe or cookie existe then delete cookie and session 
if(isset($_SESSION['username']) || isset($_COOKIE['username']) && isset($_COOKIE['password'])){
      unset($_SESSION['username']);
      session_destroy();
      if(isset($_COOKIE['username']) and isset($_COOKIE['password']))
      {
      $user=$_COOKIE['username'];
      $password=$_COOKIE['password'];
      setcookie('username',$user,time()-1);
      setcookie('password',$password,time()-1);
      }
      header('Location: http://localhost/studio-4');
      exit;
}

?>

