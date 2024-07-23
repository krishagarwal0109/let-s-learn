function redirectToCourses() {
    fetch('getRole.php')
        .then(response => response.json())
        .then(data => {
            var role = data.role;
            if (role === 'student') {
                window.location.href = 'courses.html'; // Redirect to courses.html with role=student
            } 
            else{
                    window.location.href = 'courses.html?role=teacher'; // Redirect to courses.html with role=teacher
                } 
            }
            
        )
        .catch(error => {
            console.error('Error fetching role:', error);
            alert('An error occurred. Please try again.');
        });
}

        
        
        
        
        
function redirectToDoubts() {
    fetch('getRole.php')
        .then(response => response.json())
        .then(data => {
            var role = data.role;
            if (role === 'student') {
                window.location.href = 'doubts.php?role=student'; // Redirect to doubts.php with role=student
            } else {
                window.location.href = 'doubts.php?role=teacher'; // Redirect to doubts.php with role=teacher
            }
        })
        .catch(error => {
            console.error('Error fetching role:', error);
            alert('An error occurred. Please try again.');
        });
}
