//https://taco-database-default-rtdb.firebaseio.com/user/users/devto.json
let postClicked;

let User = {
  name: "Israel Salinas",
  mail: "israle@kodemia.com",
  idUser: 1,
  avatar: "https://avatars.githubusercontent.com/u/6852277?v=4",
};
let { name, avatar, mail } = User;
let coverImg;

$(() => {
  $("#container-data").load("views/home.html", () => {
    printPost(createCompleteCollection());
    $("#posts-container .post .cover-img ").addClass("d-none");
    coverImg = $("#posts-container .post .cover-img ");
    coverImg.first().addClass("d-block");

    mostLikedPost();
    $("#liked-post").text(`Most liked post : (${postArray})`);
  });

  setTimeout(() => {
    $("#feed").click(() => {
      window.location.replace("index.html");
    });

    $(".nav .an").click((event) => {
      event.preventDefault();
      let view = event.target.dataset.viewTarget;
      let url = `/src/views/${view}.html`;
      $(".nav-item").removeClass("active");
      $(event.target).closest(".nav-item").addClass("active");
      loadView(url, view);
    });

    const loadView = (url, view) => {
      $("#container-data").load(url, () => {
        switch (view) {
          case "week":
            printPost(getPostByWeek());

            break;

          case "month":
            printPost(getPostByMonth());
            break;

          case "year":
             printPost(getPostByYear())
            break;

          case "infinity":
            printPost(createCompleteCollection());
            break;

          case "lastest":
            printPost(createCompleteCollection());
            break;

          default:
        }
      });
    };
  }, 100);

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

const getReplies = () => {
  let repliesCollection;

  $.ajax({
    method: "GET",
    url: `https://taco-database-default-rtdb.firebaseio.com/user/users/devto/replies.json`,
    success: (response) => (repliesCollection = response),
    error: (error) => {
      console.log(error);
    },
    async: false,
  });

  return repliesCollection;
};

const createCompleteCollection = () => {
  let posts = getPosts();
  let replies = getReplies();

  let postsObject = {};

  for (key in posts) {
    postsObject[key] = { ...posts[key], replies: [] };

    let postId = postsObject[key].idPost;
    let repliesArr = postsObject[key].replies;

    for (key in replies) {
      let { idPost } = replies[key];
      if (idPost == postId) {
        let repliesObj = replies[key]; // esto representa el reply que sí pertenece al post
        repliesArr.push(repliesObj);

        //console.log( `El ${reply} si pertenece` )
      } else {
        //console.log( `El ${ reply } no pertenece `)
      }
    }
  }

  return postsObject;
};

const printPost = (data) => {
  let postsContainer = $("#posts-container");
  postsContainer.children().remove();

  for (key in data) {
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
      replies,
      likes,
      year
    } = data[key];

    let post = `
        <!-- Post principal -->
<div data-post-key=${key}  class="post w-100 border bg-white rounded bg-white mt-2 shadow-sm">
 <!--Imagen principal-->

   <img  data-post-key=${key}  class="w-100 cover-img link" src=${coverUrl} alt="post-img" />
 
 <div class="d-flex mt-3">
   <!--Imagen de perfil-->
   <img
   
     src=${avatar}
     alt="" class="rounded-circle profile-p ml-3" />
   <div class="author-info ml-2">
     <p>${author}</p>
     <p>${date} '${year} </p>
   </div>
 </div>
   <h1  data-post-key=${key} class="ml-3 font-weight-bold link p-title">${postTitle}</h1>
 <ul class="h-post d-flex w-100 flex-wrap">
   <li><a name=${key}href="#">${postTags}</a></li>
 </ul>
 <div class="post-interactions d-flex justify-content-between align-items-center w-md-25">
   <!--footer del post principal-->
   <div class="interactions d-flex">
     <div>
       <img src="Images/heart2.svg" alt="like" />
       <span>${likes}</span>
       <span class="d-none d-md-inline">reactions</span>
     </div>
     <div>
       <img src="Images/comments.svg" alt="comment" />
       <span>${replies.length}</span>
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

  $(".link").click(getPostByKey);
};

const getPostByKey = (event) => {
  let key = event.target.dataset.postKey;
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

  postClicked = { ...post, key };

  $("#container-data").load("/src/views/Post.js");
};

$(".link-home").click(() => {
  window.location.replace("index.html");
});

let postArray;

const mostLikedPost = () => {
  let posts = getPosts();

  let a = Object.entries(posts).sort((a, b) =>
    a[1].likes < b[1].likes ? 1 : -1
  );

  let likedPost = a.filter((el) => el[1].likes != 0);

  postArray = likedPost.length;

  $("#aside-image").attr("src", a[0][1].coverUrl);

  $("#aside-container").children().remove();

  likedPost.forEach((post) => {
    let asidePost = `<div data-post-key=${post[0]} 
 class="p-3 border-bottom text-link link">
    ${post[1].postTitle}
    </br>
    <small class="w-100">likes : ${post[1].likes}</small>
  </div>`;

    $("#aside-container").append(asidePost);
  });

  $(".text-link").click(getPostByKey);
};

let completeCollection = createCompleteCollection();

const filterByTitle = () => {
  let searchString = $("#search-title").val();
  let regExp = new RegExp(searchString, "i");
  $("#posts-container").children().remove();
  for (key in completeCollection) {
    let {
      author,
      avatar,
      content,
      coverUrl,
      date,
      idPost,
      imagesUrl,
      likes,
      month,
      postTags,
      postTitle,
      replies,
    } = completeCollection[key];

    if (postTitle.search(regExp) != -1) {
      let post = `
        <!-- Post principal -->
<div data-post-key=${key}  class="post w-100 border bg-white rounded bg-white mt-2 shadow-sm">
 <!--Imagen principal-->

   <img  data-post-key=${key}  class="w-100 cover-img link" src=${coverUrl} alt="post-img" />
 
 <div class="d-flex mt-3">
   <!--Imagen de perfil-->
   <img
   
     src=${avatar}
     alt="" class="rounded-circle profile-p ml-3" />
   <div class="author-info ml-2">
     <p>${author}</p>
     <p>${date}</p>
   </div>
 </div>
   <h1  data-post-key=${key} class="ml-3 font-weight-bold link p-title">${postTitle}</h1>
 <ul class="h-post d-flex w-100 flex-wrap">
   <li><a name=${key}href="#">${postTags}</a></li>
 </ul>
 <div class="post-interactions d-flex justify-content-between align-items-center w-md-25">
   <!--footer del post principal-->
   <div class="interactions d-flex">
     <div>
       <img src="Images/heart2.svg" alt="like" />
       <span>${likes}</span>
       <span class="d-none d-md-inline">reactions</span>
     </div>
     <div>
       <img src="Images/comments.svg" alt="comment" />
       <span>${replies.length}</span>
       <span class="d-none d-md-inline">comments</span>
     </div>
   </div>
   <div class="d-flex align-items-center">
     <p class="mb-0">6 min read</p>
     <button class="ml-2 btn btn-grey">Save</button>
   </div>
 </div>
</div>`;
      $("#posts-container").append(post);
    }

    $("#posts-container .post .cover-img ").addClass("d-none");
    $("#posts-container .post .cover-img ").first().addClass("d-block");

    if (searchString == "") {
      printPost(completeCollection);
    }
  }
};

$("#search-title").keyup(filterByTitle);

function getWeekDates() {
  let now = new Date();
  let dayOfWeek = now.getDay(); //0-6
  let numDay = now.getDate();

  let start = new Date(now); //copy
  start.setDate(numDay - dayOfWeek);

  let end = new Date(now); //copy
  end.setDate(numDay + (7 - dayOfWeek));

  return [start, end];
}

let [start, end] = getWeekDates();

const getPostByWeek = () => {
  let weekPosts = completeCollection;

  let postsReturn = {};

  for (key in weekPosts) {
    let { day, month } = weekPosts[key];

    if (
      day >= start.getDate() &&
      day <= end.getDate() &&
      month == `0${start.getMonth() + 1}`
    ) {
      postsReturn[key] = weekPosts[key];
    }
  }
  return postsReturn;
};

const getPostByMonth = () => {
  let monthPosts = completeCollection;

  let postsReturn = {};

  for (key in monthPosts) {
    let { year, month } = monthPosts[key];

    if (year == moment().format("YY") && month == moment().format("MM")) {
      postsReturn[key] = monthPosts[key];
    }
  }
  return postsReturn;
};

const getPostByYear = () => {
  let yearPosts = completeCollection;

  let postsReturn = {};

  for (key in yearPosts) {
    let { year } = yearPosts[key];

    if(year == 20){
          postsReturn[key] = yearPosts[key]
    }
   
  }
  return postsReturn;
};

const changeDate = (key) => {
  $.ajax({
    method: "PATCH",
    url: `https://taco-database-default-rtdb.firebaseio.com/user/users/devto/posts/${key}.json`,
    data: JSON.stringify({ date: "Apr 21", day: "21" }),
    success: (response) => console.log(response),
    error: (error) => {
      console.log(error);
    },
    async: false,
  });
};
