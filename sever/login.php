<?php
    mysql_connect('localhost','root','root');
    mysql_select_db('nz1907');
    $username=$_POST['username'];
    $password=$_POST['password'];
    $sql="SELECT * FROM `user` WHERE `username`='$username' AND `password`='$password'";
    $res=mysql_query($sql);
    $row=mysql_fetch_assoc($res);
    if($row){
        $arr=array(
            "message"=>"登录成功",
            "code"=>1,
            "userId"=>$row['Id'],
            "username"=>$row['username']
        );
    }else{$arr = array("message"=>"登录失败","code"=>0);}
    echo json_encode($arr);
?>