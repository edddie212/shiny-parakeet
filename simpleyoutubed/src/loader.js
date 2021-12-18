s = document.createElement('script');
s.src = chrome.runtime.getURL('src/youtubeel.js');
s.onload = () => {s.remove()};
document.head.appendChild(s);

window.addEventListener('message', (event) =>{
   console.log(event.data.sender, event);

   let downlaodLinkName = event.data.name;
   console.log(downlaodLinkName.trim())
});