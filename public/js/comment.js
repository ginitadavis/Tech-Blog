const commentBtn = document.getElementById("saveBtn");


async function addComment() {
    const comment_text = document.getElementById("newComment").value;
    const blog_id = document.getElementById("id").value;

    try {
        console.log('This is the blog id ' + blog_id);
        const response = await fetch("/api/comments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ comment_text, blog_id }),

        });

        if (response.ok) {
            console.log("Comment added succesfully");

            //Display all the comments
            try {
                const getBlogResponse = await fetch(`/api/blogs/${blog_id}`);
                if (getBlogResponse.ok) {
                    const blogWithComments = await getBlogResponse.json();
                    console.log("Blog with comments:", blogWithComments);
                } else {
                    console.error("Error retrieving blog with comments");
                }
            } catch (err) {
                console.error(err);
            }

        } else {
            // Error occurred while creating the comment
            console.error("Error adding comment");
        }
    } catch (err) {
        console.error(err);
    }
}

commentBtn.addEventListener("click", addComment);
