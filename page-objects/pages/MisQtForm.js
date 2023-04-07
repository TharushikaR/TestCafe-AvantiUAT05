import { Selector,t } from "testcafe"
//import BasPage from "./BasPage"

class MisQtForm {
    constructor(){
        this.txtUserName= Selector('#username')
        this.txtPassword = Selector('#password')
        this.btnSignIn = Selector('#signInBtn')
        this.pgMyAcc = Selector('#header_home')
        this.linkMYQuotes = Selector('span').withText('My Quotes')
        this.linkToAMQ = Selector('button').withText('Add a missing quote')
        this.txtMsg = Selector('#question')
        this.btnSendMsg = Selector('#contactSubmitBtn')
        this.btnLogOut = Selector('#sidebar_signout')
    }


}
export default MisQtForm