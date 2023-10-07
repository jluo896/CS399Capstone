const sqlite3 = require('sqlite3').verbose();
const DBSOURCE = "./grading.db";

// Add MARKERS

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        console.error(err.message)
    }
    
    console.log("Connected to Grading database.");
    //db.run(`DROP TABLE IF EXISTS rubrics`);
    //db.run(`DROP TABLE IF EXISTS students`);
    //db.run(`DROP TABLE IF EXISTS student_grades`);
    db.run(`CREATE TABLE rubrics (courseId INTEGER, assignmentId INTEGER, questionId INTEGER, title TEXT, marks TEXT, comments TEXT)`, (err) => {
        if (err) {
            console.log("Rubrics table already created.");
        }
    });
    db.run(`CREATE TABLE students (courseId INTEGER, assignmentId INTEGER, studentId INTEGER, studentUpi TEXT, studentName TEXT)`, (err) => {
        if (err) {
            console.log("Students table already created.");
        }
        
    });
    db.run(`CREATE TABLE student_grades (courseId INTEGER, assignmentId INTEGER, studentId INTEGER, questionId INTEGER, mark TEXT, comment TEXT)`, (err) => {
        if (err) {
            console.log("Student_Grades table already created.");
        }
    });

    db.run(`CREATE TABLE courses (courseId INTEGER, courseName TEXT)`, (err) => {
        if (err) {
            console.log("Courses table already created.");
        }
    });
    db.run(`CREATE TABLE assignments (courseId INTEGER, assignmentId INTEGER, assignmentName TEXT)`, (err) => {
        if (err) {
            console.log("Assigments table already created.");
        }
    });
})

module.exports = db;