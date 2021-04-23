



hashtFuction = function () {
        tags = postData.postTags.split(", ")
}

hashtFuction()

$('#imgTitle').attr("src",postData.coverUrl);
$('#previewTitle').text(postData.postTitle);
tags.forEach(tag => {
    let tagList = `<li>#${tag}</li>`
    $('#hashtPost').append(tagList)
})
$('#imgContent').attr("src",postData.imagesUrl);
$('#content').text(postData.content);