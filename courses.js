function addCourse() {
    var courseName = document.getElementById('courseName').value;
    if (courseName.trim() !== '') {
        var courses = JSON.parse(localStorage.getItem('courses')) || [];
        courses.push(courseName);
        localStorage.setItem('courses', JSON.stringify(courses));
        displayCourses();
        broadcastCourseUpdate(courseName);
        document.getElementById('courseName').value = ''; // Clear the input field
    } else {
        alert('Please enter a course name.');
    }
}

function editCourse(courseName) {
    var newPassword = prompt('Enter teacher password:');
    if (newPassword === 'debugit') {
        var newContent = prompt('Enter new content for the course:');
        if (newContent !== null) {
            var coursesContent = JSON.parse(localStorage.getItem('coursesContent')) || {};
            coursesContent[courseName] = newContent;
            localStorage.setItem('coursesContent', JSON.stringify(coursesContent));
            displayCourses();
            broadcastCourseUpdate(courseName);
        }
    } else {
        alert('Incorrect password. Please try again.');
    }
}

function addAssignment(courseName) {
    var newPassword = prompt('Enter teacher password:');
    if (newPassword === 'debugit') {
        var newAssignment = prompt('Enter new assignment for the course:');
        if (newAssignment !== null) {
            var coursesAssignments = JSON.parse(localStorage.getItem('coursesAssignments')) || {};
            coursesAssignments[courseName] = newAssignment;
            localStorage.setItem('coursesAssignments', JSON.stringify(coursesAssignments));
            displayCourses();
            broadcastCourseUpdate(courseName);
        }
    } else {
        alert('Incorrect password. Please try again.');
    }
}

function addResources(courseName) {
    var newPassword = prompt('Enter teacher password:');
    if (newPassword === 'debugit') {
        var newResource = prompt('Enter new resource for the course:');
        if (newResource !== null) {
            var coursesResources = JSON.parse(localStorage.getItem('coursesResources')) || {};
            coursesResources[courseName] = newResource;
            localStorage.setItem('coursesResources', JSON.stringify(coursesResources));
            displayCourses();
            broadcastCourseUpdate(courseName);
        }
    } else {
        alert('Incorrect password. Please try again.');
    }
}

function displayCourseContent(courseName) {
    var coursesContent = JSON.parse(localStorage.getItem('coursesContent')) || {};
    var content = coursesContent[courseName];
    if (content) {
        alert('Course Content:\n' + content);
    } else {
        alert('No content available for this course.');
    }
}

function displayAssignment(courseName) {
    var coursesAssignments = JSON.parse(localStorage.getItem('coursesAssignments')) || {};
    var assignment = coursesAssignments[courseName];
    if (assignment) {
        alert('Assignment:\n' + assignment);
    } else {
        alert('No assignment available for this course.');
    }
}

function displayResources(courseName) {
    var coursesResources = JSON.parse(localStorage.getItem('coursesResources')) || {};
    var resource = coursesResources[courseName];
    if (resource) {
        alert('Resources:\n' + resource);
    } else {
        alert('No resources available for this course.');
    }
}

function enrollCourse(courseName) {
    var enrolledCourses = JSON.parse(localStorage.getItem('enrolledCourses')) || [];
    if (!enrolledCourses.includes(courseName)) {
        enrolledCourses.push(courseName);
        localStorage.setItem('enrolledCourses', JSON.stringify(enrolledCourses));
        displayEnrolledCourses();
        displayCourses(); // Update available courses list to remove enroll option
    }
}

function unenrollCourse(courseName) {
    var enrolledCourses = JSON.parse(localStorage.getItem('enrolledCourses')) || [];
    var index = enrolledCourses.indexOf(courseName);
    if (index !== -1) {
        enrolledCourses.splice(index, 1);
        localStorage.setItem('enrolledCourses', JSON.stringify(enrolledCourses));
        displayEnrolledCourses();
        displayCourses(); // Update available courses list to show enroll option
    }
}

function removeCourse(courseName) {
    var courses = JSON.parse(localStorage.getItem('courses')) || [];
    var index = courses.indexOf(courseName);
    if (index !== -1) {
        courses.splice(index, 1);
        localStorage.setItem('courses', JSON.stringify(courses));
        displayCourses();
        broadcastCourseUpdateRemoved(courseName);
    }
}

function displayCourses() {
    var courses = JSON.parse(localStorage.getItem('courses')) || [];
    var enrolledCourses = JSON.parse(localStorage.getItem('enrolledCourses')) || [];
    var coursesList = document.getElementById('coursesList');
    coursesList.innerHTML = '';
    courses.forEach(function(course) {
        if (!enrolledCourses.includes(course)) {
            var li = document.createElement('li');
            li.textContent = course;
            if (!isTeacher()) {
                var enrollButton = document.createElement('button');
                enrollButton.textContent = 'Enroll';
                enrollButton.onclick = function() {
                    enrollCourse(course);
                    li.remove(); // Remove the course from available courses after enrolling
                };
                li.appendChild(enrollButton);
            } else {
                var editButton = document.createElement('button');
                editButton.textContent = 'Edit';
                editButton.onclick = function() {
                    editCourse(course);
                };
                li.appendChild(editButton);

                var addAssignmentButton = document.createElement('button');
                addAssignmentButton.textContent = 'Add Assignment';
                addAssignmentButton.onclick = function() {
                    addAssignment(course);
                };
                li.appendChild(addAssignmentButton);

                var addResourcesButton = document.createElement('button');
                addResourcesButton.textContent = 'Add Resources';
                addResourcesButton.onclick = function() {
                    addResources(course);
                };
                li.appendChild(addResourcesButton);

                var removeButton = document.createElement('button');
                removeButton.textContent = 'Remove';
                removeButton.onclick = function() {
                    removeCourse(course);
                };
                li.appendChild(removeButton);
            }
            coursesList.appendChild(li);
        }
    });
}

function displayEnrolledCourses() {
    var enrolledCourses = JSON.parse(localStorage.getItem('enrolledCourses')) || [];
    var enrolledCoursesList = document.getElementById('enrolledCoursesList');
    enrolledCoursesList.innerHTML = '';
    enrolledCourses.forEach(function(course) {
        var li = document.createElement('li');
        li.textContent = course;
        if (!isTeacher()) {
            var unenrollButton = document.createElement('button');
            unenrollButton.textContent = 'Unenroll';
            unenrollButton.onclick = function() {
                unenrollCourse(course);
            };
            li.appendChild(unenrollButton);

            var showCourseContentButton = document.createElement('button');
            showCourseContentButton.textContent = 'Show Course Content';
            showCourseContentButton.onclick = function() {
                displayCourseContent(course);
            };
            li.appendChild(showCourseContentButton);

            var showAssignmentButton = document.createElement('button');
            showAssignmentButton.textContent = 'Show Assignment';
            showAssignmentButton.onclick = function() {
                displayAssignment(course);
            };
            li.appendChild(showAssignmentButton);

            var showResourcesButton = document.createElement('button');
            showResourcesButton.textContent = 'Show Resources';
            showResourcesButton.onclick = function() {
                displayResources(course);
            };
            li.appendChild(showResourcesButton);
        }
        enrolledCoursesList.appendChild(li);
    });
}

function broadcastCourseUpdate(courseName) {
    var courseUpdateEvent = new CustomEvent('courseUpdate', { detail: courseName });
    window.dispatchEvent(courseUpdateEvent);
}

function broadcastCourseUpdateRemoved(courseName) {
    var courseUpdateRemovedEvent = new CustomEvent('courseUpdateRemoved', { detail: courseName });
    window.dispatchEvent(courseUpdateRemovedEvent);
}

function isTeacher() {
    var urlParams = new URLSearchParams(window.location.search);
    var role = urlParams.get('role');
    return role === 'teacher';
}

window.onload = function() {
    displayCourses();
    if (!isTeacher()) {
        displayEnrolledCourses();
        document.getElementById('enrolledCoursesSection').style.display = 'block';
    }
    // Determine if the user is a teacher or student based on URL parameter
    var urlParams = new URLSearchParams(window.location.search);
    var role = urlParams.get('role');

    // If the role is 'teacher', show the Add Course section
    if (role === 'teacher') {
        document.getElementById('addCourseSection').style.display = 'block';
    }
};
