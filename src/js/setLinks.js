
$(() => {
        

    $("#posts-container .post .cover-img ").addClass("d-none");
    coverImg = $("#posts-container .post .cover-img ");
    coverImg.first().addClass("d-block");

    mostLikedPost();
    $("#liked-post").text(`Most liked post : (${postArray})`);



  $('#feed').click(() => {
    window.location.replace("index.html");
  })

  $('.nav .an').click( event => {
    event.preventDefault()
    let view = event.target.dataset.viewTarget 
    let url = `views/${view}.html`
    $(".nav-item").removeClass("active")
    $(event.target).closest(".nav-item").addClass("active")
    loadView( url, view )
})


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

})

