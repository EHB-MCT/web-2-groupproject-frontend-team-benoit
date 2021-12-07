"use strict"
const baseURL = "http://nxt-level-api.herokuapp.com"
const challengedata = [];
const userdata = [];

function requestChallenges() {
  fetch('http://nxt-level-api.herokuapp.com/challenges')
    .then(response => response.json())
    .then(data => {
      challengedata.push(data);
      requestUsers()
      Object.values(challengedata).forEach(val => {
        document.getElementById("challenges").innerHTML = '';


        for (let i = 0; i < val.length; i++) {
          const name = val[i].name;
          const course = val[i].course;
          const session = val[i].session;
          const points = val[i].points;
          const id = val[i]._id;
          document.getElementById("challenges").insertAdjacentHTML('beforeend', `
        <div id="${id}">
        <h3>${name}</h3>
        <p>${course}</p>
        <p>session ${session}</p>
        <p>${points} points</p>
        <div class="imgactions">
            <img src="./images/delete.png" alt="delete" onclick="removeData(this)" data-value="${id}">
            <img src="./images/pencil.png" alt="edit" onclick="changeData(this)" data-value="${id}">
        </div>
        </div>`)
        }
      })
    })
}

function requestUsers() {
  fetch('http://nxt-level-api.herokuapp.com/users')
    .then(response => response.json())
    .then(data => {
      userdata.push(data);
      Object.values(userdata).forEach(user => {
        document.getElementById("users").innerHTML = '';
        console.log(challengedata);
        for (let i = 0; i < user.length; i++) {
          console.log(user);
          const challenges = challengedata;
          const id = user[i]._id;
          const userName = user[i].userName;
          const email = user[i].email;
          let HTMLString = `
            <div id="${id}">
            <h3>${userName}</h3>
            <h3>${email}</h3>
          `;
          console.log(challenges[0]);
          challenges[0].forEach(challenge => {
            HTMLString += `<p class="Done">${challenge.name}</p>`
          });
          HTMLString += '</div>'
          console.log(HTMLString)
          document.getElementById("users").insertAdjacentHTML('beforeend', HTMLString);

        }
      })
    });
}

function removeData(element) {
  const id = element.getAttribute('data-value');
  deleteData(id);
}


function changeData(element) {
  const id = element.getAttribute('data-value');
  let beforename = document.getElementById(id).getElementsByTagName("h3")[0].innerHTML;
  let beforecourse = document.getElementById(id).getElementsByTagName("p")[0].innerHTML;
  let beforesession = document.getElementById(id).getElementsByTagName("p")[1].innerHTML.replace(/\D/g, "");
  let beforepoints = document.getElementById(id).getElementsByTagName("p")[2].innerHTML.replace(/\D/g, "");
  document.getElementById("name2").value = beforename;

  let index

  switch (beforecourse) {
    case "Web 2":
      index = 0;
      break;
    case "Dev 3":
      index = 1;
      break;
    case "Design 3":
      index = 2;
      break;
    default:
      index = 0;
      break;
  }

  document.getElementById("name2").value = beforename;
  document.getElementById("courses2").selectedIndex = index
  document.getElementById("session2").value = beforesession;
  document.getElementById("points2").value = beforepoints;


  document.getElementById("save2").addEventListener("click", function (event) {
    event.preventDefault();
    const name = document.getElementById("name2").value;
    const courses = document.getElementById("courses2").value;
    const points = document.getElementById("points2").value;
    const session = document.getElementById("session2").value;

    const sendData = {
      name: name,
      points: parseInt(points),
      course: courses,
      session: parseInt(session)
    }
    adaptData(sendData, id);
  })
}

function adaptData(sendData, id) {
  console.log(sendData);
  fetch(`http://nxt-level-api.herokuapp.com/challenges/${id}`, {
    method: "PUT",
    mode: "cors",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(sendData)
  }).then(res => {
    console.log("response:", res);
    requestChallenges();
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
    requestChallenges();
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





function deleteData(id) {
  fetch(`http://nxt-level-api.herokuapp.com/challenges/${id}`, {
    method: "DELETE",
    mode: "cors",
    headers: {
      'Content-Type': 'application/json'
    },
  }).then(res => {
    console.log("Request complete! response:", res);
    requestChallenges();
  });
}





requestChallenges();