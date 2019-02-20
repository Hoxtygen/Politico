/* const Users = [
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
} */


function login(event) {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  console.log(email);
  console.log(password);

  fetch('https://hoxtygen-politico.herokuapp.com/api/v1/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })
    .then(res => res.json())
    .then((parsedData) => {
      console.log(parsedData);
      const { err, data } = parsedData;
      if (err) {
        if (err.email) {
          console.log(err.email);
        }
        if (err.password) {
          console.log(err.password);
        }
      } else {
        console.log(data);
        const { token, user } = data[0];
        console.log(user.isadmin)
        localStorage.setItem('token', token);
        if (user.isadmin === true) {
          window.location = 'dashboard.html';
          return;
        } else if (user.isadmin === false) {
          window.location = 'Udashboard.html';
          return;
        }else {
          window.location = 'index.html';
        }

      }
    })
    .catch((err) => {
      if (err) {
        console.log(err);
      }
    });
}


document.getElementById('loginForm').addEventListener('submit', login);
