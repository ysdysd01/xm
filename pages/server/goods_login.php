<?php
include_once './config.php';

$userName = $_POST['userName'];
$userPwd = $_POST['userPwd'];

$link = mysqli_connect($host, $user, $pwd, $dbname, $port);

$sql = "SELECT `id` FROM `user` WHERE `username` = '{$userName}' AND `userpwd` = '{$userPwd}' ";

$result = mysqli_query($link, $sql);

$arr = mysqli_fetch_all($result);

if(count($arr) == 1){
    echo json_encode(1);
}else{
    echo json_encode(0);
}