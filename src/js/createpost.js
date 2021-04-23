
//modal
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

let postData = {};

let postEdit = function () {
    $(' form input[type="text"] ').each(function(){
        //console.log(this)
        postData[this.name] = this.value;

   
    }) 
    //console.log(postData)
}

$(() => {

    $('.cardPostInput').load('editPost.html', ()=>{

        $(' form input[name="postTitle"] ').click(() => {
            $('.asideContent').load('title-post.html')
        })
        $(' form input[name="postTags"] ').click(() => {
            $('.asideContent').load('tags-post.html')
        })
        $(' form input[name="content"] ').click(() => {
            $('.asideContent').load('content-post.html')
        })
    }) 

    $('#homePostEdit').click( ( )    => {
        $('.cardPostInput').load('editPost.html', ()=>{
            $('.asideContent').removeClass("d-none")
            $(' form input[name="postTitle"] ').click(() => {
                $('.asideContent').load('title-post.html')
            })
            $(' form input[name="postTags"] ').click(() => {
                $('.asideContent').load('tags-post.html')
            })
            $(' form input[name="content"] ').click(() => {
                $('.asideContent').load('content-post.html')
            })
        })  
    })
    $('#homePostPreview').click(() =>{
        postEdit();
        $('.cardPostInput').load('previewPost.html')
        $('.asideContent').addClass("d-none")
 
    })
})
let tags;
let hashtFuction;


