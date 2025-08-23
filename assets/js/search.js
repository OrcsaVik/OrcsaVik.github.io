document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("search-input");
    const tagSelect = document.getElementById("tag-select");
    const posts = [...document.querySelectorAll(".post-card")];

    function filterPosts() {
        const query = searchInput.value.toLowerCase();
        const selectedTag = tagSelect.value;

        posts.forEach(post => {
            const title = post.querySelector("h2").textContent.toLowerCase();
            const tags = post.dataset.tags;
            const matchesQuery = title.includes(query);
            const matchesTag = !selectedTag || tags.includes(selectedTag);

            if (matchesQuery && matchesTag) {
                post.style.display = "block";
            } else {
                post.style.display = "none";
            }
        });
    }

    searchInput.addEventListener("input", filterPosts);
    tagSelect.addEventListener("change", filterPosts);
});
