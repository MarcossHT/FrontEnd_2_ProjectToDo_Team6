function logIn() {
    const inputEmail = document.getElementById('inputEmail').value;
    const validEmail = inputEmail.toLowerCase();
    const inputPassword = document.getElementById('inputPassword').value;
    
    if(inputPassword.length > 8 && inputPassword.length < 12 && /.com$/.test(validEmail)) {
        // localStorage.setItem('login', JSON.stringify({validEmail: validEmail}));
        
        const data = {
            email: validEmail,
            password: inputPassword,
        };
        
        const settings = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(data),
        };
        
        fetch('https://ctd-todo-api.herokuapp.com/v1/users/login', settings)
        .then(response => response.json())
        .then(info => {
            console.log(info);
            storage(validEmail, info);
        })
        .catch(err => console.log(err));
        
        alert('Login feito com sucesso!');
        window.location.href='./tarefas.html';

    }else {
        alert('Login não efetuado!');
    }
}

function storage(email, data) {
    localStorage.setItem('user', JSON.stringify({login: email, reponse: data}));
};
