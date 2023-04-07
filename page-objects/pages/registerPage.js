import { Selector,t } from "testcafe"

class registerPage{
    constructor(){
        this.linkToAcc=Selector('button').withText('Create an account')
        this.emailInput=Selector('#email1')
        this.cEmailInput=Selector('#confirmEmail')
        this.pwdInput=Selector('#password1')
        this.btnCreate= Selector('#registerBtn')
    }

    async setEmail(email){
        await t.typeText(this.emailInput,email,{paste:true})
    }
    async setCEmail(cemail){
        await t.typeText(this.cEmailInput,cemail,{paste:true})
    }
    async setPwd(password){
        await t.typeText(this.pwdInput,password,{paste:true})
    }
}

export default registerPage