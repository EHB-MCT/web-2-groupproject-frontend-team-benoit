"use strict"
const baseURL = "http://nxt-level-api.herokuapp.com"
const challengedata = [];

fetch('http://nxt-level-api.herokuapp.com/challenges')
  .then(response => response.json())
  .then(data => {
    challengedata.push(data);
    Object.values(challengedata).forEach(val => {
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
            <img src="./images/pencil.png" alt="edit" onclick="">
        </div>
        </div>`)
      }
    })
  });



function myFunction() {
  document.getElementById("submit").addEventListener("click", function (event) {
    event.preventDefault()
    const name = document.getElementById("name").value;
    const courses = document.getElementById("courses").value;
    const points = document.getElementById("points").value;
    const session = document.getElementById("session").value;
    console.log(name, courses, points, session);
  });
}