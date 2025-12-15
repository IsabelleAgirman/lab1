
const form = document.querySelector("form");

const firstName = document.getElementById("Firstname");
const lastName = document.getElementById("Lastname");
const email = document.getElementById("eMail");
const message = document.getElementById("Message");

const submitBtn = document.getElementById("subBtn");

function showError(input, message){
    clearError(input);

    const error = document.createElement("small");
    error.classList.add("error-text");
    error.textContent = message;

    input.classList.add("error");
    input.parentElement.appendChild(error);
}

function clearError(input){
    input.classList.remove("error");
    input.classList.remove("valid");

    const errMessage = input.parentElement.querySelector(".error-text");
    if (errMessage){
        errMessage.remove();
    }
}


//Check if name contains only letters (no numbers or special characters)
function validateName(input){
    
    const regex =  /^[A-Za-zÅÄÖåäö]+$/;

    console.log("test0");
    if(input.value.length === 0){
        showError(input, "Can not be empty!")
        return false;
    }
    else if(!regex.test(input.value.trim())) {
        console.log("test1");
        showError(input, "Only letters allowed!");
        console.log("test2");
        return false;
    }
    

    clearError(input);
    input.classList.add("valid");
    return true;
}

//Check if email format is valid (contains @ and domain)
function validateEmail(){
    console.log("email0");
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    console.log("email1");
    if (!regex.test(email.value.trim())) {

        console.log("email2");
        showError(email, "Enter a valid email address!");
        return false;
    }

    console.log("email3");
    clearError(email);
    email.classList.add("valid");
    console.log("email4");
    return true;
}


//Check if message is at least 20 characters long
//validateMessage()


//Display error message below the field
//showError()


//Remove error message when field is valid
//clearError()


//Clear all form fields after successful submission
//clearForm()

form.addEventListener("submit", function (event) {
    
    event.preventDefault(); //prevent page loading

    let valid = validateName(firstName) & 
                validateName(lastName) &
                validateEmail();

    if(valid) return;
})