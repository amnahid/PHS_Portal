const mail = require("./mail.util")

// functionality scaffolding
const otpManager = {}

// otp store
const otpStore = [] // Sample OTP data: {"otp": 458973,"user": "User Name"}

//  otp validator
function otpValidator(user) {
    // matching generated OTP with existed OTPs in otpStore
    for (let otpData of otpStore) {
        if (otpData.user === user) {
            return {
                indexOfOTP: otpStore.indexOf(otpData),
                isOTPValid: false
            }
        }
    }
    return {
        isOTPValid: true
    }
}

// generate otp
otpManager.generate = async user => {
    const otp = Math.floor(Math.random() * (999999 - 111111 + 1)) + 111111
    const validOTP = await otpValidator(user) // variable to set that the OTP exist or not

    if (validOTP.isOTPValid) { // OTP data adding on otpStore if OTP isn't exist
        otpStore.push({
            otp,
            user // must have to be email
        })
        let indexOfOTP = await otpStore.findIndex(data => data.user === user && data.otp === otp)
        // removing OTP from otpStore after a certain time
        setTimeout(() => {
            otpStore.splice(indexOfOTP, indexOfOTP)
        }, 86400000) // 24hrs
        // sending otp to user
        await mail(user, `Your OTP code is: ${otp}`, "PHS Portal OTP CODE")
        return otp
    } else { // returning otp if otp exist
        return otpStore[validOTP.indexOfOTP].otp
    }
}

// remove OTP (its need to call when a otp used)
otpManager.removeOTP = async otp => {
    const indexOfOTP = await otpStore.findIndex(data => data.user === user && data.otp === otp)
    otpStore.splice(indexOfOTP, indexOfOTP)
}

module.exports = otpManager 