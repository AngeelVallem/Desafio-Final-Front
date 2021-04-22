//https://taco-database-default-rtdb.firebaseio.com/user/users/devto.json
let postClicked;

let User = {
  name: "Isarel",
  mail: "israle@kodemia.com",
  idUser: 1,
  avatar: "https://avatars.githubusercontent.com/u/6852277?v=4",
};
let { name, avatar, mail } = User;

$(() => {
  $("#container-data").load("views/home.html", () =>{
    printPost(getPosts());
  });
  $("#avatar-img").attr("src", avatar);
  $("#user-name").text(name);
  $("#user-email").text(mail);

  $("#create-post").click(() => {
    window.location.replace("views/new-post.html");
  });


  
});

const getPosts = () => {
  let postsCollection;

  $.ajax({
    method: "GET",
    url: `https://taco-database-default-rtdb.firebaseio.com/user/users/devto/posts.json`,
    success: (response) => (postsCollection = response),
    error: (error) => {
      console.log(error);
    },
    async: false,
  });

  return postsCollection;
};

const printPost = (data) => {
  let postsContainer = $("#posts-container");

let keys = []

  postsContainer.children().remove();

  for (key in data) {

    keys.push(key)
    
    let {
      author,
      avatar,
      content,
      coverUrl,
      date,
      idPost,
      imagesUrl,
      postTags,
      postTitle,
      time,
    } = data[key];

    let post = `
        <!-- Post principal -->
<div data-post-key=${key}  class="post w-100 border bg-white rounded bg-white mt-2 shadow-sm">
 <!--Imagen principal-->

   <img data-post-key=${key} class="w-100 link" src=${coverUrl} alt="post-img" />
 
 <div class="d-flex mt-3">
   <!--Imagen de perfil-->
   <img
   
     src=${avatar}
     alt="" class="rounded-circle profile-p ml-3" />
   <div class="author-info ml-2">
     <p>${author}</p>
     <p>${date} <small>${time}</small></p>
   </div>
 </div>
   <h1 class="ml-3 font-weight-bold">${postTitle}</h1>
 <ul class="h-post d-flex w-100 flex-wrap">
   <li><a name=${key}href="#">${postTags}</a></li>
 </ul>
 <div class="post-interactions d-flex justify-content-between align-items-center w-md-25">
   <!--footer del post principal-->
   <div class="interactions d-flex">
     <div>
       <img src="Images/heart2.svg" alt="like" />
       <span>2</span>
       <span class="d-none d-md-inline">reactions</span>
     </div>
     <div>
       <img src="Images/comments.svg" alt="comment" />
       <span>0</span>
       <span class="d-none d-md-inline">comments</span>
     </div>
   </div>
   <div class="d-flex align-items-center">
     <p class="mb-0">6 min read</p>
     <button class="ml-2 btn btn-grey">Save</button>
   </div>
 </div>
</div>`;
    postsContainer.prepend(post);
  }
  
  $('.link').click(getPostByKey);
};


const getPostByKey = (event) => {
    let key = event.target.dataset.postKey
  let post;
    $.ajax({
      method: "GET",
      url: `https://taco-database-default-rtdb.firebaseio.com/user/users/devto/posts/${key}.json`,
      success: (response) => (post = response),
      error: (error) => {
        console.log(error);
      },
      async: false,
    });
  
    postClicked = post
    
    $('#container-data').load('views/post.html')

}


