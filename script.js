const validations = {
  username: {
    validate: (value) => {
      if (value.length === 0) return "Username is required";
      if (value.length < 3)
        return "Username must be at least 3 characters long";
      if (!/^[a-zA-Z0-9_]+$/.test(value))
        return "Username can only contain letters, numbers, and underscores";
      if (isUsernameTaken(value)) return "This username is already taken";
      return "";
    },
  },
  email: {
    validate: (value) => {
      if (value.length === 0) return "Email is required";
      if (!/^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/g.test(value))
        return "Please enter a valid email address";
      if (isEmailTaken(value)) return "This email is already registered";
      return "";
    },
  },
  password: {
    validate: (value) => {
      if (value.length === 0) return "Password is required";
      if (value.length < 6)
        return "Password must be at least 6 characters long";
      if (!/[A-Z]/.test(value))
        return "Password must contain at least one uppercase letter";
      if (!/[a-z]/.test(value))
        return "Password must contain at least one lowercase letter";
      if (!/[0-9]/.test(value))
        return "Password must contain at least one number";
      return "";
    },
  },
  confirmPassword: {
    validate: (value) => {
      const password = document.getElementById("password").value;
      if (value.length === 0) return "Please confirm your password";
      if (value !== password) return "Passwords do not match";
      return "";
    },
  },
};

function isUsernameTaken(username) {
  try {
    const storedData = localStorage.getItem("formData");
    if (storedData) {
      const existingData = JSON.parse(storedData);
      if (Array.isArray(existingData)) {
        return existingData.some(
          (data) => data.username.toLowerCase() === username.toLowerCase()
        );
      }
    }
  } catch (error) {
    console.error("Error checking username:", error);
  }
  return false;
}

function isEmailTaken(email) {
  try {
    const storedData = localStorage.getItem("formData");
    if (storedData) {
      const existingData = JSON.parse(storedData);
      if (Array.isArray(existingData)) {
        return existingData.some(
          (data) => data.email.toLowerCase() === email.toLowerCase()
        );
      }
    }
  } catch (error) {
    console.error("Error checking email:", error);
  }
  return false;
}

Object.keys(validations).forEach((fieldName) => {
  const input = document.getElementById(fieldName);
  const errorDiv = document.getElementById(`${fieldName}-error`);

  input.addEventListener("input", () => {
    validateField(fieldName);
  });

  input.addEventListener("blur", () => {
    validateField(fieldName);
  });
});

function validateField(fieldName) {
  const input = document.getElementById(fieldName);
  const errorDiv = document.getElementById(`${fieldName}-error`);
  const errorMessage = validations[fieldName].validate(input.value);

  if (errorMessage) {
    input.classList.add("error");
    errorDiv.style.display = "block";
    errorDiv.textContent = errorMessage;
    return false;
  } else {
    input.classList.remove("error");
    errorDiv.style.display = "none";
    errorDiv.textContent = "";
    return true;
  }
}

function validateForm() {
  let isValid = true;
  Object.keys(validations).forEach((fieldName) => {
    if (!validateField(fieldName)) {
      isValid = false;
    }
  });
  return isValid;
}
function handleSubmit(event) {
  event.preventDefault();

  if (validateForm()) {
    const newFormData = {
      username: document.getElementById("username").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
    };

    let existingData = [];
    try {
      const storedData = localStorage.getItem("formData");
      if (storedData) {
        existingData = JSON.parse(storedData);
        if (!Array.isArray(existingData)) {
          existingData = [existingData];
        }
      }
    } catch (error) {
      console.error("Error parsing stored data:", error);
      existingData = [];
    }

    existingData.push(newFormData);
    localStorage.setItem("formData", JSON.stringify(existingData));
    document.getElementById("form").reset();

    window.history.pushState({}, "", window.location.pathname);
    return true;
  }

  return false;
}
