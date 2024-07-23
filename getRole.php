<?php
session_start();

include("connection.php");
include("functions.php");

if (isset($_SESSION['user_id'])) {
    $user_id = $_SESSION['user_id'];
    $query = "SELECT role FROM user WHERE user_id='$user_id' LIMIT 1";
    $result = mysqli_query($con, $query);
    if ($result) {
        $user_data = mysqli_fetch_assoc($result);
        echo json_encode(['role' => $user_data['role']]);
    } else {
        echo json_encode(['role' => null]);
    }
} else {
    echo json_encode(['role' => null]);
}

