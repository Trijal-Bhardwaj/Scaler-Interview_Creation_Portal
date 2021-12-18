const nodemailer = require("nodemailer");
let instance = null;

const SERVICE = "gmail";
const USER = "official.trijal.bhardwaj@gmail.com";
const PASSWORD = "TrijalBhardwaj1402";

const transporter = nodemailer.createTransport({
  service: SERVICE,
  auth: {
    user: USER,
    pass: PASSWORD,
  },
});

class MailService {
  static getMailServiceInstance() {
    return instance ? instance : new MailService();
  }

  getData = (data) => {
    data = data.split("(");
    const name = data[0];
    const email = data[1].slice(0, -1);
    return {
      name: name,
      email: email,
    };
  };

  schedule = (interviewer, interviewee, startTime, endTime) => {
    interviewer = this.getData(interviewer);
    interviewee = this.getData(interviewee);
    const mailOptions = {
      from: USER,
      to: interviewer.email + "," + interviewee.email,
      subject: "New Interview Scheduled",
      text: `You Have A New Interview Scheduled.
                   Details Of Scheduled Interview:
                   Interviewer Name: ${interviewer.name}
                   Interviewee Name: ${interviewee.name}
                   Start Time: ${startTime}
                   End Time: ${endTime}`,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email Sent: " + info.response);
      }
    });
  };

  update = (interviewer, interviewee, startTime, endTime) => {
    interviewer = this.getData(interviewer);
    interviewee = this.getData(interviewee);
    const mailOptions = {
      from: USER,
      to: interviewer.email + "," + interviewee.email,
      subject: "Interview Timings Updated",
      text: `Your Interview Scheduled Timings Are Updated.
            Details Of Updated Interview:
            Interviewer Name: ${interviewer.name}
            Interviewee Name: ${interviewee.name}
            Start Time: ${startTime}
            End Time: ${endTime}`,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email Sent: " + info.response);
      }
    });
  };

  delete = (interviewer, interviewee, startTime, endTime) => {
    interviewer = this.getData(interviewer);
    interviewee = this.getData(interviewee);
    const mailOptions = {
      from: USER,
      to: interviewer.email + "," + interviewee.email,
      subject: "Scheduled Interview Cancelled",
      text: `Your Interview Scheduled With
            Details:
            Interviewer Name: ${interviewer.name}
            Interviewee Name: ${interviewee.name}
            Start Time: ${startTime}
            End Time: ${endTime}
                   Is Cancelled Now.`,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email Sent: " + info.response);
      }
    });
  };
}

module.exports = MailService;
