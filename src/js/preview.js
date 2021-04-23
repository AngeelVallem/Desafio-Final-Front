
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
$('#imgContentPreview').attr("src",postData.imagesUrl);
$('#contentPreview').text(postData.content);
