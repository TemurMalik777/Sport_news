const nodemailer = require("nodemailer");
const config = require("config");

class MailService {
  constructor() {
    this.transporitor = nodemailer.createTransport({
      service: "gmail",
      host: config.get("smtp_host"),
      port: config.get("smtp_port"),
      secure: false,
      auth: {
        user: config.get("smtp_user"),
        pass: config.get("smtp_password"),
      },
    });
  }

  async sendActivationMail(toEMail, code) {
    await this.transporitor.sendMail({
      from: config.get("smtp_user"),
      to: toEMail,
      subject: "Lugatim accauntini faollantrish",
      text: "",
      html: `
        <div>
            <h3>Akkauntni Faollashtrish uchun gmail ga yuborilgan kodni kriting: </h3>
            <h1>${code}</h1>
        </div>
        `,
    });
  }
}

module.exports = new MailService();
