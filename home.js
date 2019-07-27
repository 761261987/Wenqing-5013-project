var email;
var database;

function initApp() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            email = user.email;
            document.getElementById("signin-panel").hidden = true;
            document.getElementById("signout-panel").hidden = false;
            document.getElementById("course-contents").hidden = false;
            document.getElementById('email').value = "";
            document.getElementById('password').value = "";
            document.getElementById("welcome-message").innerHTML = "Welcome " + email.substring(0, email.indexOf('@')) + "!";
            loadAllQuizzes();
        } else {
            document.getElementById("signin-panel").hidden = false;
            document.getElementById("signout-panel").hidden = true;
            document.getElementById("course-contents").hidden = true;
        }
    })

    database = firebase.database();
}

function getQuiz(quizId, quizContents) {
    var quiz = `<li>${quizContents[quizId]["question"]}</li>`;
    quiz += `<div class="row row-quiz" id="question${quizId}Group">`;

    var option;
    for (option = 1; option < 5; option++) {
        quiz += '<div class="col-md-3 col-sm-12">';
        quiz += "<label>";
        quiz += `<input type="checkbox" name="question${quizId}" value="option${option}">`;
        quiz += quizContents[quizId]["option" + option];
        quiz += "</label>";
        quiz += "</div>";
    }

    quiz += '<div class="col-xs-2 col-xs-offset-5">';
    quiz += `<button class="btn btn-default" id="question${quizId}Check" onclick="checkAnswer(${quizId})">`;
    quiz += "Check answer";
    quiz += "</button>";
    quiz += "</div>"

    quiz += "</div>"

    return quiz
}

function loadAllQuizzes() {
    var quizRef = firebase.database().ref('quizzes');
    quizRef.on('value', function (snapshot) {
        let values = snapshot.val();
        var quiz = "";
        for (let i = 0; i < values.length; i++) {
            quiz += getQuiz(i, values)
        }
        document.getElementById("quizzes").innerHTML = quiz;
    });
}

function login() {
    email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    if (!isValidEmail(email)) {
        alert('Please enter a valid email address.');
        return;
    }
    if (password.length < 1) {
        alert('Please enter a valid password.');
        return;
    }

    firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
        alert(error.message);
    });
}

function signup() {
    email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    if (!isValidEmail(email)) {
        alert('Please enter a valid email address.');
        return;
    }
    if (password.length < 1) {
        alert('Please enter a valid password.');
        return;
    }

    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
        alert(error.message);
    });
}

function logout() {
    firebase.auth().signOut();
}

function checkAnswer(quizId) {
    var checkboxEls = document.querySelectorAll(`#question${quizId}Group input[type="checkbox"]:checked`);
    var studentAnswer = [];
    for (var checkboxElement of checkboxEls) {
        studentAnswer.push(checkboxElement.value);
    }
    if (studentAnswer.length > 0) {
        var quizRef = firebase.database().ref(`quizzes/${quizId}/answer`);
        quizRef.on('value', function (snapshot) {
            let correctAnswer = snapshot.val();
            var checkButton = document.getElementById(`question${quizId}Check`);
            correctAnswer.sort();
            studentAnswer.sort();

            if (JSON.stringify(studentAnswer) === JSON.stringify(correctAnswer)) {
                checkButton.classList.remove('btn-default');
                checkButton.classList.remove('btn-danger');
                checkButton.classList.add('btn-success');
            } else {
                checkButton.classList.remove('btn-default');
                checkButton.classList.remove('btn-success');
                checkButton.classList.add('btn-danger');
            }
        });
    }
}

function isValidEmail(emailAddress) {
    return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(emailAddress));
}

function disableOrEnableEvaluationSubmitButton() {
    var selectReasonDropdown = document.getElementById("sel1");
    var selectedReasonValue = selectReasonDropdown.options[selectReasonDropdown.selectedIndex].value;

    if (isValidEmail(email) && selectedReasonValue != "1" && (selectedReasonValue != "5" || document.querySelector('#detailedReason').value)) {
        document.getElementById("submitButton").disabled = false;
    } else {
        document.getElementById("submitButton").disabled = true;
    }
}

function checkReason() {
    var selectReasonDropdown = document.getElementById("sel1");
    var selectedReasonValue = selectReasonDropdown.options[selectReasonDropdown.selectedIndex].value;

    if (selectedReasonValue === "1") {
        document.querySelector('#sel1').style.backgroundColor = "red";
    } else {
        document.querySelector('#sel1').style.backgroundColor = "LimeGreen";
    }

    if (selectedReasonValue === "5") {
        document.getElementById("detailedReason").disabled = false;
    } else {
        document.getElementById("detailedReason").disabled = true;
    }

    disableOrEnableEvaluationSubmitButton();
}

function submitForm() {
    alert(email.substring(0, email.indexOf('@')) + ": your evaluation has been submitted! ");
}
