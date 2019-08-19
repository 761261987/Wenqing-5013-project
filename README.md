 <body id="contents">
 <h1>Wenqing's project for MSTU5013</h1>
Link to demonstration page: 
https://github.com/761261987/Wenqing-5013-project

Link to YouTube reflection video
https://youtu.be/8036NSQWTBE

To test the website:
  1. Install Node.js from https://nodejs.org/en/ in your system.
  2. Download the project from Github. 
  3. Go to the project directory from command line. 
  4. Run the command `npm install http-server -g`.
  5. Run the command `http-server`.
  6. Go to your browser and type localhost:8080/home.html.
  7. The webpage requires users to login. You can register a new account or login with Google account. 

Design Executive Summary
 - Firebase Authentication
   - We added the feature to allow users login with username and password. An alart will be shown if username or password is incorrect and users can try again. 
   - New users can register a new account with username and password. 
   - Google users can login with their Google account. In this case we will use the Google account name as username. 
   - A welcome message will be shown after a user logs in. 
   - A user can log out by clicking logout button. 
   - All login information is stored in the browser (not js code) and refresh the webpage will not log user out. 
 - Firebase Realtime Database
   - We used Realtime Database to store quiz infomation and user evaluation. 
   - Every quiz has a "key" and can be referred by the key. 
   - Quiz questions, options, and solutions are stored on the cloud, not in the code. Therefore, administrators can add/remove/modify quizzes on Firebase console without changing the code. 
   - We still support interactive quiz by allowing users to check answers on the webpage. 
   - After user evaluation submit form is clicked, the program auto validates the evaluation form and warns the user about any error in the form. 
   - If a form is valid, it can be submitted to Firebase Realtime Database. The submitted form contains username which is automatically grabbed from user login info. 
 - 

<body>
