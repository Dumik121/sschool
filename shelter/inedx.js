
const About_the_shelter = document.querySelector(".About_the_shelter");
const Our_pets = document.querySelector(".Our_pets");
const Help_the_shelter = document.querySelector(".Help_the_shelter");
const Contacts = document.querySelector(".Contacts");

function Active_link1(){
    About_the_shelter.classList.remove("active");
    Our_pets.classList.remove("active");
    Contacts.classList.remove("active");
    Help_the_shelter.classList.remove("active")

    About_the_shelter.classList.add("active");
}
About_the_shelter.addEventListener("click", Active_link1);
function Active_link2(){
    About_the_shelter.classList.remove("active");
    Our_pets.classList.remove("active");
    Contacts.classList.remove("active");
    Help_the_shelter.classList.remove("active")


    Our_pets.classList.add("active");
}
Our_pets.addEventListener("click", Active_link2);
function Active_link3(){
    About_the_shelter.classList.remove("active");
    Our_pets.classList.remove("active");
    Contacts.classList.remove("active");
    Help_the_shelter.classList.remove("active")


    Help_the_shelter.classList.add("active");
}
Help_the_shelter.addEventListener("click", Active_link3);
function Active_link4(){
    About_the_shelter.classList.remove("active");
    Our_pets.classList.remove("active");
    Contacts.classList.remove("active");
    Help_the_shelter.classList.remove("active")


    Contacts.classList.add("active");
}
Contacts.addEventListener("click", Active_link4);