
let User = {
    name : 'Isarel',
    mail : 'israel@kodemia.com',
    idUser : 1,
    avatar : 'https://avatars.githubusercontent.com/u/6852277?v=4' 
}
let {name,avatar,mail} = User;

let setPost = function(){
    let post = {
        idPost: Date.now(),
        date: moment().format('MMM DD') ,
        time: moment().startOf("MMM DDD").fromNow(),
        author: name,
        avatar,
    };
    $(' form input[type="text"] ').each(function(){
        //console.log(this)
        post[this.name] = this.value;
    }) 
    //console.log(post)
    savePost(post)
    $(' form input[type="text"] ').each(function(){
        //console.log(this)
        this.value = '';
    })
}

$('#publish').click(setPost);

const savePost = (variableObject) => {
    $.ajax({
        method: "POST",
        url: `https://taco-database-default-rtdb.firebaseio.com/user/users/devto/posts.json`,
        data: JSON.stringify(variableObject),
        success : (response) => console.log(response),
        error : error => {
            console.log(error)
        },
        async: false
    })
}