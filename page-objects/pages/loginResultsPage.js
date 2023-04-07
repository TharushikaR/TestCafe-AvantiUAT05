import { Selector } from "testcafe";

class loginResultsPage{
    constructor(){
        this.errorMsg=Selector('#signinErrorMessage').innerText
    }
}

export default loginResultsPage