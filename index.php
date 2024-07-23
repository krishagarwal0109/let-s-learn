<?php
session_start();

include("connection.php");
include("functions.php");
$user_data = check_login($con);
?>
<!DOCTYPE html>
<html>
<head>
    <title>Simple web page Template</title>
    <link rel="stylesheet" href="homepage.css">
    <script src="homepage.js"></script>
</head>
<body>
    <nav class="navbar background">
        <div class="logo">
            <img src="Untitled.png" style="height: 30px;" alt="Logo">
        </div>
        <ul class="nav-list">
            <li><a href="logout.php">Logout</a></li>
            <li><a href="signup.php">Signup</a></li>
            <li><a href="#" onclick="redirectToDoubts()">Ask Your Doubts</a></li>
            <li><a href="#" onclick="redirectToCourses()">Courses</a></li>
        </ul>
        <div class="rightnav">
            <input type="text" name="search" id="search">
            <button class="btn btn-sm">Search</button>
        </div>
    </nav>
    <footer class="background">
        <p class="text-footer">Let's Learn Together</p>
    </footer>
    <div class="circle1">Explore Your Passion</div>
    <div class="circle2">Beginner to Expert</div>
    <div class="circle3">Empower Yourself</div>
    <div class="container">
        <img src="images2.jpeg" class="img1">
        <div class="circle4">Unlock Your Potential</div>
    </div>
</body>
</html>
