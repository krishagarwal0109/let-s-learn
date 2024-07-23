<?php
session_start();
include("connection.php");
include("functions.php");

$user_data = check_login($con);

if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $doubt_id = $_POST['doubt_id'];
    $answer = $_POST['answer'];

    if (!empty($doubt_id) && !empty($answer)) {
        // Update the doubt with the provided answer
        $query = "UPDATE doubts SET answered=1, answer='$answer' WHERE id='$doubt_id'";
        mysqli_query($con, $query);

        // Redirect back to doubts.php after answering
        header("Location: doubts.php");
        exit();
    }
}
?>
