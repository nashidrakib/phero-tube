const loadData = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/categories`);
    const data = await res.json();
    // console.log(data.data)

    const buttonContainer = document.getElementById('button-container');

    data.data.forEach((category) => {
        const div = document.createElement('div');
        div.innerHTML = `
        <button onclick="handleVideoCards('${category.category_id}')" class="btn bg-gray-300 hover:bg-red-600 hover:text-white mx-5 my-2">${category.category}</button>
        `
        buttonContainer.appendChild(div);
    });

}



const handleVideoCards = async (categoryId) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const data = await res.json();

    const cardContainer = document.getElementById("card-container");
    cardContainer.innerText = '';

    if (data.data == 0) {
        noVideoLogo.classList.remove("hidden");
    }
    else {
        noVideoLogo.classList.add("hidden")
        const button = document.getElementById('sortButton');
        // console.log(button, 'button');
        button.addEventListener('click', function () {
            cardContainer.innerText = '';
            data.data.sort(function (a, b) {
                const viewsA = parseInt(a.others.views);
                const viewsB = parseInt(b.others.views);
                return viewsB - viewsA;
            });
            data.data?.forEach((videos) => {
                console.log(videos, 'v');
                function secondToHour(seconds) {
                    const hours = Math.floor(seconds / 3600);
                    return hours;
                }
                function secondToMinutes(seconds) {
                    const hours = Math.floor(seconds / 3600);
                    const remainingSeconds = seconds % 3600;
                    const minutes = Math.floor(remainingSeconds / 60);
                    return minutes;
                }
    
                const div = document.createElement('div');
                div.innerHTML = `
                <div class="card lg:w-96 p-1 md:p-3">
                    <img class="object-cover h-[220px] rounded-xl relative" src="${videos.thumbnail}" />
                    <div class="absolute rounded-md px-2 bg-slate-950 lg:ml-[220px] ml-[180px] mt-[190px] md:ml-[220px] md:mt-[180px]">
                        <p class="text-white">${videos.others.posted_date ? `${secondToHour(videos.others.posted_date)}hrs ${secondToMinutes(videos.others.posted_date)} min ago` : ''}  </p>
                    </div>
                    <div class="flex mt-7">
                        <img class="h-14 w-14 object-cover rounded-full" src="${videos.authors[0]?.profile_picture}" alt="">
                        <div class="ml-4">
                            <h2 class="card-title text-2xl font-bold">${videos.title}</h2>
                            <div class="flex items-center mt-3">
                                <p class="text-2xl">${videos.authors[0].profile_name}</p>
                                <img class="ml-2 h-9" src="${videos.authors[0]?.verified ? 'verified.png' : ''}" alt="">
                            </div>
                            <p class="mt-3 text-2xl">${videos.others.views} views</p>
                        </div>
                    </div>
                </div>
                `;
                cardContainer.appendChild(div);
            })
        });
        console.log(data.data, 'hello');
        data.data?.forEach((videos) => {
            console.log(videos, 'v');
            function secondToHour(seconds) {
                const hours = Math.floor(seconds / 3600);
                return hours;
            }
            function secondToMinutes(seconds) {
                const hours = Math.floor(seconds / 3600);
                const remainingSeconds = seconds % 3600;
                const minutes = Math.floor(remainingSeconds / 60);
                return minutes;
            }

            const div = document.createElement('div');
            div.innerHTML = `
            <div class="card lg:w-96 p-1 md:p-3">
                    <img class="object-cover h-[220px] rounded-xl relative" src="${videos.thumbnail}" />
                    <div class="absolute rounded-md px-2 bg-slate-950 lg:ml-[220px] ml-[180px] mt-[190px] md:ml-[220px] md:mt-[180px]">
                        <p class="text-white">${videos.others.posted_date ? `${secondToHour(videos.others.posted_date)}hrs ${secondToMinutes(videos.others.posted_date)} min ago` : ''}  </p>
                    </div>
                    <div class="flex mt-7">
                        <img class="h-14 w-14 object-cover rounded-full" src="${videos.authors[0]?.profile_picture}" alt="">
                        <div class="ml-4">
                            <h2 class="card-title text-2xl font-bold">${videos.title}</h2>
                            <div class="flex items-center mt-3">
                                <p class="text-2xl">${videos.authors[0].profile_name}</p>
                                <img class="ml-2 h-9" src="${videos.authors[0]?.verified ? 'verified.png' : ''}" alt="">
                            </div>
                            <p class="mt-3 text-2xl">${videos.others.views} views</p>
                        </div>
                    </div>
                </div>
            `;
            cardContainer.appendChild(div);
        })
    }
}

handleVideoCards();

loadData();


