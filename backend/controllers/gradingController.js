const Blob = require("buffer").Blob;
const db = require("../database/database.js")

const router = require("express").Router();

router.get("/rubrics", (req, res) => {
    const sql = "select * from rubrics ORDER BY questionId";
    var params = [];
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error":err.message});
          return;
        }
        res.json(rows);
    })
});

router.get("/students", (req, res) => {
    const sql = "select * from students ORDER BY studentId";
    var params = [];
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error":err.message});
          return;
        }
        res.json(rows);
    })
});

router.get("/student-grades", (req, res) => {
    const sql = "select * from student_grades";
    var params = [];
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error":err.message});
          return;
        }
        res.json(rows);
    })
});

router.post("/uploadRubric", (req, res) => {
    const data = req.body;
    for (let i=0;i<data.length;i++) {
        const sql = "INSERT INTO rubrics (courseId, assignmentId, questionId, title, marks, comments) VALUES (?,?,?,?,?,?)";
        const params = [data[i].courseId, data[i].assignmentId, data[i].questionId, data[i].title, data[i].marks, data[i].comments];
        db.run(sql, params, (err) => {
            if (err){
                res.status(400).json({"error": err.message});
            }
        });
    }
    res.status(200).json(data);
});

router.post("/uploadStudents", (req, res) => {
    const data = req.body;
    for (let i=0;i<data.length;i++) {
        const sql = "INSERT INTO students (courseId, assignmentId, studentId, studentUpi, studentName) VALUES (?,?,?,?,?)";
        const params = [data[i].courseId, data[i].assignmentId, data[i].studentId, data[i].studentUpi, data[i].studentName];
        db.run(sql, params, (err) => {
            if (err){
                res.status(400).json({"error": err.message});
            }
        });
    }
    res.status(200).json(data);
});

router.post("/uploadRubricForStudents", async (req,res) => {
    const rubric = req.body[0];
    const students = req.body[1];
    
    for (let i=0;i<students.length;i++) {
        for (let j=1;j<rubric.length;j++) {
            const sql = "INSERT INTO student_grades (courseId, assignmentId, studentId, questionId) VALUES (?,?,?,?)";
            const params = [students[i].courseId, students[i].assignmentId, students[i].studentId, rubric[j].questionId];
            db.run(sql, params, (err) => {
                if (err){
                    res.status(400).json({"error": err.message});
                }
            });
            
        }
    }
    
})

router.post("/uploadCourse", (req, res) => {
    const data = req.body;
    const sql = "INSERT INTO courses (courseId, courseName) VALUES (?,?)";
    const params = [data[0].courseId, data[0].courseName];
    db.run(sql, params, (err) => {
        if (err){
            res.status(400).json({"error": err.message});
        }
    });
    res.status(200).json(data);
});

router.post("/uploadAssignment", (req, res) => {
    const data = req.body;
    const sql = "INSERT INTO assignments (courseId, assignmentId, assignmentName) VALUES (?,?,?)";
    const params = [data[0].courseId, data[0].assignmentId, data[0].assignmentName];
    db.run(sql, params, (err) => {
        if (err){
            res.status(400).json({"error": err.message});
        }
    });
    res.status(200).json(data);
});

router.delete("/clearRubrics", (req, res) => {
    db.run("DELETE FROM rubrics", []);
    res.status(200).json({"message": "success"})
});

router.delete("/clearStudents", (req, res) => {
    db.run("DELETE FROM students", []);
    res.status(200).json({"message": "success"})
});

router.delete("/clearStudentGrades", (req, res) => {
    db.run("DELETE FROM student_grades", []);
    res.status(200).json({"message": "success"})
});

router.delete("/clearCourses", (req, res) => {
    db.run("DELETE FROM courses", []);
    res.status(200).json({"message": "success"})
});

router.delete("/clearAssignments", (req, res) => {
    db.run("DELETE FROM assignments", []);
    res.status(200).json({"message": "success"})
});

router.get("/rubrics/:courseId", (req, res) => {
    const sql = "select * from rubrics WHERE courseId = ? ORDER BY questionId";
    var params = [req.params.courseId];
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error":err.message});
          return;
        }
        res.json(rows);
    })
});


router.get("/students/:courseId", (req, res) => {
    const sql = "select * from students WHERE courseId = ? ORDER BY studentId";
    var params = [req.params.courseId];
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error":err.message});
          return;
        }
        res.json(rows);
    })
});

router.get("/student-grades/:courseId", (req, res) => {
    const sql = "select * from student_grades WHERE courseId = ?";
    var params = [req.params.courseId];
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error":err.message});
          return;
        }
        res.json(rows);
    })
});

router.get("/rubrics/:courseId/:assignmentId", (req, res) => {
    /*const sql = "select * from rubrics WHERE courseId = ? ORDER BY questionId";
    var params = [req.params.courseId];
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error":err.message});
          return;
        }
        res.json(rows);
    })*/
});

router.get("/students/:courseId/:assignmentId", (req, res) => {
    /*const sql = "select * from students WHERE courseId = ? ORDER BY studentId";
    var params = [req.params.courseId];
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error":err.message});
          return;
        }
        res.json(rows);
    })*/
});

router.get("/student-grades/:courseId/:assignmentId", (req, res) => {
    /*const sql = "select * from student_grades WHERE courseId = ?";
    var params = [req.params.courseId];
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error":err.message});
          return;
        }
        res.json(rows);
    })*/
});

router.get("/rubrics/:courseId/:assignmentId/:questionId", (req, res) => {
    /*const sql = "select * from rubrics WHERE courseId = ? ORDER BY questionId";
    var params = [req.params.courseId];
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error":err.message});
          return;
        }
        res.json(rows);
    })*/
});

router.get("/students/:courseId/:assignmentId/:studentId", (req, res) => {
    /*const sql = "select * from students WHERE courseId = ? ORDER BY studentId";
    var params = [req.params.courseId];
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error":err.message});
          return;
        }
        res.json(rows);
    })*/
});

router.get("/student-grades/:courseId/:assignmentId/:studentId", (req, res) => {
    /*const sql = "select * from student_grades WHERE courseId = ?";
    var params = [req.params.courseId];
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error":err.message});
          return;
        }
        res.json(rows);
    })*/
});

router.get("/student-grades/:courseId/:assignmentId/:studentId/:questionId", (req, res) => {
    /*const sql = "select * from student_grades WHERE courseId = ?";
    var params = [req.params.courseId];
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error":err.message});
          return;
        }
        res.json(rows);
    })*/
});

module.exports = router