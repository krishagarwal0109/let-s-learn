<?php
session_start();

include("connection.php");
include("functions.php");

$user_data = check_login($con);

$data = json_decode(file_get_contents('php://input'), true);
$doubtContent = $data['doubtContent'];
$user_id = $user_data['user_id'];

if (!empty($doubtContent)) {
    $query = "INSERT INTO doubts (user_id, content) VALUES ('$user_id', '$doubtContent')";
    mysqli_query($con, $query);
    echo json_encode(['status' => 'success']);
} else {
    echo json_encode(['status' => 'error']);
}
