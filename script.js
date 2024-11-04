function validationForm() {
  const form = document.forms["myForm"];
  const username = form["username"];
  const email = form["email"];
  const password = form["password"];
  const confirmPassword = form["confirmPassword"];

  clearErrors();

  let isValid = true;

  if (username.value.length < 3) {
    showError(username, "Username must be at least 3 characters long");
    isValid = false;
  }

  const emailValidation = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/gm;
  if (!emailValidation.test(email.value)) {
    showError(email, "Please enter a valid email address.");
    isValid = false;
  }

  if (password.value.length < 6) {
    showError(password, "Password must be at least 6 characters long.");
    isValid = false;
  }

  if (password.value !== confirmPassword.value) {
    showError(confirmPassword, "Passwords do not match.");
    isValid = false;
  }

  if (isValid) {
    console.log("Form data is valid:");
    const formData = {
      username: username.value,
      email: email.value,
      password: password.value,
    };
    localStorage.setItem("formData", JSON.stringify(formData));
  }
  form.reset();
  return isValid;
}

function showError(inputField, message) {
  inputField.style.border = "2px solid red";

  const errorMessage = document.createElement("div");
  errorMessage.className = "error-message";
  errorMessage.style.color = "red";
  errorMessage.style.fontSize = "0.9em";
  errorMessage.innerText = message;

  inputField.parentNode.insertBefore(errorMessage, inputField.nextSibling);
}

function clearErrors() {
  const inputs = document.querySelectorAll(
    "input[type='text'], input[type='password']"
  );
  inputs.forEach((input) => {
    input.style.border = "";
    const errorMessages = input.parentNode.querySelectorAll(".error-message");
    errorMessages.forEach((msg) => msg.remove());
  });
}
