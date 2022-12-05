<?php
session_start();
$host = "dbphp"; /* Host name */
$user = "webphp_user"; /* User */
$password = "webphp_password"; /* Password */
$dbname = "webphp"; /* Database name */

$con = mysqli_connect($host, $user, $password, $dbname);
// Check connection
if (!$con) {
    die("Connection failed: " . mysqli_connect_error());
}else{
	echo "It Works! php-mysqli connections success";
}
