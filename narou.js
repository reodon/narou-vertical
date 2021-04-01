// (()=>{
$$__DEBUG__$$ = false;
delete $;


const zip = xs => ys => 
		(xs.length < ys.length)? xs.map( (e, i) => [e, ys[i]] ) 
                        	 : ys.map( (e, i) => [xs[i], e] );

function clone(a){
		const typeOfFine = x => Object.prototype.toString.call(x).slice(8, -1);
    const mapForObject = f => x => {
				let descriptors =
						Object.keys(x).reduce( (acc, key) => {
  							let desc = Object.getOwnPropertyDescriptor(x, key);
								(Reflect.getOwnPropertyDescriptor(desc, 'value'))
										? desc.value = f(desc.value)
										: null;
								acc[key] = desc;
								return acc;
						}, {});
				Object.getOwnPropertySymbols(x).forEach(sym => {
						let desc = Object.getOwnPropertyDescriptor(x, sym);
						(desc.enumerable)
								? descriptors[sym] = desc
								: null;				
				});
				return Object.defineProperties({}, descriptors);
		};

		let type = typeOfFine(a);
		return (type === 'Array')?   a.map( clone )
          :(type === 'Map')?     new Map( [...a].map( clone ) )
          :(type === 'Set')?     new Set( [...a].map( clone ) )
          :(type === 'Date')?    new Date( a )
          :(type === 'Object')?  mapForObject(clone)(a)
          : a;
}				

Object.prototype.printError
= function(error = undefined){
		let str = "";
		str += 'name:\n' + (error ? error.name : this.name) +'\n\n';
		str += 'message:\n' + (error ? error.message : this.name) + '\n\n';
		str += 'stack:\n' + (error ? error.stack : this.stack);
		navigator.userAgent.search(/mobile/i) && alert(str);
		console.error && console.error(error);
};
Node.prototype.evaluateXPath
= function(xpath){
		let doc = this.ownerDocument || this;
		let xpr = doc.evaluate(
				xpath,
				this,
				null,
				XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
				null);
		return xpr;
};
Node.prototype.queryXPath
= function(xpath){
		try{
				let xpr = this.evaluateXPath(xpath);
				return xpr.snapshotLength > 0 ? xpr.snapshotItem(0) : null;
		}
		catch(e){
				Object.prototype.printError(e);
				return undefined;
		}
};
Node.prototype.queryXPathAll
= function(xpath){
		try{
				let nodes = [];
				let xpr = this.evaluateXPath(xpath);
				for(let i=0; i<xpr.snapshotLength; i++){
						nodes.push(xpr.snapshotItem(i));
				}
				return nodes.length > 0 ? nodes : null;
		}
		catch(e){
				Object.prototype.printError(e);
				return undefined;
		}
};
Node.prototype.x = Node.prototype.queryXPath;
Node.prototype.xx = Node.prototype.queryXPathAll;

const $  = q => document.querySelector(q);
const $$ = q => document.querySelectorAll(q);
const x  = xpath => document.queryXPath(xpath);
const xx  = xpath => document.queryXPathAll(xpath);
Document.prototype.$  = Document.prototype.querySelector;
Document.prototype.$$ = Document.prototype.querySelectorAll
ShadowRoot.prototype.$  = ShadowRoot.prototype.querySelector;
ShadowRoot.prototype.$$ = ShadowRoot.prototype.querySelectorAll
Element.prototype.$  = Element.prototype.querySelector;
Element.prototype.$$ = Element.prototype.querySelectorAll
Element.prototype.iae   = Element.prototype.insertAdjacentElement;
Element.prototype.iaeAB = function(element){ this.insertAdjacentElement('afterbegin', element) };
Element.prototype.iaeBE = function(element){ this.insertAdjacentElement('beforeend', element) };
Element.prototype.iah   = Element.prototype.insertAdjacentHTML;
Element.prototype.iahAB = function(html){ this.insertAdjacentHTML('afterbegin', html) };
Element.prototype.iahBE = function(html){ this.insertAdjacentHTML('beforeend', html) };
StyleSheet.prototype.set = function(selector, property, value, priority = ``){
		for(let rule of this.rules){
        if(selector === rule.selectorText){
            rule.style.setProperty(property, value, priority);
            break;
        }
    }
};
StyleSheet.prototype.remove = function(selector, property){
		for(let rule of this.rules){
        if(selector === rule.selectorText){
            return rule.style.removeProperty(property);
        }
    }
};
const printErr = e => Object.prototype.printError;
const newline = '<p class="newline"><br></p>';
window.__defineGetter__('isMobile', function(){ return ~navigator.userAgent.search(/mobile/i); });
window.__defineGetter__('css', () => $('#css').sheet );
window.__defineGetter__('customProperty', () => $('#custom-property').sheet );




class DetailsButton extends HTMLElement {
		constructor() {
				super();

				let shadow = this.attachShadow({mode: 'open'});
				
				
				let style = document.createElement('style');
				style.insertAdjacentHTML('afterbegin',
            '' +
						':host {' +
						'  display: inline-block;' +
						'  cursor: pointer;' +
						'}' +
						'' +
						'div {' +
						'  background-color: #80808080;' +
						'  border-radius: .5ex;' +
						'}' +
						'' +
						'div a {' +
						'  color: white;' +
						'}' +
						'' +
						'div a span {' +
						'  color: #00000080' +
						'}' +
						'' +
						'div a:visited {' +
						'  color: white;' +
						'}' +
						'' +
						'div:hover {' +
						'  filter: invert(100%);' +
						'  background-color: #808080;' +
						'}' +
						'' +
						'' 
				);
				

				shadow.innerHTML =
						'' +
				    '<template>' +
						'' +
						'<div>' +
						'  <a>&nbsp;' +
						'    <span>\u25bc</span>' +
						'    <slot name="text">NAME</slot>' +
						'  </a>' +
						'</div>' +
						'' +
						'</template>' +
						'' +
						'' ;
				
				let templateContent = shadow.querySelector('template').content;

				shadow.appendChild(style);
				shadow.appendChild(templateContent.cloneNode(true));

				this.a = shadow.querySelector('a');
				
				if(this.getAttributeNode('autonomous'))
						this.addEventListener('click', e => {
								if('open' === this.getAttribute('state'))
										this.setAttribute('state', 'close');
								else
										this.setAttribute('state', 'open');
						}, {capture: true});
				
		}


		static get observedAttributes() { return ['state']; }

		attributeChangedCallback(name, oldValue, newValue) {
				if('state' === name){
						if('open' === newValue){
								this.a.innerHTML = this.a.innerHTML.replace(/\u{25b6}/u, '\u25bc'); /* u25b6:▶, u25bc:▼ */
						}
						if('close' === newValue){
								this.a.innerHTML = this.a.innerHTML.replace(/\u{25bc}/u, '\u25b6');
						}
				}
		}
		
}

customElements.define('details-button', DetailsButton);



		 class FullscreenButton extends HTMLElement {
				 constructor() {
						 super();
						 // Create a shadow root
						 var shadow = this.attachShadow({mode: 'open'});
						 /* shadow.className = 'expand'; */
						 
						 var style = document.createElement('style');
						 style.textContent =
								 '' +
								 ':host {' +
								 '  cursor: pointer;' +
								 '}' +
								 '' +
								 '.wrapper {' +
								 '  position: relative;' +
								 '  font-size: .5em;' +
								 '}' +
								 '' +
								 '.bl {' +
								 '  display: inline-block;' +
								 '}' +
								 '' +
								 '.tr {' +
								 '  display: inline-block;' +
								 '  position: relative;' +
								 '  top: -1em;' +
								 '}' +
								 '' +
                 '.wrapper.compress > .bl {' +
								 '  transform: translate(-15%,  15%) rotate(180deg);' +
								 '}' +
								 '' +
                 '.wrapper.compress > .tr {' +
								 '  transform: translate( 15%, -15%) rotate(180deg);' +
								 '}' +
								 '';
						 
						 let wrapper = document.createElement('span');
						 this.wrapper = wrapper;
						 wrapper.className = 'wrapper';

						 // Create spans
						 var bl = document.createElement('span');
						 var tr = document.createElement('span');
						 bl.className = 'bl';
						 tr.className = 'tr';
						 bl.textContent = '\u25e3'; /* u25e3:◣ */
						 tr.textContent = '\u25e5'; /* u25e3:◥ */

						 if(this.getAttributeNode('autonomous'))
								 this.addEventListener('click', e => {
										 // wrapper.classList.toggle('compress');
										 if('true' === this.getAttribute('fullscreen'))
												 this.setAttribute('fullscreen', 'false');
										 else
												 this.setAttribute('fullscreen', 'true');
								 });

						 shadow.appendChild(style);
						 shadow.appendChild(wrapper);
						 wrapper.appendChild(bl);
						 wrapper.appendChild(tr);
				 }

				 static get observedAttributes() { return ['fullscreen']; }
				 

				 attributeChangedCallback(name, oldValue, newValue) {
						 if('fullscreen' === name){
								 if('true' === newValue){
										 this.wrapper.classList.toggle('compress', true);
								 }
								 else if('false' === newValue){
										 this.wrapper.classList.toggle('compress', false);
								 }										 
						 }
				 }


		 }

		 customElements.define('fullscreen-button', FullscreenButton);





const novelID = location.pathname.split('/')[1];


function normalizeURL(url){
		let _url = url.split('/');
		return _url.slice(-1)[0] ? [ ..._url, ""].join('/') : _url.join('/'); 
}

function getScrollbarWH() {
		let div = document.createElement('div');
		div.style = 'min-width: 100vw; min-height: 100vh; visibility: hidden; position: absolute; top: 0;';
		if(flags.isVertical)
				div.style.right = '0';
		else
				div.style.left = '0';
		document.body.appendChild(div);
		let vw = div.getBoundingClientRect().width;
		let vh = div.getBoundingClientRect().height;
		div.style.minWidth = '100%';
		div.style.minHeight = '100%';
		let pcw = div.getBoundingClientRect().width;
		let pch = div.getBoundingClientRect().height;
		div.remove();
		return { width: vw - pcw, height: vh - pch };
}

function getNextHref(force = false){
		let href = $('.showing .bn').x('.//a[text()[contains(., ">>")]]') ?  $('.showing .bn').x('.//a[text()[contains(., ">>")]]').href : "";
		return href;
}
function getPrevHref(force = false){
		let href = $('.showing .bn').x('.//a[text()[contains(., "<<")]]') ?  $('.showing .bn').x('.//a[text()[contains(., "<<")]]').href : "";
		return href;
}
function getTemplateLiteralfromString(str){
		return Function(`"use strict"; return \`${str}\`;`)();
}

function getPrimitiveFromString(str){
		str = ""+str;
		if ('null' === str)
				return null;
		else if ("" === str)
				return "";
    let _type = Function('"use strict";return typeof(' + str + ')')();
		if('undefined' === _type){
				if('undefined' === str)
						return undefined;
				else
						return str;
		}
		let type = _type[0].toUpperCase() + _type.slice(1).toLowerCase();
		return Function(`"use strict"; return Reflect.construct(${type}, [${str}]).valueOf();`)();
};
function getLiteralFromString(str, cast = ""){
		str = ""+str;
		if(cast)
				return Function(`"use strict"; return new ${cast}(${str}).valueOf();`)();
		if ('null' === str)
				return null;
		else if ("" === str)
				return "";
		let _type;
		try {
				_type = Function(`"use strict";return Object.prototype.toString.call(${str}).slice(8, -1).toLowerCase();`)();
		}
		catch(error){
				if(error instanceof ReferenceError)
						_type = 'undefined';
				else
						throw error;
		}
		
		if('undefined' === _type){
				if('undefined' === str)
						return undefined;
				else
						return str;
		}
		else if ('number' === _type){
				if('NaN' === str)
						return NaN;
		}
		else if ('generatorfunction' === _type){
				_type = 'function';
		}
		
		let type = _type[0].toUpperCase() + _type.slice(1).toLowerCase();
		if('function' === typeof(debug)){
				debug(type);
				debug({n:1, a:[1,2], o:{a:1, b:2}, s:'string', b:true, f:0.1});
				debug([1,2], 'array');
				debug('','a');
		}
		return Function(`"use strict"; return new ${type}(${str}).valueOf();`)();
};


function setFromStorage(options, name, DEBUG = false){
		if(DEBUG){
		Object.entries(options).forEach((v, i, a) => {
				/**/debug(v, 'v');
				if('object' === typeof(v[1])){
						setFromStorage(options[v[0]], name+'.'+v[0], DEBUG);
				}
				else{
						if(null != localStorage.getItem(name+'.'+v[0]))
								options[v[0]] = getPrimitiveFromString(localStorage.getItem(name+'.'+v[0]));
				}
		});
		}
}

function duplicateHonbun(obj){
		try{
				/**/debug('duplicateHonbun:start', {});
				Array.from(obj.honbunC.$$('p[id^="L"]')).forEach( v => { v.className = v.id; v.removeAttribute('id'); });
				let original = obj.honbunC.cloneNode(true);
				original.className = 'original';
				obj.original = original;
				/**/debug(obj, 'obj');
				/**/debug('duplicateHonbun:end', {});
				return obj;
		}catch(e){console.error(e)}
}

function insertCustomProperty(){
		document.head.insertAdjacentHTML('beforeend',
																		 `<style id="custom-property">
:root {
  --first-to-last-width: ${rect.firstToLastWidth};
  --honbunC-width: ${rect.honbunCWidth};
  --honbunC-x: ${rect.honbunC.x + window.pageXOffset};
  --header-height: ${$('#novel_header') ? $('#novel_header').style.height : '0'};
  --scroll-bar-width: ${getScrollbarWH().width};
  --scroll-bar-height: ${getScrollbarWH().width};
  /* --scroll-bar-height: ${getScrollbarWH().height}; */
  /* --scroll-bar-width: ${document.documentElement.clientWidth - document.body.clientWidth}; */
  /* --scroll-bar-height: ${document.documentElement.clientHeight - document.body.clientHeight}; */
}
</style>`);
}

function nextChapter(url){
		try{
				let next = $('.showing').nextSibling;
				if(next && next.classList.contains('honbun-c')){
						/**/debug('nextChapter:then', {color: 'goldenrod'});
						Promise.resolve(next)
									 .then(gather)
									 .then(function(obj){
											 let nextOrg = $('.showing-original').nextSibling;
											 $('.showing').classList.remove('showing');
											 next.classList.add('showing');
											 next.onwheel = wheelY2X;
											 $('.showing-original').classList.remove('showing-original');
											 nextOrg.classList.add('showing-original');
											 /**/debug(obj.bn, 'obj.bn');
											 history.pushState(null, ``, $('#next').href);
											 hist.add(new Date(), obj);
											 histStack.push({callback: histStack.backToHonbun}, "", $('#next').href);
											 getNextHref() ? $('#next').href = getNextHref() : $('#next').removeAttribute('href');
											 $('#previous').href = getPrevHref();
											 /**/debug('nextChapter:then:changed', {color: 'goldenrod'});
									 });
						
				}
				else {
						/**/debug('nextChapter:else', {color: 'goldenrod'});
						$('#next').style.visibility = 'hidden';
						/**/debug('nextChapter:else:hidden', {color: 'indigo'});
						fetch(url)
								.catch(() => {
										$('#next').style.visibility = 'visible';
										throw new Error('fetch failed');
								})
								.then(parse)
								.then(gather)
								.then(settingHonbun)
								.then(duplicateHonbun)
								.then(function(obj){
										$('.showing').iae('afterend', obj.honbunC);
										return obj; })
								.then(function(obj){
										$('.showing-original').iae('afterend', obj.original);
										$('.showing').classList.remove('showing');
										$('.showing-original').classList.remove('showing-original');
										obj.honbunC.classList.add('showing');
										obj.honbunC.onwheel = wheelY2X;
										obj.original.classList.add('showing-original');
										replaceHonbun(obj);
										/**/debug(obj.bn, 'obj.bn');
										histStack.push({callback: histStack.backToHonbun}, "", $('#next').href);
										getNextHref() ? $('#next').href = getNextHref() : $('#next').removeAttribute('href');
										$('#previous').href = getPrevHref();
										hist.add(new Date(), obj);
										/**/debug('nextChapter:else:changed', {color: 'goldenrod'});
										return obj; })
								.then(obj => {
										$('#next').style.visibility = ``;
										/**/debug(obj, 'obj');
										/**/debug('nextChapter:else:visible', {color: 'indigo'}); });
				}
				return url;
		}catch(e){console.error(e)}
}
function prevChapter(url){
		try{
				let prev = $('.showing').previousSibling;
				if(prev && prev.classList.contains('honbun-c')){
						/**/debug('prevChapter:then', {color: 'goldenrod'});
						Promise.resolve(prev)
									 .then(gather)
									 .then(function(obj){
											 let prevOrg = $('.showing-original').previousSibling;
											 $('.showing').classList.remove('showing');
											 prev.classList.add('showing');
											 prev.onwheel = wheelY2X;
											 $('.showing-original').classList.remove('showing-original');
											 prevOrg.classList.add('showing-original');
											 histStack.push({callback: histStack.backToHonbun}, "", $('#previous').href);
											 hist.add(new Date(), obj);
											 $('#next').href = getNextHref();
											 getPrevHref() ? $('#previous').href = getPrevHref() : $('#previous').removeAttribute('href');
											 /**/debug('prevChapter:then:changed', {color: 'goldenrod'});
									 });
						
				}
				else {
						/**/debug('prevChapter:else', {color: 'goldenrod'});
						$('#previous').style.visibility = 'hidden';
						/**/debug('prevChapter:else:hidden', {color: 'indigo'});
						
						fetch(url)
								.catch(() => {
										$('#previous').style.visibility = 'visible';
										throw new Error('fetch failed');
								})
								.then(parse)
								.then(gather)
								.then(settingHonbun)
								.then(duplicateHonbun)
								.then(function(obj){
										$('.showing').iae('beforebegin', obj.honbunC);
										return obj; })
								.then(function(obj){
										$('.showing-original').iae('beforebegin', obj.original);
										$('.showing').classList.remove('showing');
										$('.showing-original').classList.remove('showing-original');
										obj.honbunC.classList.add('showing');
										obj.honbunC.onwheel = wheelY2X;
										obj.original.classList.add('showing-original');
										replaceHonbun(obj);
										histStack.push({callback: histStack.backToHonbun}, "", $('#previous').href);
										$('#next').href = getNextHref();
										getPrevHref() ? $('#previous').href = getPrevHref() : $('#previous').removeAttribute('href');
										hist.add(new Date(), obj);
										/**/debug('prevChapter:else:changed', {color: 'goldenrod'});
										return obj;	})
								.then(obj => {
										$('#previous').style.visibility = ``;
										/**/debug(obj, 'obj');
										/**/debug('prevChapter:else:visible', {color: 'indigo'}); });
				}
				return url;
		}catch(e){console.error(e)}
}


function replaceHonbun(obj){
		try{
				/**/debug('replaceHonbun:start', {});
				zip( [...obj.honbunC.$$('p')] )( [...obj.original.$$('p')] ).forEach( ([hcP, orgP]) => {
						if(orgP.textContent){
								hcP.innerHTML = orgP.innerHTML.replace(fullRegexp, toHalfwidth);
								hcP.innerHTML = hcP.innerHTML.replace(halfRegexp, combineUpright);
						}
				});
				/**/debug('replaceHonbun:end', {});
				return obj;
		}catch(e){console.error(e)}
}

function parse(res){
		/**/debug('parse:start', {});
		return res.text().then(t => {
				let p = new DOMParser();
				let html = p.parseFromString(t, 'text/html');
				/**/debug('parse:end', {});
				return html;
		});
}
function gather(html){
		try{
		/**/debug('gather:start', {});
		let honbunC = html.$('#novel_honbun') ? null : html;
		let honbun = html.$('#novel_honbun') || html.$('.honbun');
		
		let title = html.$$('.contents1 a')[0] || null;
		let author = html.$$('.contents1 a')[1] || null;

		let subtitle = html.$('.novel_subtitle') || html.$('.novel_title') || html.$('.subtitle');
		let no = html.$('#novel_no') || html.$('.no');
		let bn = html.$('.novel_bn') || html.$('.bn');
		let p = html.$('#novel_p') || html.$('.preface') || null;
		let a = html.$('#novel_a') || html.$('.afterword') || null;
		/**/debug(honbun, 'honbun');
		let obj = { honbunC, honbun, title, author, subtitle, no, bn, p, a };
		
		if(honbunC === null)
				Object.values(obj).forEach(e => {e && document.adoptNode(e)});
		obj.html = html;
		/**/debug(obj, 'obj');
		/**/debug('gather:end', {});
				return obj;
		}catch(error){
				console.error(error);
		}
}
async function gatherTOC(html, fetchOption = {}){
		let noveltitle = html.$('.novel_title');
		let indexBox = html.$('.index_box') || html.$('.novel_sublist').$('ul');
		indexBox = [...indexBox.children];
		let pageNavi = html.$('.page_navi'); /* nullable */
		
		if(pageNavi)
				for(let v of [...pageNavi.$$('a')].slice(0, -2)){
						/**/debug(v.href, 'v.href');
						let sublist = await fetch(v.href, fetchOption)
								.then(parse)
								.then( doc => {
										return doc.$('.novel_sublist').$$('li');
								});
						indexBox = [ ...indexBox, ...sublist ];
				}

		return {noveltitle, indexBox};
}
// async function gatherTOC2(html){
// 		let noveltitle = html.$('.novel_title');
// 		let indexBox = html.$('.index_box') || html.$('.novel_sublist').$('ul');
// 		indexBox = [...indexBox.children];
// 		let pageNavi = html.$('.page_navi'); /* nullable */
		
// 				for(let v of [...pageNavi.$$('a')].slice(0, -2)){
// 						/**/debug(v.href, 'v.href');
// 						let sublist = await fetch(v.href)
// 								.then(parse)
// 								.then( doc => {
// 										// indexBox = [ ...indexBox, ...doc.$('.novel_sublist').$$('li') ];
// 										return doc.$('.novel_sublist').$$('li');
// 								});
// 						indexBox = [ ...indexBox, ...sublist ];
// 						console.log(indexBox);
// 				}

// 		return {noveltitle, indexBox};
// }
// (async ()=>{ o = await fetch('https://ncode.syosetu.com/n9863da/').then(parse); oo = await gatherTOC2(o); })();

function settingHonbun(obj){
		try{
				
				/**/debug('settingHonbun:start', {});		
				
				let { honbun, subtitle, no, bn, p, a, honbunC } = obj;

				/**/debug(obj, 'obj');
				/**/debug(honbun, 'honbun');

				if(honbunC === null){

						honbunC = obj.honbunC = document.createElement('div');
						honbunC.className = 'honbun-c';
						
						honbun.id = "";
						honbun.className = 'honbun';
						subtitle.className = 'subtitle';
						no.id = "";
						no.className = 'no';
						bn.style.display = 'none';
						bn.className = 'bn';
						if(p){
								p.id = "";
								p.className = 'preface';
								p.iahAB(newline);
								p.iahBE(newline);
						}
						if(a){
								a.id = "";
								a.className = 'afterword';
								a.iahAB(newline);
								a.iahBE(newline);
						}
						/**/debug(honbun, 'honbun');

						honbunC.iae('afterbegin', honbun);
						honbunC.iah('afterbegin', newline);
						honbunC.iah('afterbegin', newline);
						honbunC.iah('afterbegin', `<div calss="title-no">${subtitle.outerHTML}${no.outerHTML}</div>`);
						honbunC.iah('afterbegin', newline);
						p && honbunC.iah('afterbegin', newline);
						p && honbunC.iae('afterbegin', p);
						honbunC.iae('afterbegin', bn);
						
						honbunC.iah('beforeend', newline);
						honbunC.iah('beforeend', newline);
						honbunC.iah('beforeend', '<p class="tombstone"><span>&#x220e;</span>'); // tombstone
						honbunC.iah('beforeend', newline);
						a && honbunC.iah('beforeend', newline);
						a && honbunC.iae('beforeend', a);

						/**/debug(obj, 'obj');
				}
				/**/debug('settingHonbun:end', {});
				return obj;
		}catch(e){console.error(e)}
}

function settingOriginalBox(){
		try{
				/**/debug('settingOriginalbox:start', {})
				let div = document.createElement('div');
				div.id = 'originalBox';
				div.style.display = 'none';
				document.body.iaeAB(div);
				/**/debug('settingOriginalbox:end', {})
		}catch(e){console.error(e)}
}
function settingInfoBox(obj){
		try{
				/**/debug('settingInfoBox:start', {})
				let infoBox = $('#infoBox') || document.createElement('div');
				infoBox.id = 'infoBox';
				infoBox.style.display = 'none';
				

				let title = obj.title;
				let author = obj.author;
				/**/debug($('.novel_title'), '$(.novel_title)');
				if(!title) {
						title = obj.subtitle;
				}
				if(!author) {
						author = obj.html.$('.novel_writername');
				}
				/**/debug(title, 'title');
				/**/debug(author, 'author');
				$('#title')? infoBox.replaceChild(title, $('#title'))
                   : infoBox.iaeBE(title);
				$('#author')? infoBox.replaceChild(author, $('#author'))
                    : (author)? infoBox.iaeBE(author)
                              : ( author = document.createElement('a'),
                                  author.innerHTML = obj.html.$('.writername').textContent.replace('\u4f5c\u8005\uff1a', ""), /* U+4F5C(作), U+8005(者),  U+FF1A(：)*/
                                  infoBox.iaeBE(author)
                                );
				title.id = 'title';
				author.id = 'author';
				obj.infoBox = infoBox;
				/**/debug('settingInfoBox:end', {})
				return obj;
				
		}catch(e){console.error(e)}
}


function settingButtons(){
		try{				
				/**/debug('settingButtons:start', {});
				var flexbox = document.createElement('div');
				flexbox.id = 'container-of-buttons';
				flexbox.setAttribute('ontouchstart', "");

				var buttons = [
						{ name: 'next',
							innerHTML: options.useWebFontForButtons ? '<i class="fas fa-angle-double-left fa-fw fa-lg"></i>' : '\u23ee', /* u23ee:"Black Left-Pointing Double Triangle with Vertical Bar" */
							class: 'buttons deg0toM90',
							href:	getNextHref(),
							function: functions.next,	},
						{ name: 'bottom',
							innerHTML: options.useWebFontForButtons ? '<i class="fas fa-angle-left fa-fw fa-lg"></i>' : '\u23ea', /* u23ea:"Black Left-Pointing Double Triangle" */
							class: 'buttons deg0toM90',
							href: '#',
							function: functions.bottom },
						// { name: 'left',
						// 	// text: '\u25c0', /* u25c0:◀ */
						// 	class: 'buttons deg0toM90',
						// 	function: functions.left },
						{ name: 'switch-writing-mode',
							innerHTML: options.useWebFontForButtons ? '<i class="fas fa-file-alt fa-fw fa-rotate-270 fa-lg"></i>' : '\u2193', /* u2193:↓ */
							class: 'buttons ' + (options.useWebFontForButtons ? `` : 'deg0toM90'),
							href: '#',
							function: functions.switchWritingMode },
						{ name: 'fullscreen',
							innerHTML: options.useWebFontForButtons ? '<i class="fas fa-expand fa-fw fa-lg"></i>' : '<fullscreen-button fullscreen="false"></fullscreen-button>', 
							class: 'buttons ',
							href: '#',
							function: e => {
									let awesome = e.currentTarget.$('i.fas');
									let fsb     = e.currentTarget.$('fullscreen-button');
									if(awesome){
											awesome.classList.contains('fa-expand') && awesome.classList.replace('fa-expand', 'fa-compress');
									}
									else{
											('true' === fsb.getAttribute('fullscreen'))? fsb.setAttribute('fullscreen', 'false')
                                                                 : fsb.setAttribute('fullscreen', 'true');
									}
									(document.fullscreenElement)? document.exitFullscreen()
                                              : document.documentElement.requestFullscreen();
							},
						},
						// { name: 'right',
						// 	// text: '\u25b6', /* u25b6:▶ */
						// 	class: 'buttons deg0toM90',
						// 	function: functions.right },
						{ name: 'top',
							innerHTML: options.useWebFontForButtons ? '<i class="fas fa-angle-right fa-fw fa-lg"></i>' : '\u23e9', /* u23e9:"Black Right-Pointing Double Triangle" */
							class: 'buttons deg0toM90',
							href: '#',
							function: functions.top },
						{ name: 'previous',
							innerHTML: options.useWebFontForButtons ? '<i class="fas fa-angle-double-right fa-fw fa-lg"></i>' : '\u23ed', /* u23ed: */

							class: 'buttons deg0toM90',
							href:	getPrevHref(),
							function: functions.previous },
				];
				/**/debug('settingButtons:inner', {});
				buttons.forEach((v, k, a)=>{
						let button = document.createElement('a');
						button.id = v.name;
						button.dataset.index = k;
						button.className = v.class;
						button.innerHTML = v.innerHTML;
						button.addEventListener('click', v.function, {capture: true, passive: false});
						button.addEventListener('mouseenter', e => {
								let array = Array.from(e.currentTarget.parentNode.children);
								let n = ~~e.currentTarget.dataset.index;
								array.splice(n,1);
								e.currentTarget.classList.add('hovering');
								array.forEach(v => {v.classList.add('not-hovering')});
						});
						button.addEventListener('mouseleave', e => {
								let array = Array.from(e.currentTarget.parentNode.children);
								let n = ~~e.currentTarget.dataset.index;
								array.splice(n,1);
								e.currentTarget.classList.remove('hovering');
								array.forEach(v => {v.classList.remove('not-hovering')});
						});
						flexbox.insertAdjacentElement('beforeend', button);
				});
				document.body.insertAdjacentElement('afterbegin', flexbox);
				/**/debug('settingButtons:end', {});
		}catch(e){console.error(e)}
}

function arb2china(arb, is1000 = false){
		let units = ['','万','億','兆','京','垓','𥝱','穣','溝','澗','正','載','極','恒河沙','阿僧祇','那由多','不可思議','無量大数'];
		let numerals = ['〇','一','二','三','四','五','六','七','八','九'];
		arb = arb.toString().replace(/,/g, "");
    /**/debug(arb, 'arb');
		let n = 0;
		let arr = [];
    let unit;

		if(~arb.indexOf('.')){
				if(options.number.useGrouping)
						return arb3china(arb);
				else
						return arb3china(arb);
		}
				
		do{ let a = [];
        if((unit = units.shift()) === undefined){
						if(options.number.useGrouping)
								return parseInt(arb).toLocaleString(lang, grouping);
						else
								return arb;
				}
				/**/debug(unit, 'unit');

				arr.push(unit);
				/**/debug(arr.toString(), 'arr');
				a.push(Array.from(arb).reverse().slice(n,n+=4));
				a = a.flat().map((v,i,a) => {
  							let tmp = (v == '0')? ""
                                  : (
                                      (i==0)? numerals[v]
                                            : (v == '1' && (i != 3 || !is1000))? ""
                                                                               : numerals[v]
                                    ) + {0:"", 1:'十', 2:'百', 3:'千'}[i];
						/**/debug(`v: ${v}, i: ${i}, tmp: ${tmp}`, {color: 'teal'});
						return tmp});
				a.every(v => v === "") && arr.pop();
				arr = arr.concat(a);
				/**/debug(arr.toString(), 'arr');
		}while(n < arb.length);
		return arr.reduce((acc, v) => v + acc).toString();

		function arb3china(arb){
				return Array.from(arb).reduce( (acc, v) => {
						return acc + (!Number.isNaN(v - 0)? numerals[v]
                                              : (v === '.')? '\uff65' /* U+30FB(・), U+FF65(･) */
                                                           : (v === ',')? '\u3001' /* U+3001(、) */
                                                                        : v);
				}, "");
		}
		
}


/* functions */
function toHalfwidth(str) {
		/*
			 if(['―'].includes(str))
			 return '｜';
			 else if(['…'].includes(str))
			 return '･･･';
			 else
		 */
		if(str == '￥')
				return '\\';
		else
				return String.fromCharCode(str.charCodeAt(0) - 0xFEE0);
		/*
			 return halfVal.replace(/”/g, "\"")
			 .replace(/’/g, "'")
			 .replace(/‘/g, "`")
			 .replace(/￥/g, "\\")
			 .replace(/　/g, " ")
			 .replace(/〜/g, "~");
		 */
}

function toFullwidth(str) {
    return String.fromCharCode(str.charCodeAt(0) + 0xFEE0);
}

function combineUpright(str){
		let combine = (text, options = {}) => {
				if(options.yen)
						return `<span style="text-combine-upright: all; font: 1rem/1.8em sans-serif;">${text}</span>`;
				else
						return `<span style="text-combine-upright: all;">${text}</span>`;
		};

		let _fractionRegexp = ``;
		_fractionRegexp += `^\\d{1,${options.combineUprightDigits}}\\/\\d{1,${options.combineUprightDigits}}$`;
		const fractionRegexp = new RegExp(_fractionRegexp);
		/* 分数 */
		if(str.match(fractionRegexp)){
				if(options.number.useChinaAll){
						return str.replace(/(\d+)\/(\d+)/, (match, p1, p2) => arb2china(p2)+'\u5206\u306e'+arb2china(p1)); /* bunn no */
				}
				else{
						if(str.length == options.combineUprightDigits)
								return combine(str);
						else
								return str.replace(/(\d+)\/(\d+)/, (match, p1, p2) => combine(p1)+'\\'+combine(p2));
				}
		}
		else if(str.match(/^\d+\/\d+$/)){
				if(options.number.useChinaAll){
						return str.replace(/(\d+)\/(\d+)/, (match, p1, p2) => arb2china(p2)+'\u5206\u306e'+arb2china(p1)); /* bunn no */
				}
				else{
						if(options.number.useGrouping)
								return str.replace(/(\d+)\/(\d+)/, (match, p1, p2) => (p1 * 1).toLocaleString(lang, grouping) + '/' + (p2 * 1).toLocaleString(lang, grouping));
						else
								return str;
				}
		}

		if('\u2026' === str) /* u2026:… horizontal ellipsis */
				return '\u22ef'; /* u22ef:⋯ midline horizontal ellipsis */

		
		if(['\u309b', '\u3099', '\uff9e'].includes(str[1])) /* u309b:゛ u3099:゙ uff9e:ﾞ dakuon */
				return `<span style="writing-mode: horizontal-tb>${str[0] + '\u3099'}</span>`;
		if(['\u309c', '\u309a', '\uff9f'].includes(str[1])) /* u309c:゜ u309a:゚ uff9f:ﾟ handakuon */
				return `<span style="writing-mode: horizontal-tb>${str[0] + '\u309a'}</span>`;
		if(HTMLEntities.includes(str))
				return str;
		/* ルビ */
		if(excludedTagNames.map(v => `<${v}>`).includes(str))
				return str;

		/* double quotation */
		if([`"`, '\u201c'].includes(str[0]) && [`"`, '\u201d'].includes(str.slice(-1))) /* u201c:“ u201d:” */
				return `\u301d${str.slice(1, -1).replace(halfRegexp, combineUpright)}\u301f`; /* u301d:〝 u301f:〟 */
		
		// if(['「', '『'].includes(str))
		// 		return '\u301d';
		// if(['」', '』'].includes(str))
		// 		return '\u301f';
		
		/* セリフのフォント変更 */
		if(options.changeDialogueFont){
				if(['「', '『'].includes(str))
						return str+`<span style="font: 400 1rem/1.8em 'Noto Sans JP', sans-serif;">`;
				if(['」', '』'].includes(str))
						return '</span>'+str;
		}
		/* 一文字の場合に全角へ */
		//if(['?', '!'].includes(str))
		if(str.length == 1){
				if(str == ' ')
						return str;
				else{
						if(!isNaN(str * 1) && options.number.useChinaAll)
								return arb2china(str);
						else
								return toFullwidth(str);
				}
		}
		/* 3文字以下は縦中横 */
		if(str.length <= options.combineUprightDigits){
				/* ￥のフォント変更 */
				if(str[0] == '\\')
						return combine(str, {yen: true});
				else
						if(isNaN(str * 1)){
								return combine(str);
						}else{
								if(options.number.useChinaAll){
										return arb2china(str);
								}
								else{
										return combine(str);
								}
						}
		}
		else{ /* 4 moji ijou */
				/* 3桁毎に"，"で区切る */
				if(isNaN(str * 1)){ 
						if(str[0] == '\\'){
								if(options.number.useGrouping)
										return `<span style="font: 400 1rem/1.8em sans-serif;">${str[0]}</span>${(str.slice(1) * 1).toLocaleString(lang, grouping)}`;
								else
										return `<span style="font: 400 1rem/1.8em sans-serif;">${str[0]}</span>${str.slice(1)}`;
						}
						else if(str.slice(-1) == '%'){
								if(options.number.useGrouping)
										return (str.slice(0, -1) * 1).toLocaleString(lang, grouping) + str.slice(-1);
								else
										return str;
						}
						else
								return str;
				}
				else{
						if(options.number.useChina || options.number.useChinaAll){
								return arb2china(str);
						}
						else{
								if(options.number.useGrouping)
										return (str * 1).toLocaleString(lang, grouping);
								else{
										return str;
								}
						}
				}
		}
}

// function backToHonbun(){
// 		removeCCC();
// 		jumpToURL(normalizeURL(location.origin + location.pathname))(new MouseEvent('click'));
// }

// function removeCCC(){
// 		let styles = xx('//style[starts-with(@id, "css-")]');
// 		let ccs    = xx('//div[substring(@id, string-length(@id) - string-length("-cc") +1) = "-cc"]');
// 		styles && styles.forEach(v => v.remove());
// 		   ccs &&    ccs.forEach(v => v.remove());
// 		css.remove('.showing', 'filter');
// }

function toggleNightMode(e){
		if(options.nightMode == false){
				css.set('.showing', 'color', 'white');
				css.set('.showing', 'background-color', 'black');
				options.nightMode = true;
		}
		else{
				css.remove('.showing', 'color');
				css.remove('.showing', 'background-color');
				options.nightMode = false;
		}
}

function openIFrame(e){
		HistoryStack.removeCCC();		

		if('#help' !== location.hash)
				histStack.push({callback: ()=>{ HistoryStack.removeCCC(); openHelp(e)}}, "", '#iframe');
		css.set('.showing', 'filter', 'blur(2px)');
		// document.head.iahBE(`<style id="css-help">
		// 							  .row { width: 100%; }
    //                 .icon { width: 3em; text-align: right; display: inline-block; }
    //                 .caption:before { content:"\\00a0:\\00a0"; } /* nbsp */
    //                 .icon-small { font-size: 1.5em; }
		// 							</style>`);

		let containerContainer = document.createElement('div');
		containerContainer.id = 'help-cc';
		let container = document.createElement('div');
		container.id = 'help-c';
		container.style =
				'' +
				'width: 100%;' +
				'height: 100%;' +
				'padding: 0;' +
				'position: relative;' +
				'border-radius: unset;' +
				'overflow-Y: hidden;' +
				'';
		let buttonsArea = document.createElement('div');
		buttonsArea.id = 'help-buttons';
		buttonsArea.style = 'position: relative; border-bottom: 1px solid #80808080;';
		let urlArea = document.createElement('input');
		urlArea.type = 'text';
		urlArea.id = 'help-url';
		urlArea.value = location.origin + location.pathname;
		
		buttonsArea.iaeBE(urlArea);
		container.iaeBE(buttonsArea);
		containerContainer.appendChild(container);
		document.body.iaeAB(containerContainer);
		
		container.iahBE(
				'' +
						'<iframe' +
						'  id="help-iframe"' +
						`  src="${location.origin + location.pathname}"` +
						'  style="' +
						'    width: 100%;' +
						`    height: calc(100% - ${container.$('#help-buttons').getBoundingClientRect().height}px);` +
						'    border: none;' +
						'    padding: 0;' +
						'    margin: 0;' +
						'  "' +
						// `  style="positon: absolute; top: 0; bottom: 0; left: 0; right: 0;"` +
						// '  sandbox="' +
						// '    allow-downloads-without-user-activation' +/*ユーザーの操作なしでダウンロードが発生することを許可する*/''+
						// '    allow-forms' +/*このキーワードがない場合、リソースのフォーム送信がブロックされる*/''+
						// '    allow-modals' +/*リソースがモーダルウィンドウを開くことができるようにする*/''+
						// '    allow-orientation-lock' +/*リソースがスクリーンの方向をロックすることができるようにする*/''+
						// '    allow-pointer-lock' +/*リソースがPointerLockAPIを使用できるようにする*/''+
						// '    allow-popups' +/*ポップアップを許可する。このキーワードを与えなければ、これらの機能は暗黙に失敗する*/''+
						// '    allow-popups-to-escape-sandbox' +/*sandbox化された文書が、sandboxを継承するウィンドウではないウィンドウをopen可能にする。(例)安全に広告をサンドボックス化し、同じ制約を広告のリンク先のページに強制しないようにすることができる*/''+
						// '    allow-presentation' +/*リソースがプレゼンテーションセッションを開始できるようにする*/''+
						// '    allow-same-origin' +/*このトークンがない場合、リソースは特殊なオリジンとして、常に同一オリジンポリシーに失敗する*/''+
						// '    allow-scripts' +/*リソースがスクリプト(ただし、ポップアップウィンドウを作成しないもの)を実行できるようにする*/''+
						// '    allow-storage-access-by-user-activation ' +/*StorageAccessAPIで親のストレージ容量へのアクセスを要求できる*/''+
						// '    allow-top-navigation' +/*リソースが最上位の閲覧コンテキスト(_topという名前のもの)に移動できるようにする*/''+
						// '    allow-top-navigation-by-user-activation' +/*リソースが最上位の閲覧コンテキストに移動できるが、ユーザの操作に限る*/''+
						// '  "' +
						'    ' +
						'>' +
						'</iframe>');



		
		container.$('#help-iframe').onload =  e => {
				let urlArea = container.$('#help-url');
				try{
						urlArea.value = e.currentTarget.contentWindow.location;
						urlArea.style.backgroundColor = 'transparent';
				}catch(e){
						if(e instanceof DOMException){
								urlArea.style.backgroundColor = 'rgba(255, 0, 0, 0.5)';
						}
						else{
								throw e;
						}
				}
		};
		
		urlArea.addEventListener('change', e => {
				container.$('#help-iframe').src = e.currentTarget.value;
		});
}

function openHelp(e){
		e.preventDefault(); e.stopImmediatePropagation();
		HistoryStack.removeCCC();		

		if('#help' !== location.hash)
				histStack.push({callback: ()=>{ HistoryStack.removeCCC(); openHelp(e)}}, "", '#help');
		css.set('.showing', 'filter', 'blur(2px)');
		document.head.iahBE(`<style id="css-help">
									  .row { width: 100%; }
                    .icon { width: 3em; text-align: right; display: inline-block; }
                    .caption:before { content:"\\00a0:\\00a0"; } /* nbsp */
                    .icon-small { font-size: 1.5em; }
									</style>`);

		let containerContainer = document.createElement('div');
		containerContainer.id = 'help-cc';
		containerContainer.className = 'blur';
		containerContainer.addEventListener('click', e => {
				css.remove('.showing', 'filter');
				$('#help-cc').remove();
				$('#css-help').remove();
		});
		let container = document.createElement('div');
		let buttonOuter = document.createElement('a');
		buttonOuter.href = '#';
		buttonOuter.iahBE('&nbsp;close&nbsp;');
		
		buttonOuter.style = 'border-radius: .5em; background-color: #fffffffe; color: #80808080; display: block; position: absolute; top: 5%; left: 50%; transform: translate(-50%, -50%);'; 
		let html =
				`${$('#next') ?
											`<div class="row">
				<span class="icon">${$('#next').innerHTML}</span>
				<span class="caption">go to next section.</span></div>` : ""}
${$('#bottom') ?
									`<div class="row">
				<span class="icon">${$('#bottom').innerHTML}</span>
				<span class="caption">go to end of this section.</span></div>` : ""}
${$('#left') ?
									`<div class="row">
				<span class="icon">${$('#left').innerHTML}</span>
				<span class="caption">next page.</span></div>` : ""}
${$('#switch-writing-mode') ?
									`<div class="row">
				<span class="icon">${$('#switch-writing-mode').innerHTML}</span>
				<span class="caption">switch writing-mode.</span></div>` : ""}
${$('#right') ?
									`<div class="row">
				<span class="icon">${$('#right').innerHTML}</span>
				<span class="caption">previous page.</span></div>` : ""}
${$('#top') ?
									`<div class="row">
				<span class="icon">${$('#top').innerHTML}</span>
				<span class="caption">go to begin of this section.</span></div>` : ""}
${$('#previous') ?
									`<div class="row">
				<span class="icon">${$('#previous').innerHTML}</span>
				<span class="caption">go to previous section.</span></div>` : ""}
${$('#table-of-contents') ?
									`<div class="row">
				<span class="icon">${$('#table-of-contents').innerHTML}</span>
				<span class="caption">open table of contents.</span></div>` : ""}
${$('#print') ?
									`<div class="row">
				<span class="icon">${$('#print').innerHTML}</span>
				<span class="caption">print chapters.</span></div>` : ""}
${$('#history') ?
									`<div class="row">
				<span class="icon">${$('#history').innerHTML}</span>
				<span class="caption">open history.</span></div>` : ""}
${$('#configure') ?
									`<div class="row">
				<span class="icon">${$('#configure').innerHTML}</span>
				<span class="caption">open configuration.</span></div>` : ""}
${$('#help') ?
									`<div class="row">
				<span class="icon">${$('#help').innerHTML}</span>
				<span class="caption">open help (this page).</span></div>` : ""}`;
		// $('#container-of-buttons').style.display = $('#container-of-buttons2').style.display = 'none';
		container.insertAdjacentHTML('afterbegin', html);
		containerContainer.appendChild(container);
		containerContainer.appendChild(buttonOuter);
		document.body.insertAdjacentElement('afterbegin', containerContainer);
		
		// e.currentTarget.href = !isMobile ? bn.lastElementChild.href : '';
}

function openTOC(e){
		e.preventDefault();
		HistoryStack.removeCCC();
		
		let _event = clone(e);
		if('#table-of-contents' !== location.hash)
				// histStack.push({callback: (function(event){ return function(){ removeCCC(); openTOC(event); }; })(_event)}, "", '#table-of-contents');
				histStack.push({callback: function(){ HistoryStack.removeCCC(); openTOC(e); }}, "", '#table-of-contents');
		document.head.iahBE(
				`<style id="css-toc">

.toc-button {
background-color: #80808080;
border-radius: .5ex;
/* visibility: hidden; */
}
.toc-button a {
color: white;
}
.toc-button a:visited {
color: white;
}
#toc-buttons:hover .toc-button {
visibility: visible;
}
.toc-button:hover {
filter: invert(100%);
background-color: #808080;
}

.toc-chapter {
}
.toc-chapter-title {
font-size: 1.2em;
border-bottom: solid 1px #f1f2f5;
padding-top: 1em;
padding-bottom: .5em;
/* margin-bottom: .5em; */
}
.toc-chapter-title span {
display: inline-block;
}
.toc-chapter-title > span {
 width: 100%; 
/* display: inline-block; */
display: inline-flex;
justify-content: space-between;
/* text-align: left; */
}
/* .toc-chapter-title:before { */
/* content: ">"; */
 /* content: "\\25b6"; */
/* display: inline-block; */
/* } */
.toc-opened .toc-angle {
transform: rotate(90deg);
}
.toc-chapter-sections span {
width: 5ex;
display: inline-block;
text-align: right;
}
.toc-chapter-title + .toc-chapter-sections {
/* font-size: .5em; */
display: none;
/* margin-left: 2em; */
}
											</style>`);

		css.set('.showing', 'filter', 'blur(2px)');
		let containerContainer = document.createElement('div');
		containerContainer.id = 'toc-cc';
		/* containerContainer.style =
			 'z-index: 100; width: 100%; height: 100%; background-color: #80808080;' +
			 'display: flex; justify-content: center; align-items: center; position: fixed; top: 0; right: 0;'; */
		let container = document.createElement('div');
		container.id = 'toc-c';
		/* container.style =	'width: 90%; height: 90%; writing-mode: horizontal-tb; background-color: white;  border-radius: 1em; display: block; justify-content: space-around; align-items: center; flex-direction: column; flex-wrap: ; overflow: auto;'; */
		containerContainer.addEventListener('click', e => {
				$('#css-toc').remove();
				css.remove('.showing', 'filter');
				document.querySelector('#toc-cc').remove();
		});
		container.addEventListener('click', e => {
				e.stopImmediatePropagation();
		});
		let _url = (e.currentTarget)? (e.currentTarget.href)? normalizeURL(e.currentTarget.href)
                                                          : normalizeURL(location.origin + location.pathname)
                                : normalizeURL(e.target.href);
		let url = (e.currentTarget)? (e.currentTarget.href)? _url
                                                         : _url.split('/').slice(0, -2).join('/')
                               :  _url;

		fetch(url)
				.then(parse)
				.then( doc => {
						let noveltitle = doc.$('.novel_title');
						let indexBox = doc.$('.index_box');
						// let indexBox = doc.$('.index_box') || doc.$('.novel_sublist');
						let pageNavi = doc.$('.page_navi'); /* nullable */
						// if(!indexBox) alert(url);
						container.iahBE(`<div id="toc-buttons">
<div id="toc-open-close" class="toc-button"><a href="#">&nbsp;\u25b6&nbsp;ALL&nbsp;</a></div>
</div>`);
						container.iahBE(`<div class="toc-noveltitle" style="width: 100%; text-align: center; font-size: 1.5em; padding-bottom: 1em;">${noveltitle.textContent}</div>`);
						// 													container.iahBE(`<div id="toc-buttons">
						// <div id="toc-open" class="toc-button"><a href="#">&nbsp;open&nbsp;</a></div>
						// <div id="toc-close" class="toc-button"><a href="#">&nbsp;close&nbsp;</a></div>
						// </div>`);
						$('#toc-buttons').addEventListener('click', e => {
								e.stopImmediatePropagation();
								e.currentTarget.style.display = 'none';
								// console.log(`clientX: ${e.clientX}, offsetX: ${e.offsetX}, pageX: ${e.pageX}`);
								// console.log(`clientY: ${e.clientY}, offsetY: ${e.offsetY}, pageY: ${e.pageY}`);
								let x = e.clientX;
								let y = e.clientY;
								let elem = document.elementFromPoint(x, y);
								elem.click();
								/**/debug(elem, 'elem');
								e.currentTarget.style.display = 'flex';
						});
						if($('#toc-open-close'))
								$('#toc-open-close').addEventListener('click', e => {
										e.preventDefault(); e.stopImmediatePropagation();
										let a = e.currentTarget.$('a');
										if(~a.textContent.search('\u25bc')){ /* open */
												for(let e of $$('#toc-c .toc-chapter-title')){
														e.classList.toggle('toc-opened', false);
														e.parentNode.$('.toc-chapter-sections').style.display = 'none';
												}
												a.textContent = a.textContent.replace(/\u{25bc}/u, '\u25b6');
										}
										else {
												for(let e of $$('#toc-c .toc-chapter-title')){
														e.classList.toggle('toc-opened', true);
														e.parentNode.$('.toc-chapter-sections').style.display = 'block';
												}
												a.textContent = a.textContent.replace(/\u{25b6}/u, '\u25bc');
										} }, {passive: false});
						if($('#toc-open'))
								$('#toc-open').addEventListener('click', e => {
										e.preventDefault(); e.stopImmediatePropagation();
										for(let e of $$('#toc-c .toc-chapter-title')){
												e.classList.toggle('toc-opened', true);
												e.parentNode.$('.toc-chapter-sections').style.display = 'block';
										} }, {passive: false});
						if($('#toc-close'))
								$('#toc-close').addEventListener('click', e => {
										e.preventDefault(); e.stopImmediatePropagation();
										for(let e of $$('#toc-c .toc-chapter-title')){
												e.classList.toggle('toc-opened', false);
												e.parentNode.$('.toc-chapter-sections').style.display = 'none';
										} }, {passive: false});
						
						let chapter;
						let title;
						let sections;
						let n = 1;
						const displaySections = e => {
								e.preventDefault(); e.stopImmediatePropagation();
								/* console.log(e.currentTarget); */
								e.currentTarget.classList.toggle('toc-opened');
								let sections = e.currentTarget.parentNode.$('.toc-chapter-sections');
								/* console.log(sections); */
								sections.style.display = sections.style.display == 'none' ? 'block' : 'none';
								e.currentTarget.classList.contains('toc-opened') && e.currentTarget.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
								// e.currentTarget.classList.contains('toc-opened') && e.currentTarget.scrollIntoView(true);
						};
						if(!isMobile)
								Array.from(indexBox.children).forEach( (v, i, a) => {
										if(v.className === 'chapter_title'){
												chapter = document.createElement('div');
												chapter.className = 'toc-chapter';
												title = document.createElement('div');
												title.className = 'toc-chapter-title';
												title.iahAB(`<span><span><span class="toc-angle">${options.useWebfontForButtons ? '<i class="fas fa-caret-right fa-fw fa-xs"></i>' : '\u25b6'}</span>\u00a0\u00a0${v.textContent}</span><span>${n}~</span></span>`);
												title.addEventListener('click', displaySections, {passive: false});
												sections = document.createElement('div');
												sections.className = 'toc-chapter-sections';
												sections.style = 'display: none;';
												chapter.iaeBE(title);
												chapter.iaeBE(sections);
												container.iaeBE(chapter);
												/* chapter.iaeAB(v); */
										}
										else {
												let a = v.$('a');
												a.addEventListener('click', e => { jumpToURL(a.href)(e); $('#toc-cc').click(); }, {passive: false});
												// a.addEventListener('click', jumpToSection, {passive: false});
												// /**/debug(sections, 'sections');
												if(!sections){
														sections = document.createElement('div');
														sections.className = 'toc-chapter-sections';
														sections.style = 'display: block;';
														// chapter.iaeBE(title);
														// chapter.iaeBE(sections);
														container.iaeBE(sections);
												}
												sections.iahBE(`<span>${n}</span>.&nbsp;&nbsp;`);
												sections.iaeBE(a);
												sections.iahBE('<br>');
												n++;
										}
								});
						else {
								// if(!indexBox)
								indexBox = doc.$('.novel_sublist').$$('li');
								(async function(){
										if(pageNavi){
												for(let v of Array.from(pageNavi.$$('a')).slice(0, -2)){
														/**/debug(v.href, 'v.href');
														let sublist = await fetch(v.href)
																.then(parse)
																.then( doc => {
																		// indexBox = [ ...indexBox, ...doc.$('.novel_sublist').$$('li') ];
																		return doc.$('.novel_sublist').$$('li');
																});
														indexBox = [ ...indexBox, ...sublist ];
												}
										}
										
										/**/debug(indexBox, 'indexBox');
										indexBox.forEach( (v, i, a) => {
												if(v.className === 'chapter'){
														chapter = document.createElement('div');
														chapter.className = 'toc-chapter';
														title = document.createElement('div');
														title.className = 'toc-chapter-title';
														title.iahAB(`<span><span><span class="toc-angle">${options.useWebfontForButtons ? '<i class="fas fa-caret-right fa-fw fa-xs"></i>' : '\u25b6'}</span>\u00a0\u00a0${v.textContent}</span><span>${n}~</span></span>`);
														title.addEventListener('click', displaySections, {passive: false});
														sections = document.createElement('div');
														sections.className = 'toc-chapter-sections';
														sections.style = 'display: none;';
														chapter.iaeBE(title);
														chapter.iaeBE(sections);
														container.iaeBE(chapter);
														/* chapter.iaeAB(v); */
												}
												else {
														let a = v.$('a');
														a.addEventListener('click', e => { e.stopImmediatePropagation(); jumpToURL(a.href)(e); $('#toc-cc').click(); }, {passive: false});
														// a.addEventListener('click', e => { e.stopImmediatePropagation(); jumpToSection(e); }, {passive: false});
														if(!sections){
																sections = document.createElement('div');
																sections.className = 'toc-chapter-sections';
																sections.style = 'display: block;';
																// chapter.iaeBE(title);
																// chapter.iaeBE(sections);
																container.iaeBE(sections);
														}
														sections.iahBE(`<span>${n}</span>.&nbsp;&nbsp;`);
														sections.iaeBE(a);
														sections.iahBE('<br>');
														n++;
												}
										});
								})();
						}
				});
		// container.insertAdjacentHTML('afterbegin', html);
		containerContainer.appendChild(container);
		document.body.insertAdjacentElement('afterbegin', containerContainer);
}


// })();
class Favorite{

		constructor(){
				try{
						this.load();
				}
				catch(e){
						if(e instanceof SyntaxError){
								localStorage.removeItem('favorites');
								this.load();
						}
						else{
								throw e;
						}
				}
				this.tempArray = clone(this.favorites);
				// this.save();
				// this.obj = {};
				// this.obj.subtitle = document.createElement('span');
				// this.obj.subtitle.textContent = 'subtitle';
				// this.obj.no = document.createElement('span');
				// this.obj.no.textContent = 'no/no';
		}

		add(date){
				this.load();
				this.push(date);
				this.save();
		}
		
		load(){
				this.favorites = localStorage.getItem('favorites') ? JSON.parse(localStorage.getItem('favorites')) : [];
				// Array.isArray(this.favorites) || this.clear();
				this.favorites.forEach( v => v.time = new Date(v.time) );
		}
		
		save(){
				localStorage.setItem('favorites', JSON.stringify(this.favorites));
		}

		clear(){
				this.favorites = [];
				this.save();
		}
		
		push(date){
				this.favorites.push(
				{
						       time: date,
						      title: $('#title').textContent,
						     author: $('#author').textContent,
						 authorHref: $('#author').href,
						        url: normalizeURL(normalizeURL(location.origin + location.pathname).split('/').slice(0, -2).join('/')),
						 // author: $('#author').textContent,
						// section: obj.subtitle.textContent,
						     // no: obj.no.textContent.split('/')[0] - 0,
				});
		}

		lll(){
				let result = [];
				return (async ()=>{
				let latests = this.latest();
				for(let v of latests){
						let str = await fetch(normalizeURL(v.url).split('/').slice(0, -2).join('/'))
								.then(parse)
								.then(gatherTOC)
								.then(obj => {
										let i = 0;
										obj.indexBox.forEach( v => {
												if(!v.classList.contains('chapter') && !v.classList.contains('chapter_title'))
														i++;
										});
										return (i > v.no)? 'new' : 'not found';
								});
						result.push(str);
				}
						return result;
				})();
		}
		
		latest(){
				let deephs = this.deepen({prop: 'no', order: 'desc'}, this.deepen({prop: 'title'}, this.favorites));
				return deephs.map( v => v[0][0] );
		}
		
		deepen({prop, order = 'asc'}, array){
				let aa = [];
				let  a = [];
				if(!Array.isArray(array[0])){
						array.sort(this[`sortBy${prop[0].toUpperCase()}${prop.slice(1)}Callback`].bind(order));
						array.forEach( (v, i, arr) => {
								a.push(v);
								if(!arr[i+1] || v[prop] !== arr[i+1][prop]){
										aa.push(a);
										a = [];
								}
						});
				}					 
				else{
						array.forEach( v => {
								aa.push(this.deepen({prop: prop, order: order}, v));
						});
				}
				
				return aa;
		}

		deepSort(...args){
				let deepFavorites = [...this.favorites];
								
				args.forEach( ({prop, order = 'asc'}) => {
						deepFavorites = this.deepen({prop: prop, order: order}, deepFavorites);
				});

				deepFavorites = deepFavorites.flat(args.length);

				return deepFavorites;
		}

		sort(callback){
				this.favorites.sort(callback);
		}

		sortByTime(order = 'asc'){
				this.sort(this.sortByTimeCallback.bind(order));
		}

		sortByTitle(order = 'asc'){
				this.sort(this.sortByTitleCallback.bind(order));
		}
		
		sortByAuthor(order = 'asc'){
				this.sort(this.sortByAuthorCallback.bind(order));
		}

		sortByNo(order = 'asc'){
				this.sort(this.sortByNoCallback.bind(order));
		}
		
		sortByTimeCallback(a, b){
				if('asc' === this)
    				return (a.time < b.time)? -1
                  :(a.time > b.time)?  1
				    		  : 0;
				if('desc' === this)
    				return (a.time < b.time)?  1
                  :(a.time > b.time)? -1
				    		  : 0;

				throw new Error('invalid order');
		}

		sortByTitleCallback(a, b){
				if('asc' === this)
    				return  a.title.localeCompare(b.title, navigator.languages[0]);
				if('desc' === this)
    				return -a.title.localeCompare(b.title, navigator.languages[0]);

				throw new Error('invalid order');
		}

		sortByAuthorCallback(a, b){
				if('asc' === this)
    				return  a.author.localeCompare(b.author, navigator.languages[0]);
				if('desc' === this)
    				return -a.author.localeCompare(b.author, navigator.languages[0]);

				throw new Error('invalid order');
		}

		sortByNoCallback(a, b){
				if('asc' === this)
    				return (a.no < b.no)? -1
                  :(a.no > b.no)?  1
				    		  : 0;
				if('desc' === this)
    				return (a.no < b.no)?  1
                  :(a.no > b.no)? -1
				    		  : 0;

				throw new Error('invalid order');
		}
		
		makeFake(recent = false, n = 3, ms = ( 31 * (1000*60)*60*24 )){
				let r = (range, shift=0) => (Math.floor(Math.random()*range))+shift;
				let rs = (range, shift=0, length=2, pad='0') => ((Math.floor(Math.random()*range)+shift)+"").padStart(length, pad);
				let t = () => (2010+r(9))+'-'+rs(12,1)+'-'+rs(28,1)+'T'+rs(24)+':'+rs(60)+':'+rs(60)+'.'+rs(1000,0,3)+'Z';
				let tr = () => new Date() - r(ms);

				for(let i=0; i < n; i++)
						this.push(new Date(recent ? tr() : t()));
		}
}

class ContainerContainer extends HTMLElement {
		constructor(){
				super();

				var shadow = this.attachShadow({mode: 'open'});
				var style = document.createElement('style');
				style.iahAB(
						'' +
								':host {' +
								'  z-index: 100;' +
								'  width: 100%; ' +
								'  height: 100%;' +
								'  background-color: #80808080;' +
								'  display: flex;' +
								'  justify-content: center; ' +
								'  align-items: center;' +
								'  position: fixed;' +
								'  top: 0;' +
								'  right: 0;' +
								'}' +
								'');

				shadow.innerHTML =
						'' +
						'<template>' +
						'  <slot name="container">container</slot>' +
						'</template>' +
						'' ;
				
				let templateContent = shadow.querySelector('template').content;

				shadow.appendChild(style);
				shadow.appendChild(templateContent.cloneNode(true));
				
				this.addEventListener('click', e => {
						e.currentTarget.remove();
				});
				
		}
}
customElements.define('ce-container-container', ContainerContainer);

class Container extends HTMLElement {
		constructor(){
				super();

				var shadow = this.attachShadow({mode: 'open'});
				var style = document.createElement('style');
				style.iahAB(
						'' +
								':host {' +
								'  display: block;' +
								'  width: 80%;' +
								'  height: 80%;' +
								'  writing-mode: horizontal-tb;' +
								'  background-color: white;' +
								'  border-radius: 1em;' +
								'  display: block;' +
								'  overflow: auto;' +
								'  padding: 2em;' +
								'  padding: 0 2em 2em 2em;' +
								'  position: relative;' +
								'}' +
								'');
				
				shadow.innerHTML =
						'' +
						'<template>' +
						'  <slot name="inner-buttons">inner-buttons</slot>' +
						'  <slot name="inner">inner</slot>' +
						'</template>' +
						'' ;
				
				let templateContent = shadow.querySelector('template').content;

				shadow.appendChild(style);
				shadow.appendChild(templateContent.cloneNode(true));
				

				this.addEventListener('click', e => {
						e.stopImmediatePropagation();
				});
				
		}
}
customElements.define('ce-container', Container);

class InnerButtonsArea extends HTMLElement {
		constructor(){
				super();

				var shadow = this.attachShadow({mode: 'open'});
				var style = document.createElement('style');
				style.iahAB(
						'' +
								':host {' +
								'  display: flex;' +
								'  position: sticky;' +
								'  top: 0;' +
								'  width: 100%;' +
								'  padding-top: .5em;' +
								'  padding-bottom: .5em;' +
								'  justify-content: space-around;' +
								'  z-index: 100;' +
								'  background-color: white;' +
								'}' +
								'' +
								'.button {' +
								'  display: inline-block;' +
								'  cursor: pointer;' +
								'  color: white;' +
								'  background-color: #80808080;' +
								'  border-radius: .5ex;' +
								'  margin-top: .5em;' +
								'  margin-bottom: .5em;' +
								'}' +
								'' +
								'.button:visited {' +
								'  color: white;' +
								'}' +
								'' +
								'.button:hover {' +
								'  filter: invert(100%);' +
								'  background-color: #808080;' +
								'}' +
								'' +
								'.button a {' +
								// '  color: white;' +
						'}' +
								'' +
								// '.button a span {' +
						// '  color: #00000080;' +
						// '}' +
						'' +
								// '.button a:visited {' +
						// '  color: white;' +
						// '}' +
						'');
				
				shadow.innerHTML =
						'' +
						'<template>' +
						'  <slot name="buttons">' +
						'    <span class="button">&nbsp;button&nbsp;</span>' +
						'  </slot>' +
						'</template>' +
						'' ;
				
				let templateContent = shadow.querySelector('template').content;

				shadow.appendChild(style);
				shadow.appendChild(templateContent.cloneNode(true));

		}
}
customElements.define('ce-inner-buttons-area', InnerButtonsArea);

function openFavorite(e){
		try{
				/**/debug('openFavorite:start', {});
				
				HistoryStack.removeCCC();				

				if('#favorite' !== location.hash)
						histStack.push({callback: ()=>{ HistoryStack.removeCCC(); openFavorite(e)}}, "", '#favorite');

				css.set('.showing', 'filter', 'blur(2px)');
				
				
				let containerContainer = document.createElement('div');
				containerContainer.id = 'fav-cc';
				let container = document.createElement('div');
				container.id = 'fav-c';
				let buttonsArea = document.createElement('div');
				buttonsArea.id = 'fav-buttons';
				
				let favorites = clone(fav.favorites);
				let latests = hist.latest();
				let title2ValueMap = new Map(latests.map(v => [v.title, v]));
				
				function display(){
						container.$$('.fav-value').forEach(v => v.remove());
						favorites.forEach((v, i, a) => {
								let vH = null;
								let vC = document.createElement('div');
								vC.className = 'fav-value';
								// vC.title = v.time.toLocaleString();
								vC.iahAB(
										'' +
												'<span style="overflow: auto; white-space: nowrap; position: relative;">' +
												''+ '\u300e' + /* U+300E(『) */ '' +
										    ''+ `<a class="fav-a-title" href="${v.url}">` +
												''+''+ `${v.title}` +
												''+ '</a>' +
												''+ '\u300f' + /* U+300F(』) */ '' +
										    ''+ '<br>' +
												''+ 'author: ' +
												''+ `<a class="fav-a-author" href="${v.authorHref}" onclick="openAuthor">` +
												''+''+ `${v.author}` +
												''+ '</a>' +
												''+ '<br>' +
												((vH = title2ValueMap.get(v.title))?
												 ''+ '<span class="fav-span-prev-no">' +
												 ''+''+ 'last section: ' +
												 ''+ '</span>' +
												 ''+ '<span class="fav-span-no" style="width: 5ex; text-align: right; display: inline-block;">' +
												 ''+''+ `${vH.no}` +
												 ''+ '</span>' +
												 ''+ '.&nbsp;' +
												 ''+ `<a class="fav-a-subtitle" href="${vH.url}">` +
												 ''+''+ `${vH.section}` +
												 ''+ '</a>'
												 : 'NO HISTORY') +
												'' +
												''+ '<span class="fav-new"' +
												''+''+''+ 'style="position: fixed; top: 0; left: 100%; display: none; color: white; transform: translateX(-100%);' +
												''+''+''+''+ 'background: linear-gradient(217deg, rgba(255,0,0,.8), rgba(255,0,0,0) 70.71%),' +
												''+''+''+''+''+''+''+''+ 'linear-gradient(127deg, rgba(0,255,0,.8), rgba(0,255,0,0) 70.71%),' +
												''+''+''+''+''+''+''+''+ 'linear-gradient(336deg, rgba(0,0,255,.8), rgba(0,0,255,0) 70.71%);">' +
												''+''+ 'new' +
												''+ '</span>' +
												'' +
												'</span>' +
												'');
								
								vH ? a[i] = {...vH, ...v} : null;
								/**/debug('vH', vH);
								/**/debug('v', v);

								container.iaeBE(vC);
						});

						container.$$('.fav-a-title').forEach(v => {
								v.addEventListener('click', openTOC, {passive: false});
						});
						container.$$('.fav-a-subtitle').forEach(v => {
								v.addEventListener('click', e => { e.preventDefault(); jumpToURL(e.currentTarget.href)(e); }, {passive: false});
						});
				}
				
				document.head.iahBE(
						'<style id="css-fav">' +
								'' +
								'.fav-value {' +
								'  width: 100%;' +
								'  transform: translate(0);' +
								'}' +
								'' +
								'.fav-value > span' +
								'{' +
								'  display: inline-block;' +
								'  width: 100%;' +
								'  padding-top: .5em;' +
								'  padding-bottom: .5em;' +
								'  border-bottom: solid 1px #e0e0e0;' +
								'}' +
								'' +
								'.fav-value > span {' +
								'  background-color: whitesmoke;' +
								'}' +
								'' +
								'.fav-value:nth-child(odd) > span {' +
								'  background-color: ghostwhite;' +
								'}' +
								'' +
								'.fav-button {' +
								'  cursor: pointer;' +
								'  background-color: #80808080;' +
								'  border-radius: .5ex;' +
								'}' +
								'' +
								'.fav-button a {' +
								'  color: white;' +
								'}' +
								'' +
								'.fav-button a span {' +
								'  color: #00000080;' +
								'}' +
								'' +
								'.fav-button a:visited {' +
								'  color: white;' +
								'}' +
								'' +
								'.fav-button:hover {' +
								'  filter: invert(100%);' +
								'  background-color: #808080;' +
								'}' +
								'' +
								'.fav-a-author {' +
								'  font-style: oblique;' +
								'}' +
								'' +
								'</style>');

				
				/**/debug('openFavorite:inter1', {});
				
				buttonsArea.iahAB(
						'' +
								'<div id="fav-add" class="fav-button">' +
								''+ '<a>' +
								// ''+ '&nbsp;' +
								// ''+''+ '<span>' +
								// ''+''+''+ '\u25bc' +
								// ''+''+ '</span>' +
								''+ '&nbsp;' +
								''+ 'ADD' +
								''+ '&nbsp;' +
								''+ '</a>' +
								'</div>' +
								'<div id="fav-check" class="fav-button">' +
								''+ '<a>' +
								''+ '&nbsp;' +
								''+ 'CHECK' +
								''+ '&nbsp;' +
								''+ '</a>' +
								'</div>' +
								'<div id="fav-edit" class="fav-button">' +
								''+ '<a>' +
								''+ '&nbsp;' +
								''+ 'EDIT' +
								''+ '&nbsp;' +
								''+ '</a>' +
								'</div>' +
								'' +
								'' +
								'');
				buttonsArea.$('#fav-add').addEventListener('click', e => {
						if(confirm('add this novel to Favorite ?')){
								fav.add(new Date());
								display();
						}
				});
				buttonsArea.$('#fav-check').addEventListener('click', async e => {
						// favorites.forEach(v => {
						// let result = [];
						let result = new Map();
										// return (async ()=>{
												// let latests = this.latest();
						for(let v of favorites){
								let doc = await fetch(v.url, {cache: 'reload'}).then(parse);
								let obj = await gatherTOC(doc, {cache: 'reload'});
								let i = 0;
								let j = 0;
								let e;
								obj.indexBox.forEach( w => {
										if(!w.classList.contains('chapter') && !w.classList.contains('chapter_title')){
												i++;
												if(i === v.no + 1){
														j = i;
														e = w;
												}
										}
								});
								let newest = {no: i, subtitle: obj.indexBox.slice(-1)[0].$('a')};
								let newer  = {no: j, subtitle: e ? e.$('a') : null};

								/**/debug(v, 'v');
								/**/debug(newest, 'newest');
								/**/debug(newer, 'newer');
								(v.no !== newest.no) && result.set(v.title, {newest, newer});
						}
								
						/**/debug(result, 'result');
						$('#fav-c').$$('.fav-value').forEach(v => {
								let res;
								let title = v.$('.fav-a-title').textContent;
								if(res = result.get(title)){
										// console.log('new');
										v.$('.fav-new').style.display = 'block';
										v.$('.fav-span-prev-no').innerHTML = 'next section: ';
										v.$('.fav-span-no').innerHTML = res.newer.no;
										v.$('.fav-a-subtitle').innerHTML = res.newer.subtitle.textContent;
										v.$('.fav-a-subtitle').href = res.newer.subtitle.href;
										// v.$('.fav-a-subtitle').addEventListener('click', e => {
										// 		e.stopImmediatePropagation();
										// 		jumpToURL(e.currentTarget.href)(e);
										// }, {passive: false});
								}
						});
				});
				container.appendChild(buttonsArea);

				/**/debug('openFavorite:inter2', {});
				


				display();
				containerContainer.appendChild(container);
				document.body.iaeAB(containerContainer);
				
				/**/debug('openFavorite:inter2', {});
				/**/debug('openFavorite:end', {});
		}
		catch(e){ console.error(e); }
}


class Hist{
		// histories
    // obj = {
		// 		subtitle: "",
		// 		no: "",
		// };

		constructor(){
				// this.histories = localStorage.getItem('histories') ? JSON.parse(localStorage.getItem('histories')) : [];
				try{
						this.load();
				}
				catch(e){
						if(e instanceof SyntaxError){
								localStorage.removeItem('histories');
								this.load();
						}
						else{
								throw e;
						}
				}
				// this.save();
				// this.obj = {};
				// this.obj.subtitle = document.createElement('span');
				// this.obj.subtitle.textContent = 'subtitle';
				// this.obj.no = document.createElement('span');
				// this.obj.no.textContent = 'no/no';
		}

		add(date, obj){
				this.load();
				this.unshift(date, obj);
				this.save();
		}
		
		load(){
				this.histories = localStorage.getItem('histories') ? JSON.parse(localStorage.getItem('histories')) : [];
				// Array.isArray(this.histories) || this.clear();
				this.histories.forEach( v => v.time = new Date(v.time) );
		}
		
		save(){
				localStorage.setItem('histories', JSON.stringify(this.histories));
		}

		clear(){
				this.histories = [];
				this.save();
		}
		
		unshift(date, obj){
				this.histories.unshift(
				{
						   time: date,
						  title: $('#title').textContent,
						 author: $('#author').textContent,
						section: obj.subtitle.textContent,
						     no: obj.no.textContent.split('/')[0] - 0,
						    url: normalizeURL(location.origin + location.pathname),
				});
		}

		lll(){
				let result = [];
				return (async ()=>{
				let latests = this.latest();
				for(let v of latests){
						let str = await fetch(normalizeURL(v.url).split('/').slice(0, -2).join('/'))
								.then(parse)
								.then(gatherTOC)
								.then(obj => {
										let i = 0;
										obj.indexBox.forEach( v => {
												if(!v.classList.contains('chapter') && !v.classList.contains('chapter_title'))
														i++;
										});
										return (i > v.no)? 'new' : 'not found';
								});
						result.push(str);
				}
						return result;
				})();
		}
		
		latest(){
				let deephs = this.deepen({prop: 'no', order: 'desc'}, this.deepen({prop: 'title'}, this.histories));
				return deephs.map( v => v[0][0] );
		}
		
		deepen({prop, order = 'asc'}, array){
				let aa = [];
				let  a = [];
				if(!Array.isArray(array[0])){
						array.sort(this[`sortBy${prop[0].toUpperCase()}${prop.slice(1)}Callback`].bind(order));
						array.forEach( (v, i, arr) => {
								a.push(v);
								if(!arr[i+1] || v[prop] !== arr[i+1][prop]){
										aa.push(a);
										a = [];
								}
						});
				}					 
				else{
						array.forEach( v => {
								aa.push(this.deepen({prop: prop, order: order}, v));
						});
				}
				
				return aa;
		}

		deepSort(...args){
				let deepHistories = [...this.histories];
								
				args.forEach( ({prop, order = 'asc'}) => {
						deepHistories = this.deepen({prop: prop, order: order}, deepHistories);
				});

				deepHistories = deepHistories.flat(args.length);

				return deepHistories;
		}

		sort(callback){
				this.histories.sort(callback);
		}

		sortByTime(order = 'asc'){
				this.sort(this.sortByTimeCallback.bind(order));
		}

		sortByTitle(order = 'asc'){
				this.sort(this.sortByTitleCallback.bind(order));
		}
		
		sortByAuthor(order = 'asc'){
				this.sort(this.sortByAuthorCallback.bind(order));
		}

		sortByNo(order = 'asc'){
				this.sort(this.sortByNoCallback.bind(order));
		}

		sortByTimeCallback(a, b){
				if('asc' === this)
    				return (a.time < b.time)? -1
            :(a.time > b.time)?  1
				    : 0;
				if('desc' === this)
    				return (a.time < b.time)?  1
            :(a.time > b.time)? -1
				    : 0;

				throw new Error('invalid order');
		}

		sortByTitleCallback(a, b){
				if('asc' === this)
    				return  a.title.localeCompare(b.title, navigator.languages[0]);
				if('desc' === this)
    				return -a.title.localeCompare(b.title, navigator.languages[0]);

				throw new Error('invalid order');
		}

		sortByAuthorCallback(a, b){
				if('asc' === this)
    				return  a.author.localeCompare(b.author, navigator.languages[0]);
				if('desc' === this)
    				return -a.author.localeCompare(b.author, navigator.languages[0]);

				throw new Error('invalid order');
		}

		sortByNoCallback(a, b){
				if('asc' === this)
    				return (a.no < b.no)? -1
            :(a.no > b.no)?  1
				    : 0;
				if('desc' === this)
    				return (a.no < b.no)?  1
            :(a.no > b.no)? -1
				    : 0;

				throw new Error('invalid order');
		}
		
		makeFake(n = 3){
				let r = (range, shift=0) => (Math.floor(Math.random()*range))+shift;
				let rs = (range, shift=0, length=2, pad='0') => ((Math.floor(Math.random()*range)+shift)+"").padStart(length, pad);
				let t = () => (2010+r(9))+'-'+rs(12,1)+'-'+rs(28,1)+'T'+rs(24)+':'+rs(60)+':'+rs(60)+'.'+rs(1000,0,3)+'Z';

				for(let i=0; i < n; i++)
						this.unshift(new Date(t()), {subtitle: {textContent: 'subtitle'}, no: {textContent: `${r(1000)}/${r(1000)}`}});
		}
		makeFakeRecent(n = 3, ms = ( 31 * (1000*60)*60*24 )){
				let r = (range, shift=0) => (Math.floor(Math.random()*range))+shift;
				let rs = (range, shift=0, length=2, pad='0') => ((Math.floor(Math.random()*range)+shift)+"").padStart(length, pad);
				let t = () => new Date() - r(ms);

				for(let i=0; i < n; i++)
						this.unshift(new Date(t()), {subtitle: {textContent: 'subtitle'}, no: {textContent: `${r(1000)}/${r(1000)}`}});
		}
}



function openHistory(e){
		e.preventDefault();
		HistoryStack.removeCCC();
		
		// e.stopImmediatePropagation();
		if('#history' !== location.hash)
				histStack.push({callback: ()=>{ HistoryStack.removeCCC(); openHistory(e)}}, "", '#history');
		document.head.iahBE(
				`<style id="css-temp">
* { box-sizing: border-box; }
</style>`);
		document.head.iahBE(
				`<style id="css-hist">

.hist-button {
background-color: #80808080;
border-radius: .5ex;
/* position: sticky; */
/* visibility: hidden; */
}
.hist-button a {
color: white;
}
.hist-button a span {
color: #00000080;
}
.hist-button a:visited {
color: white;
}
#hist-buttons:hover .hist-button {
visibility: visible;
}
.hist-button:hover {
filter: invert(100%);
background-color: #808080;
}

.hist-bullet, .hist-year, .hist-month, .hist-date, .hist-value {
  width: 100%;
}
.hist-bullet > span,
.hist-year > span,
.hist-month > span,
.hist-date > span,
.hist-value > span
{
  display: inline-block;
  width: 100%;
  padding-top: .5em;
  padding-bottom: .5em;
  border-bottom: solid 1px #e0e0e0;
}
.hist-month, .hist-date, .hist-value{
  display: none;
}

.hist-bullet.hist-opened > .hist-value,
.hist-year.hist-opened > .hist-month,
.hist-month.hist-opened > .hist-date,
.hist-date.hist-opened > .hist-value
{
  display: block;
}


.hist-value > span {
  background-color: whitesmoke;
}
.hist-value:nth-child(odd) > span {
  background-color: ghostwhite;
}
 
.hist-year:not(.hist-opened) > span,
.hist-month:not(.hist-opened) > span,
.hist-date:not(.hist-opened) > span
{
  background-color: whitesmoke;
}
.hist-year:not(.hist-opened):nth-child(odd) > span,
.hist-month:not(.hist-opened):nth-child(odd) > span,
.hist-date:not(.hist-opened):nth-child(odd) > span
{
  background-color: ghostwhite;
}

.hist-mark {
display: inline-block;
}
.hist-opened > span > .hist-mark {
transform: rotate(90deg);
}
											</style>`);

		css.set('.showing', 'filter', 'blur(2px)');
		let containerContainer = document.createElement('div');
		containerContainer.id = 'hist-cc';
		let container = document.createElement('div');
		container.id = 'hist-c';
		containerContainer.addEventListener('click', e => {
				$('#css-hist').remove();
				css.remove('.showing', 'filter');
				document.querySelector('#hist-cc').remove();
		});
		container.addEventListener('click', e => {
				e.stopImmediatePropagation();
		});


		container.iahBE(`<div id="hist-buttons">
<div id="hist-year-open-close" class="hist-button"><a href="#">&nbsp;<span>\u25bc</span>&nbsp;YEAR&nbsp;</a></div>
<div id="hist-month-open-close" class="hist-button"><a href="#">&nbsp;<span>\u25bc</span>&nbsp;MONTH&nbsp;</a></div>
<div id="hist-date-open-close" class="hist-button"><a href="#">&nbsp;<span>\u25bc</span>&nbsp;DATE&nbsp</a></div>
</div>`);

		function closureHistButtonsAddEventListener(button){
				return ()=>{
						if(container.$(`#hist-${button}-open-close`))
								container.$(`#hist-${button}-open-close`).addEventListener('click', e => {
										e.preventDefault(); e.stopImmediatePropagation();
										let a = e.currentTarget.$('a');
										if(~a.textContent.search('\u25bc')){ /* open */
												for(let e of $$(`#hist-c .hist-${button}`)){
														e.classList.toggle('hist-opened', false);
														/* e.parentNode.$('.hist-chapter-sections').style.display = 'block'; */
												}
												/* a.textContent = a.textContent.replace(/\u{25bc}/u, '\u25b6'); */
												a.innerHTML = a.innerHTML.replace(/\u{25bc}/u, '\u25b6');
										}
										else {
												for(let e of $$(`#hist-c .hist-${button}`)){
														e.classList.toggle('hist-opened', true);
														/* e.parentNode.$('.hist-chapter-sections').style.display = 'none'; */
												}
												/* a.textContent = a.textContent.replace(/\u{25b6}/u, '\u25bc'); */
												a.innerHTML = a.innerHTML.replace(/\u{25b6}/u, '\u25bc');
										} }, {passive: false});
				};
		}
		closureHistButtonsAddEventListener('year')();
		closureHistButtonsAddEventListener('month')();
		closureHistButtonsAddEventListener('date')();


		const num2month = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May ', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'];
		let year, month, date, hour, minute, second, millisecond;
		let y,m,d,h,min,s,ms;
		let vP = {time: new Date(1970,1,1,0,0,0,0)};

		const msForOneDate = (1000 * 60) * 60 * 24; /* (milli * sec) * min * hour */
		const today = new Date();
		const yesterday = new Date(today - msForOneDate);
		const last7days =  new Date(today - 7 * msForOneDate);
		const flags = {
				    today: false,
				yesterday: false,
				last7days: false,
				thisMonth: false,

				 finished: false,
		};
		hist.sortByTime('desc');
		hist.histories.forEach( (v, i, a) => {
				y =   v.time.getFullYear();
				// y =   `A.D. ${y}`;
				m =   v.time.getMonth() + 1;
				// m =   num2month[m] + ` --${m+1}--`;
				d =   v.time.getDate();
				d =   d == 1 ? '1st' : d == 2 ? '2nd' : d == 3 ? '3rd' : d + 'th';
				h =   v.time.getHours();
				min = v.time.getMinutes();
				s =   v.time.getSeconds();
				ms =  v.time.getMilliseconds();
				if(!flags.finished){
						if(today.getFullYear() === v.time.getFullYear()
							 && today.getMonth() === v.time.getMonth()
							 && today.getDate() === v.time.getDate()){ /* today */
								if(!flags.today){
										flags.today = true;
										date = document.createElement('div');
										date.className = 'hist-bullet hist-opened';
										date.iahBE(`<span><span class="hist-mark">${'\u25b6'}</span> <span>Today</span>`);
										container.iaeBE(date);
								}
						}
						// else if(today - v.time < 2 * msForOneDate){ /* yesterday */
						else if(yesterday.getFullYear() === v.time.getFullYear()
										&& yesterday.getMonth() === v.time.getMonth()
										&& yesterday.getDate() === v.time.getDate()){ /* yesterday */
								if(!flags.yesterday){
										flags.yesterday = true;
										date = document.createElement('div');
										date.className = 'hist-bullet';
										date.iahBE(`<span><span class="hist-mark">${'\u25b6'}</span> <span>Yesterday</span>`);
										container.iaeBE(date);
								}
						}
						else if(today - v.time < 7 * msForOneDate
										|| (last7days.getFullYear() === v.time.getFullYear()
												&& last7days.getMonth() === v.time.getMonth()
												&& last7days.getDate() === v.time.getDate())){ /* last 7 days */
								if(!flags.last7days){
										flags.last7days = true;
										date = document.createElement('div');
										date.className = 'hist-bullet';
										date.iahBE(`<span><span class="hist-mark">${'\u25b6'}</span> <span>Last 7 days</span>`);
										container.iaeBE(date);
								}
						}
						else if(today.getFullYear() === v.time.getFullYear() && today.getMonth() === v.time.getMonth()){ /* this month */
								if(!flags.thisMonth){
										flags.thisMonth = true;
										date = document.createElement('div');
										date.className = 'hist-bullet';
										date.iahBE(`<span><span class="hist-mark">${'\u25b6'}</span> <span>This month</span>`);
										container.iaeBE(date);
								}
						}
						else{
								flags.finished = true;
								vP = {time: new Date(1970,1,1,0,0,0,0)};
						}
				}
				if(flags.finished){
						if(v.time.getFullYear() != vP.time.getFullYear()){
								year = document.createElement('div');
								year.className = 'hist-year';
								year.iahBE(`<span><span class="hist-mark">${'\u25b6'}</span> <span>${y}</span>`);
								
								container.iaeBE(year);
								month = document.createElement('div');
								month.className = 'hist-month';
								month.iahBE(`<span><span class="hist-mark">${'\u25b6'}</span> <span>${m}</span>`);
								year.iaeBE(month);
								date = document.createElement('div');
								date.className = 'hist-date';
								date.iahBE(`<span><span class="hist-mark">${'\u25b6'}</span> <span>${d}</span>`);
								month.iaeBE(date);
						}
						else if(v.time.getMonth() != vP.time.getMonth()){
								// else if(m != mP){
								month = document.createElement('div');
								month.className = 'hist-month';
								month.iahBE(`<span><span class="hist-mark">${'\u25b6'}</span> <span>${m}</span>`);
								year.iaeBE(month);
								date = document.createElement('div');
								date.className = 'hist-date';
								date.iahBE(`<span><span class="hist-mark">${'\u25b6'}</span> <span>${d}</span>`);
								month.iaeBE(date);
						}
						else if(v.time.getDate() != vP.time.getDate()){
								// else if(d != dP){
								date = document.createElement('div');
								date.className = 'hist-date';
								date.iahBE(`<span><span class="hist-mark">${'\u25b6'}</span> <span>${d}</span>`);
								month.iaeBE(date);
						}
				}				

				value = document.createElement('div');
				value.className = 'hist-value';
				value.title = v.time.toLocaleString();
				// value.iahAB(`${h}:${m}:${s}, no: ${v.no}, title: <a>${v.section}</a>, name: <a>${v.title}</a>`);
				value.iahAB(`<span style="overflow: auto; white-space: nowrap;">\u300e<a class="hist-title" href="${normalizeURL(v.url).split('/').slice(0, -2).join('/')}">${v.title}</a>\u300f<br><span style="width: 5ex; text-align: right; display: inline-block;">${v.no}</span>.&nbsp;<a class="hist-subtitle" href="${v.url}">${v.section}</a><\span>`);
				/* value.iahAB(`<span><span style="width: 5ex; text-align: right; display: inline-block;">${v.no}</span>.&nbsp;<a class="hist-subtitle" href="${v.url}">${v.section}</a><br>\u300e<a class="hist-title" href="${normalizeURL(v.url).split('/').slice(0, -2).join('/')}">${v.title}</a>\u300f<\span>`); */

				date.iaeBE(value);
				
				vP = v;		
				// ({yP,mP,dP,hP,minP,sP,msP} = {y,m,d,h,min,s,ms})
		});




		// if( == P){
		// }
		// else {
		// 		 = document.createElement('div');
		// }



		// container.insertAdjacentHTML('afterbegin', html);
		containerContainer.appendChild(container);
		document.body.insertAdjacentElement('afterbegin', containerContainer);
		document.querySelectorAll('.hist-bullet, .hist-year, .hist-month, .hist-date').forEach( (v, i, a) => {
				v.classList.add('hist-opened');
				v.addEventListener('click', e => {
						e.stopImmediatePropagation();
						e.currentTarget.classList.toggle('hist-opened');
						e.currentTarget.classList.contains('hist-opened') &&  $('#hist-c').scrollTo({left: 0, top: e.currentTarget.offsetTop - $('#hist-buttons').getBoundingClientRect().height, behavior: 'smooth'});
						// e.currentTarget.classList.contains('hist-opened') && (e.currentTarget.scrollIntoView({behavior: 'auto', block: 'start', inline: 'nearest'}), $('#hist-c').scrollBy(0, -$('#hist-buttons').getBoundingClientRect().height));
						// e.currentTarget.classList.contains('hist-opened') && (e.currentTarget.scrollIntoView(true), $('#hist-c').scrollBy(0, -$('#hist-buttons').getBoundingClientRect().height));
				});
		});
		document.querySelectorAll('.hist-title').forEach( (v, i, a) => {
				v.addEventListener('click', e => { $('#hist-cc').click(); openTOC(e); } );
		});
		document.querySelectorAll('.hist-subtitle').forEach( (v, i, a) => {
				v.addEventListener('click', e => { $('#hist-cc').click(); jumpToURL(v.href)(e); } );
				// v.addEventListener('click', e => {  jumpToURL(v.href)(e); $('#hist-cc').click(); } );
				// v.addEventListener('click', e => {  jumpToSection(e); $('#hist-cc').click(); } );
		});
}
function jumpToSection(e){
		try{
				e.preventDefault();
				let url = e.currentTarget.href;
				// e.stopImmediatePropagation();
				/**/debug('jumpToSection:start', {});
				// fetch(e.currentTarget.href)
				fetch(url)
						.then(parse)
						.then(gather)
						.then(function(obj){
								Array.from($$('.original')).forEach(v => {v.remove()});
								Array.from($$('.honbun-c')).forEach(v => {v.remove()});
								// settingOriginalBox();
								/**/debug(obj, 'obj');
								/* document.body.style.fontSize = 'unset'; */
								document.body.style = ``;
								settingHonbun(obj);
								duplicateHonbun(obj);

								obj.honbun.style = ``;
								obj.original.style = ``;
								replaceHonbun(obj);
								$('#originalBox').iaeAB(obj.original);

								obj.honbunC.classList.add('showing');
								obj.honbunC.onwheel = wheelY2X;
								obj.original.classList.add('showing-original');
								/**/debug('jumpToSection:inter', {});
								/**/debug(obj, 'obj');
								/**/debug(obj.honbunC, 'obj.honbunC');

								document.body.appendChild(obj.honbunC);
								getNextHref() ? $('#next').href = getNextHref() : $('#next').removeAttribute('href');
								getPrevHref() ? $('#previous').href = getPrevHref() : $('#previous').removeAttribute('href');

								/**/debug(e.currentTarget);
								// history.pushState(null, ``, e.currentTarget.href);
								history.pushState(null, ``, url);
								hist.add(new Date(), obj);
								
								return obj;
						});
				// alert(e.currentTarget);
		}catch(error){console.error(error)}
		// .catch(printErr);
    /**/debug('jumpToSection:end', {});
}

function jumpToURL(url){
		return function _jumpToURL(e){
				try{
						e.preventDefault();
						HistoryStack.removeCCC();
						// let url = e.currentTarget.href;
						// e.stopImmediatePropagation();
						/**/debug('jumpToURL:start', {});
						// fetch(e.currentTarget.href)
						fetch(url)
								.then(parse)
								.then(gather)
								.then(function(obj){
										Array.from($$('.original')).forEach(v => {v.remove()});
										Array.from($$('.honbun-c')).forEach(v => {v.remove()});
										settingInfoBox(obj);
										/**/debug(obj, 'obj');
										/* document.body.style.fontSize = 'unset'; */
										document.body.style = ``;
										settingHonbun(obj);
										duplicateHonbun(obj);

										obj.honbun.style = ``;
										obj.original.style = ``;
										replaceHonbun(obj);
										$('#originalBox').iaeAB(obj.original);

										obj.honbunC.classList.add('showing');
										obj.honbunC.onwheel = wheelY2X;
										obj.original.classList.add('showing-original');
										/**/debug('jumpToURL:inter', {});
										/**/debug(obj, 'obj');
										/**/debug(obj.honbunC, 'obj.honbunC');

										document.body.appendChild(obj.honbunC);
										getNextHref() ? $('#next').href = getNextHref() : $('#next').removeAttribute('href');
										getPrevHref() ? $('#previous').href = getPrevHref() : $('#previous').removeAttribute('href');

										/**/debug(e.currentTarget, 'e.currentTarget');
										// history.pushState(null, ``, e.currentTarget.href);
										// history.pushState(null, ``, url);
										if(url !== location.href){
												histStack.push({callback: histStack.backToHonbun}, "", url);
												hist.add(new Date(), obj);
										}
										
										return obj;
								});
						// alert(e.currentTarget);
				}catch(error){console.error(error)}
				// .catch(printErr);
        /**/debug('jumpToURL:end', {});
		}
}


function toRegexpFromArray(array, flag = ``){
		let _regexp = array.reduce((acc, v)=> `(?:${v})|` + acc, ``);
		return new RegExp(_regexp.slice(0, -1), flag);
}
function toRegexpStringFromArray(array, paren = null){
		if(paren)
				return array.map( v => `${paren[0]}${v}.*?${paren[1]}` ).join('|');
		else
				return array.join('|');
}

function debug(obj, label = ""){
		if(!Reflect.getOwnPropertyDescriptor(globalThis, '$$__DEBUG__$$'))
				return;

		if($$__DEBUG__$$){
				let caller = debug.caller || debug;
				if('object' === typeof(label)){
						let style = Object.entries(label).reduce((acc, v) => `${acc} ${v[0]}:${v[1]};`, "");
						if(style)
								;
						else
								style = 'font-style: normal; color: green;';
						console.log('%c%s\n%c%s', 'font-style: oblique; font-weight: normal; color: grey;', caller.name, style, obj);
				}
				else{
						if(label)
								label += ': ';
						console.groupCollapsed('%c%s\n%c%s%o', 'font-style: oblique; font-weight: normal; color: grey;', caller.name, 'font-style: normal; color: steelblue;', label, obj);
						console.log('caller:%s(%s)', caller.name, [...caller.arguments].join(', '));
						console.groupCollapsed('table');
						console.table(obj);
						console.groupEnd();
						console.groupCollapsed('trace');
						console.trace();
						console.groupEnd();
						console.groupEnd();
				}
		}
		else{
				if('object' === typeof(label)){
						let style = Object.entries(label).reduce((acc, v) => `${acc} ${v[0]}:${v[1]};`, "");
						if(style)
								;
						else
								style = 'font-style: normal; color: green;';
						console.log('%c%s', style, obj);
				}
				else{
						if(label)
								label += ': ';
						console.groupCollapsed('%c%s%o', 'font-style: normal; color: steelblue;', label, obj);
						console.groupCollapsed('table');
						console.table(obj);
						console.groupEnd();
						console.groupCollapsed('trace');
						console.trace();
						console.groupEnd();
						console.groupEnd();
				}
		}
}




function openConfig(e){
		HistoryStack.removeCCC();
		
		if('#configure' !== location.hash)
				histStack.push({callback: ()=>{ HistoryStack.removeCCC(); openConfig(e)}}, "", '#configure');
		document.head.iahBE(
				`<style id="css-config">
* { box-sizing: border-box; }
		 body { margin: 0 }
		 li {
				 /* border-top: solid 1px #d0d0d0; */
				 /* border-left: solid 1px #d0d0d0; */
				 /* border-right: solid 1px #d0d0d0; */
				 /* border-bottom: solid 1px #d0d0d0; */
				 /* outline: solid 1px #d0d0d0; */
				 /* border-collapse: collapse; */
				 list-style-type: none;
				 /* background-color: honeydew; */
				 /* display: flex; */
		 }
		 li > span {
				 /* background-color: honeydew; */
				 display: inline-flex;
				 justify-content: space-between;
				 align-items: center;
				 width: 100%;
		 }
		 li.has-ul > span {
				 border-bottom: solid 1px #d0d0d0;
		 }
		 li.even > span{
				 /* background-color: lavenderblush; */
		 }
		 li:not(.has-ul) > span{
				 background-color: honeydew;
		 }
		 li:not(.has-ul).even > span{
				 background-color: lavenderblush;
		 }
		 ul {
				 display: none;
				 padding-left: 1.5em;
		 }
		 li.opened > ul {
				 display: block;
		 }
		 li .marker {
				 display: inline-block;
				 color: transparent;
		 }
		 li.has-ul > span > span > .marker {
				 color: inherit;
		 }
		 li .marker:before {
				 /* content: "-" */
				 /* display: inline-block; */
		 }
		 li.has-ul > span > span > .marker:before {
				 /* content: "\\25ba" */
		 }
		 li.opened > span > span > .marker,
		 li.opened > span > span > .marker i:before {
				 /* content: "\\25bc" */
				 transform: rotate(90deg);
		 }
		 :required {
				 background-color: red;
		 }

		 /* The switch - the box around the slider */
		 .config-switch {
				 position: relative;
				 display: inline-block;
				 /* width: 60px; */
				 width: calc(1em * 1.76);
				 /* height: 34px; */
				 height: 1em;
		 }

		 /* Hide default HTML checkbox */
		 .config-switch input {
				 opacity: 0;
				 width: 0;
				 height: 0;
		 }

		 /* The slider */
		 .config-slider {
				 position: absolute;
				 cursor: pointer;
				 top: 0; left: 0; right: 0; bottom: 0;
				 background-color: #ccc;
				 /* -webkit-transition: .4s; */
				 transition: .4s;
				 /* border-radius: 34px; */
				 border-radius: 1em;
		 }

		 .config-slider:before {
				 position: absolute;
				 content: "";
				 /* height: 26px; */
				 height: calc(1em * 0.76);
				 /* width: 26px; */
				 width: calc(1em * 0.76);
				 /* left: 4px; */
				 left: calc(1em * 0.12);
				 /* bottom: 4px; */
				 bottom: calc(1em * 0.12);
				 background-color: white;
				 /* -webkit-transition: .4s; */
				 transition: .4s;
				 border-radius: 50%;
		 }

		 input[value="true"] + .config-slider {
				 background-color: #2196F3;
		 }

		 input:focus + .config-slider {
				 box-shadow: 0 0 1px #2196F3;
		 }

		 input[value="true"] + .config-slider:before {
				 /* -webkit-transform: translateX(26px); */
				 /* -ms-transform: translateX(26px); */
				 /* transform: translateX(26px); */
				 transform: translateX(calc(1em * 0.76));
		 }

		 #config-buttonss {
background-color: white;
display: flex;
position: sticky;
/* position: absolute; */
/* position: fixed; */
/* position: relative; */
/* float: left; */
/* top: 0; left: 10%; */
/* width: 80%; */
top: 0;
width: 100%;
padding-top: .5em;
padding-bottom: .5em;
justify-content: space-around;
z-index: 100;
}
.config-button {
background-color: #80808080;
border-radius: .5ex;
/* position: sticky; */
/* visibility: hidden; */
}
.config-button a {
color: white;
}
.config-button a span {
color: #00000080;
}
.config-button a:visited {
color: white;
}
#config-buttons:hover .config-button {
visibility: visible;
}
.config-button:hover {
filter: invert(100%);
background-color: #808080;
}

input[type="number"] {
width: 5em;
}
</style>`);
		
		CONFIG_DEBUG = true;

		css.set('.showing', 'filter', 'blur(2px)');
		
		let ps = [
				"number",
				" 1 12 123 1234 12345 1.1 1.12 1.123 1.1234 12.1 123.1 1234.1 12.12 123.123 1234.1234",
				"<br>",
				"fraction",
				" 1/1 1/12 1/123 1/1234 12/1 123/1 1234/1 12/12 123/123 1234/1234",
				"<br>",
				"quotation",
				"",
				"<br>",
				"<br>",
				"<br>",
				"double quotatoin",
				"",
				"<br>",
				"",
				"",
		];

		ps = ps.reduce((acc, v) => acc+`<p>${v}</p>`, "");




		// let options = {
		// 		showPreface: true,
		// 		showAfterword: true,
		// 		useWebFontForText: true,
		// 		useWebFontForButtons: true,
		// 		changeDialogueFont: false,
		// 		combineUprightDigits: 3,
		// 		number: { useChinaAll: false,
		// 							useChina: false,
		// 							useGrouping: true,},
		// };

		/* [ value, label, description, ... ] */
		let config = {
				A_Boolean: [{value:true, type:'checkbox', required:true}, null ],
				A_Text: [{value:'serif', type:'text', required:false}, null],
				A_Number: [{value:3, type:'number', required:true}, null],
				WebFont: {
						Text: [{value:true, type:'checkbox', required:true}, null ],
						Buttons: [{value:true, type:'checkbox', required:true}, null ],
				},
				Show: {
						Preface: [{value:true, type:'checkbox', required:true}, null ],
						Afterword: [{value:true, type:'checkbox', required:true}, null ],
						Title: [{value:false, type:'checkbox', required:true}, null ],
						Author: [{value:false, type:'checkbox', required:true}, null ],
						SectionNo: [{value:true, type:'checkbox', required:true}, null ],
				},
				Text: {
						Font: [{value:'serif', type:'text', required:false}, null],
						FontSize: [{value:'1.1em', type:'text', required:true}, null],
						DialogueFont: [{value:'serif', type:'text', required:false}, true],
						TATE_CHU_YOKO_Digits: [{value:3, type:'number', required:true}, null],
						number: {
								ChinaAll: [{value:true, type:'checkbox', required:true}, null ],
								China: [{value:false, type:'checkbox', required:true}, null ],
								Grouping: [{value:true, type:'checkbox', required:true}, null ],
						},
						Advance: {
								LineSpacing: [{value:'1.8em', type:'text', required:true}, null ],
								LetterSpacing: [{value:'', type:'text', required:false}, null ],
								FullToHalfRegExp: [{value:'+-,/|', type:'text', required:true}, null],
								DialoguePunctuationMarkRegExp: [{value:'a-zA-Z', type:'text', required:true}, null],
						},
				},
		};


		/*DEBUG*/config = options;
		/*DEBUG let configPreview = Object.assign( {}, config ); */
		/*DEBUG*/let configPreview = clone(options);


		/* let configPreview = Object.assign( {}, config ); */
		console.log(configPreview);

		/* css.set('.showing', 'filter', 'blur(2px)'); */
		let containerContainer = document.createElement('div');
		containerContainer.id = 'config-cc';
		let container = document.createElement('div');
		container.id = 'config-c';
		containerContainer.addEventListener('click', e => {
				$('#css-config').remove();
				css.remove('.showing', 'filter');
				document.querySelector('#config-cc').remove();
		});
		container.addEventListener('click', e => {
				e.stopImmediatePropagation();
		});


		function typeOfFinely(obj){
				return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
		}
		function object2HTML(obj, name = "", n = 0, html = new String(""), odd = true, debug = false){
				if(debug){
						html += '<ul>';
						Object.entries(obj).forEach((v, i, a) => {
								let type = Object.prototype.toString.call(v[1]).slice(8, -1).toLowerCase();
								html += `<li class="${odd ? 'odd' : 'even'}"><span><span><span class="marker">${options.useWebfontForButtons ? '<i class="fas fa-caret-right fa-fw fa-xs"></i>' : '&nbsp;\u25b6&nbsp;'}</span>`;
								odd = !odd;
								html +=	v[0];
								/* console.log(html); */
								if(['undefined', 'null', 'symbol', 'function', 'generatorfunction', 'map', 'set'].includes(type)){
										html += `</span><span name="${name+'.'+v[0]}">`;
										html += ':'+type+':'+v[1];
										html += '</span></span>';
								}
								else if('boolean' === type){
										/* html += `</span><input type="checkbox" name="${name+'.'+v[0]}" ${v[1] ? 'checked' : ""}>`; */
										html += `</span><label class="config-switch"><input name="${name+'.'+v[0]}" id="${name+'.'+v[0]}" value="${v[1]}" type="checkbox" checked><span class="config-slider"></span></label>`;
										html += '</span>';
								}
								else if('number' === type){
										html += `</span><input type="number" name="${name+'.'+v[0]}" value="${v[1]}">`;
										html += '</span>';
								}
								else if('string' === type){
										html += `</span><input type="text" name="${name+'.'+v[0]}" value="${v[1]}">`;
										html += '</span>';
								}
								else if('array' === type){
										html += '</span>';
										if('boolean' === typeof(v[1][0])){
												html += `<input type="checkbox" name="">`;
										}
										html += `<input type="text" name="${name+'.'+v[0]}" value="${v[1]}">`;
										html += '</span>';
								}
								else if('object' === type){
										html += '</span></span>';
										({html, _} = object2HTML(v[1], name+'.'+v[0], n+1, html, odd, debug));
								}
								else{
										throw new Error('-------- error -----------');																		
								}
								html += '</li>';
						});
						html += '</ul>';
						return {html: html, odd: odd};
				}

				// ===========================================================================================
				
				html += '<ul>';
				Object.entries(obj).forEach((v, i, a) => {
						let type = typeOfFinely(v[1]);
						/* let type = Object.prototype.toString.call(v[1][0]).slice(8, -1).toLowerCase(); */
						html += `<li class="${odd ? 'odd' : 'even'}"><span><span><span class="marker">${options.useWebfontForButtons ? '<i class="fas fa-caret-right fa-fw fa-xs"></i>' : '&nbsp;\u25b6&nbsp;'}</span>`;
						odd = !odd;
						html +=	v[0];
						if('object' === type){
								html += '</span></span>';
								({html, _} = object2HTML(v[1], name+'.'+v[0], n+1, html, odd, debug));
						}
						else if('array' === type){
								html += '</span>';
								if(v[1][0].type === 'checkbox'){
										html += `<label class="config-switch"><input name="${name+'.'+v[0]}" id="${name+'.'+v[0]}" value="${v[1][0].value}" type="checkbox" checked><span class="config-slider"></span></label>`;
								}
								else{
										if('boolean' === typeOfFinely(v[1][1])){
												html += `<span><input class="config-enable" type="checkbox" name="${'boolean.'+name+'.'+v[0]}" id="${name+'.'+v[0]+'.boolean'}" value="${v[1][1]}" ${v[1][1] ? 'checked' : ""}>`;
												html += `<label for="${'boolean.'+name+'.'+v[0]}">enable</label></span>`;
										}
										html += `<input name="${name+'.'+v[0]}" id="${name+'.'+v[0]}" `;
										/* html += `<input type="${v[1][0].type}" name="${name+'.'+v[0]}" value="${v[1][0].value}" ${v[1][0].required ? 'required' : ""}>`; */
										Object.entries(v[1][0]).forEach((vv, ii ,aa) => { html += `${vv[0]}="${vv[1]}" `; });
										html += '>';
								}
								html += '</span>';
						}
						else{
								throw new Error(`-------- error ----------- ${v[0]}:${v[1]}`);																		
						}
						html += '</li>';
				});
				html += '</ul>';
				return {html: html, odd: odd};
		}
		container.insertAdjacentHTML('afterbegin' ,
																 // object2HTML(config, 'config', 0, new String(""), true, CONFIG_DEBUG).html);
																 object2HTML(options, 'options', 0, new String(""), true, CONFIG_DEBUG ).html);

		container.iahAB(`<div id="config-buttons">
				<div id="config-open-preview" class="config-button"><a>&nbsp;<span>\u25bc</span>&nbsp;PREVIEW&nbsp;</a></div>
				<div id="config-foo" class="config-button"><a>&nbsp;<span>\u25bc</span>&nbsp;foo&nbsp</a></div>
				<div id="config-save" class="config-button"><a>&nbsp;<span>\u25bc</span>&nbsp;SAVE&nbsp;</a></div>
				</div>`);
		containerContainer.insertAdjacentElement('afterbegin', container);
		document.body.insertAdjacentElement('afterbegin', containerContainer);
		document.querySelector('ul').style.display = 'block';
		document.querySelector('ul').style.padding = '0';
		document.querySelectorAll('li').forEach( (v, i, a) => {
				v.addEventListener('click', e => { e.stopImmediatePropagation(); e.currentTarget.classList.toggle('opened') });
		});
		document.body.queryXPathAll('//li/ul/..').forEach( v => {
				v.classList.add('has-ul');
				/* v.querySelector('.marker').innerHTML = options.useWebfontForButtons ? '<i class="fas fa-caret-right fa-fw fa-xs"></i>' : '&nbsp;\u25b6&nbsp;'; */
		});
		/*debug*/document.querySelectorAll('li').forEach( (v, i, a) => {
				v.classList.toggle('opened', true);
		});



		if(1)
				try{
						$('#config-c').$$('input').forEach((v, i, a) => {
								/* console.log(v.name);  */
								v.addEventListener('change', function(e){
										/* Array.from($('#config-preview').$$('p')).forEach(v => v.remove()); */

										/* console.log(this.name); */
										let p = configPreview[this.name.split('.')[1]];

										/*DEBUG*/p = configPreview;
										
										let isNotBool = true;
										/*DEBUG*/let _v;
										/*DEBUG this.name.split('.').slice(2).forEach(v => { */
										/*DEBUG*/this.name.split('.').slice(1).forEach(v => {
												/*DEBUG*/_v = v;
												if(v === 'boolean')
														isNotBool = false;
												else
														/*DEBUG p = p[v]; */
														/*DEBUG*/;
												/*DEBUG*/if('object' !== typeof(p[v]))
												/*DEBUG*/;
												/*DEBUG*/else
														/*DEBUG*/p = p[v];
												console.log(v);
												console.log(p);
										});
										if(isNotBool)
												/*DEBUG*/p[_v] = getPrimitiveFromString(v.value);
										/*DEBUG p[0].value = getPrimitiveFromString(v.value); */
										else
												p[1] = getPrimitiveFromString(v.value);
										
										console.log(configPreview);
										$('#preview') &&
															 replacePreview();
										
										/* sessionStorage.setItem(this.name, this.value); */
										
										/* console.log(sessionStorage.getItem('options.'+this.name)); */
										/* setFromStorage(options, 'options'); */
										/* Array.from($('#preview-s').$$('p')).forEach((v, k, a)=>{
											 if(v.textContent){
											 // console.log(v);
											 let str =	v.innerHTML.replace(fullRegexp, toHalfwidth);
											 $('#preview').insertAdjacentHTML('beforeend', `<p>${str.replace(halfRegexp, combineUpright)}</p>`);
											 }
											 });  */
										// let key;
										// let n = 0;
										// let obj = {};
										// while(key = sessionStorage.key(n++)){
										// 		obj[key] = sessionStorage.getItem(key);
										// }
										/* console.log(obj); */
										
								});
						});
				}
		catch(e){console.error(e)}

		$$('.config-switch input').forEach(v => {
				v.addEventListener('click', function(e){
						this.checked = 'checked';
						this.value = 'true' === this.value ? 'false' : 'true';
				}, {passive: false});
		});
		$$('.config-enable').forEach(v => { v.addEventListener('click', function(e){ this.value = 'true' === this.value ? 'false' : 'true'; }) });


		$('#config-open-preview').addEventListener('click', function(e){
				e.preventDefault(); e.stopImmediatePropagation();
				if($('#preview')){
						$('#preview').remove();
						$('#preview-s').remove();
				}
				else{
						$('#config-c').iahBE(`<div id="preview" style="overflow: auto; position: fixed; bottom: 0; left: -2em; height: 50%; width: 100%; writing-mode: vertical-rl; padding: 1em; background-color: snow; font-family: 'Noto Serif JP', serif; opacity: 0.8;"></div>`);
						$('#config-c').iahBE(`<div id="preview-s" style="display: none;">${ps}</div>`);

						let preview = $('#preview');
						let previewS = $('#preview-s');
						replacePreview();
				}
		}, {passive: false});


		$('#config-save').addEventListener('click', function(e){
				e.preventDefault(); e.stopImmediatePropagation();
				config = clone(configPreview);
				if(confirm("are you sure to save?")){
						console.log('saved');
						$$('#config-c input').forEach( v => {
								localStorage.setItem(v.name, v.value);
						});
						setFromStorage(options, 'options', true);
						/**/debug('zipzip:start', {color: 'indigo'});
						zip( [...$$('.honbun-c')] )( [...$$('.original')] ).forEach( ([hc, org]) => {
								zip( [...hc.$$('.honbun p')] )( [...org.$$('.honbun p')]).forEach( ([hcP, orgP]) => {
										if(orgP.textContent){
												hcP.innerHTML = orgP.innerHTML.replace(fullRegexp, toHalfwidth);
												hcP.innerHTML = hcP.innerHTML.replace(halfRegexp, combineUpright);
										}
								});
						});
						/**/debug('zipzip:end', {color: 'indigo'});
				}
		}, {passive: false});


		function replacePreview(){
				let tempConfig = config;
				/*DEBUG*/tempConfig = options;
				config = configPreview;
				/*DEBUG*/options = configPreview;

				$('#preview').children.length &&
													 $$('#preview > *').forEach(v => v.remove());
				
				$('#preview-s').$$('p').forEach(v => {
						if(v.textContent){
								let str =	v.innerHTML.replace(fullRegexp, toHalfwidth);
								$('#preview').insertAdjacentHTML('beforeend', `<p>${str.replace(halfRegexp, combineUpright)}</p>`);
						}
						else{
								let str = v;
								$('#preview').insertAdjacentElement('beforeend', v.cloneNode(true));
						}
				});

				config = tempConfig;
				/*DEBUG*/options = tempConfig;

		}
}

// ====================================================================================================



// (()=>{
/* firebase */
/* React */
/* serif change font sei ha */
/* dispatch buttons after config saved */
/* change set from storage */
/* info box change when jump ||| create info per section ||| add info to original & honbun-c */
/* history clear button */
/* toc auto open */
/* scroll always check moji zureru kara */
/* toc add title */
/* history webfontbutton caret */
/* href="" hdden */
/* add chapter title to history */
/* tanpen taiou */
/* fetch limit */

/* horizontal configure */
/* ... --- convert */
/* hist value text indent */
/* buttons animation */
/* toc toka history toka remove shinai ? */
/* add custom property */
/* mobile&pc vertical&horizontal matomeru */
/* print A4 igai */
/* /".*?"/g */ // double quotation
/* syousuu arb3china */
/* bookmark */
/* night mode */
/* first page line kesu */

/* first previos & last next */
/* sai yomikomi == reload */
		 class HistoryStack {
				 constructor(){
						 this.stack = [];
						 this.index = -1;
				 }

				 push(state, title, url){
						 history.pushState({index: ++this.index}, title, url);
						 state.url = url;
						 this.stack.splice(this.index, 1, state);
				 }

				 backToHonbun(){
						 HistoryStack.removeCCC();
						 if($('#previous').href === location.href){
								 let prev = $('.showing').previousSibling;
								 if(prev && prev.classList.contains('honbun-c')){
										 /**/debug('backToHonbun:prevChapter:then', {color: 'goldenrod'});
										 Promise.resolve(prev)
												 .then(gather)
												 .then(function(obj){
														 let prevOrg = $('.showing-original').previousSibling;
														 $('.showing').classList.remove('showing');
														 prev.classList.add('showing');
														 prev.onwheel = wheelY2X;
														 $('.showing-original').classList.remove('showing-original');
														 prevOrg.classList.add('showing-original');
														 // histStack.push({callback: backToHonbun}, "", $('#previous').href);
														 $('#next').href = getNextHref();
														 getPrevHref() ? $('#previous').href = getPrevHref() : $('#previous').removeAttribute('href');
														 // hist.add(new Date(), obj);
														 /**/debug('backToHonbub:prevChapter:then:changed', {color: 'goldenrod'});
												 });
										 
								 }
						 }
						 else if($('#next').href === location.href){
								 let next = $('.showing').nextSibling;
								 if(next && next.classList.contains('honbun-c')){
										 /**/debug('backToHonbun:nextChapter:then', {color: 'goldenrod'});
										 Promise.resolve(next)
												 .then(gather)
												 .then(function(obj){
														 let nextOrg = $('.showing-original').nextSibling;
														 $('.showing').classList.remove('showing');
														 next.classList.add('showing');
														 next.onwheel = wheelY2X;
														 $('.showing-original').classList.remove('showing-original');
														 nextOrg.classList.add('showing-original');
														 // histStack.push({callback: backToHonbun}, "", $('#next').href);
														 getNextHref() ? $('#next').href = getNextHref() : $('#next').removeAttribute('href');
														 $('#previous').href = getPrevHref();
														 // hist.add(new Date(), obj);
														 /**/debug('backToHonbun:nextChapter:then:changed', {color: 'goldenrod'});
												 });
										 
								 }
						 }
						 else
								 jumpToURL(normalizeURL(location.origin + location.pathname))(new MouseEvent('click'));
				 }

				 static removeCCC(){
						 // let styles = xx('//style[starts-with(@id, "css-")]');
						 let styles = $$('style[id^="css-"]');
						 // let ccs    = xx('//div[substring(@id, string-length(@id) - string-length("-cc") +1) = "-cc"]');
						 let ccs    = $$('div[id$="-cc"]');
						 styles && styles.forEach(v => v.remove());
						    ccs &&    ccs.forEach(v => v.remove());
						 css.remove('.showing', 'filter');
				 }
		 }

const histStack = new HistoryStack();
const hist = new Hist();
const fav  = new Favorite();
window.addEventListener('beforeunload', (e)=>{ hist.save() });
window.addEventListener('beforeunload', (e)=>{  fav.save() });
		 window.onpopstate = e => {
				 // /**/console.log('history.state.index: %o', history.state.index);
				 // /**/debug('href: ' + location.href, {color: 'white', 'background-color': 'red'});
				 // /**/debug('next: ' + $('#next').href, {color: 'white', 'background-color': 'red'});
				 // /**/debug('nT|F: ' + $('#next').href === location.href, {color: 'white', 'background-color': 'red'});
				 // /**/debug('prev: ' + $('#previous').href, {color: 'white', 'background-color': 'red'});
				 // /**/debug('pT|F: ' + $('#previous').href === location.href, {color: 'white', 'background-color': 'red'});
				 histStack.index = e.state ? e.state.index : -1;
				 /**/console.log('histStack.stack[%o]: %o', histStack.index, histStack.stack[histStack.index]);
				 if(~histStack.index)
						 histStack.stack[histStack.index].callback();
				 
		 }

// window.onpopstate = e => {
// 		Object.entries(e).forEach(([key, value]) => console.log(key, value));
// 		console.log('e.state: ' + e.state);
// 		console.log('history.state: ' + history.state);
// }

		document.addEventListener('fullscreenchange', e => {
				if(!document.fullscreenElement){
						if($('#fullscreen').$('i.fas'))
								$('#fullscreen').$('i.fas').classList.replace('fa-compress', 'fa-expand');
						else
								$('fullscreen-button').setAttribute('fullscreen', 'false');
				}
		});

		function wheelY2X(e){
				// console.log(__wheel_n++);
				// e.currentTarget.scrollBy( -e.deltaY, 0 , {behavior: 'smooth'} );
				e.currentTarget.scrollBy( {left: -e.deltaY, top: 0 , behavior: 'smooth'} );
		}

// var histories = localStorage.getItem('histories') ? JSON.parse(localStorage.getItem('histories')) : [];
// histories.sort((a,b)=>{
// 		return a.time < b.time ? -1 : a.time > b.time ? 1 : 0}).reverse()
// 				 .forEach(v => { v.time = new Date(v.time) });
// window.addEventListener('beforeunload', (e)=>{localStorage.setItem('histories', JSON.stringify(histories))});

		

// const options = {
var options = {
		number: { useChinaAll: false,
							useChina: false,
							useGrouping: true,},
		combineUprightDigits: 3,
		useWebFontForText: true,
		useWebFontForButtons: true,
		changeDialogueFont: false,
		showPreface: true,
		showAfterword: true,
		nightMode: false,
};
setFromStorage(options, 'options', true);
const flags = {
		isPrinting: false,
		isVertical: true,
		isScrolling: true,
};


		const opt = {
				WF: {
						get text() { return undefined },
						get button() { return undefined },
				},
				
				SHOW: {
						get preface() { return undefined },
						get awterword() { return undefined },
						get title() { return undefined },
						get author() { return undefined },
						get section_no() { return undefined },
				},
				
				TXT: {
						get font() { return undefined },
						get font_size() { return undefined },
						get dialogue_font() { return undefined },
						get tate_chu_yoko_digits() { return undefined },
						
						NUM: {
								get china_all() { return undefined },
								get china() { return undefined },
								get grouping() { return undefined },
						},
						
						ADV: {
								get line_spacing() { return undefined },
								get letter_spacing() { return undefined },
								get full_to_half_regexp() { return undefined },
								get dialogue_punctuation_mark_regexp() { return undefined },
						},
				},
		};

		
let lang = navigator.languages[0];
const grouping = {useGrouping: true, style: 'decimal', maximumFractionDigits: 20};
const intl = new Intl.NumberFormat(lang, grouping);

/* options */
const functions = {
		// buttonsForSwitch: ['bottom', 'left', 'right', 'top'],
		buttonsForSwitch: ['bottom', 'top'],
		
		next(e){ e.preventDefault(); e.stopImmediatePropagation();
				if(e.currentTarget.href)
						Promise.resolve(e.currentTarget.href).then(nextChapter);
				else
						alert('last section !!');
		},
		bottom(e){ e.preventDefault(); e.stopImmediatePropagation();
				$('.showing').scrollTo({top: 0, left: -1*(rect.firstToLastWidth), behavior: 'smooth'});
		},
		bottomH(e){ e.preventDefault(); e.stopImmediatePropagation();
				console.log(`top: ${rect.firstChild.top}, bottom: ${rect.lastChild.bottom}`);
				window.scrollTo({top: +1*(rect.firstToLastHeight), left: 0, behavior: 'smooth'});
		},
		left(e){ e.preventDefault(); e.stopImmediatePropagation();
				$('.showing').scrollBy({top: 0, left: -1*(rect.honbunCWidth), behavior:  'smooth'});
		},
		leftH(e){ e.preventDefault(); e.stopImmediatePropagation();
				console.log(`viewHeight: ${rect.viewHeight}`);
				window.scrollBy({top: +1*(document.documentElement.clientHeight), left: 0, behavior:  'smooth'});
		},
		right(e){ e.preventDefault(); e.stopImmediatePropagation();
				$('.showing').scrollBy({top: 0, left: +1*(rect.honbunCWidth), behavior:  'smooth'});
		},
		rightH(e){ e.preventDefault(); e.stopImmediatePropagation();
				console.log(`top: ${rect.firstChild.top}, bottom: ${rect.lastChild.bottom}`);
				window.scrollBy({top: -1*(document.documentElement.clientHeight), left: 0, behavior:  'smooth'});
		},
		top(e){	e.preventDefault(); e.stopImmediatePropagation();
				console.log(`left: ${rect.lastChild.left}, right: ${rect.firstChild.right}`);
				$('.showing').scrollTo({top: 0, left: +1*(rect.firstToLastWidth), behavior: 'smooth'});
		},
		topH(e){	e.preventDefault(); e.stopImmediatePropagation();
				console.log(`top: ${rect.firstChild.top}, bottom: ${rect.lastChild.bottom}`);
				window.scrollTo({top: -1*(rect.firstToLastHeight), left: 0, behavior: 'smooth'});
		},
		previous(e){
				e.preventDefault(); e.stopImmediatePropagation();
				if(e.currentTarget.href)
						Promise.resolve(e.currentTarget.href).then(prevChapter);
				else
						alert('first section !!');
		},
		switchWritingMode: function(e){
				e.preventDefault(); e.stopImmediatePropagation();
				if(flags.isVertical) {
						flags.isVertical = false;
						functions.buttonsForSwitch.forEach(v => {
								$('#'+v).removeEventListener('click', functions[v], {capture: true, passive: false});
								$('#'+v).addEventListener('click', functions[v+'H'], {capture: true, passive: false});
						});
						if(options.useWebFontForButtons){
								$('#switch-writing-mode i').classList.remove('fa-rotate-270');
								$('#next i').classList.add('fa-rotate-270');
								$('#bottom i').classList.add('fa-rotate-270');
								$('#top i').classList.add('fa-rotate-270');
								$('#previous i').classList.add('fa-rotate-270');
						}
						else{
								css.set('.degM90to0', 'transform', 'rotate(0)');
								css.set('.deg0toM90', 'transform', 'rotate(-90deg)');
						}
						css.set('.honbun-c', 'writing-mode', 'horizontal-tb');
						css.set('.honbun-c', 'padding-left', '5vw');
						css.set('.honbun-c', 'padding-right', '5vw');
						css.remove('.honbun-c', 'padding-top');
						css.remove('.honbun-c', 'padding-bottom');
						css.set('.preface', 'border-bottom', '3px double #999999');
						css.set('.afterword', 'border-top', '3px double #999999');
						css.remove('.preface', 'border-left');
						css.remove('.afterword', 'border-right');
						css.set('.tombstone span', 'transform', 'rotate(0)');
						css.set('#container-of-buttons2', 'bottom', '0');
				}
				else {
						flags.isVertical = true;
						functions.buttonsForSwitch.forEach(v => {
								$('#'+v).removeEventListener('click', functions[v+'H'], {capture: true, passive: false});
								$('#'+v).addEventListener('click', functions[v], {capture: true, passive: false});
						});
						if(options.useWebFontForButtons){
								$('#switch-writing-mode i').classList.add('fa-rotate-270');
								$('#next i').classList.remove('fa-rotate-270');
								$('#bottom i').classList.remove('fa-rotate-270');
								$('#top i').classList.remove('fa-rotate-270');
								$('#previous i').classList.remove('fa-rotate-270');
						}
						else{
								css.set('.degM90to0', 'transform', 'rotate(-90deg)');
								css.set('.deg0toM90', 'transform', 'rotate(0)');
						}
						css.set('.honbun-c', 'writing-mode', 'vertical-rl');
						css.set('.honbun-c', 'padding-top', '5vh');
						css.set('.honbun-c', 'padding-bottom', '5vh');
						css.remove('.honbun-c', 'padding-left');
						css.remove('.honbun-c', 'padding-right');
						css.set('.preface', 'border-left', '3px double #999999');
						css.set('.afterword', 'border-right', '3px double #999999');
						css.remove('.preface', 'border-bottom');
						css.remove('.afterword', 'border-top');
						css.set('.tombstone span', 'transform', 'rotate(90deg)');
						css.set('#container-of-buttons2', 'bottom', `calc(1px * ${getScrollbarWH().width})`);
				}
		},
};



// setFromStorage(options, 'options');

/* elements */
const elements = {
		styles: {},
		get showing() { return $('.showing') },
		get helpC() { return $('#help-c') },
		get helpCC() { return $('#help-cc') },
		get configureC() { return $('#configure-c') },
		get configureCC() { return $('#configure-cc') },
		get temporaryBox() { return $('#temporary-box') },
};

/* scroll */
flags.isScrolling=true;
window.addEventListener('scroll', function(e){
		if(flags.isScrolling){
				flags.isScrolling = false;
				setTimeout(function(){
						let x = window.scrollX;
						let y = window.scrollY;
						sessionStorage.setItem('scrollX',x);
						sessionStorage.setItem('scrollY',y);
						console.log(x+':'+y);
						flags.isScrolling = true;
				}, 1000)
		}
});


elements.styles.webFont =	document.createElement('style');
elements.styles.webFont.iah('afterbegin',
														`@import url('https://fonts.googleapis.com/css?family=Noto+Sans+JP|Noto+Serif+JP&display=swap');`); 

if(options.useWebFontForText) /* for web font (Google fonts) */
		document.head.iae('beforeend', elements.styles.webFont);

if(options.useWebFontForButtons)
		elements.styles.webFont.iah('afterend', '<link href="https://use.fontawesome.com/releases/v5.6.1/css/all.css" rel="stylesheet">');

const HTMLEntities = ['&amp;', '&lt;', '&gt;', '&quot;', '&nbsp;'];
const _excludedTagNames = ['br', 'ruby', 'rb', 'rt', 'rp'];
const excludedTagNames = _excludedTagNames.concat(_excludedTagNames.map(v => '/'+v));

var halfRegexp =
    /[!"#$%&'*+,-.\/0-9?@A-Z^_`a-z~ ]+/g;
/*
	 -: ":;()<=>{|}[\\\]"
	 +: " "
 */
// halfRegexp = /[「『]|[」』]|[!"#$%&'*+,-.?@^_`~]+|\\?\d+[,\/.\d]*%?|[-+A-Za-z ]+/g;
let _halfRegexp = ``;
_halfRegexp += '\\u{2026}' + '|';

_halfRegexp += options.changeDialogueFont ? `[「『]|[」』]|` : ``;
_halfRegexp += '".*?"|\\u{201c}.*?\\u{201d}' + '|'; /* double quotation */
_halfRegexp += toRegexpStringFromArray(HTMLEntities) + '|';
_halfRegexp += toRegexpStringFromArray(excludedTagNames, "<>") + '|';
_halfRegexp += '.[\\u{309b}\\u{3099}\\u{ff9e}]|.[\\u{309c}\\u{309a}\\u{ff9f}]' + '|'; /* dakuon & han-dakuon */
_halfRegexp += `[!"#$%&'*+,-.?@^_\`~]+` + '|';
_halfRegexp += `\\\\?\\d+[,\\/.\\d]*%?` + '|';
_halfRegexp += `[-+A-Za-z ]+`;
halfRegexp = new RegExp(_halfRegexp, 'gu');
var fullRegexp = 
    /[￥！＂＃＄％＆＇＊＋，－．／０-９？＠Ａ-Ｚ＾＿｀ａ-ｚ]/g;
/*
	 -: "：；（）＜＝＞｛｜｝～［＼］"
	 +: "￥"
 */
const rect = {
		get honbunC() { return $('.showing').getBoundingClientRect(); },
		get firstChild() { return $('.showing').$('p').getBoundingClientRect(); },
		get lastChild() { let ps = $('.showing').$$('p'); return ps[ps.length-1].getBoundingClientRect(); },
		get honbunCWidth() { return this.honbunC.width; },
		get honbunCHeight() { return this.honbunC.height; },
		get firstToLastWidth() { return this.firstChild.right - this.lastChild.left; },
		get firstToLastHeight() { return this.lastChild.bottom - this.firstChild.top; },
		// 		get viewWidth() { return document.documentElement.clientWidth - document.body.clientWidth },
		// 		get viewHeight() { return document.documentElement.clientHeight - document.body.clientHeight },
};

if(1) /* @media screen css */
		document.head.iah('beforeend',
`<style id="css">

  * { box-sizing: border-box; }

	 :root { width: 100%; height: 100%; } 

   body { }

  .honbun-c {
		line-break: strict;
		overflow-wrap: break-word;
		/* font: 200 1em/1.8em "Noto Serif JP", serif; */
    font-weight: 200;
		font-size: 1.1em;
    line-height: 1.8em;
    font-family: "Noto Serif JP", serif;
		text-underline-position: right;
		writing-mode: vertical-rl;
		text-orientation: mixed;
		overflow: auto;
    width: 100%;
    height: 100%;
    margin: 0;
    padding-top: 5vh;
    padding-bottom: 5vh;
    display: none;

/* widows: 1; */
/* orphans: 1; */
    /* line-height: 28.8px; */
    /* font-size: 16px; */
  }

  .showing {
    display: block;
  }

	.subtitle {
		margin: 0;
		text-align: center;
		/* font-size: 170%; */
		font-size: 1.25em;
		font-weight: bold;
		line-height: 150%;
    font-family: sans-serif;
	}

  .no {
    margin: 0;
    text-align: right;
    color: #999999;
    font-size: 90%;
  }

  .bn { }

  .preface {
    border-left: 3px double #999999;
  }
  .afterword {
    border-right: 3px double #999999;
  }

  .tombstone {
    text-align: right;
  }    
  .tombstone span {
    transform: rotate(90deg);
    display: inline-block;
  }

  #container-of-buttons {
    z-index: 10;
    writing-mode: horizontal-tb;
    position: fixed;
    top: 0; right: 0;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-item: center;
    align-content: center;
    flex-wrap: wrap;
 padding-top: .5em;
/*  vertical-align: middle;*/
/*  height: 5vh;*/
  }
  .buttons {
    cursor: pointer;
    z-index: 11;
    color: #80808080; /* gray,0.5 */
    font-size: 1.25em;
    visibility: hidden;
    display: flex;
  flex-direction: column;
  justify-content: center;
/*    vertical-align: middle;*/
  }
  .degM90to0 {
    transform: rotate(-90deg);
  }
  .deg0toM90 {
    transform: rotate(0);
  }
  #container-of-buttons:hover { 
    /* background-color: white; */
  }
  #container-of-buttons:hover .buttons { 
    visibility: visible; 
  }
  #container-of-buttons:hover .not-hovering { 
    visibility: hidden;
   }
  .small-text { font-size: 1.75em; }
  .hovering { color: #80808080; }
  .buttons:active { color: green; }

  #container-of-buttons2 {
    z-index: 10;
    writing-mode: horizontal-tb;
    position: fixed;
    bottom: calc(1px * var(--scroll-bar-height)); right: 0;
    width: 100%;
    display: flex;
    justify-content: space-around;
 padding-bottom: .5em;
  }
  #container-of-buttons2 .buttons { 
    visibility: ; /*color: transparent;*/
  }
  #container-of-buttons2:hover .buttons { 
    visibility: visible; color: #80808080; /* gray,0.5 */
  }

  .small-text { font-size: 1.75em; }
  .hovering { color: #80808080; }
  #container-of-buttons2:hover .not-hovering { visibility: hidden; }
  .buttons:active { color: green; }

#hist-cc,
#toc-cc,
#config-cc,
#help-cc,
#fav-cc
{
		z-index: 100;
		width: 100%; 
		height: 100%;
		background-color: #80808080;
		display: flex;
		justify-content: center; 
		align-items: center;
		position: fixed;
		top: 0;
		right: 0;
}

#hist-c,
#toc-c,
#config-c,
#help-c,
#fav-c
{
		width: 95%;
		height: 90%;
		writing-mode: horizontal-tb;
		background-color: white;
		border-radius: 1em;
		display: block;
		overflow-x: auto;
		overflow-y: scroll;
    padding: 2em;
    padding: 0 2em 2em 2em;
    position: relative;
}

#hist-buttons,
#toc-buttons,
#config-buttons,
#help-buttons,
#fav-buttons
{
  background-color: white;
  display: flex;
  position: sticky;
  top: 0;
  width: 100%;
  padding-top: .5em;
  padding-bottom: .5em;
  justify-content: space-around;
  z-index: 100;
}

`);

try{
		/**/debug('start', {color: 'indigo'});
		Promise.resolve(document)
					 .then(gather)
					 .then(function(obj){
							 settingInfoBox(obj);
							 
							 Array.from(document.body.children).forEach(v => {v.remove()});
							 Array.from(document.body.childNodes).forEach(v => {v.remove()});
							 /**/debug('init:start', {color: 'goldenrod'});

							 document.body.iaeAB(obj.infoBox);
							 settingOriginalBox();
							 /**/debug(obj, 'obj');
							 /* document.body.style.fontSize = 'unset'; */
							 document.body.style = ``;
							 settingHonbun(obj);
							 duplicateHonbun(obj);
							 

							 obj.honbun.style = ``;
							 obj.original.style = ``;
							 replaceHonbun(obj);
							 $('#originalBox').iaeAB(obj.original);


							 obj.honbunC.classList.add('showing');
							 obj.honbunC.onwheel = wheelY2X;
							 obj.original.classList.add('showing-original');
							 /**/debug('init:inter', {color: 'goldenrod'});
							 /**/debug(obj, 'obj');
							 /**/debug(obj.honbunC, 'obj.honbunC');
							 /* Array.from(document.body.children).forEach(v => {v.remove()}); */
							 /* Array.from(document.body.childNodes).forEach(v => {v.remove()}); */
							 document.body.appendChild(obj.honbunC);
							 settingButtons2();
							 settingButtons();
							 
							 $('#next').href = getNextHref();
							 $('#previous').href = getPrevHref();
							 hist.add(new Date(), obj);
							 
							 insertCustomProperty();

							 histStack.push({callback: histStack.backToHonbun}, "", normalizeURL(location.origin + location.pathname));
							 /**/debug('init:end', {color: 'goldenrod'});

							 /*DEBUG*/if(Reflect.getOwnPropertyDescriptor(globalThis, '$$__DEBUG__$$'))
							 // $$__testHistory__$$(obj);
							 ;

							 return obj;
					 });
		/**/debug('end', {color: 'indigo'});
}
catch(error){
		console.error(error);
		throw error;
}



document.body.scrollTo({
		top: sessionStorage.getItem('scrollY'),
		left: sessionStorage.getItem('scrollX'),
		behavior: 'auto'
});
!options.showPreface && css.set('.preface', 'display', 'none');
!options.showAfterword && css.set('.afterword', 'display', 'none');







function settingButtons2(){
		try{				
				/**/debug('settingButtons2:start', {});
				var flexbox2 = document.createElement('div');
				flexbox2.id = 'container-of-buttons2';
				flexbox2.setAttribute('ontouchstart', "");

				var buttons2 = [
						{ name: 'help',
							/* text: '\uff1f', // fullwidth:\uff1f, black:\u2753, white:\u2754  */
							// innerHTML: options.useWebFontForButtons ? '<i class="far fa-question-circle fa-fw fa-lg"></i>' : '<b>help</b>',
							innerHTML: options.useWebFontForButtons ? '<i class="fas fa-moon fa-fw fa-lg"></i>' : '<b>night</b>',
							tagName: 'a',
							class: 'buttons',
							// function: openHelp, },
							// function: openIFrame, },
							function: toggleNightMode, },
						{ name: 'table-of-contents',
							title: 'open table of contents',
							/* text: '\uff1f', // fullwidth:\uff1f, black:\u2753, white:\u2754  */
							innerHTML: options.useWebFontForButtons ? '<i class="fas fa-book-open fa-fw fa-lg"></i>' : '<b>T.O.C.</b>',
							tagName: 'a',
							class: 'buttons',
							function: openTOC, },
						
						{ name: 'history',
							/* text: '\uff1f', // fullwidth:\uff1f, black:\u2753, white:\u2754  */
							// innerHTML: options.useWebFontForButtons ? '<i class="far fa-question-circle fa-fw"></i>' : '\uff1f',
							innerHTML: options.useWebFontForButtons ? '<i class="fas fa-history fa-fw fa-lg"></i>' : '<b>history</b>',
							tagName: 'a',
							class: 'buttons',
							function: openHistory, },
						
						{ name: 'favorite',
							/* text: '\uff1f', // fullwidth:\uff1f, black:\u2753, white:\u2754  */
							// innerHTML: options.useWebFontForButtons ? '<i class="far fa-question-circle fa-fw"></i>' : '\uff1f',
							innerHTML: options.useWebFontForButtons ? '<i class="fas fa-star fa-fw fa-lg"></i>' : '<b>favorite</b>',
							tagName: 'a',
							class: 'buttons',
							function: openFavorite },
						
						{ name: 'configure',
							/* text: '\u2699', */
							innerHTML: options.useWebFontForButtons ? '<i class="fas fa-wrench fa-fw fa-lg"></i>' : '<b>configure</b>', /* cog wrench */ /* bars sliders ellipsis */
							tagName: 'a',
							class: 'buttons',
							function: openConfig },
						{ name: 'print',
							/* text: 'print', // \u1f5a8, \u1f5b6  */
							innerHTML: options.useWebFontForButtons ? '<i class="fas fa-print fa-fw fa-lg"></i>' : '<b>print</b>',
							tagName: 'a',
							class: 'buttons',
							function: e =>{
									e.preventDefault(); e.stopImmediatePropagation();
									// e.currentTarget.style.visibility = 'hidden';
									// e.currentTarget.style.display = 'none';
									if(!flags.isPrinting){
											flags.isPrinting = true;
									if(flags.isVertical){
									document.head.insertAdjacentHTML('beforeend',
`<style id="css-print">
@page {
 size: A4 landscape;
 margin: 0;
}
 * { box-sizing: border-box; }
 :root { margin: 0; }
 body { margin: 0; }

 .print-box {
page-break-after: always;
	 /* background-color: #0000ff80; */
	 overflow-wrap: break-word;
	 width: calc(297mm - 1mm) ;
	 height: calc(210mm - 1mm) ;
	 padding-left: 1cm ;
	 padding-right: 1cm ;
	 padding-top: 1cm ;
	 padding-bottom: 1cm ;
  display: block;
} 
 /* .print-box:nth-child(2n){background-color: #00ffff80;} */
 .print-box p[class="La1"] { padding-right: 1em; margin-right: 2em; border-right: double 3px #999999; }
 /* .print-box p[class^="La"]:first-of-type { border-right: double 3px #999999; } */
 /* .print-box p[class^="Lp"]:last-of-type { border-left: double 3px #999999; } */
 /* .print-box p[class^="Lp"] { border-left: double 3px #999999; } */
 p[class^="Lp"] + p[class$="title"] { padding-right: 2em; margin-right: 1em; border-right: double 3px #999999; }
 div.no + p.L1, p[class$="title"] + p.L1 { padding-right: 2em; }

.buttons:not(#print) {
  visibility: hidden !important;
}
</style>`);

									// if(flags.isVertical){
									css.set('.showing', 'display', 'none');
									// let honbun = $('#novel_honbun');
									// let subtitle = $('.novel_subtitle');
									// Array.from(document.body.children).forEach(v => v.remove());
									// honbun.insertAdjacentElement('afterbegin', subtitle);
									/* document.body.appendChild(honbun); */

									Array.from($$('.honbun-c')).forEach( (vv, ii, aa) => {
									let honbunC = vv;
									let honb = document.createElement('div');
									honb.className = 'print-box honbun-c';
									document.body.appendChild(honb);
									// console.log(honb.getBoundingClientRect().width);
									// console.log(parseFloat(window.getComputedStyle(honb).width));
									// console.log(2*parseFloat(window.getComputedStyle(honb).paddingLeft));
									let w = 0;
											let ww = 0;
											let vc;
											// Array.from(honbunC.$$('p, div[class="no"]')).forEach( (v,i,a) => {
											Array.from(honbunC.$$('p[class^="L"], p[class$="title"], div.no')).forEach( (v,i,a) => {
													console.log(v);
													vc = v.cloneNode(true); 
											honb.appendChild(vc);
											w = vc.getBoundingClientRect().width;
											vc.remove();
											if(honb.getBoundingClientRect().width - (2*parseFloat(window.getComputedStyle(honb).paddingLeft)) < ww+w){
													console.log('then:'+i+':'+(ww+w));
													ww = w;
													honb = document.createElement('div');
													honb.className = 'print-box honbun-c';
													document.body.appendChild(honb);
													// a[i-1].style.pageBreakAfter = 'always';
											}
											else{
													ww += w;
													/* console.log('else: '+ww); */
											}
											honb.appendChild(vc);
													/* vc.style.backgroundColor = i % 2 == 0 ? '#ff000080' : '#00ff0080'; */
									});
									});

									// !isMobile && window.print();
									// e.currentTarget.style.visibility = "visible";
									// $('#css-print').remove();
									// Array.from($$('.print-box')).forEach( v => { v.remove(); delete v; });
									// 		css.set('.showing', 'display', 'block');
									}
									
									else {
											
									document.head.insertAdjacentHTML('beforeend',
`<style id="css-print">
@page {
 size: A4 portrait;
 margin: 0;
}
 * { box-sizing: border-box; }
 :root { margin: 0; }
 body { margin: 0; }

 .print-box {
	 /* background-color: #0000ff80; */
	 overflow-wrap: break-word;
	 height: calc(297mm - 1mm) ;
	 width: calc(210mm - 1mm) ;
	 padding-left: 1cm ;
	 padding-right: 1cm ;
	 padding-top: 1cm ;
	 padding-bottom: 1cm ;
  display: block;
page-break-after: always;
} 
 /* .print-box:nth-child(2n){background-color: #00ffff80;} */
 /* .print-box p[class="La1"] { padding-right: 1em; margin-right: 2em; border-right: double 3px #999999; } */
 .print-box p[class="La1"] { padding-top: 1em; margin-top: 2em; border-top: double 3px #999999; }
 /* p[class^="Lp"] + p[class$="title"] { padding-right: 2em; margin-right: 1em; border-right: double 3px #999999; } */
 p[class^="Lp"] + p[class$="title"] { padding-top: 2em; margin-top: 1em; border-top: double 3px #999999; }
 /* div.no + p.L1, p[class$="title"] + p.L1 { padding-right: 2em; } */
 div.no + p.L1, p[class$="title"] + p.L1 { padding-top: 2em; }
</style>`);
									css.set('.showing', 'display', 'none');

									Array.from($$('.honbun-c')).forEach( (vv, ii, aa) => {
									let honbunC = vv;
									let honb = document.createElement('div');
									honb.className = 'print-box honbun-c';
									document.body.appendChild(honb);

											let w = 0;
											let ww = 0;
											let vc;

											Array.from(honbunC.$$('p[class^="L"], p[class$="title"], div.no')).forEach( (v,i,a) => {
													console.log(v);
													vc = v.cloneNode(true); 
											honb.appendChild(vc);
											// w = vc.getBoundingClientRect().width;
											w = vc.getBoundingClientRect().height;
											vc.remove();
											// if(honb.getBoundingClientRect().width - (2*parseFloat(window.getComputedStyle(honb).paddingLeft)) < ww+w){
											if(honb.getBoundingClientRect().height - (2*parseFloat(window.getComputedStyle(honb).paddingTop)) < ww+w){
													console.log('then:'+i+':'+(ww+w));
													ww = w;
													honb = document.createElement('div');
													honb.className = 'print-box honbun-c';
													document.body.appendChild(honb);
													a[i-1].style.pageBreakAfter = 'always';
											}
											else{
													ww += w;
													/* console.log('else: '+ww); */
											}
											honb.appendChild(vc);
													/* vc.style.backgroundColor = i % 2 == 0 ? '#ff000080' : '#00ff0080'; */
									});
									});

									// !isMobile && window.print();
									// e.currentTarget.style.visibility = "visible";
									// $('#css-print').remove();
									// Array.from($$('.print-box')).forEach( v => { v.remove(); delete v; });
									// 		css.set('.showing', 'display', 'block');
									// 		e.currentTarget.style.visibility = "hidden";
									// 		css.set('.honbun-c', 'display', 'block');
									// 		// window.print();
									// 		e.currentTarget.style.visibility = "visible";
									// 		css.set('.honbun-c', 'display', 'none');
									// 		$('#css-print').remove();
									// }
									}
									}
									else{
											flags.isPrinting = false;
									$('#css-print').remove();
									Array.from($$('.print-box')).forEach( v => { v.remove(); });
											css.set('.showing', 'display', 'block');
									}
									} },
				];
				/**/debug('settingButtons2:inner', {});
				buttons2.forEach((v, k, a)=>{
						let button = document.createElement(v.tagName);
						// button.href = '#';
						button.id = v.name;
						button.dataset.index = k;
						// button.title = v.title || 'button';
						button.className = v.class;
						/* button.textContent = v.text; */
						button.innerHTML = v.innerHTML;
						button.addEventListener('click', v.function, {capture: false, passive: false});
						button.addEventListener('mouseenter', e => {
								let array = Array.from(e.currentTarget.parentNode.children);
								let n = ~~e.currentTarget.dataset.index;
								array.splice(n,1);
								e.currentTarget.classList.add('hovering');
								array.forEach(v => {v.classList.add('not-hovering')});
						});
						button.addEventListener('mouseleave', e => {
								let array = Array.from(e.currentTarget.parentNode.children);
								let n = ~~e.currentTarget.dataset.index;
								array.splice(n,1);
								e.currentTarget.classList.remove('hovering');
								array.forEach(v => {v.classList.remove('not-hovering')});
						});
						flexbox2.insertAdjacentElement('beforeend', button);
				});
				document.body.insertAdjacentElement('afterbegin', flexbox2);
				/**/debug('settingButtons2:end', {});
		}catch(e){console.error(e)}
}


// })()

