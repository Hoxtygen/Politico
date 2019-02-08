/* eslint-disable no-multi-assign */
let token = localStorage.getItem('token');


function getOffices() {
  fetch('https://hoxtygen-politico.herokuapp.com/api/v1/offices', {
    headers: {
      'api-access-token': token,
    },
  })
    .then(res => res.json())
    .then((parsedData) => {
      //console.log(parsedData)
      const officeBody = document.getElementById('office-body').innerHTML = `
      ${parsedData.data.map(data => `
            <tr>
                <td>${data.id}</td>
                <td>${data.name}</td>
                <td>${data.type}</td>
                <td>
                     <button class="btn contest" type="submit">Contest</button>
                </td>
            </tr>
      `)}
      `
    })
    .catch(err => console.log(err));
}

getOffices();