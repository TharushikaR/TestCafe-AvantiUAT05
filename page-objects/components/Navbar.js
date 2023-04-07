import { Selector,t } from "testcafe"
class Navbar{
    constructor(){
        //selectors
        this.txtUserName = Selector('#username')
        this.txtPassword = Selector('#password')
        this.btnSignIn = Selector('#signInBtn')
        this.pgMyAcc = Selector('#header_home')
        this.btnLogOut = Selector('#sidebar_signout')
        this.notPgMyAcc=Selector('#card-header')
        this.errorMsg=Selector('#signinErrorMessage').innerText  
    }

    async loginValidUName(text){
        await t.typeText(this.txtUserName,text,{paste: true, replace:true})
    }

   async loginInvalidMethod(){
    await t.typeText(this.txtUserName,'uat20intervest@gmail.com',{paste: true, replace:true})
    await t.typeText(this.txtPassword,'Rathnayaka@1995',{paste: true, replace:true})
    await t.click(btnSignIn)
    await t.expect(notPgMyAcc.exists).notOk()
    await t.expect(errorMsg).contains('The email/password combination you have entered does not match any of our records, please try again. You can create an account here if you don\'t have an account yet.')
   }
}

export default Navbar