const form = document.querySelector("#form");
const email = document.querySelector("#email");
const emailError = document.getElementById("emailError");

form.addEventListener("submit", function (e) {
    e.preventDefault();
    
    const message = document.querySelector("#message").value;
    const name = document.querySelector("#name").value;
    const phone = document.querySelector("#phone").value;
    
    alert(`Data Submitted Successfully
    Name: ${name}
    Email: ${email.value}
Message: ${message}
Phone:${phone}`);
});

email.addEventListener("input", () => {
    console.log("log checker");

    if (email.value === "") {
        emailError.textContent = "CustomError:Email is required";
    } else if (!email.checkValidity()) {
        emailError.textContent = "CustomError:Please enter valid email address";
    } else {
        emailError.textContent = "";
    }
});