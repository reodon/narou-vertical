// $$__DEBUG__$$;

delete $;

const zip = xs => ys => 
		(xs.length < ys.length) ? xs.map( (e, i) =>[e,  ys[i]] ) 
			: ys.map((e, i) => [xs[i], e] );

Object.prototype.printError
= function(error = undefined){
		let str = "";
		str += 'name:\n' + (error ? error.name : this.name) +'\n\n';
		str += 'message:\n' + (error ? error.message : this.name) + '\n\n';
		str += 'stack:\n' + (error ? error.stack : this.stack);
		console.log ? console.log(str) : alert(str);
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
const xx  = xpath => document.queryXPath(xpath);
Document.prototype.$ = Document.prototype.querySelector;
Document.prototype.$$ = Document.prototype.querySelectorAll
Element.prototype.$ = Element.prototype.querySelector;
Element.prototype.$$ = Element.prototype.querySelectorAll
Element.prototype.iae = Element.prototype.insertAdjacentElement;
Element.prototype.iaeAB = function(element){ this.insertAdjacentElement('afterbegin', element) };
Element.prototype.iaeBE = function(element){ this.insertAdjacentElement('beforeend', element) };
Element.prototype.iah = Element.prototype.insertAdjacentHTML;
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
// elements.__defineGetter__('showing', () => $('.showing') );

const novelID = location.pathname.split('/')[1];


function normalizeURL(url){
		let _url = url.split('/');
		// _url.slice(-1)[0] && _url.push("").join('/') : _url.join('/'); 
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
		/* let vw = parseInt(window.getComputedStyle(div).width); */
		/* let vh = parseInt(window.getComputedStyle(div).height); */
		div.style.minWidth = '100%';
		div.style.minHeight = '100%';
		let pcw = div.getBoundingClientRect().width;
		let pch = div.getBoundingClientRect().height;
		/* let pcw = parseInt(window.getComputedStyle(div).width); */
		/* let pch = parseInt(window.getComputedStyle(div).height); */
		div.remove();
		return { width: vw - pcw, height: vh - pch };
}

function getNextHref(force = false){
		// let href = !isMobile ? $('.showing .bn').lastElementChild.href : $('.showing .bn .link_next a').href;
		let href = $('.showing .bn').x('.//a[text()[contains(., ">>")]]') ?  $('.showing .bn').x('.//a[text()[contains(., ">>")]]').href : "";
		return href;
}
function getPrevHref(force = false){
		// let href = !isMobile ? $('.showing .bn').firstElementChild.href : $('.showing .bn .link_prev a').href;
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
function setFromStorage(options, name){
		Object.entries(options).forEach((v, i, a) => {
				// console.log(v);
				if('object' === typeof(v[1])){
						setFromStorage(options[v[0]], name+'.'+v[0]);
				}
				else{
						if(null != sessionStorage.getItem(name+'.'+v[0]))
								// options[v[0]] = getPrimitiveFromString(localStorage.getItem(name+'.'+v[0])) || options[v[0]];
								options[v[0]] = getPrimitiveFromString(sessionStorage.getItem(name+'.'+v[0]));
				}
		});
}

function duplicateHonbun(obj){
		try{
				/**/debug('start', {});
				Array.from(obj.honbunC.$$('p[id^="L"]')).forEach( v => { v.className = v.id; v.removeAttribute('id'); });
		let original = obj.honbunC.cloneNode(true);
		/* original.style.display = 'none'; */
		original.className = 'original';
		/* obj.honbun.iaeAB(original); */
		obj.original = original;
				/**/debug(obj, 'obj');
				/**/debug('end', {});
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
						/**/debug('then', {});
						// $('.showing').classList.remove('showing');
						// next.classList.add('showing');
						Promise.resolve(next)
						// .then( () => next )
									 .then(gather)
									 .then(function(obj){
											 let nextOrg = $('.showing-original').nextSibling;
											 // $('.showing').iae('afterend', document.adoptNode(obj.honbun));
											 // settingHonbun(obj);
											 $('.showing').classList.remove('showing');
											 next.classList.add('showing');
											 $('.showing-original').classList.remove('showing-original');
											 nextOrg.classList.add('showing-original');
											 /**/debug(obj.bn, 'obj.bn');
											 // console.log(obj.bn.x('a[text()[contains(., ">>")]]').href);
											 history.pushState(null, ``, $('#next').href);
											 getNextHref() ? $('#next').href = getNextHref() : $('#next').removeAttribute('href');
											 $('#previous').href = getPrevHref();
											 // $('#next').href = obj.bn.x('a[text()[contains(., ">>")]]').href;
											 // $('#previous').href = obj.bn.x('a[text()[contains(., "<<")]]').href;
											 unshiftHistory(new Date(), obj);
											 /**/debug('changed', {});
									 });
						
				}
				else {
						/**/debug('else', {});
						/* Promise.resolve(() => { */
						$('#next').style.visibility = 'hidden';
						/**/debug('hidden', {color: 'yellow'});
						/* return url; */
						/* }) */
						/* .then(fetch) */
						fetch(url)
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
										obj.original.classList.add('showing-original');
										replaceHonbun(obj);
										/* obj.honbun.iaeAB(obj.original); */
										/**/debug(obj.bn, 'obj.bn');
										history.pushState(null, ``, $('#next').href);
										getNextHref() ? $('#next').href = getNextHref() : $('#next').removeAttribute('href');
										$('#previous').href = getPrevHref();
										// $('#next').href = obj.bn.x('a[text()[contains(., ">>")]]').href;
										// $('#previous').href = obj.bn.x('a[text()[contains(., "<<")]]').href;
										unshiftHistory(new Date(), obj);
										/**/debug('changed', {});
										return obj; })
								.then(obj => {
										$('#next').style.visibility = ``;
										/**/debug(obj, 'obj');
										/**/debug('visible', {color: 'yellow'}); });
				}
				return url;
		}catch(e){console.error(e)}
}
function prevChapter(url){
		try{
				let prev = $('.showing').previousSibling;
				if(prev && prev.classList.contains('honbun-c')){
						/**/debug('then', {color: 'green'});
						// $('.showing').classList.remove('showing');
						// next.classList.add('showing');
						Promise.resolve(prev)
						// .then( () => prev )
									 .then(gather)
									 .then(function(obj){
											 let prevOrg = $('.showing-original').previousSibling;
											 // $('.showing').iae('beforebegin', document.adoptNode(obj.honbun));
											 // settingHonbun(obj);
											 $('.showing').classList.remove('showing');
											 prev.classList.add('showing');
											 $('.showing-original').classList.remove('showing-original');
											 prevOrg.classList.add('showing-original');
											 history.pushState(null, ``, $('#previous').href);
											 $('#next').href = getNextHref();
											 getPrevHref() ? $('#previous').href = getPrevHref() : $('#previous').removeAttribute('href');
											 // $('#next').href = obj.bn.x('a[text()[contains(., ">>")]]').href;
											 // $('#previous').href = obj.bn.x('a[text()[contains(., "<<")]]').href;
											 unshiftHistory(new Date(), obj);
											 /**/('changed', {color: 'green'});
									 });
						
				}
				else {
						/**/debug('else', {color: 'green'});
						$('#previous').style.visibility = 'hidden';
						/**/debug('hidden', {color: 'yellow'});
						
						fetch(url)
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
										obj.original.classList.add('showing-original');
										replaceHonbun(obj);
										/* obj.honbun.iaeAB(obj.original); */
										history.pushState(null, ``, $('#previous').href);
										$('#next').href = getNextHref();
										getPrevHref() ? $('#previous').href = getPrevHref() : $('#previous').removeAttribute('href');
										// $('#next').href = obj.bn.x('a[text()[contains(., ">>")]]').href;
										// $('#previous').href = obj.bn.x('a[text()[contains(., "<<")]]').href;
										unshiftHistory(new Date(), obj);
										/**/debug('changed', {color: 'green'});
										return obj;	})
								.then(obj => {
										$('#previous').style.visibility = ``;
										/**/debug(obj, 'obj');
										/**/debug('visible', {color: 'yellow'}); });
				}
				return url;
		}catch(e){console.error(e)}
}


function replaceHonbun(obj){
		try{
				/**/debug('start', {});
				zip(Array.from(obj.honbunC.$$('p')))(Array.from(obj.original.$$('p'))).forEach( (v, i, a) => {
						if(v[1].textContent){
								v[0].innerHTML = v[1].innerHTML.replace(fullRegexp, toHalfwidth);
								v[0].innerHTML = v[0].innerHTML.replace(halfRegexp, combineUpright);
						}
				});
				/**/debug('end', {});
				return obj;
		}catch(e){console.error(e)}
}

function parse(res){
		/**/debug('start', {});
		return res.text().then(t => {
				let p = new DOMParser();
				// let container = document.createElement('div');
				// container.classList.add('chapter-content');
				// container.style.display = 'none';
				let html = p.parseFromString(t, 'text/html');
				/**/debug('end', {});
				return html;
		});
}
function gather(html){
		/**/debug('start', {});
		let honbunC = html.$('#novel_honbun') ? null : html;
		let honbun = html.$('#novel_honbun') || html.$('.honbun');
		let subtitle = html.$('.novel_subtitle') || html.$('.novel_title') || html.$('.subtitle');
		let no = html.$('#novel_no') || html.$('.no');
		let bn = html.$('.novel_bn') || html.$('.bn');
		let p = html.$('#novel_p') || html.$('.preface') || null;
		let a = html.$('#novel_a') || html.$('.afterword') || null;
		// let honbun = html.$('#novel_honbun');
		// let subtitle = html.$('.novel_subtitle') || html.$('.novel_title');
		// let no = html.$('#novel_no');
		// let bn = html.$('.novel_bn');
		// let p = html.$('#novel_p');
		// let a = html.$('#novel_a');
		/**/debug(honbun, 'honbun');
		let obj = { honbun, subtitle, no, bn, p, a };
		/* if(honbun.id === 'novel_honbun') */
		// Object.values(obj).forEach(e => {if(e) e = e.cloneNode(true)});
		
		if(honbunC === null)
				Object.values(obj).forEach(e => {e && document.adoptNode(e)});
		obj.honbunC = honbunC;
		/**/debug(obj, 'obj');
		// /**/window.obj = obj;
		/**/debug('end', {});
		return obj;
}
function settingHonbun(obj){
		try{
				
				/**/debug('start', {});		
				
				let { honbun, subtitle, no, bn, p, a, honbunC } = obj;

				/**/debug(obj, 'obj');
				/**/debug(honbun, 'honbun');

				/* if(honbun.id == 'novel_honbun'){ */
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
						/* honbunC.iae('afterbegin', no); */
						/* honbunC.iae('afterbegin', subtitle); */
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
						/* obj.honbunC = honbunC; */
				}
				/**/debug('end', {});
				return obj;
		}catch(e){console.error(e)}
}

function settingOriginalBox(){
		try{
				let div = document.createElement('div');
				div.id = 'originalBox';
				div.style.display = 'none';
				document.body.iaeAB(div);
		}catch(e){console.error(e)}
}
function settingInfoBox(obj){
		// let infoBox, title, author;
		try{
				/**/debug('start', {})
				let infoBox = $('#infoBox') || document.createElement('div');
				infoBox.id = 'infoBox';
				infoBox.style.display = 'none';
						
				let title = $$('.contents1 a')[0];
				let author = $$('.contents1 a')[1];
				/**/debug($('.novel_title'), '$(.novel_title)');
				if(!author) {
						// title = $('.novel_title');
						title = obj.subtitle;
						author = $('.novel_writername');
				}
				/**/debug(title, 'title');
				/**/debug(author, 'author');
				$('#title') ? infoBox.replaceChild(title, $('#title')) : infoBox.iaeBE(title);
				$('#author') ? infoBox.replaceChild(title, $('#author')) : infoBox.iaeBE(author);
						// infoBox.iaeBE(author);
				title.id = 'title';
				author.id = 'author';
						obj.infoBox = infoBox;
				/**/debug('end', {})
				return obj;
			
				// document.body.iaeAB(infoBox);
		}catch(e){console.error(e)}
}


function settingButtons(){
		try{				
				/**/debug('start', {});
				var flexbox = document.createElement('div');
				flexbox.id = 'container-of-buttons';
				flexbox.setAttribute('ontouchstart', "");

				var buttons = [
						{ name: 'next',
							innerHTML: options.useWebFontForButtons ? '<i class="fas fa-angle-double-left fa-fw fa-lg"></i>' : '\u23ee',
							/* innerHTML: '\u23ee', */
							/* class: 'buttons small-text deg0toM90', */
							class: 'buttons deg0toM90',
							href:	getNextHref(),
							function: functions.next,	},
						{ name: 'bottom',
							innerHTML: options.useWebFontForButtons ? '<i class="fas fa-angle-left fa-fw fa-lg"></i>' : '\u23ea',
							/* class: 'buttons small-text deg0toM90', */
							class: 'buttons deg0toM90',
							href: '#',
							function: functions.bottom },
						// { name: 'left',
						// 	// text: '\u25c0',
						// 	class: 'buttons deg0toM90',
						// 	function: functions.left },
						{ name: 'switch-writing-mode',
							innerHTML: options.useWebFontForButtons ? '<i class="fas fa-file-alt fa-fw fa-rotate-270 fa-lg"></i>' : '\u2193',
							class: 'buttons ' + (options.useWebFontForButtons ? `` : 'deg0toM90'),
							href: '#',
							function: functions.switchWritingMode },
						// { name: 'right',
						// 	// text: '\u25b6',
						// 	class: 'buttons deg0toM90',
						// 	function: functions.right },
						{ name: 'top',
							/* innerHTML: '\u23e9', */
							innerHTML: options.useWebFontForButtons ? '<i class="fas fa-angle-right fa-fw fa-lg"></i>' : '\u23e9',
							/* class: 'buttons small-text deg0toM90', */
							class: 'buttons deg0toM90',
							href: '#',
							function: functions.top },
						{ name: 'previous',
							innerHTML: options.useWebFontForButtons ? '<i class="fas fa-angle-double-right fa-fw fa-lg"></i>' : '\u23ed',
							/* class: 'buttons small-text deg0toM90', */
							class: 'buttons deg0toM90',
							href:	getPrevHref(),
							function: functions.previous },
				];
				/**/debug('inner', {});
				buttons.forEach((v, k, a)=>{
						let button = document.createElement('a');
						// v.href ? button.href = v.href : button.removeAttribute('href');
						// button.href = v.href || 
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
				/**/debug('end', {});
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
				a=a.flat().map((v,i,a) => {
						let tmp = v == '0'
								? ""
								: (i==0
                    ? numerals[v]
									  : (v=='1'&&(i!=3||!is1000)) 
									      ? ""
									      : numerals[v])+{0:"", 1:'十', 2:'百', 3:'千'}[i];
						/**/console.log(`v: ${v}, i: ${i}, tmp: ${tmp}` );
						return tmp});
				a.every(v => v === "") && arr.pop();
				arr=arr.concat(a);
				/**/debug(arr.toString(), 'arr');
			}while(n < arb.length);
		// arr=arr.slice(0,-1);
		return arr.reduce((acc, v)=> v+acc).toString();
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
		/*
			 if(str.length == 0)
			 return str;
     */
		let combine = (text, options = {}) => {
				if(options.yen)
						return `<span style="text-combine-upright: all; font: 1rem/1.8em sans-serif;">${text}</span>`;
				else
						return `<span style="text-combine-upright: all;">${text}</span>`;
		};

		let _fractionRegexp = ``;
		_fractionRegexp += `^\\d{1,${options.combineUprightDigits}}\\/\\d{1,${options.combineUprightDigits}}$`;
		const fractionRegexp = new RegExp(_fractionRegexp);
		// let combineSpan = text => '<span style="text-combine-upright: all;">' + text + '</span>';
		/* 分数 */
		if(str.match(fractionRegexp)){
				// if(str.match(/^\d{1,3}\/\d{1,3}$/)){
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
		
		if(['\u309b', '\u3099', '\uff9e'].includes(str[1])) /* dakuon */
				return `<span style="writing-mode: horizontal-tb>${str[0] + '\u3099'}</span>`;
		if(['\u309c', '\u309a', '\uff9f'].includes(str[1])) /* handakuon */
				return `<span style="writing-mode: horizontal-tb>${str[0] + '\u309a'}</span>`;
		if(HTMLEntities.includes(str))
				return str;
		/* ルビ */
		if(excludedTagNames.map(v => `<${v}>`).includes(str))
				return str;
		// if(excludedTagNames.includes(str))
		  // return str;

		/* double quotation */
		if([`"`, '\u201c'].includes(str[0]) && [`"`, '\u201d'].includes(str.slice(-1)))
				return `\u301d${combineUpright(str.slice(1, -1))}\u301f`;
		
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
										// console.log('------------------'+str);
										return str;
								}
						}
				}
		}
}



function openTOC(e){
									e.preventDefault();
									document.head.iahBE(
											`<style id="css-toc">

											#toc-cc {
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

											#toc-c {
													width: 80%;
													height: 80%;
													writing-mode: horizontal-tb;
													background-color: white;
													border-radius: 1em;
													display: block;
													overflow: auto;
padding: 2em;
position: relative;
													/* justify-content: space-around; */
													/* align-items: center; */
													/* flex-direction: column; */
													/* flex-wrap: ; */
											}

#toc-buttons {
display: flex;
position: sticky;
top: 0; left: 10%;
justify-content: space-around;
width: 80%;
}
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
font-size: 1.5em;
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
.toc-chapter-sections {
/* font-size: .5em; */
display: none;
margin-left: 2em;
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
		let _url = e.currentTarget.href ? normalizeURL(e.currentTarget.href) : normalizeURL(location.href);
											// let url = _url.slice(-1)[0] ? _url.slice(0, -1).join('/') : _url.slice(0, -2).join('/'); 
		let url = e.currentTarget.href ? _url : _url.split('/').slice(0, -2).join('/'); 
									// let url = _url.split('/').slice(0, -2).join('/'); 
									/* alert(url); */
									fetch(url)
											.then(parse)
											.then( doc => {
													let indexBox = doc.$('.index_box');
													// let indexBox = doc.$('.index_box') || doc.$('.novel_sublist');
													let pageNavi = doc.$('.page_navi'); /* nullable */
													// if(!indexBox) alert(url);
													container.iahBE(`<div id="toc-buttons">
<div id="toc-open-close" class="toc-button"><a href="#">&nbsp;\u25b6&nbsp;ALL&nbsp;</a></div>
</div>`);
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
															e.currentTarget.classList.contains('toc-opened') && e.currentTarget.scrollIntoView(true);
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
																	sections.style = 'display: none; margin-left: 2em;';
																	chapter.iaeBE(title);
																	chapter.iaeBE(sections);
																	container.iaeBE(chapter);
																	/* chapter.iaeAB(v); */
															}
															else {
																	let a = v.$('a');
																	a.addEventListener('click', jumpToURL(a.href), {passive: false});
																	// a.addEventListener('click', jumpToSection, {passive: false});
																	// /**/debug(sections, 'sections');
																	if(!sections){
																			sections = document.createElement('div');
																			sections.className = 'toc-chapter-sections';
																			sections.style = 'display: block; margin-left: 2em;';
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
																					sections.style = 'display: none; margin-left: 2em;';
																					chapter.iaeBE(title);
																					chapter.iaeBE(sections);
																					container.iaeBE(chapter);
																					/* chapter.iaeAB(v); */
																			}
																			else {
																					let a = v.$('a');
																					a.addEventListener('click', e => { e.stopImmediatePropagation(); jumpToURL(a.href)(e); }, {passive: false});
																					// a.addEventListener('click', e => { e.stopImmediatePropagation(); jumpToSection(e); }, {passive: false});
																					if(!sections){
																							sections = document.createElement('div');
																							sections.className = 'toc-chapter-sections';
																							sections.style = 'display: block; margin-left: 2em;';
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
function loadHistory(histories){
		let _histories = localStorage.getItem('histories') ? JSON.parse(localStorage.getItem('histories')) : [];
		histories = _histories.sort((a,b)=>{
				return a.time < b.time ? -1 : a.time > b.time ? 1 : 0})
				.reverse()
				.map(v => new Date(v.time) );
}
function saveHistory(histories){
		localStorage.setItem('histories', JSON.stringify(histories));
}


function unshiftHistory(date, obj){
		loadHistory(histories);
		
		// let json = date.toJSON();
		let value =
				{
						// time: json,
						time: date,
						title: $('#title').textContent,
						author: $('#author').textContent,
						section: obj.subtitle.textContent,
						no: obj.no.textContent.split('/')[0],
						url: location.href,
				};
		histories.unshift(value);
		
		saveHistory(histories);
}

function openHistory(e){
		e.preventDefault();
		// e.stopImmediatePropagation();
		document.head.iahBE(
				`<style id="css-temp">
* { box-sizing: border-box; }
</style>`);
		document.head.iahBE(
				`<style id="css-hist">

											#hist-cc {
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

											#hist-c {
													width: 80%;
													height: 80%;
													writing-mode: horizontal-tb;
													background-color: white;
													border-radius: 1em;
													display: block;
													overflow: auto;
padding: 2em;
padding: 0 2em 2em 2em;
position: relative;
/* transform: rotate(0deg); */
													/* justify-content: space-around; */
													/* align-items: center; */
													/* flex-direction: column; */
													/* flex-wrap: ; */
											}

#hist-buttons {
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

.hist-chapter {
}
.hist-chapter-title {
font-size: 1em;
border-bottom: solid 1px #f1f2f5;
padding-top: 1em;
padding-bottom: .5em;
/* margin-bottom: .5em; */
}
.hist-chapter-title span {
display: inline-block;
}
.hist-chapter-title > span {
 width: 100%; 
/* display: inline-block; */
display: inline-flex;
justify-content: space-between;
/* text-align: left; */
}
/* .hist-chapter-title:before { */
/* content: ">"; */
 /* content: "\\25b6"; */
/* display: inline-block; */
/* } */
/* .hist-opened .hist-angle { */
/* transform: rotate(90deg); */
/* } */
.hist-chapter-sections span {
width: 5ex;
display: inline-block;
text-align: right;
}
.hist-chapter-sections {
/* font-size: .5em; */
display: none;
margin-left: 2em;
}

.hist-year {
width: 100%;
}
.hist-month {
padding-left: 1em;
width: 100%;
display: none;
}
.hist-date {
padding-left: 1em;
width: 100%;
display: none;
}
.hist-value {
padding-left: 1em;
display: none;
/* overflow: auto; */
}


.hist-year > span {
/* font-size: 1.5em; */
font-size: 1.3em;
/* background-color: honeydew; */
display: inline-block;
width: 100%;
/* border-bottom: solid 1px #f0f0f0; */
padding-top: .5em;
padding-bottom: .5em;
border-bottom: solid 1px #e0e0e0;
}
.hist-month > span {
/* font-size: 1.25em; */
font-size: 1.2em;
/* background-color: mintcream; */
display: inline-block;
width: 100%;
/* border-bottom: solid 1px #f0f0f0; */
padding-top: .5em;
padding-bottom: .5em;
border-bottom: solid 1px #e0e0e0;
}
.hist-date > span {
font-size: 1.1em;
/* background-color: azure; */
display: inline-block;
width: 100%;
border-bottom: solid 1px #e0e0e0;
/* border-bottom: solid 1px #f0f0f0; */
padding-top: .5em;
padding-bottom: .5em;
}
.hist-value > span {
background-color: whitesmoke;
display: inline-block;
width: 100%;
/* overflow: auto; */
/* white-space: nowrap; */
border-bottom: solid 1px #e0e0e0;
/* border-bottom: solid 1px #e0e0e0; */
/* border-right: solid 1px #e0e0e0; */
/* border-left: solid 1px #e0e0e0; */
padding-top: .5em;
padding-bottom: .5em;
}
.hist-value:nth-child(odd) > span {
background-color: ghostwhite;
}

.hist-year:not(.hist-opened) > span {
background-color: whitesmoke;
}
.hist-year:not(.hist-opened):nth-child(odd) > span {
background-color: ghostwhite;
}
.hist-month:not(.hist-opened) > span {
background-color: whitesmoke;
}
.hist-month:not(.hist-opened):nth-child(odd) > span {
background-color: ghostwhite;
}
.hist-date:not(.hist-opened) > span {
background-color: whitesmoke;
}
.hist-date:not(.hist-opened):nth-child(odd) > span {
background-color: ghostwhite;
}




.hist-year.hist-opened > .hist-month {
display: block;
}
.hist-month.hist-opened > .hist-date {
display: block;
}
.hist-date.hist-opened > .hist-value {
display: block;
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

		// 													container.iahBE(`<div id="toc-buttons">
		// <div id="toc-open" class="toc-button"><a href="#">&nbsp;open&nbsp;</a></div>
		// <div id="toc-close" class="toc-button"><a href="#">&nbsp;close&nbsp;</a></div>
		// </div>`);


		container.iahBE(`<div id="hist-buttons">
<div id="hist-year-open-close" class="hist-button"><a href="#">&nbsp;<span>\u25bc</span>&nbsp;YEAR&nbsp;</a></div>
<div id="hist-month-open-close" class="hist-button"><a href="#">&nbsp;<span>\u25bc</span>&nbsp;MONTH&nbsp;</a></div>
<div id="hist-date-open-close" class="hist-button"><a href="#">&nbsp;<span>\u25bc</span>&nbsp;DATE&nbsp</a></div>
</div>`);

		/* container.$('#hist-buttons').addEventListener('click', e => {
		 * 		e.stopImmediatePropagation();
		 * 		e.currentTarget.style.display = 'none';
		 * 		console.log(`clientX: ${e.clientX}, offsetX: ${e.offsetX}, pageX: ${e.pageX}`);
		 * 		console.log(`clientY: ${e.clientY}, offsetY: ${e.offsetY}, pageY: ${e.pageY}`);
		 * 		let x = e.clientX;
		 * 		let y = e.clientY;
		 * 		let elem = document.elementFromPoint(x, y);
		 * 		elem.click();
		 * 		console.log(elem);
		 * 		e.currentTarget.style.display = 'flex';
		 * }); */
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
		histories.forEach( (v, i, a) => {
				y =   v.time.getFullYear();
				y =   `A.D. ${y}`;
				m =   v.time.getMonth();
				m =   num2month[m] + ` --${m+1}--`;
				d =   v.time.getDate();
				d =   d == 1 ? '1st' : d == 2 ? '2nd' : d == 3 ? '3rd' : d + 'th';
				h =   v.time.getHours();
				min = v.time.getMinutes();
				s =   v.time.getSeconds();
				ms =  v.time.getMilliseconds();
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
				else if(vP.time.getDate() != vP.time.getDate()){
						// else if(d != dP){
						date = document.createElement('div');
						date.className = 'hist-date';
						date.iahBE(`<span><span class="hist-mark">${'\u25b6'}</span> <span>${d}</span>`);
						month.iaeBE(date);
				}
				

				value = document.createElement('div');
				value.className = 'hist-value';

				// value.iahAB(`${h}:${m}:${s}, no: ${v.no}, title: <a>${v.section}</a>, name: <a>${v.title}</a>`);
				value.iahAB(`<span>${v.no}.<a class="hist-subtitle" href="${v.url}">${v.section}</a> \u2500 \u300e<a class="hist-title" href="${normalizeURL(v.url).split('/').slice(0, -2).join('/')}">${v.title}</a>\u300f<span>`);

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
		document.querySelectorAll('.hist-year, .hist-month, .hist-date').forEach( (v, i, a) => {
				v.classList.add('hist-opened');
				v.addEventListener('click', e => {
						e.stopImmediatePropagation();
						e.currentTarget.classList.toggle('hist-opened');
						e.currentTarget.classList.contains('hist-opened') && (e.currentTarget.scrollIntoView(true), $('#hist-c').scrollBy(0, -$('#hist-buttons').getBoundingClientRect().height));
				});
		});
		document.querySelectorAll('.hist-title').forEach( (v, i, a) => {
				v.addEventListener('click', e => { $('#hist-cc').click(); openTOC(e); } );
		});
		document.querySelectorAll('.hist-subtitle').forEach( (v, i, a) => {
				v.addEventListener('click', e => {  jumpToURL(v.href)(e); $('#hist-cc').click(); } );
				// v.addEventListener('click', e => {  jumpToSection(e); $('#hist-cc').click(); } );
		});
}
function jumpToSection(e){
		try{
				e.preventDefault();
				let url = e.currentTarget.href;
				// e.stopImmediatePropagation();
				/**/debug('start', {});
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
								obj.original.classList.add('showing-original');
								/**/debug('inter', {});
								/**/debug(obj, 'obj');
								/**/debug(obj.honbunC, 'obj.honbunC');

								document.body.appendChild(obj.honbunC);
								getNextHref() ? $('#next').href = getNextHref() : $('#next').removeAttribute('href');
								getPrevHref() ? $('#previous').href = getPrevHref() : $('#previous').removeAttribute('href');

								/**/debug(e.currentTarget);
								// history.pushState(null, ``, e.currentTarget.href);
								history.pushState(null, ``, url);
								unshiftHistory(new Date(), obj);
								
								return obj;
						});
				// alert(e.currentTarget);
		}catch(error){console.error(error)}
		// .catch(printErr);
    /**/debug('end', {});
}

function jumpToURL(url){
		return function _jumpToURL(e){
				try{
						e.preventDefault();
						// let url = e.currentTarget.href;
						// e.stopImmediatePropagation();
						/**/debug('start', {});
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
										obj.original.classList.add('showing-original');
										/**/debug('inter', {});
										/**/debug(obj, 'obj');
										/**/debug(obj.honbunC, 'obj.honbunC');

										document.body.appendChild(obj.honbunC);
										getNextHref() ? $('#next').href = getNextHref() : $('#next').removeAttribute('href');
										getPrevHref() ? $('#previous').href = getPrevHref() : $('#previous').removeAttribute('href');

										/**/debug(e.currentTarget, 'e.currentTarget');
										// history.pushState(null, ``, e.currentTarget.href);
										history.pushState(null, ``, url);
										unshiftHistory(new Date(), obj);
										
										return obj;
								});
						// alert(e.currentTarget);
				}catch(error){console.error(error)}
				// .catch(printErr);
        /**/debug('end', {});
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
		
		let caller = debug.caller || debug;
		if('object' === typeof(label)){
				let style = Object.entries(label).reduce((acc, v) => `${acc} ${v[0]}:${v[1]};`, "");
				if(style)
						;
				else
						style = 'font-style: normal; color: lime;';
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
