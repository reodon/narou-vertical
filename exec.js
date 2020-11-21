isLocal = false;

if(isLocal){
		loadScriptLocal("file:///C:/cygwin64/home/User/reodon.github.io/scripts/2/"+"narou-2-function.js")
		loadScriptLocal("file:///C:/cygwin64/home/User/reodon.github.io/scripts/2/"+"narou-2.js")
}
else{
		loadScript('https://raw.githubusercontent.com/reodon/reodon.github.io/master/scripts/'+'2/narou-2-function.js');
		loadScript('https://raw.githubusercontent.com/reodon/reodon.github.io/master/scripts/'+'2/narou-2.js');
}


function loadScript(url){
		let s = document.createElement('script');
		fetch(url)
				.then(res => res.text())
				.then(text => {s.insertAdjacentHTML('afterbegin', text); document.body.appendChild(s)});
}
function loadScriptLocal(url){
		let s = document.createElement('script');
		s.src = url;
		document.body.appendChild(s);
}


