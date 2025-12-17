
const form = document.querySelector("form");

const firstName = document.getElementById("Firstname");
const lastName = document.getElementById("Lastname");
const email = document.getElementById("eMail");
const message = document.getElementById("Message");
//const phone = document.getElementById("telNr");

const submitBtn = document.getElementById("subBtn");

//Display error message below the field
function showError(input, message){
    clearError(input);

    const error = document.createElement("small");
    error.classList.add("error-text");
    error.textContent = message;

    input.classList.add("error");
    input.parentElement.appendChild(error);
}

//Remove error message when field is valid
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

    if(input.value.length === 0){
        showError(input, "Can not be empty!")
        return false;
    }
    else if(!regex.test(input.value.trim())) {
        showError(input, "Only letters allowed!");
        return false;
    }
    

    clearError(input);
    input.classList.add("valid");
    return true;
}

//Check if email format is valid (contains @ and domain)
function validateEmail(){

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regex.test(email.value.trim())) {
        showError(email, "Enter a valid email address!");
        return false;
    }

    clearError(email);
    email.classList.add("valid");
    return true;
}


//Check if message is at least 20 characters long
function validateMessage() {

    if(message.value.trim().length < 20){
        showError(message, "Your message must contain at least 20 characters.");
        return false;
    }

    message.classList.add("valid");
    return true;
}


const counter = document.createElement("small");
counter.id = "charCounter";
counter.style.display = "block";
counter.style.marginTop = "5px";
message.parentElement.appendChild(counter);

function updateCounter() {

    const length = message.value.length;
    counter.textContent = `${length} / 20 characters`;
    
    if(length < 20) {
        counter.style.color = "red";
    } 
    else {
        counter.style.color = "green";
    }
}

message.addEventListener("input", updateCounter);

updateCounter();

//Clear all form fields after successful submission
function clearForm() {
    form.reset();
    [firstName, lastName, email, message].forEach(input => {
        clearError(input);
        input.classList.remove("valid");
    });
    updateCounter();
}

form.addEventListener("submit", function (event) {
    
    event.preventDefault(); //prevent page loading

    let valid = validateName(firstName) && 
                validateName(lastName) &&
                validateEmail() &&
                validateMessage();

    if(!valid) return;

    const successMsg = document.createElement("p");
    successMsg.classList.add("success-message");
    successMsg.textContent = `Thank you ${firstName.value}! I will contact you soon!`;

    form.appendChild(successMsg);

    setTimeout(() => successMsg.remove(), 3000); //disapear after 3sek

    clearForm();
});