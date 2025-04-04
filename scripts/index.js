

LoadCategory = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(resources => resources.json())
        .then(data => {
            showCategory(data.categories);
    });
}
LoadVideos = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
        .then(resources => resources.json())
        .then(data => {
            ShowVideos(data.videos);
        })
}
showCategory = (buttons) => {
    CategoryContainer = document.getElementById('category_container');
    for(const button of buttons){
        const new_btn = document.createElement('button');
        new_btn.innerHTML = `<button class="btn btn-small hover:text-white hover:bg-[#FF1F3D]">${button.category}</button>` ;

        CategoryContainer.appendChild(new_btn);
        console.log(button)
    }
}
ShowVideos = (VideoInfo) => {
    Container = document.getElementById('VideoContainer');
    VideoInfo.forEach((video) => {
        console.log(video);

        const videoCart = document.createElement("div");
        videoCart.innerHTML = `
        <div class="card  my-5">
            <figure class="relative">
                <img class="h-[300px] w-12/12 object-cover rounded-lg " src="${video.thumbnail}" alt="Shoes" />
                <span class="absolute bottom-2 right-2 text-white bg-black opacity-80 px-2 text-sm rounded">3hrs 56 min ago</span>
            </figure>
            <div class="flex gap-3 px-0 py-5">
                <div class="profile">
                    <div class="avatar">
                        <div class="ring-primary ring-offset-base-100 w-6 rounded-full ring ring-offset-2">
                            <img src="${video.authors[0].profile_picture}" />
                        </div>
                    </div>
                </div>
                <div class="intro">
                    <h2 class="text-lg font-semibold">${video.title}</h2>
                    <p class="text-sm text-gray-400 flex gap-1 items-center py-2">${video.authors[0].profile_name} <img src="https://img.icons8.com/?size=32&id=6xO3fnY41hu2&format=png" class="w-4" alt=""></p>
                    <p class="text-sm text-gray-400 ">${video.others.views} Views </p>
                </div>
            </div>
        </div>

        `;
        Container.appendChild(videoCart);
    })
}

LoadCategory();
LoadVideos();


