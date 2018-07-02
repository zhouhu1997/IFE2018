var music = document.getElementById("music");
var audio = document.getElementsByTagName("audio")[0];
var page1 = document.getElementById("page1");
var page2 = document.getElementById("page2");
var page3 = document.getElementById("page3");


audio.addEventListener('ended', function () {
	music.classList.remove("play");

},false)


music.addEventListener('touchstart', function () {
	if (audio.paused){
		audio.play();
		console.log('play');
		this.classList.add("play");
	} else {
		audio.pause();
		console.log('pause');
		this.classList.remove("play");
	}
}, false);

page1.addEventListener('touchstart', function () {
	page1.style.display = "none";
	page2.style.display = "block";
	page3.style.display = "block";
	page3.style.top = "100%";

	setTimeout(function () {
		page2.classList.add("fadeOut");
		page3.classList.add("fadeIn");
	}, 5500);
}, false);
