const Users = [
    {
        username: 'Admin@yahoo.com',
        password: 'admin123',
        isAdmin: true
    },

    {
        username: 'user1@yahoo.com',
        password: 'user123',
        isAdmin: false
    },

    {
        username: 'user2@yahoo.com',
        password: 'user123',
        isAdmin: false
    },
];



function logUser() {
    const username = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    /* console.log(`Your username is ${username} and password is ${password}`); */
    for (let i = 0; i < Users.length; i++) {
        if (username === Users[i].username && password === Users[i].password && Users[i].isAdmin === true) {
            console.log('You are now logged in as an admin')
            window.location = 'dashboard.html';
            return;
        } else if (username === Users[i].username && password === Users[i].password && Users[i].isAdmin === false) {
            window.location = 'Udashboard.html';
            return
        }
    }
    window.location = 'index.html';
    //console.log('you are not an admin');
}