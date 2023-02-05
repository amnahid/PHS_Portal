const mail = require("./mail.util")

// functionality scaffolding
const otpManager = {}

// otp store
const otpStore = [{"otp": 458973,"user": "nahidshikder60@gmail.com"}] // Sample OTP data: {"otp": 458973,"user": "User Email"}

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

// find index of an OTP
async function getIndexOfOTP (user, otp) {
    return otpStore.findIndex(data => data.user === user && data.otp === otp)
}

// remove OTP (its need to call when a otp used)
async function removeOTP (indexOfOTP) {
    indexOfOTP = await indexOfOTP
    otpStore.splice(indexOfOTP, indexOfOTP)
    // console.log(otpStore)
    console.log(otpStore, "otp removed");
}

// generate otp
otpManager.generate = async user => {
    const otp = Math.floor(Math.random() * (999999 - 111111 + 1)) + 111111
    const validOTP = await otpValidator(user) // variable to set that the OTP exist or not

    if (validOTP.isOTPValid) { // OTP data adding on otpStore if OTP isn't exist
        console.log(otpStore, "before otp pushed");
        otpStore.push({
            otp,
            user // must have to be email
        })
        console.log(otpStore, "otp pushed");
        // removing OTP from otpStore after a certain time
        setTimeout(() => {
            removeOTP(getIndexOfOTP(user,otp))
        }, 86400000) // 24hrs
        // sending otp to user
        mail(user, `Your OTP code is: ${otp}`, "PHS Portal OTP CODE")
        return otp
    } else { // returning otp if otp exist
        return otpStore[validOTP.indexOfOTP].otp
    }
}

// validate OTP
otpManager.verify = async (user, otp) => {
    const indexOfOTP = await getIndexOfOTP(user, otp)
    if (indexOfOTP !== -1) {
        removeOTP(getIndexOfOTP(user,otp))
        return true
    } else {
        return false
    }

}

module.exports = otpManager 