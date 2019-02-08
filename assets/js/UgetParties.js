/* eslint-disable no-multi-assign */
let token = localStorage.getItem('token');


function getParties() {
  fetch('https://hoxtygen-politico.herokuapp.com/api/v1/parties', {
    headers: {
      'api-access-token': token,
    },
  })
    .then(res => res.json())
    .then((parsedData) => {
      const partyBody = document.getElementById('party-body').innerHTML = `
      ${parsedData.data.map(data => `
            <tr>
                <td>${data.id}</td>
                <td>${data.name}</td>
                <td>${data.acronym}</td>
                <td><img src= ${data.logourl} alt="logo image" style="height: 50px; width: 50px"></td>
                <td>${data.hqaddress}</td>
            </tr>
      `)}
      `
    })
    .catch(err => console.log(err));
}

getParties();