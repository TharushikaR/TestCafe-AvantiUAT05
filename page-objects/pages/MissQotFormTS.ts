import { Selector,t} from "testcafe";

class MissQotFormTS {

        txtUserName: Selector= Selector('#username')
        txtPassword: Selector = Selector('#password')
        btnSignIn: Selector = Selector('#signInBtn')
        pgMyAcc: Selector = Selector('#header_home')
        linkMYQuotes: Selector = Selector('span').withText('My Quotes')
        linkToAMQ: Selector = Selector('button').withText('Add a missing quote')
        txtMsg: Selector = Selector('#question')
        btnSendMsg: Selector = Selector('#contactSubmitBtn')
        btnLogOut: Selector = Selector('#sidebar_signout')

    async setUName(t: TestController){
        await t.typeText(this.txtUserName,"livetesttharushiunification@gmail.com",{paste:true})
    }
    async setPwd(t: TestController){
        await t.typeText(this.txtPassword,"Rathnayaka@1995",{paste:true})
    }

    async clickSignIn(t: TestController){
        await t.click(this.btnSignIn)
    }

    async checkMyAccPg(t: TestController){
        await t.expect(this.pgMyAcc.exists).ok()
    }

    async clickMyQT(t: TestController){
        await t.click(this.linkMYQuotes)
    }

    async clickMisQT(t: TestController){
        await t.click(this.linkToAMQ)
    }

    async typeQut(t: TestController){
        await t.typeText(this.txtMsg,"Test Quote is missing",{paste: true})
    }

    async clickSendMsg(t: TestController){
        await t.click(this.btnSendMsg)
    }
    async clickLogout(t: TestController){
        await t.click(this.btnLogOut)
    }


}
export default MissQotFormTS