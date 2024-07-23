<?php
session_start();

include("connection.php");
include("functions.php");

$error_message = "";

if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $user_name = $_POST['user_name'];
    $password = $_POST['password'];
    $cpassword = $_POST['cpassword'];
    $role = $_POST['role'];

    // Check if passwords match
    if ($password !== $cpassword) {
        $error_message = "Passwords do not match.";
    } elseif (!empty($user_name) && !empty($password)) {
        if ($role === 'teacher' && $password !== 'debugit') {
            $error_message = "Incorrect password for teacher.";
        } else {
            $user_id = random_num(20);
            $query = "INSERT INTO user (user_id, user_name, password, role) VALUES ('$user_id', '$user_name', '$password', '$role')";

            mysqli_query($con, $query);
            $_SESSION['role'] = $role;

            header("Location: loginpage.php");
            die;
        }
    } else {
        $error_message = "Please enter some valid information.";
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Signup Form</title>
    <link rel="stylesheet" href="signup.css">
</head>
<body>
    <div class="container">
        <?php if(!empty($error_message)): ?>
            <div class="error_message"><?php echo $error_message; ?></div>
        <?php endif; ?>
        <div class="center">
            <div class="left-side">
                <img src="signup.JPG" alt="Sign Up">
            </div>
            <div class="right-side">
                <h1>Sign Up</h1>
                <form method="post" action="signup.php">
                    <div class="txt_field">
                        <input type="text" id="user_name" name="user_name" required>
                        <label for="user_name">Name</label>
                    </div>
                    
                    <div class="role_selection">
                        <label for="role">Role:</label>
                        <input type="radio" id="student" name="role" value="student" required>
                        <label for="student">Student</label>
                        <input type="radio" id="teacher" name="role" value="teacher" required>
                        <label for="teacher">Teacher</label>
                    </div>
                    
                    <div class="txt_field">
                        <input type="password" id="password" name="password" required>
                        <label for="password">Password</label>
                    </div>
                    <div class="txt_field">
                        <input type="password" id="cpassword" name="cpassword" required>
                        <label for="cpassword">Confirm Password</label>
                    </div>
                    <input type="submit" value="Sign Up">
                    <div class="signup_link">
                        <p>Have an Account? <a href="loginpage.php">Login Here</a></p>
                    </div>
                </form>
            </div>
        </div>
    </div>
</body>
</html>
