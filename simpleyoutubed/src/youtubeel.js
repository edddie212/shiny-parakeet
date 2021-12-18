window.onload = () => {
    const testing = 'https://www.youtube.com/watch?v=' + window.ytplayer.bootstrapPlayerResponse.videoDetails.videoId;
    const videoUrl = window.ytplayer.config.args.raw_player_response.streamingData.formats[0];
    const  videoUrl2 = window.ytplayer.config.args.raw_player_response.streamingData.formats;
    const container = document.getElementById("info");
    const btn = document.createElement("a");


    btn.className = "style-scope ytd-video-owner-renderer";
    btn.setAttribute("href", !videoUrl.url ? testing : videoUrl.url);
    btn.setAttribute('target', '_blank');
    btn.setAttribute('id', 'my-download-btn');
    btn.setAttribute('data-type', videoUrl.memeType);

    btn.innerHTML = "Download Video";
    btn.style.backgroundColor = '#c53929';
    btn.style.color = '#ffffff';
    btn.style.fontSize = '18px';
    btn.style.margin = '8px';
    btn.style.borderRadius = '4px';
    container.appendChild(btn);

    btn.addEventListener("click", (e) => {
        const url = !videoUrl.url ? testing : videoUrl.url;
        const name = ytplayer.bootstrapPlayerResponse.videoDetails.title;
        const dataType = videoUrl.memeType;
        let data = {url:url, name:name, sender:'PICKLERICK', type: dataType};
        data = JSON.parse(JSON.stringify(data));
        window.postMessage( data , "*");
    });



    !videoUrl.url ? console.log('Our Extension Has Been Loaded Yeay!', 'Sorry there is no download link please copy  the url instead!', testing) :
    console.log('Our Extension Has Been Loaded Yeay!', 'Your download link is ', videoUrl.url);









}



