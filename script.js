"use strict"
const baseURL = "http://nxt-level-api.herokuapp.com"
const challengedata = [];

function requestData() {
  fetch('http://nxt-level-api.herokuapp.com/challenges')
    .then(response => response.json())
    .then(data => {
      challengedata.push(data);
      Object.values(challengedata).forEach(val => {
        document.getElementById("added").innerHTML = '';
        for (let i = 0; i < val.length; i++) {
          console.log(val[i]);
          document.getElementById("added").insertAdjacentHTML('beforeend', `
        <div id="addedchallenge">
        <h3>${val[i].name}</h3>
        <p>For ${val[i].course}</p>
        <p>in session ${val[i].session}</p>
        <p>On ${val[i].points} points</p>
        <div class="imgactions">
            <img src="./images/delete.png" alt="delete" onclick="">
            <img src="./images/pencil.png" alt="edit" onclick="changeData(this)" data-value="${val[i]._id}">
        </div>
        </div>`)
        }
      })
    });
}


function changeData(element) {


  let id = element.getAttribute('data-value');
  console.log(id);

  fetch(`http://nxt-level-api.herokuapp.com/challenges/${id}`, {
    method: "PUT",
    mode: "cors",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify()
  }).then(res => {
    console.log("response:", res);
  });
}



function postData(sendData) {
  console.log(sendData);
  fetch("http://nxt-level-api.herokuapp.com/challenges", {
    method: "POST",
    mode: "cors",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(sendData)
  }).then(res => {
    console.log("Request complete! response:", res);
    requestData();
  });
}










document.getElementById("submit").addEventListener("click", function (event) {


  event.preventDefault()
  const name = document.getElementById("name").value;
  const courses = document.getElementById("courses").value;
  const points = document.getElementById("points").value;
  const session = document.getElementById("session").value;



  const sendData = {
    name: name,
    points: parseInt(points),
    course: courses,
    session: parseInt(session)
  }
  postData(sendData);
});

requestData();