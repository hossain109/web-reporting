<?php
require_once('init/init.php');

  //request response depends on menu and change year, target, target type
  if(isset($_GET['menuId'])&&isset($_GET['targetIdValue'])&&isset($_GET['aneeId'])){
  $sqlmenu = "SELECT es3_periode.code_periode,es3_base.resul,es3_questions.reponses,es3_questions.lib_questions_app,es3_menu.id_quest FROM es3_base, es3_questions, es3_periode,es3_menu WHERE es3_menu.id_groupe='".$_GET['menuId']."' && es3_periode.id_periode='".$_GET['aneeId']."' && es3_menu.id_quest=es3_questions.id_questions && cible= '".$_GET['targetIdValue']."' && es3_questions.id_questions = es3_base.question && es3_periode.id_periode=es3_base.periode GROUP BY id_quest;";
  $stmtmenu = connection->prepare($sqlmenu);
  $stmtmenu->execute();
  $reponses = $stmtmenu->fetchAll(PDO::FETCH_ASSOC);
  //var_dump($reponses);
  echo json_encode($reponses);

}

  //request responses on change question, targer, target type
    if(isset($_GET['questionId'])&&isset($_GET['targetIdValue'])){
     $sqlquestion="SELECT code_periode,reponses,resul,lib_questions_app FROM es3_base, es3_questions, es3_periode WHERE question='".$_GET['questionId']."' &&  cible= '".$_GET['targetIdValue']."' && es3_questions.id_questions = es3_base.question && es3_base.periode=es3_periode.id_periode ORDER BY periode";
    $stmt = connection->prepare($sqlquestion);
    $stmt->execute();
    $reponses = $stmt->fetchAll(PDO::FETCH_ASSOC);
    //var_dump($reponses);
    echo json_encode($reponses);

  }

  /** request response by target */
  if(isset($_GET['questionId']) && isset($_GET['aneeId'])&&isset($_GET['targetTypeId'])){
  $sqlByTarget = "SELECT resul, reponses,lib_questions_app,code_periode,lib_cible_app from es3_periode,es3_cible,es3_questions, es3_base WHERE id_questions= '".$_GET['questionId']."' && code_grp= '".$_GET['targetTypeId']."' && id_periode= '".$_GET['aneeId']."' && es3_questions.id_questions=es3_base.question && es3_base.cible=es3_cible.code_cible && es3_periode.id_periode=es3_base.periode";
  //$sqlByTarget = "SELECT resul, reponses,lib_quest,code_periode,lib_cible_app from es3_periode,es3_cible,es3_menu, es3_base WHERE id_quest= '".$_GET['questionId']."' && code_grp= '".$_GET['targetTypeId']."' && id_periode= '".$_GET['aneeId']."' && es3_menu.id_quest=es3_base.question && es3_base.cible=es3_cible.code_cible && es3_periode.id_periode=es3_base.periode";
  $stmtByTarget = connection->prepare($sqlByTarget);
  $stmtByTarget->execute();
  $stmtByTargetReponses = $stmtByTarget->fetchAll(PDO::FETCH_ASSOC);
  //var_dump($stmtByTargetReponses);
  echo json_encode($stmtByTargetReponses);
}

/* Type of target */
$sqltarget = "select code_grp, lib_grp from es3_cible group by code_grp order by code_grp";
$stmt = connection->prepare($sqltarget);
$stmt->execute();
$typetargets = $stmt->fetchAll();

/* Targets */
  if(isset($_POST['targetId'])){
  $sqltargets = "SELECT lib_cible_app, code_cible FROM es3_cible  WHERE code_grp = '".$_POST['targetId']."'";
  $stmtTarget = connection->prepare($sqltargets);
  $stmtTarget->execute();
  $targets = $stmtTarget->fetchAll(PDO::FETCH_ASSOC);
  //var_dump($targets);
  echo json_encode($targets);
  }

/*code for nav menu*/
$sqlnav = "select id_groupe,lib_groupe from es3_menu group by lib_groupe order by id_groupe" ;

$stmt = connection->prepare($sqlnav);

$stmt->execute();

$menus = $stmt->fetchAll();

$numberMenu = $stmt->rowCount();


/**nav sous menu */
$sqlsousmenu = "select id_groupe, lib_quest,id_quest from es3_menu order by num_element_groupe ";

$sousmenustmt = connection->prepare($sqlsousmenu);

$sousmenustmt->execute();
//$rows = connection->query("select id_groupe, lib_quest,id_quest from es3_menu order by num_element_groupe ");
$sousmenus = $sousmenustmt->fetchAll();

/* period selection*/
$sql = "select id_periode,code_periode from es3_periode" ;

$stmt = connection->prepare($sql);

$stmt->execute();

$periods = $stmt->fetchAll();


//Update Year without databases
$updateYear = 9;
$mydate=getdate(date("U"));
//echo $mydate['year'];
for ($index=2023; $index <$mydate['year'] ; $index++) { 
  $updateYear +=1;
}
 //var_dump($updateYear) ;
$myvariables = [
  'index'=>0,
  'menus' => $menus,
  'sousmenus'=>$sousmenus,
  'numberMenus'=>$numberMenu,
  'periods'=>$periods,
  'updateYear'=>$updateYear,
  'typetargets'=>$typetargets,

];

/*** query for By target */
//parts of user login

//qeury for select user login
if(isset($_POST['action'])){
  login();
}
//function login
function login(){
//$user = 'marketingstudio';

$user = $_POST['username'];
$password = sha1($_POST['password']);
//$passwordUSer = sha1($password);die;
// echo $passwordUSer;
$password = '!'.$password.'!';
//echo $password;
$qeuryuser = "select username, password from user where username ='".$user."' && password = '".$password."' ";

$stmtuser = connection->prepare($qeuryuser);

$stmtuser->execute();

$identifications = $stmtuser->fetchAll(PDO::FETCH_ASSOC);
//var_dump($identifications[0]["password"]);
if(count($identifications)===0){
  $messageLogin="failed";
}else{

  if(count($identifications) !==0){
    if(isset($_GET['remember']) && $_GET['remember']==='true'){
      //var_dump("yes");
      setcookie("username",$identifications[0]["username"],time()+(86400*30));
      setcookie("password",$identifications[0]["password"],time()+(86400*30));
    }
      session_start();
      $_SESSION["username"]=$identifications[0]["username"];
      $messageLogin="successfull";
  }
}
echo json_encode($messageLogin);
}

//change password
//verify if current password is correct or not
if(isset($_POST['password1'])){
  $password1 = sha1($_POST['password1']);
  $password1 = '!'.$password1.'!';

  $queryPassword1 = "select password from user where password = '".$password1."' ";

  $stmtPassword1 = connection->prepare($queryPassword1);

  $stmtPassword1->execute();
 
  $getPassword1 = $stmtPassword1->fetchAll(PDO::FETCH_ASSOC);
  
  if(sizeof($getPassword1)===0){
    $message = "failed";
  }
  if(sizeof($getPassword1)===1){
    $message = "successfull";
  }
  echo json_encode($message);

}
//modify current password
if(isset($_POST['password1'])&&isset($_POST['password2'])){
  $password1 = sha1($_POST['password1']);
  $password1 = '!'.$password1.'!';

  //new password in sha1
  $password2 = sha1($_POST['password2']);
  $password2 = '!'.$password2.'!';

  $queryNewPass = "UPDATE user SET password =  '".$password2."' WHERE password = '".$password1."' ";

  $stmtNewPass = connection->prepare($queryNewPass);

  $stmtNewPass->execute();

  $resultPass = $stmtNewPass->rowCount();

  if($resultPass !==0){
    $message = "successfull";
  }else{
    $message = "failed";
  }
  echo json_encode($message);

}