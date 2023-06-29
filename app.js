let searchBar = document.querySelector(".search-bar");
let newsHeadline = document.querySelector("#news-headline");
let newsDisplayArea = document.querySelector(".card-container");
let currentPage = document.querySelector("#page-num");
let previousPage = document.querySelector("#previous-page");
let nextPage = document.querySelector("#next-page");

let page = 1;
// console.log(previousPage)

let showDataOnLoad = (query) => {
    fetch(`https://newsapi.org/v2/everything?q=${query ? query : "trending"}&apiKey=7eb5a244123d4f4f9b5fe4d99f4b7102&pageSize=4&page=${page}`)
        .then(res => res.json())
        .then(res => {
            console.log(res)
            newsHeadline.innerHTML = query ? query.toUpperCase() : "TRENDING";
            res.articles.forEach((val, i) => {
                let newsDate = new Date(res.articles[i].publishedAt)
                newsDisplayArea.innerHTML += `
                <div class="card col-lg-3 col-md-4 col-sm-6">
                <img src="${res.articles[i].urlToImage || "images/default-image.png"}" class="card-img-top news-img" alt="...">
                <div class="card-body">
                  <h5 class="card-title mt-3 mb-3">${res.articles[i].title}</h5>
                  <p class="card-text">${res.articles[i].description}</p>
                </div>
                <div class="card-footer">
                  <span>${res.articles[i].source.name}</span>
                  <span class="news-date">${newsDate.getDate()}/${newsDate.getMonth() + 1}/${newsDate.getFullYear()}</span>
                </div>
              </div>
                `
            });
            page == 5 ? nextPage.parentElement.style.display = "none" : nextPage.parentElement.style.display = "block";
            page == 1 ? previousPage.parentElement.style.display = "none" : previousPage.parentElement.style.display = "block";
        })
        .catch(err => console.log(err))
}
showDataOnLoad()

// console.log(searchBar)
searchBar.addEventListener("keydown", (e) => {
    // console.log(e)
    if (e.keyCode == 13) {
        searchNews()
    }
})
let searchNews = (filterValue) => {
    if (filterValue) {
        newsDisplayArea.innerHTML = "";
        showDataOnLoad(filterValue)
    } else {
        if (searchBar.value.trim() == "") {
            console.log("Enter your query correctly")
        } else {
            newsDisplayArea.innerHTML = "";
            showDataOnLoad(searchBar.value)
        }
    }
}

nextPage.addEventListener("click", () => {
    if (page < 5) {
        page++;
        newsDisplayArea.innerHTML = "";
        showDataOnLoad(searchBar.value)
        currentPage.innerHTML = page;
    }
})

previousPage.addEventListener("click", () => {
    if (page > 1) {
        page--;
        newsDisplayArea.innerHTML = "";
        showDataOnLoad(searchBar.value)
        currentPage.innerHTML = page;
    }
})