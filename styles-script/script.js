const form = document.querySelector("form")
const firstName = document.querySelector("#first")
const lastName = document.querySelector("#last")
const email = document.querySelector("#email")
const phone = document.querySelector("#phone")
const password = document.querySelector("#password")
const confirmPassword = document.querySelector("#confirmPassword")

// event listeners for validation and some effects
firstName.addEventListener("input", check)
firstName.addEventListener("blur", check)
lastName.addEventListener("input", check)
lastName.addEventListener("blur", check)
email.addEventListener("input", check)
email.addEventListener("blur", check)
phone.addEventListener("input", check)
phone.addEventListener("blur", check)
password.addEventListener("input", check)
password.addEventListener("blur", check)
confirmPassword.addEventListener("input", confirm)
confirmPassword.addEventListener("blur", confirm)
form.addEventListener("submit", (e) => {
    e.preventDefault() //to prevent default form submission
    const test = isValid.every(input => input === true) //checks if all inputs are valid to our criterion
    if (test) {
        form.submit()
    }
})

let isValid = [] // flag for multiple inputs
confirmPassword.disabled = true // no point to keep it active without having something to confirm, that's my opinion idk.

function check(e) {  //main function for validation and CSS effects
    e.preventDefault()
    const inputElement = e.target // current input
    const card = inputElement.closest(".card")
    const span = card.querySelector("span") //sibling span element
    let reg = / / //place holder reg variable
    let i //flag index
    switch (inputElement.id) { //switch case for the reg and the flag index
        case "first":
            reg = /^[a-z]{2,}$/gi 
            i = 0
            break;
        case "last":
            reg = /^[a-z]{2,}$/gi
            i = 1
            break;
        case "email":
            reg = /^(?=.{1,256})(?=.{1,64}@.{1,255}$)(?:(?![_.-])[a-zA-Z0-9._%+-]+(?:(?<![_.-])|(?=[_.-]))?)+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ //RFC 5322 Compliant Email Regex, found that ugly on google
            i = 2
            break;
        case "phone":
            reg = /^\+?[1-9]\d{0,14}$|^([ -]?\d{1,4}){0,3}$|^(1\s?)?(\(\d{3}\)|\d{3})[\s-]?\d{3}[\s-]?\d{4}$/  // thats another ugly from another project i did earlier
            i = 3
            break;
        case "password":
            reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/ //we got used to that 
            if (inputElement.value !== "") {
                confirmPassword.disabled = false  //now we can activate it 
            }
            i = 4
            break;
        default:
            break;
    }
    if (e.type === "input") { //checking for the event type
        span.style.color = `whitesmoke` //changing color from transparent to color for specific input
        if (inputElement.value.length > 2) {
            if (reg.test(inputElement.value)) {
                inputElement.style.boxShadow = `inset 0px -30px 0px 0px rgba(0, 255, 0, 0.2), 0px 3px 0px 0px rgb(71, 255, 47)`
                inputElement.style.borderBottom = `1px solid rgb(71, 255, 47)`
                span.style.color = `rgb(71, 255, 47)`
                isValid[i] = true  //setting specific value inside the flag holder
            } else {
                inputElement.style.boxShadow = `inset 0px -30px 0px 0px rgba(255, 0, 0, 0.2), 0px 3px 0px 0px red`
                inputElement.style.borderBottom = `1px solid red`
                span.style.color = `tomato`
                isValid[i] = false
            }
        } else {
            inputElement.style.boxShadow = ``
            inputElement.style.borderBottom = ``
        }
    } else if (e.type === "blur") { // same as above but after going out of focus
        span.style.color = `transparent`
        if (inputElement.value.length > 2) {
            if (reg.test(inputElement.value)) {
                inputElement.style.boxShadow = ``
                inputElement.style.borderBottom = ``
            } else {
                span.style.color = `tomato`
                inputElement.style.boxShadow = `inset 0px -30px 0px 0px rgba(255, 0, 0, 0.2), 0px 3px 0px 0px red`
                inputElement.style.borderBottom = `1px solid red`
            }
        }
    }
}

function confirm(e) { // those some effects are killin me, optimization needed to get rid of this section, although it works fine 
    e.preventDefault()
    const inputElement = e.target
    const card = inputElement.closest(".card")
    const span = card.querySelector("span")
    if (e.type === "input") {
        if (inputElement.value.length > 2) {
            span.style.color = `whitesmoke`
            if (password.value === confirmPassword.value) {
                inputElement.style.boxShadow = `inset 0px -30px 0px 0px rgba(0, 255, 0, 0.2), 0px 3px 0px 0px rgb(71, 255, 47)`
                inputElement.style.borderBottom = `1px solid rgb(71, 255, 47)`
                span.textContent = `** Password match **`
                isValid[5] = true
            } else {
                inputElement.style.boxShadow = `inset 0px -30px 0px 0px rgba(255, 0, 0, 0.2), 0px 3px 0px 0px red`
                inputElement.style.borderBottom = `1px solid red`
                span.textContent = `** Password doesn't match **`
                isValid[5] = false
            }
        } else {
            inputElement.style.boxShadow = ``
            inputElement.style.borderBottom = ``
        }
    } else if (e.type === "blur") {
        span.style.color = `transparent`
        if (inputElement.value.length > 2) {
            if (password.value === confirmPassword.value) {
                inputElement.style.boxShadow = ``
                inputElement.style.borderBottom = ``
            } else {
                span.style.color = `whitesmoke`
                span.textContent = `** Password doesn't match **`
                inputElement.style.boxShadow = `inset 0px -30px 0px 0px rgba(255, 0, 0, 0.2), 0px 3px 0px 0px red`
                inputElement.style.borderBottom = `1px solid red`
            }
        }
    }
} //thanks for reading :*.