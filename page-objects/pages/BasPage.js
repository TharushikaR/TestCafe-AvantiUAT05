import { Selector,t } from "testcafe"

class BasPage{
    async waitFor(milliseconds){
        await t.wait(milliseconds)
    }

    async setTestSpeed(speedLevel){
        await t.setTestSpeed(speedLevel)
    }
}

export default BasPage