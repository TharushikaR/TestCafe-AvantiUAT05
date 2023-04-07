import { Selector,t } from "testcafe"

class forgotPwd{
    constructor(){
        this.linkToFP= Selector('a').withText('Forgotten your password?')
        this.txtUserEmail= Selector('#login')
        this.btnReset= Selector('#forgotPasswordStep1SubmitBtn')
    }
}
export default forgotPwd