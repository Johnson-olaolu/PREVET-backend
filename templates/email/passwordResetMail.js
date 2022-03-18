class passwordResetMail {
    constructor(email,  user, link) {
        this.email = email;
        this.body = "";
        this.subject = 'Change Your Password';
        this.user = user;
        this.link = link;
        this.template = "default"
    }

    setBody() {
        this.body = {
            body: {
                title: `Hi ${this.user.firstName}`,
                intro: [
                    `You asked to reset your password`,
                    `Please click the link below to reset your password.`,
                    `<a href = ${this.link}> Reset Password</a>`,
                    `Link expires in 15 minutes`
                ]
            }
        }

        return this.body;
    }

}

module.exports= passwordResetMail
