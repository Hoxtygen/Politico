function signUp(event) {
  event.preventDefault();
  const userData = {
    firstname: document.getElementById('firstname').value,
    lastname: document.getElementById('lastname').value,
    othername: document.getElementById('othername').value,
    email: document.getElementById('email').value,
    phonenumber: document.getElementById('phoneNum').value,
    passporturl: document.getElementById('passporturl').value,
    password: document.getElementById('password').value,
  };
  console.log(userData);

  fetch('http://localhost:5003/api/v1/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  })
    .then(res => res.json())
    .then((parsedData) => {
      const { err, data } = parsedData;
      if (err) {
        if (err.firstname) {
          console.log(err.firstname);
        }
        if (err.lastname) {
          console.log(err.lastname);
        }
        if (err.othername) {
          console.log(err.othername);
        }
        if (err.email) {
          console.log(err.email);
        }
        if (err.phonenumber) {
          console.log(err.phonenumber);
        }
        if (err.passporturl) {
          console.log(err.passporturl);
        }
        if (err.password) {
          console.log(err.password);
        }
      } else {
        window.location = 'login.html';
      }
    })
    .catch(err => console.log(err));
}
document.getElementById('regForm').addEventListener('submit', signUp);

