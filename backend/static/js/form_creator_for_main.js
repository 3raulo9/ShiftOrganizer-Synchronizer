function addFields() {
    var numUsers = parseInt(document.getElementById("num_users").value);
    var formContainer = document.getElementById("user-fields");

    // Clear previous fields
    formContainer.innerHTML = "";

    // Add fields for each user starting from index 0
    for (var i = 0; i < numUsers; i++) {
        var labelCompany = document.createElement("label");
        labelCompany.textContent = "Company ID (User " + (i + 1) + "):";
        var inputCompany = document.createElement("input");
        inputCompany.type = "text";
        inputCompany.name = "company_id_" + i;
        inputCompany.required = true;
        inputCompany.className = "form-control mb-4";

        var labelUsername = document.createElement("label");
        labelUsername.textContent = "Username (User " + (i + 1) + "):";
        var inputUsername = document.createElement("input");
        inputUsername.type = "text";
        inputUsername.name = "username_" + i;
        inputUsername.required = true;
        inputUsername.className = "form-control mb-4";

        var labelPassword = document.createElement("label");
        labelPassword.textContent = "Password (User " + (i + 1) + "):";
        var inputPassword = document.createElement("input");
        inputPassword.type = "password";
        inputPassword.name = "password_" + i;
        inputPassword.required = true;
        inputPassword.className = "form-control mb-4";

        var breakElement = document.createElement("br");

        formContainer.appendChild(labelCompany);
        formContainer.appendChild(inputCompany);
        formContainer.appendChild(breakElement);

        formContainer.appendChild(labelUsername);
        formContainer.appendChild(inputUsername);
        formContainer.appendChild(breakElement);

        formContainer.appendChild(labelPassword);
        formContainer.appendChild(inputPassword);
        formContainer.appendChild(breakElement);
    }
}

// Call addFields initially to show one user by default
window.onload = function () {
    addFields();
};