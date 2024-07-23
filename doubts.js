async function getRole() {
    let response = await fetch('getRole.php');
    let data = await response.json();
    return data.role;
}

async function addDoubt(event) {
    event.preventDefault();
    var role = await getRole();
    var doubtContent = document.getElementById('doubtContent').value;

    if (role && role.toLowerCase() === 'student') {
        if (doubtContent.trim() !== '') {
            let response = await fetch('addDoubt.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ doubtContent: doubtContent }),
            });

            if (response.ok) {
                displayDoubts();
                document.getElementById('doubtContent').value = ''; // Clear the input field
            } else {
                alert('Failed to add doubt.');
            }
        } else {
            alert('Please enter your doubt.');
        }
    } else if (role && role.toLowerCase() === 'teacher') {
        alert('Teachers cannot add doubts.');
    } else {
        alert('Invalid role.');
    }
}

async function answerDoubt(doubtId) {
    var answer = prompt('Enter your answer:');
    if (answer !== null && answer.trim() !== '') {
        let response = await fetch('answer_doubt.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `doubtId=${doubtId}&answer=${encodeURIComponent(answer)}`
        });

        let result = await response.json();
        if (result.status === 'success') {
            // Redirect to doubts.php after successful answer
            window.location.href = 'doubts.php';
        } else {
            alert(result.message || 'Failed to answer doubt.');
        }
    }
}



async function fetchDoubts() {
    let response = await fetch('fetchDoubts.php');
    let data = await response.json();
    return data;
}

async function displayDoubts() {
    var doubts = await fetchDoubts();
    var role = await getRole();
    var doubtsList = document.getElementById('doubtsList');
    doubtsList.innerHTML = '';

    doubts.forEach(function (doubt) {
        if (!doubt.answered) {
            var li = document.createElement('li');
            li.textContent = doubt.content;

            if (role && role.toLowerCase() === 'teacher') {
                var answerButton = document.createElement('button');
                answerButton.textContent = 'Answer Doubt';
                answerButton.onclick = function() {
                    answerDoubt(doubt.id);
                };
                li.appendChild(answerButton);
            }

            doubtsList.appendChild(li);
        }
    });
}

async function displaySolvedDoubts() {
    var doubts = await fetchDoubts();
    var solvedDoubtsList = document.getElementById('solvedDoubtsList');
    solvedDoubtsList.innerHTML = '';

    doubts.forEach(function (doubt) {
        if (doubt.answered) {
            var li = document.createElement('li');
            li.textContent = 'Doubt: ' + doubt.content + ' - Answer: ' + doubt.answer;
            solvedDoubtsList.appendChild(li);
        }
    });
}

window.onload = async function () {
    var role = await getRole();
    if (role && role.toLowerCase() === 'teacher') {
        document.getElementById('addDoubtSection').style.display = 'none';
    }

    displayDoubts();
    displaySolvedDoubts();
};

document.getElementById('doubtForm').addEventListener('submit', addDoubt);
