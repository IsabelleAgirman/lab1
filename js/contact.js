
const form = document.querySelector("form");
const fieldset =document.querySelector("fieldset");

const firstName = document.getElementById("Firstname");
const lastName = document.getElementById("Lastname");
const email = document.getElementById("eMail");
const message = document.getElementById("Message");
const subject = document.getElementById("Subject");
const phone = document.getElementById("telNr");


//Display error message below the field
function showError(input, message){
    clearError(input); //remove old error-messages

    const error = document.createElement("small");
    error.classList.add("error-text");
    error.textContent = message;

    input.classList.add("error");
    input.parentElement.appendChild(error);
}

//Clear error/valid 
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
    
    const regex =  /^[A-Za-zÅÄÖåäö]+$/; //allow letters a-ö

    //cheack that name is not empty
    if(input.value.length === 0){
        showError(input, "Can not be empty!")
        return false;
    }
    else if(!regex.test(input.value.trim())) {
        showError(input, "Only letters allowed!");
        return false;
    }
    
    //If everything is correct, clear error and mark as valid
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

    clearError(message);
    message.classList.add("valid");
    return true;
}


const counter = document.createElement("small");
counter.id = "charCounter";
message.parentElement.appendChild(counter); //Place counter under textarea

function updateCounter() {

    const length = message.value.length; //Get numner of characters in textarea
    counter.textContent = `${length} / 20 characters`; //Show number of characters
    
    if(length < 20) {
        counter.style.color = "red";
    } 
    else {
        counter.style.color = "green";
    }
}

//Run func every time user types in textarea
message.addEventListener("input", updateCounter);

//Run directly on page load so counter is displayed from the beginning
updateCounter();

//Clear all form fields and resets error/valid status
function clearForm() {
    form.reset();
    [firstName, lastName, email, message].forEach(input => {
        clearError(input);
        input.classList.remove("valid");
    });

    //Wait a little before the counter is updated (to allow time for the reset to run)
    setTimeout(() => {
       updateCounter(); 
    }, 100);
    
}

form.addEventListener("submit", function (event) {
    
    event.preventDefault(); //prevent page loading

    //Validate each field
    const fnameValid = validateName(firstName);
    const lnameValid = validateName(lastName);
    const emailValid = validateEmail();
    const messageValid = validateMessage();

    const valid = fnameValid && lnameValid && emailValid && messageValid; //is true if all is valid

    if(!valid) return; //Cancel submit if something is wrong

    //mailto 
    window.location.href = `mailto:isabelle.agirman0002@stud.hkr.se?subject=${subject.value}
                            &body=${encodeURIComponent(message.value)} %0D%0A
                            Name: ${encodeURIComponent(firstName.value)} ${encodeURIComponent(lastName.value)} %0D%0A
                            Tel: ${phone.value}`;

    const successMsg = document.createElement("p");
    successMsg.classList.add("success-message");
    successMsg.textContent = `Thank you ${firstName.value}! I will contact you soon!`;

    fieldset.appendChild(successMsg);

    setTimeout(() => successMsg.remove(), 3000); //disapear after 3sek

    clearForm();
});

//Clear form when user click on reset-button
form.addEventListener("reset", function(event){
    clearForm();    

});