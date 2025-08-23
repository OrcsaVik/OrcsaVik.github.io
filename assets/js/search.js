document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("search");
  const posts = document.querySelectorAll(".post-item");
  const tags = document.querySelectorAll(".tag-filter");

  // 搜索功能
  input.addEventListener("keyup", () => {
    const keyword = input.value.toLowerCase();
    posts.forEach(post => {
      const title = post.querySelector("a").textContent.toLowerCase();
      post.style.display = title.includes(keyword) ? "block" : "none";
    });
  });

  // 标签过滤
  tags.forEach(tag => {
    tag.addEventListener("click", () => {
      const filter = tag.dataset.tag;
      posts.forEach(post => {
        const tags = post.dataset.tags.split(",");
        post.style.display = (filter === "all" || tags.includes(filter)) ? "block" : "none";
      });
    });
  });
});
