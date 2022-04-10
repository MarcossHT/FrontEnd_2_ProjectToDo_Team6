function sign() {
    const firstName = document.getElementById('nameInput');
    const lastName = document.getElementById('LastNameInput');
    const email = document.getElementById('emailInput');
    const validMail = email.value.toLowerCase();
    const password = document.getElementById('passwordInput');
    const password2 = document.getElementById('passwordInput2');
    const errorName = document.getElementById('errorName');
    const errorLastName = document.getElementById('errorLastName');
    const errorEmail = document.getElementById('errorEmail');
    const errorPwd = document.getElementById('errorPwd');
    const errorPwdTwo = document.getElementById('errorPwdTwo');

    
    function validInputFirstName() {
        if (/[0-9]/.test(firstName.value) || firstName.value == "") {
            return errorInput(firstName, errorName);
        }
        else if (!/[0-9]/.test(firstName.value) && firstName.value != "") {
            return successInput(firstName, errorName);
        }
    }

    function validInputLastName() {
        if (/[0-9]/.test(lastName.value) || lastName.value === firstName.value || lastName.value == "") {
            return errorInput(lastName, errorLastName);
        }
        else if (!/[0-9]/.test(lastName.value) && lastName.value === firstName.value || lastName.value != "") {
            return successInput(lastName, errorLastName);
        }
    }

    function validEmail() {
        if (/.com$/.test(validMail) === false || validMail == "") {
            return errorInput(email, errorEmail);
        } else {
            return successInput(email, errorEmail);
        }

    }

    function validPwd() {
        if (password.length < 8 && password.length > 12 || password.value == "") {
            return errorInput(password, errorPwd);
        } else {
            return successInput(password, errorPwd);
        }
    }

    function validPwdTwo() {
        if (password.value != password2.value || password2.value == "") {
            return errorInput(password2, errorPwdTwo);
        } else if (password2.value != "" && password2.value === password.value) {
            successInput(password2, errorPwdTwo);
            api();
        }
    }

    function api() {
        const data = {
            firstName: firstName.value,
            lastName: lastName.value,
            email: validMail,
            password: password.value,
        };

        const settings = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(data),
        };

        fetch('https://ctd-todo-api.herokuapp.com/v1/users', settings)
            .then(response => response.json())
            .then(info => {
                console.log(info);
                if(info === 'El usuario ya se encuentra registrado') {
                    return alert('Usuário já cadastrado');
                }
                storage(firstName.value, lastName.value, validMail, info);
            })
            .catch(err => {
                return console.log(err);
            });

        alert('success!');
        window.location.href = './index.html'
    }

    function storage(firstName, lastName, email, reponse) {
        localStorage.setItem('user', JSON.stringify({ firstName: firstName, lastName: lastName, email: email, reponse: reponse }));
    };

    function errorInput(input, inputSmall) {
        input.classList.remove('success');
        input.classList.add("error");
        inputSmall.classList.add("errorSmall");
        inputSmall.style.visibility = "visible";
        return inputSmall.innerText = "Preencha o campo corretamente";
    };
    
    function successInput(input, inputSmall) {
        input.classList.remove('error');
        inputSmall.classList.remove('errorSmall');
        return inputSmall.style.visibility = "hidden";
    }

    validInputFirstName();
    validInputLastName();
    validEmail();
    validPwd();
    validPwdTwo();
}