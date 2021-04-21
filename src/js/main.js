//https://taco-database-default-rtdb.firebaseio.com/user/users/devto.json

let User = {
    name : 'Isarel',
    mail : 'israle@kodemia.com',
    idUser : 1,
    avatar : 'https://avatars.githubusercontent.com/u/6852277?v=4' 
}
let {name,avatar,mail} = User;



$(() =>{
$('#container-data').load('views/home.html')
$('#avatar-img').attr("src",avatar)
$('#user-name').text(name)
$('#user-email').text(mail)
})
 $('   ')

/*
let postObjt = {
    url, 
    postTitle,
    hastagsArr = [],
    date : moment().format('MMM DD'),
    time: moment().startOf(date).fromNow(),
    author : name,
    authorAvatar : avatar
    postId : Date.now()
 }*/


 // Metodos ajax //


 //POST 
const savePost = (variableObject) => {
    $.ajax({
        method: "POST",
        url: `https://taco-database-default-rtdb.firebaseio.com/user/users/devto/posts.json`,
        data: JSON.stringify(variableObject),
        success : (response),
        error : error => {
            console.log(error)
        },
        async: false
    })
}
