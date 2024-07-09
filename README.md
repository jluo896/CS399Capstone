# Capstone Project Team 10 - GradePal

Link to project management tool: https://trello.com/b/NFYKKP5S/compsci-399-capstone-team-10-scrum-board

## About

This is a university capstone project from the University of Auckland for the capstone course COMPSCI 399 about a web application that allows efficient marking. Team members of this project are Michael Mar, Jesse Luo, Zhenyu Xu, and Songru Yan.

The features included are a rubric creation system to create the appropriate template that the marking system allows via a csv file; a system that uploads the rubric template and a list of students; and finally, the main feature of the application, the efficient "grading" system.

Features within the "grading" system which allows efficient marking includes quick marking via clicking, saving custom comments, and replacing marks or comments from either selected students or all students.

The application mainly written in JavaScript and uses the NodeJS runtime environment where it runs both the client environment using the React.js frameowrk and server envirnoment using the ExpressJS Framework. The application also uses SQLite as the database to store the data.

## Running the Web Appication locally

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* **Nodejs**: Make sure you have nodejs installed onto your device. Otherwise, you can install nodejs using the following link: https://nodejs.org/en

* **npm**: The package manage after Nodejs is installed that allows commands to be run, including installing packages and running nodejs programs.
```sh
npm install npm@latest -g
```
* **terminal**: Have a terminal ready to run the program. You can use the device's terminal or use the Visual Studio Code terminal

### Step 1 - Open root folder and terminal

You can clone or download this repository onto your device. Once the repository has been cloned or downloaded, open the root folder of the repository onto the device using the device's terminal or the VSCode terminal.

You need at least two terminal, since each terminal runs either the frontend application or the backend server. 

### Step 2 - Run backend server

In the first terminal, open the backend folder by typing in 
```sh
cd backend
```
If it's the first time running the webapp, install the dependecies needed by  typing in
```sh
npm install
```
Finally, to run the server, type in
```sh
npm start
```
Now the server is running on http://localhost:5000/.

Note that ```node server.js``` works as well.

If ```npm start``` doesn't work, try closing and reopen vscode.

### Step 3 - Run frontend app

In the second terminal, open the frontend folder by typing in
```sh
cd frontend
```
If it's the first time running the webapp, install the dependecies needed by  typing in
  ```sh
npm install
```
Finally, to start the application, type in
  ```sh
npm start
```
Now the client application is running on http://localhost:3000/.

The webapp should open at with you last used or default browser. If ```npm start``` doesn't work, try closing and reopen vscode.

Also sometimes while using the application (usually, when you first open the app), React would break and would throw an error for undefined variables when opening pages. When this occurs, just refresh the page.

## Future Plans

Due to our team's skills and knowledge and the many challenges that we faced, we had to cut back on certain elements to prioritise on a functional application and the efficient marking. Some of these elements include the frontend system and rubric creation system which our current system have many limitions since it uses a third party system.

Also, the tech stack used closely resembles the MERN stack, however, we used SQLite instead of MongoDB due to time needed to learn and implement MongoDB and the simplicity of learning SQLite. So, we would wish to switch from the file-based SQLite database to the cloudbased MongoDB database.

We also had plans to deploy the application, however, we might not be able to due to time constraints. But we might be able to deploy before the due date of the project, if we are able to.

## Showcase Build Changes

Here are some changes/improvements made to the project build for the showcase after the original deadline of our project. These changes were made either because we weren't able to implement in time or realised afterwards.

* **Modifying marks or comments for selected student** no longer requires a previous mark or comment, so now, the marks or comments would be set for all selected students no matter their previous mark or comment.
* Fixed issue for **removing comment** where radio button for removed comment is still present after comment was removed

## Acknowledgements
* **Asma Shakil**:  Course coordinator
* **Anna Trofimova**: Lecturer in charge of our project
* **Philipp Skavantzos**: Our team's tutor for progress meetings and consultant
* **Ewan Tempero**: Project client

