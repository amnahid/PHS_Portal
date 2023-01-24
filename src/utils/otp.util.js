// functionality scaffolding
const otpHandler = {}

// otp store
const otpStore = [] // Sample OTP data: {"otp": 458973,"user": "User Name"}

// generate otp
otpHandler.generate = async user => {
    let isOTPValid = undefined // variable to set that the OTP exist or not
    let indexOfOTP = undefined // variable to set index of an existed otp
    const otp = Math.floor(Math.random() * (999999 - 111111 + 1)) + 111111
    // matching generated OTP with existed OTPs in otpStore
    for await (let otpData of otpStore) {
        if (otpData.user === user) {
            indexOfOTP = otpStore.indexOf(otpData)
            isOTPValid = false
            break
        } else {
            isOTPValid = true
        }
    }
    if (isOTPValid) { // OTP data adding on otpStore if OTP isn't exist
        otpStore.push({
            otp,
            user
        })
        indexOfOTP = await otpStore.findIndex(data => data.user === user && data.otp === otp)
        // removing OTP from otpStore after a certain time
        setTimeout(() => {
            otpStore.splice(indexOfOTP, indexOfOTP)

            console.log(otpStore);
        }, 86400000) // 24hrs
        console.log(otp)
    } else { // returning otp if otp exist
        return otpStore[indexOfOTP].otp
    }
}

// remove OTP (its need to call when a otp used)
otpHandler.removeOTP = async otp => {
    const indexOfOTP = await otpStore.findIndex(data => data.user === user && data.otp === otp)
    otpStore.splice(indexOfOTP, indexOfOTP)
}

module.exports = otpHandler