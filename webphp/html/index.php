<?php
$dbhost = "dbphp"; // dbserver/dbhost ( CONTAINER )
$dbuser = getenv('DB_USER');
$dbpasswd = getenv('DB_PASSWORD');
$dbname = getenv('DB_NAME');
$dbport = getenv('DB_PORT');

$con = mysqli_connect($dbhost, $dbuser, $dbpasswd, $dbname, $dbport);
if (!$con) {
    die("Connection failed: " . mysqli_connect_error());
} else {
    echo "It Works! php-mysqli connections success";
}
