function loadCategories(){
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then(res => res.json())
    .then((data) => displayCategories(data.categories));
};
function loadVideos(){
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then(res => res.json())
    .then((data) => displayVideos(data.videos));
};
const loadCategoryVideos = (id) => {
    const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
    //console.log(url);
    fetch(url)
    .then(res => res.json())
    .then((data) => displayVideos(data.category));
}

function displayCategories(categories){
    //console.log(categories);

    //loop operation in object
    const categoryContainer = document.getElementById("category-container");
    for(let cat of categories){
        //console.log(cat);
    
    //create element
    const categoryDiv = document.createElement("div");
    categoryDiv.innerHTML = `
    <button onclick="loadCategoryVideos(${cat.category_id})" class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
    `;
    //append the element
    categoryContainer.append(categoryDiv);
    };
};


const displayVideos = (videos) => {
    const videoContainer = document.getElementById("video-container");
    videoContainer.innerHTML = "";
    if(videos.length ==0){
        //console.log("No content");
        videoContainer.innerHTML = `
        <div class="col-span-full flex flex-col justify-center items-center text-center py-20">
        <img class="w-[120px]" src="assets/Icon.png" alt="">
        <h2 class=" text-2xl font-bold">Ops!!! There is no content here</h2>
    </div>`;
        return;
    }
    videos.forEach((video) => {
        //console.log(video);
        console.log(videos.length);
        const videoCard = document.createElement("div");
        videoCard.innerHTML = `
        <div class="card bg-base-100">
            <figure class="relative">
                <img class="w-full h-[150px] object-cover"
                src="${video.thumbnail}"
                alt="" />
                <span class="absolute bottom-3 right-3 text-white bg-black px-2 rounded"> 3 hours 56 min ago</span>
            </figure>
            
            <div class="flex gap-3 px-2 py-5">
                <div class="profile">
                    <div class="avatar">
                        <div class="ring-primary ring-offset-base-100 w-8 rounded-full ring ring-offset-2">
                          <img src="${video.authors[0].profile_picture}" />
                        </div>
                      </div>
                </div>
                <div class="intro">
                    <h2 class="text-lg font-semibold">${video.title}</h2>
                    <p class="text-sm text-gray-400 flex gap-1">
                        ${video.authors[0].profile_name} 
                        <img class=" w-5 h-5"
                         src="https://img.icons8.com/?size=100&id=98A4yZTt9abw&format=png&color=000000" alt=""> 
                        </p>
                    <p class="text-sm text-gray-400 flex gap-1">${video.others.views}</p>
                </div>
            </div>
            </div>
        `;
        


        videoContainer.append(videoCard);
    });
};

loadCategories();
