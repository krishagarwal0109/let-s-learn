<?php
session_start();
include("connection.php");
include("functions.php");

$user_data = check_login($con);

if ($user_data) {
    $role = $user_data['role'];
    $user_id = $user_data['user_id'];
    $doubts = fetch_doubts($con, $user_id, $role);
    echo json_encode($doubts);
} else {
    echo json_encode([]);
}

