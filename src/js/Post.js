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
} = postClicked;

$(() => {
  $("#img-header").attr("src", coverUrl);
  $('#post-content').text(content);
  $('#post-tags').text(postTags);
  $('.author-name').text(author);
  $('#post-date').text(date);
  $('.img-profile').attr("src", avatar);
  $('.img-profile-2').attr("src", avatar);
});
