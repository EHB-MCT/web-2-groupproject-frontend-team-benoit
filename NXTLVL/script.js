"use strict"
const baseURL = "http://nxt-level-api.herokuapp.com"


fetch('http://nxt-level-api.herokuapp.com/challenges')
  .then(response => response.json())
  .then(data => console.log(data));



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