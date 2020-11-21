javascript:(()=>{
    path = 'narou-8.js';
    prefix = 'https://raw.githubusercontent.com/reodon/narou-vertical/master/';

    try{
	loadScript( prefix + path );
    }
    catch(e){
	let str = "";
	str += 'name:\n' + e.name +'\n\n';
	str += 'message:\n' + e.message + '\n\n';
	str += 'stack:\n' + e.stack;
	alert(str);
	throw e;
    }
    
    function loadScript(url, props = null){
	let s = document.createElement('script');
	if(props)
	    Object.entries(props).forEach( ([key, value]) => {
		(key.split('-')[0] === 'data')
		    ? s.dataset[key.split('-').slice(1).join('-')] = value
		    : s[key] = value
	    } );
	fetch(url)
	    .then(res => res.text())
	    .then(text => {
		s.insertAdjacentHTML('afterbegin', text);
		document.body.appendChild(s);
	    });
	return s;
    }
})()
