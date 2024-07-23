<?php
session_start();

include("connection.php");
include("functions.php");

$user_data = check_login($con);

if ($_SERVER['REQUEST_METHOD'] == "POST" && isset($_POST['doubtContent'])) {
    $doubtContent = $_POST['doubtContent'];
    $user_id = $user_data['user_id'];

    if (!empty($doubtContent)) {
        $query = "INSERT INTO doubts (user_id, content) VALUES ('$user_id', '$doubtContent')";
        mysqli_query($con, $query);
    }
}

$user_doubts = fetch_doubts($con, $user_data['user_id'], $user_data['role']);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Doubt Page</title>
    <link rel="stylesheet" href="doubts.css">
</head>
<body>
    <h1>Doubt Page</h1>

    <?php if ($user_data['role'] == 'student') : ?>
        <div id="addDoubtSection">
            <label for="doubtContent">Enter Your Doubt:</label>
            <form method="post">
                <input type="text" id="doubtContent" name="doubtContent" placeholder="Type your doubt here...">
                <button type="submit">Add Doubt</button>
            </form>
        </div>
    <?php endif; ?>

    <div id="doubtsSection">
        <h2>Unanswered Doubts</h2>
        <ul id="doubtsList">
            <?php foreach ($user_doubts as $doubt) : ?>
                <?php if (!$doubt['answered']) : ?>
                    <li>
                        <?php echo htmlspecialchars($doubt['content']); ?>
                        <?php if ($user_data['role'] == 'teacher') : ?>
                            <form method="post" action="answer_doubt.php">
                                <input type="hidden" name="doubt_id" value="<?php echo $doubt['id']; ?>">
                                <input type="text" name="answer" placeholder="Enter your answer">
                                <button type="submit">Answer Doubt</button>
                            </form>
                        <?php endif; ?>
                    </li>
                <?php endif; ?>
            <?php endforeach; ?>
        </ul>
    </div>

    <div id="solvedDoubtsSection">
        <h2>Solved Doubts</h2>
        <ul id="solvedDoubtsList">
            <?php foreach ($user_doubts as $doubt) : ?>
                <?php if ($doubt['answered']) : ?>
                    <li>
                        Doubt: <?php echo htmlspecialchars($doubt['content']); ?> - Answer: <?php echo htmlspecialchars($doubt['answer']); ?>
                    </li>
                <?php endif; ?>
            <?php endforeach; ?>
        </ul>
    </div>
</body>
</html>
