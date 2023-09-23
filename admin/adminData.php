<?php 

require_once('../init/init.php');
//send send request for checking user name already exist or not
if(isset($_POST['username'])){

      $sqlUsername = "select username from user where username = '".$_POST['username']."' ";

      $stmtUsername = connection->prepare($sqlUsername);

      $stmtUsername->execute();

      $resultUsername = $stmtUsername->fetchAll(PDO::FETCH_ASSOC);

      if(sizeof($resultUsername)!==0){
            $messge = "success";
      }else{
            $messge = "fail";
      }

      echo json_encode($messge);
}
//if username not exist insert username and password into database
if(isset($_POST['username']) && isset($_POST["password"])){
      $username = $_POST['username'];
      $password  = $_POST['password'];
      $password = sha1($_POST['password']);
      $password = '!'.$password.'!';

      $sqlAdmin = "insert into user(username,password) values ('".$username."','".$password."')";

      $stmtAdmin = connection->prepare($sqlAdmin);

      $result = $stmtAdmin->execute();
      //var_dump($stmtAdmin->execute());
      if($result){
            $resultMessage = "successfull";
      }else{
            $resultMessage = "failed";
      }
      echo json_encode($resultMessage);

}

//delete user when receive user id
if(isset($_POST["userId"])){

      $sqlDelete = "DELETE FROM user WHERE id = '".$_POST["userId"]."' ";

      $stmtDelete = connection->prepare($sqlDelete);

      $resultDelete = $stmtDelete->execute();

      if($resultDelete){
            $deleteMessage = "deleted";
      }else{
            $deleteMessage = "not deleted";
      }

      echo json_encode($deleteMessage);

}

//admin login request response 
if(isset($_POST['adminName']) && isset($_POST['adminPassword'])){

      $adminPassword = sha1($_POST['adminPassword']);

      $adminPassword = '!'.$adminPassword.'!';

      $sqlAdmin = "select username, password from user where username ='".$_POST['adminName']."' && password = '".$adminPassword."' && role='admin' ";
      $stmtAdmin = connection->prepare($sqlAdmin);

      $stmtAdmin->execute();

      $resulAdminLogin = $stmtAdmin->fetchAll(PDO::FETCH_ASSOC);
     
      if(count($resulAdminLogin)===0){
            $messageAdminLogin = "failed";
      }else{
            if(count($resulAdminLogin)!==0){
                  session_start();
                  $_SESSION["admin"]=$resulAdminLogin[0]["username"];
                  $messageAdminLogin="successfull";
            }
      }
      echo json_encode($messageAdminLogin);
}

//select all user by default
$sqlAlluser = "select id,username from user where role IS NULL ";

$stmtAlluser = connection->prepare($sqlAlluser);

$stmtAlluser->execute();

$resultAlluser = $stmtAlluser->fetchAll(PDO::FETCH_ASSOC);

$numberOfUser = count($resultAlluser);

//var_dump($resultAlluser[0]);





$adminVariable = [
      'userNumber'=>$numberOfUser,
      'allUser'=>$resultAlluser
]; 

?>