function sign() {
    const firstName = document.getElementById('nameInput').value;
    const lastName = document.getElementById('LastNameInput').value;
    const email = document.getElementById('emailInput').value;
    const validMail = email.toLowerCase();
    const password = document.getElementById('passwordInput').value;
    const password2 = document.getElementById('passwordInput2').value;
    const data = [];
    
    data.push(firstName, lastName, email, password, password2)
    
    
    for(index of data) {
        if(index == '') {
            return alert('Campo em branco');
        }
    }
    
    
    if (/[0-9]/.test(firstName) && /[0-9]/.test(lastName) || firstName === lastName) {
        return alert('Insira um nome válido');
    }
    if(/.com$/.test(validMail) === false) {
        return alert('Insira um email válido');
    }
    if(password.length < 8 && password.length > 12) {
        return alert('Insira uma senha válida');
    }
    if(password != password2) {
        return alert('Insira uma senha válida');
    }else {
        
        const data = {
            firstName: firstName,
            lastName: lastName,
            email: validMail,
            password: password,
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
            storage(firstName, lastName, validMail, info);
        })
        .catch(err => {
            console.log(err);
        });
        
        alert('success!');
        window.location.href='./index.html'
    }
}

function storage(firstName, lastName, email, reponse) {
   localStorage.setItem('user', JSON.stringify({firstName: firstName, lastName: lastName, email: email, reponse: reponse}));
};