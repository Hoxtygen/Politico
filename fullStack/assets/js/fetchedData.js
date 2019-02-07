function fetchData() {
  fetch('http://localhost:5003/api/v1/auth/login', {
    method: 'POST',
    contentType: 'application/json',
  })
    .then(res => res.json())
    .then(parsedData => console.log(parsedData));
}

//fetchData();
