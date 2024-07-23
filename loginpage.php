<?php
session_start();

include("connection.php");
include("functions.php");

$error_message = ""; // Initialize an empty error message

if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $user_name = $_POST['user_name'];
    $password = $_POST['password'];

    if (!empty($user_name) && !empty($password)) {
        $query = "SELECT * FROM user WHERE user_name='$user_name' LIMIT 1";
        $result = mysqli_query($con, $query);
        if ($result) {
            if (mysqli_num_rows($result) > 0) {
                $user_data = mysqli_fetch_assoc($result);
                if ($user_data['password'] === $password) {
                    $_SESSION['user_id'] = $user_data['user_id'];
                    $_SESSION['role'] = $user_data['role']; // Store the role in the session
                    header("Location: index.php");
                    die;
                }
            }
        }
        $error_message = "Wrong username or password";
    } else {
        $error_message = "Please enter valid username and password";
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login Form in HTML and CSS</title>
    <link rel="stylesheet" href="loginpage.css">
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.com.min.css' rel='stylesheet'>
</head>
<body>
    <div class="container">
        <?php if (!empty($error_message)) : ?>
            <div class="error_message"><?php echo $error_message; ?></div>
        <?php endif; ?>
        <div class="wrapper">
            <form method="post" action="loginpage.php">
                <h1>Login</h1>
                <div class="input-box">
                    <input type="text" name="user_name" placeholder="Username" required>
                    <i class='bx bxs-user'></i>
                </div>
                <div class="input-box">
                    <input type="password" name="password" placeholder="Password" required>
                    <i class='bx bxs-lock-alt'></i>
                </div>
                <button type="submit" class="btn">Login</button>
                <div class="register-link">
                    <p>Don't have an account? <a href="signup.php">Register</a></p>
                </div>
            </form>
        </div>
    </div>
</body>
</html>
