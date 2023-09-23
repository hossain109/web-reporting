<?php

$ini_file = parse_ini_file(__DIR__.DIRECTORY_SEPARATOR.'init.ini',true);

foreach ($ini_file as $key => $value) {
	
	define("__".strtoupper($key)."__",$value);

	//define('__'.strtoupper($key).'__',$value);
	
}
/*
define("__HOST__","localhost ");
define("__USERNAME__","root ");
define("__PASSWORD__"," ");
define("__DATABASE__","studio_4 ");

//define("__TEST__","test");
*/

try{
      //$connect = new PDO("mysql:host=" . __DB__['host'] . ";dbname=" . __DB__['database'], __DB__['username'],__DB__['password']);
      //$connect = new PDO("mysql:host=mstestvdb.mysql.db;dbname=mstestvdb", "mstestvdb","9xY5qEvEa99Ti4");
      $connect = new PDO("mysql:host=localhost;dbname=estudio3_2013", "root","");
      //$connect = new PDO("mysql:host=db5013426563.hosting-data.io;dbname=dbs11254225", "dbu188331","marketingstudio4");
      $connect ->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
      }catch(PDOException $error){
      echo "Error: ".$error->getMessage();
      }


define("connection",$connect);

define("test","test1");

?>