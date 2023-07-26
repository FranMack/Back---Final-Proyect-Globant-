const nodemailer=require("nodemailer")

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "globantbo@gmail.com",
      pass: "wxveyhbnmkpphfvc",
    },
  });
  module.exports=transporter;