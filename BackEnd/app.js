const express = require("express");
const app = express();
const cors = require("cors");

const dbService = require("./dataBase-SQL");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Getting Data of All the Users
app.get("/getAll", (request, response) => {
  const db = dbService.getDbServiceInstance();
  const result = db.getAllData();
  result
    .then((data) => response.json({ data: data }))
    .catch((err) => console.log(err));
});

// Getting Data of All the Interviews
app.get("/getAllInterviews", (request, response) => {
  const db = dbService.getDbServiceInstance();
  const result = db.getAllInterviewData();
  result
    .then((data) => response.json({ data: data }))
    .catch((err) => console.log(err));
});

// Inserting Information of New Interviews
app.post("/insertInterview", (request, response) => {
  const { email1, email2, endTime, startTime } = request.body;
  const db = dbService.getDbServiceInstance();
  const result = db.insertInterview(email1, email2, startTime, endTime);
  result
    .then((data) => response.json({ data: data }))
    .catch((err) => console.log(err));
});

// Deleting a Scheduled Interview
app.delete("/deleteInterview/:id", (request, response) => {
  const { id } = request.params;
  const db = dbService.getDbServiceInstance();
  const result = db.deleteInterviewById(id);
  result
    .then((data) => response.json({ success: data }))
    .catch((err) => console.log(err));
});

// Updating a Scheduled Interview
app.patch("/updateInterview", (request, response) => {
  const { id, email1, email2, startTime, endTime } = request.body;
  const db = dbService.getDbServiceInstance();
  const result = db.updateInterviewById(id, email1, email2, startTime, endTime);
  result
    .then((data) => response.json({ data: data }))
    .catch((err) => console.log(err));
});

app.listen(5000, () => console.log("Scaler-Interview Creation Portal Is Running On Port 5000"));
