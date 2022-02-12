class RegistrationMail {
    constructor(email,  user, token) {
        this.email = email;
        this.body = "";
        this.subject = 'Welcome to PREVET';
        this.user = user;
        this.token = token;
        this.template = "default"
    }

    setBody() {
        this.body = {
            body: {
                title: `Hi $ ${this.user.firstName}`,
                intro: [
                    "Welcome to PREVET !  We're very excited to have you join us.",
                    `Just one more step to complete your PREVET registration, use this token to verify your account <strong>${this.token}</strong>.
                        <br>
                        Token expires in 15 minutes`
                ]
            }
        }

        return this.body;
    }

}

module.exports= RegistrationMail
