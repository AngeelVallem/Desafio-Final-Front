let {
  author,
  content,
  postTags,
  coverUrl,
  date,
  idPost,
  postTitle,
  time,
  imagesUrl,
  likes,
  key
} = postClicked;

$(() => {
  $("#img-header").attr("src", coverUrl);
  $("#post-title").text(postTitle);
  $("#post-content").text(content);
  $("#post-tags").text(postTags);
  $(".author-name").text(author);
  $("#post-date").text(date);
  $(".img-profile").attr("src", avatar);
  $(".img-profile-2").attr("src", avatar);
  $("#likes-count").text(likes);
  $('#like').attr('data-post-key' ,key)

  $('#like').click(addLike)
  $("#add-comment").click(setReply);

  printRepliesByPost(getReplies());



});

const setReply = () => {
  if ($("#reply").val() == "") {
    alert("Campos vacíos");
  } else {
    let replyObj = {
      author,
      avatar,
      date: moment().format("MMM DD"),
      content: $("#reply").val(),
      idPost,
    };

    saveReply(replyObj);
    $("#reply").val("");
    printRepliesByPost(getReplies());
  }
};

const addLike = (event) => {

  let key = event.target.dataset.postKey;

  $.ajax({
    method: "PATCH",
    url: `https://taco-database-default-rtdb.firebaseio.com/user/users/devto/posts/${key}.json`,
    data: JSON.stringify({likes: likes++}),
    success: $("#likes-count").text(likes-1),
    error: (error) => {
      console.log(error);
    },
    async: false,
  });

}

const saveReply = (variableObject) => {
  $.ajax({
    method: "POST",
    url: `https://taco-database-default-rtdb.firebaseio.com/user/users/devto/replies.json`,
    data: JSON.stringify(variableObject),
    success: (response) => console.log(response),
    error: (error) => {
      console.log(error);
    },
    async: false,
  });
};



const printRepliesByPost = (data) => {
  let repliesContainer = $("#replies-container");

  let postReplies = [];

  repliesContainer.children().remove();

  for (key in data) {
    let { author, avatar, content, date } = data[key];

    if (idPost == data[key].idPost) {
      postReplies.push(data[key]);
      let reply = `    <div class="d-flex flex-column"> 
      <div class="d-flex">
        <img class="img-profile rounded-circle" src=${avatar} alt="">
        <div class="card p-3 w-100">
         <div class="d-flex justify-content-between">
          <div class="d-flex align-items-center"> 
            <h5 class="m-0 text-muted">${author}</h5>
            <p class="mx-2 my-0 text-muted">•</p>
            <p class="m-0">${date}</p>
          </div>
          <button data-reply-key=${key} class="btn">...</button>
         </div>
          <p>
        ${content}
          </p>
        </div>
      </div>
      <div class="pl-5 d-flex">
        <button class="btn mt-2"><img src="/src/Images/heart.svg" alt=""> Likes</button>
        <button class="btn mt-2"><img src="/src/Images/comments.svg"alt="">Reply</button>
      </div>
  </div>`;

      repliesContainer.prepend(reply);
    }
  }

  $("#count-replies").text(`Discussion (${postReplies.length})`);
};

