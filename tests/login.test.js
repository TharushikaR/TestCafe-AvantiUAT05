import { Selector } from 'testcafe';
import xPathToCss from 'xpath-to-css';
import Navbar from '../page-objects/components/Navbar';
import loginResultsPage from '../page-objects/pages/loginResultsPage';
import registerPage from '../page-objects/pages/registerPage';
import forgotPwd from '../page-objects/pages/forgotPwd';
import MisQtForm from '../page-objects/pages/MisQtForm';
//import MissQotFormTS from '../page-objects/pages/MissQotFormTS';


const navbar=new Navbar()
const login_Result_Page=new loginResultsPage()
const reg_Page=new registerPage()
const forog_Page=new forgotPwd()
const misQT_Page=new MisQtForm()
//const misQT_TS_Page=new MissQotFormTS()


//prettier-ignore
fixture `MyAVN Tests`
    .page ('https://uat05avn.intertrav.co.uk/myavanti/signin')
    .before(async t => {
        //Test setup goes here //await runDatabaseReset() //await seedTestData()
    })
    .beforeEach(async t => {
        await t.setTestSpeed(1)
        await t.maximizeWindow()
        //runs before each test
    })
    .after(async t =>{
        //Cleaning test data //logging and sending data to monitoring systems
    })
    .afterEach(async t => {
        //runs after each test
    });

test('01-User can login with valid credintials',async t => {
        navbar.loginValidUName('livetesttharushiunification@gmail.com')
        await t.typeText(navbar.txtPassword,"Rathnayaka@1995",{paste: true})
        await t.click(navbar.btnSignIn)

        await t.expect(navbar.pgMyAcc.exists).ok()
        await t.click(navbar.btnLogOut)
})

test('02-User cannot login with Invalid credintials',async t => {
    navbar.loginInvalidMethod()
})

test('03-User cannot login with Valid Email & Invalid Password',async t => {
    const txtUserName = Selector('#username')
    const txtPassword = Selector('#password')
    const btnSignIn = Selector('#signInBtn')
    const pgMyAcc = Selector('#header_home')

    await t.typeText(txtUserName,"livetesttharushiunification@gmail.com",{paste: true})
    await t.typeText(txtPassword,"Rathnayaka#1995",{paste: true})
    await t.click(btnSignIn)

    if(!(pgMyAcc.exists)){
        await t.expect(login_Result_Page.errorMsg.innerText).contains('The email/password combination you have entered does not match any of our records, please try again. 4 attempts remaining.')
    }
    else{}
})

test('04-User cannot login with Invalid Email & Valid Password',async t => {
    const txtUserName = Selector('#username')
    const txtPassword = Selector('#password')
    const btnSignIn = Selector('#signInBtn')
    const pgMyAcc = Selector('#header_home')
    const errorMsg = Selector('#signinErrorMessage').innerText

    await t.typeText(txtUserName,"uat23intervest@gmail.com",{paste: true})
    await t.typeText(txtPassword,"Rathnayaka@1995",{paste: true})
    await t.click(btnSignIn)

    if(!(pgMyAcc.exists)){
        await t.expect(errorMsg).contains('The email/password combination you have entered does not match any of our records, please try again. You can create an account here if you don\'t have an account yet.')
    }
    else{
    }
})

test('05-User cannot login with Valid Email & Empty Password',async t => {
    const txtUserName = Selector('#username')
    const txtPassword = Selector('#password')
    const btnSignIn = Selector('#signInBtn')
    const errorMsgPswd = Selector('#passwordError').innerText

    await t.typeText(txtUserName,"uat23intervest@gmail.com",{paste: true})
    await t.click(btnSignIn)
    if(!(txtPassword.exists)){
    await t.expect(errorMsgPswd).contains('Please enter a password')
    } else{}
})

test('06-User cannot login with Empty Email & Valid Password',async t => {
    const txtUserName = Selector('#username')
    const txtPassword = Selector('#password')
    const btnSignIn = Selector('#signInBtn')
    const errorMsgUName = Selector('#userNameError').innerText

    await t.typeText(txtPassword,"Rathnayaka@1995",{paste: true})
    await t.click(btnSignIn)
    if(!(txtUserName.exists)){
    await t.expect(errorMsgUName).contains('Please enter an email address')
    } else{}
})

test('07-User forgot Password',async t => {
    const errorMsg = Selector('.card-header').innerText

    await t.click(forog_Page.linkToFP)
    await t.typeText(forog_Page.txtUserEmail,"livetesttharushiunification@gmail.com",{paste: true})
    await t.click(forog_Page.btnReset)

    await t.expect(errorMsg).contains('Password Reset Email Sent')

    //await t.pressKey('Enter')
}).skipJsErrors();

test('08-Create My Account',async t => {
    //const successMsg = Selector('div').innerText
    //await t.expect(successMsg).contains('We have sent a verification email to')

    await t.click(reg_Page.linkToAcc)
    reg_Page.setEmail('uat23intervest@gmail.com')
    reg_Page.setCEmail('uat23intervest@gmail.com')
    reg_Page.setPwd('Rathnayaka@1995')
    await t.click(reg_Page.btnCreate)

}).skipJsErrors();

test('09-Fill Missing Quote Form-JavaScript',async t => {
    const linkSubject = Selector('#contactSubject')
    const qtyOption = linkSubject.find('option')
    const cnfmMsg = Selector('.alert.alert-success').innerText

    //misQT_Page.waitFor(2000)
    await t.typeText(misQT_Page.txtUserName,"livetesttharushiunification@gmail.com",{paste: true})
    await t.typeText(misQT_Page.txtPassword,"Rathnayaka@1995",{paste: true})
    await t.click(misQT_Page.btnSignIn)
    await t.expect(misQT_Page.pgMyAcc.exists).ok()
    await t.click(misQT_Page.linkMYQuotes)
    await t.click(misQT_Page.linkToAMQ)
    await t
    .click(linkSubject)
    .click(qtyOption.withText('Add a missing policy or quote'))
    await t.typeText(misQT_Page.txtMsg,"Test Quote is missing",{paste: true})
    await t.click(misQT_Page.btnSendMsg)
    await t.expect(cnfmMsg).contains('Thank you for contacting Avanti about your account with us. Due to the Coronavirus (Covid-19) pandemic, we\'re working differently to best support our people and our customers and we aim to respond to your query within 5 days.')
    await t.click(misQT_Page.btnLogOut)
}).skipJsErrors();

test.skip('09-Fill Missing Quote Form-TypeScript',async t => {
    const linkSubject = Selector('#contactSubject')
    const qtyOption = linkSubject.find('option')
    const cnfmMsg = Selector('.alert.alert-success').innerText

    misQT_TS_Page.setUName()
    misQT_TS_Page.setPwd()
    misQT_TS_Page.clickSignIn()
    misQT_TS_Page.checkMyAccPg()
    misQT_TS_Page.clickMyQT()
    misQT_TS_Page.clickMisQT()
    await t
    .click(linkSubject)
    .click(qtyOption.withText('Add a missing policy or quote'))
    misQT_TS_Page.typeQut()
    misQT_TS_Page.clickSendMsg()
    await t.expect(cnfmMsg).contains('Thank you for contacting Avanti about your account with us. Due to the Coronavirus (Covid-19) pandemic, we\'re working differently to best support our people and our customers and we aim to respond to your query within 5 days.')
    misQT_TS_Page.clickLogout()
}).skipJsErrors();

test.skip('10- Search Option-ST',async t => {
    const txtUserName = Selector('#username')
    const txtPassword = Selector('#password')
    const btnSignIn = Selector('#signInBtn')
    const pgMyAcc = Selector('#header_home')
    const linkMYQuotes = Selector('a').withText('Get A Quote')

    const typePkg = Selector('#type-st')
    const typeCruise = Selector('#cruise-yes')
    const trTo = Selector('#countrySearchInput')

    const dateDept = Selector('#datepicker-departure').nth(3)
    const input     = dateDept.find('td')
    const dateCell  = Selector('a').withText('25')
    const dateRet = Selector('#datepicker-return-text')

    const typeCover = Selector('#cover-individual-btn')
    const ageTraveller = Selector('#traveler_age_1')
    const btnNext = Selector('#btnSubmit')
    const selectedCountry = Selector('quote-expand').withText('Destination: Australia')

    await t.typeText(txtUserName,"livetesttharushiunification@gmail.com",{paste: true})
    await t.typeText(txtPassword,"Rathnayaka@1995",{paste: true})
    await t.click(btnSignIn)

    await t.expect(pgMyAcc.exists).ok()
    await t.click(linkMYQuotes)

    await t.click(typePkg)
    await t.click(typeCruise)
    await t.typeText(trTo,"Australia",{paste: true})


    await t
        .click(input)
        .click(dateCell)
        .expect(input.value).eql('04/25/2023')

 

    //await t.click(typeCover)
    //await t.typeText(ageTraveller,"55",{paste: true})
    //await t.click(btnNext)

}).skipJsErrors();


test('10- Search Option-AMT',async t => {
    const txtUserName = Selector('#username')
    const txtPassword = Selector('#password')
    const btnSignIn = Selector('#signInBtn')
    const pgMyAcc = Selector('#header_home')
    const linkMYQuotes = Selector('a').withText('Get A Quote')

    const typePkg = Selector('span').withText('Annual Multi Trip')
    const typeCruise = Selector('#cruise-yes')
    const trTo = Selector('#toLocationAnnual')
    const trOption = trTo.find('option')
    const deptText = Selector('#datepicker-departure-text')
    
    const typeCover = Selector('#cover-individual-btn')
    const ageTraveller = Selector('#traveler_age_1')
    const btnNext = Selector('#btnSubmit')
   // const selectedCountry = Selector('group quote-summary').innerText

    await t.typeText(txtUserName,"livetesttharushiunification@gmail.com",{paste: true})
    await t.typeText(txtPassword,"Rathnayaka@1995",{paste: true})
    await t.click(btnSignIn)

    await t.expect(pgMyAcc.exists).ok()
    await t.click(linkMYQuotes)

    await t.click(typePkg)
    await t.click(typeCruise)
    await t
    .click(trTo)
    .click(trOption.withText('Worldwide: All Countries'))

    await t.typeText(deptText,"30/04/2023",{paste: true})

    await t.click(typeCover)
    await t.typeText(ageTraveller,"55",{paste: true})
    await t.click(btnNext)

   // await t.expect(selectedCountry).contains('Destination: Worldwide: All Countries')
}).skipJsErrors();

test('11- Payment',async t => {
    //login
    const txtUserName = Selector('#username')
    const txtPassword = Selector('#password')
    const btnSignIn = Selector('#signInBtn')
    const pgMyAcc = Selector('#header_home')
    const linkMYQuotes = Selector('a').withText('Get A Quote')

    //1st page
    const typePkg = Selector('span').withText('Annual Multi Trip')
    const typeCruise = Selector('#cruise-yes')
    const trTo = Selector('#toLocationAnnual')
    const trOption = trTo.find('option')
    const deptText = Selector('#datepicker-departure-text')
    const typeCover = Selector('#cover-individual-btn')
    const ageTraveller = Selector('#traveler_age_1')
    const btnNext = Selector('#btnSubmit')

    //2nd page
    const chkAccept = Selector('#checkbox-accept-label')
    const titleTraveller = Selector('#traveler_title_0')
    const trOption_2 = titleTraveller.find('option')
    const fnameTraveller = Selector('#traveler_first_name_0')
    const lnameTraveller = Selector('#traveler_last_name_0')
    const chkMedical = Selector('#medical-no')
    const btnNext_2 = Selector('input').withAttribute('value','Next')
    const btnMedSub = Selector('#medical_dec_submit_btn')

    //3rd page
    const btnSelPkg = Selector('#ANNUAL_MULTI_TRIP_DELUXE_BTN')
    const btnCont = Selector('#OEContinueBtn')
    const btnPPCont = Selector('#cancellationCoverChangeSubmit')

    //4th page
    const chkPmtType = Selector('label').withText('Pay In Full')
    const chkAccept_1 = Selector('#user-declaration')
    const chkAccept_2 = Selector('#user-accept')
    const btnMkPmt = Selector('#makePayment')

    //payment page
    const txtCardHolderName = Selector('#cardholderName')
    const txtCardNumber = Selector('#cardNumber')

    //const xpathExpMonth=`'//select[@id='expiryMonth']'`
    //const selExpMonth = xPathToCss(xpathExpMonth)
    //const expOption_1 = selExpMonth.find('option')//.withAttribute('value','12')
    //console.log(selExpMonth)

   // const xpathExpYr=`'//select[@id='expiryYear']'`
    //const selExpYr = xPathToCss(xpathExpYr)
    //const expOption_2 = selExpYr.find('option')//.withAttribute('value','30')
    //console.log(selExpYr)

    const txtCSC = Selector('#csc')
    const btnSubPmt = Selector('#btnSubmit')

    //confirm
    const cnfmPmtMsg = Selector('card-title').innerText

    //=================================================================================

    //login
    await t.typeText(txtUserName,"livetesttharushiunification@gmail.com",{paste: true})
    await t.typeText(txtPassword,"Rathnayaka@1995",{paste: true})
    await t.click(btnSignIn)

    await t.expect(pgMyAcc.exists).ok()
    await t.click(linkMYQuotes)

    //1st page
    await t.click(typePkg)
    await t.click(typeCruise)
    await t
    .click(trTo)
    .click(trOption.withText('Worldwide: All Countries'))
    await t.typeText(deptText,"30/04/2023",{paste: true})
    await t.click(typeCover)
    await t.typeText(ageTraveller,"55",{paste: true})
    await t.click(btnNext)

    //2nd page
    await t.click(chkAccept)
    await t
    .click(titleTraveller)
    .click(trOption_2.withText('Mr'))
    await t.typeText(fnameTraveller,"Test",{paste: true})
    await t.typeText(lnameTraveller,"Quote",{paste: true})
    await t.click(chkMedical)
    await t.click(btnNext_2)
    await t.click(btnMedSub)

    //3rd page
    await t.click(btnSelPkg)
    await t.click(btnCont)
    await t.click(btnPPCont)

    //4th page
    await t.click(chkPmtType)
    await t.click(chkAccept_1)
    await t.click(chkAccept_2)
    await t.click(btnMkPmt)

    //payment page
    await t.typeText(txtCardHolderName,"Test Card",{paste: true})
    await t.typeText(txtCardNumber,"4111111111111111",{paste: true})



    const xpathExpMonth=`'//select[@id='expiryMonth']'`
    const selExpMonth = xPathToCss(xpathExpMonth)
    //const expMOption = selExpMonth.find('option')
    console.log(selExpMonth)

    const xpathExpYr=`'//select[@id='expiryYear']'`
    const selExpYr = xPathToCss(xpathExpYr)
    //const expYOption = selExpYr.find('option')
    console.log(selExpYr)

    await t
        //.click(selExpMonth).find('value','12')
        .typeText(selExpMonth,"5",{paste: true})
       // .click(expMOption.withText('12'))

    await t
        //.click(selExpYr).find('value','30')
        .typeText(selExpYr,"25",{paste: true})
        //.click(expYOption.withText('30'))




    
    await t.typeText(txtCSC,"111",{paste: true})
    await t.click(btnSubPmt)

    //confirm
    await t.expect(cnfmPmtMsg).contains('Thank you, your payment has been processed successfully')

}).skipJsErrors();