

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

            removeActiveClass();
            const ButtonClicked = document.getElementById('btn-all');
            ButtonClicked.classList.add("bg-red-600");
            ButtonClicked.classList.add("text-white");
            ButtonClicked.classList.add("active");

            ShowVideos(data.videos);
        })
}
removeActiveClass = () => {
    const activeButtons = document.getElementsByClassName("active");
    for(let btn of activeButtons){
        btn.classList.remove("bg-red-600");
        btn.classList.remove("text-white");
        btn.classList.remove("active");
    }


}
LoadVIdeoDetails = (id) => {
    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${id}`;
    fetch(url)
    .then(response => response.json())
    .then(data => {
        DisplayVideoDetails(data.video);
    })
}
DisplayVideoDetails = (data) => {
    document.getElementById('Video_Details').showModal();

    const videoPlay = document.getElementById("modal_details_container");
    videoPlay.innerHTML = `
        <div class="">
        <div class="card-body">
            <h2 class="font-bold text-lg">${data.title}</h2>
            <p>${data.description}</p>
        </div>
        <figure>
            <img
            src="${data.thumbnail}"
            alt="Shoes" />
        </figure>
        </div>

    `;
}
showCategory = (buttons) => {
    CategoryContainer = document.getElementById('category_container');
    for(const button of buttons){
        const new_btn = document.createElement('button');
        new_btn.innerHTML = `<button id='btn-${button.category_id}' class="btn btn-small hover:text-white hover:bg-[#FF1F3D]" onclick="FilterCategory(${button.category_id})">${button.category}</button>` ;

        CategoryContainer.appendChild(new_btn);
        console.log(button)
    }
}
FilterCategory = (id) => {
    const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
    fetch(url)
    .then(resources => resources.json())
    .then(data => {
        removeActiveClass();
        const ButtonClicked = document.getElementById(`btn-${id}`);
        ButtonClicked.classList.add("bg-red-600");
        ButtonClicked.classList.add("text-white");
        ButtonClicked.classList.add("active");
        console.log(ButtonClicked );
        ShowVideos(data.category);
    })

}
ShowVideos = (VideoInfo) => {
    document.getElementById('VideoContainer').innerHTML = ``;
    Container = document.getElementById('VideoContainer');

    if(VideoInfo.length == 0){
        Container.innerHTML = `
        <div class="col-span-full flex flex-col justify-center items-center py-20 text-center" id="Nothing_Found">
        <img class="w-30" src="assets/Icon.png" alt="" >
        <h2 class="text-2xl font-semibold">Oops!! Sorry, There is no content Here</h2>
        </div>
        `;
    }
    else{
        VideoInfo.forEach((video) => {

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
                        <p class="text-sm text-gray-400 flex gap-1 items-center py-2">${video.authors[0].profile_name}
                        ${video.authors[0].verified == true ? `<img src="https://img.icons8.com/?size=32&id=6xO3fnY41hu2&format=png" class="w-4" alt=""></p>` : ''}
                        <p class="text-sm text-gray-400 ">${video.others.views} Views </p>
                    </div>
                </div>
                <button class="btn btn-block" id="Video-Number-${video.video_id}" onclick="LoadVIdeoDetails('${video.video_id}')";>Open Video</button>
            </div>`;
            Container.appendChild(videoCart);
        });
    }


};

document.getElementById("searchInput").addEventListener('keyup', function(event){
    event.preventDefault();
    const input = event.target.value;
    const url = `https://openapi.programming-hero.com/api/phero-tube/videos?title=${input}`
    fetch(url)
        .then(resources => resources.json())
        .then(data => {
            ShowVideos(data.videos);
        })
});

LoadCategory();
LoadVideos();