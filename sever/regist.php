<?php
    mysql_connect('localhost','root','root');
    mysql_select_db('nz1907');
    $username = $_POST['username'];
    $password = $_POST['password'];
    $sql1 = "SELECT * FROM `user` WHERE `username`='$username'";
    $res1 = mysql_query($sql1);
    $row1 = mysql_fetch_assoc($res1);
  # 只要 $row1 不是 false, 就表示这个用户名已经存在了
  if ($row1) {
    // 能进入 if 条件, $row1 一定不是 false
    $arr = array(
      "message" => "注册失败, 用户名已经存在",
      "code" => 0
    );
    // 返回给前端
    echo json_encode($arr);
    // exit;
    exit;
  }
  # 如果代码能来到这里, 说明用户名不存在, 可以注册
  # 4. 把用户信息插入
  $sql2 = "INSERT INTO `user` (`username`, `password`) VALUES('$username','$password')";
  $res2 = mysql_query($sql2);
  # 直接返回注成功的信息
  $arr2 = array(
    "message" => "注册成功",
    "code" => 1
  );
  echo json_encode($arr2);
?>