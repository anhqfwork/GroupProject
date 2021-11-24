
const validateEmail = (email) => {
    const emailRegex = /^(([^<>()\[\]\\.,:\s@"]+(\.[^<>()\[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    if(emailRegex.test(email)){
        return true
    }else{
        return false
    }
}

const validatePasswordComplex = (password) => {
    //Should have 1 lowercase letter, 1 uppercase letter, 1 number, 1 special character and be at least 8 characters long
    const passwordRegex = /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/
    if(passwordRegex.test(password)){
        return true
    }else{
        return false
    }
}

const validateRegister=(email, password, username, name)=>{
    error={}
    if(!validateEmail(email)){
        error.error="Please enter valid email"
        return error
    }
    if(!validatePasswordComplex(password)){
        error.password="Password should have 1 lowercase letter, 1 uppercase letter, 1 number, 1 special character and be at least 8 characters long"
        return error
    }
    if(!username || !email || !password || !name){
        error.blank="Please enter all the field"
    }
    return error
}

module.exports = { validateEmail, validatePasswordComplex, validateRegister}

