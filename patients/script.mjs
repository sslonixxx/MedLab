import { Conclusions } from "./conclusions.mjs";

const token = localStorage.getItem('token');
const userMenuContainer = document.getElementById('userMenuContainer');
const doctorName = document.getElementById('doctorName');
const dropdownMenu = document.getElementById('dropdownMenu');
const logoutButton = document.getElementById('logout');

doctorName.textContent = localStorage.getItem("doctorName")
console.log(Conclusions)

function getConclusions(Conclusions) {
    const conclusionSelect = document.getElementById('conclusion');

Object.values(Conclusions).forEach(element => {
    const option = document.createElement('option');
        option.value = element;
        option.textContent = element;
        conclusionSelect.appendChild(option);
});

}

getConclusions(Conclusions);
document.getElementById("search") 