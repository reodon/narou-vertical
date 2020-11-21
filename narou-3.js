// (()=>{
/* change set from storage */
/* chapter nashi taiou */
/* configure */
/* info box change when jump*/
/* history clear button */
/* toc auto open */
/* scroll always check moji zureru kara */
/* toc add title */
/* toc div goclick boushi */
/* history webfontbutton caret */
/* href="" hdden */
/* add chapter title to history */
/* tanpen taiou */
/* print siyou henkou */
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

var histories = loadHistory();
window.addEventListener('beforeunload', (e)=>{ saveHistory() });


// var histories = localStorage.getItem('histories') ? JSON.parse(localStorage.getItem('histories')) : [];
// histories.sort((a,b)=>{
// 		return a.time < b.time ? -1 : a.time > b.time ? 1 : 0}).reverse()
// 				 .forEach(v => { v.time = new Date(v.time) });
// window.addEventListener('beforeunload', (e)=>{localStorage.setItem('histories', JSON.stringify(histories))});


const options = {
		showPreface: true,
		showAfterword: true,
		useWebFontForText: true,
		useWebFontForButtons: true,
		changeDialogueFont: false,
		combineUprightDigits: 3,
		number: { useChinaAll: false,
							useChina: false,
							useGrouping: true,},
};
const flags = {
		isVertical: true,
		isScrolling: true,
};

let lang = navigator.languages[0];
const grouping = {useGrouping: true, style: 'decimal'};


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

/* @media screen { */
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

widows: 1;
orphans: 1;
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
background-color: white;
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
visibility: ; /*color: transparent;*/ }
  #container-of-buttons2:hover .buttons { 
visibility: visible; color: #80808080; /* gray,0.5 */ }

  .small-text { font-size: 1.75em; }
  .hovering { color: #80808080; }
  #container-of-buttons2:hover .not-hovering { visibility: hidden; }
  .buttons:active { color: green; }

  .row { width: 50%; }
  .icon { width: 10%; text-align: right; display: inline-block; }
  .caption:before { content:"\\00a0:\\00a0"; } /* nbsp */
  .icon-small { font-size: 1.5em; }


@media print {
 #container-of-buttons,
 #container-of-buttons2 {
   display: none;
 }
}

  /* .blur:before {
*   content: "";
*   z-index: -1;
*   filter: blur(4px);
*   position: absolute;
*   width: 100%;
*   height: 100%;
*   margin: 0;
*   padding: 0;
* } */
											`);

console.log('start');
Promise.resolve(document)
			 .then(gather)
			 .then(function(obj){
					 settingInfoBox(obj);
					 
					 Array.from(document.body.children).forEach(v => {v.remove()});
					 Array.from(document.body.childNodes).forEach(v => {v.remove()});
					 /**/console.log('funcstart');

					 document.body.iaeAB(obj.infoBox);
					 settingOriginalBox();
					 /**/console.log(obj);
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
					 /**/console.log('funcinter');
					 /**/console.log(obj);
					 /**/console.log(obj.honbunC);
					 /* Array.from(document.body.children).forEach(v => {v.remove()}); */
					 /* Array.from(document.body.childNodes).forEach(v => {v.remove()}); */
					 document.body.appendChild(obj.honbunC);
					 settingButtons2();
					 settingButtons();
					 
					 $('#next').href = getNextHref();
					 $('#previous').href = getPrevHref();
					 unshiftHistory(new Date(), obj);
					 
					 insertCustomProperty();
					 /**/console.log('funcend');

					 /*DEBUG*/if(Reflect.getOwnPropertyDescriptor(globalThis, '$$__DEBUG__$$'))
							 $$__testHistory__$$(obj);

					 return obj;
			 })
			 .catch(printErr);
console.log('end');



document.body.scrollTo({
		top: sessionStorage.getItem('scrollY'),
		left: sessionStorage.getItem('scrollX'),
		behavior: 'auto'
});
!options.showPreface && css.set('.preface', 'display', 'none');
!options.showAfterword && css.set('.afterword', 'display', 'none');







function settingButtons2(){
		try{				
				/**/console.log('flexbox2start');
				var flexbox2 = document.createElement('div');
				flexbox2.id = 'container-of-buttons2';
				flexbox2.setAttribute('ontouchstart', "");

				var buttons2 = [
						{ name: 'help',
							/* text: '\uff1f', // fullwidth:\uff1f, black:\u2753, white:\u2754  */
							innerHTML: options.useWebFontForButtons ? '<i class="far fa-question-circle fa-fw fa-lg"></i>' : '\uff1f',
							tagName: 'a',
							class: 'buttons',
							function: e => {
									e.preventDefault(); e.stopImmediatePropagation();
									css.set('.showing', 'filter', 'blur(2px)');
									/* css.set('body', 'filter', 'blur(1px)'); */
									let containerContainer = document.createElement('div');
									containerContainer.id = 'help-cc';
									containerContainer.className = 'blur';
									containerContainer.style =
											'z-index: 100; width: 100%; height: 100%; background-color: #80808080; ' +
											'display: flex; justify-content: center; align-items: center; position: fixed; top: 0; right: 0;';
									containerContainer.addEventListener('click', e => { css.remove('.showing', 'filter'); document.querySelector('#help-cc').remove(); });
									let container = document.createElement('div');
									container.style =	'width: 80%; height: 80%; writing-mode: horizontal-tb; background-color: white;  border-radius: 1em; display: flex; justify-content: space-around; align-items: center; flex-direction: column; flex-wrap: wrap;';
									let buttonOuter = document.createElement('a');
									buttonOuter.href = '#';
									buttonOuter.iahBE('&nbsp;close&nbsp;');
									
									buttonOuter.style = 'border-radius: .5em; background-color: #fffffffe; color: #80808080; display: block; position: absolute; top: 5%; left: 50%; transform: translate(-50%, -50%);'; 
									let html =
											`${$('#next') ?
											`<div class="row">
									<span class="icon">${$('#next').innerHTML}</span>
									<span class="caption">next chapter.</span></div>` : ""}
${$('#bottom') ?
									`<div class="row">
									<span class="icon">${$('#bottom').innerHTML}</span>
									<span class="caption">go to end of chapter.</span></div>` : ""}
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
									<span class="caption">go to title.</span></div>` : ""}
${$('#previous') ?
									`<div class="row">
									<span class="icon">${$('#previous').innerHTML}</span>
									<span class="caption">previous chapter.</span></div>` : ""}
${$('#table-of-contents') ?
									`<div class="row">
									<span class="icon">${$('#table-of-contents').innerHTML}</span>
									<span class="caption">open table of contents.</span></div>` : ""}
${$('#print') ?
									`<div class="row">
									<span class="icon">${$('#print').innerHTML}</span>
									<span class="caption">print chapters.</span></div>` : ""}
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
							} },
						{ name: 'table-of-contents',
							title: 'open table of contents',
							/* text: '\uff1f', // fullwidth:\uff1f, black:\u2753, white:\u2754  */
							innerHTML: options.useWebFontForButtons ? '<i class="fas fa-book-open fa-fw fa-lg"></i>' : '<b>TOC</b>',
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
						
						{ name: 'configure',
							/* text: '\u2699', */
							innerHTML: options.useWebFontForButtons ? '<i class="fas fa-wrench fa-fw fa-lg"></i>' : '\u2699', /* cog wrench */ /* bars sliders ellipsis */
							tagName: 'a',
							class: 'buttons',
							function: e =>{
									e.preventDefault(); e.stopImmediatePropagation();
									$('#configure-cc').style.display = 'flex';
							} },
						{ name: 'print',
							/* text: 'print', // \u1f5a8, \u1f5b6  */
							innerHTML: options.useWebFontForButtons ? '<i class="fas fa-print fa-fw fa-lg"></i>' : 'print',
							tagName: 'a',
							class: 'buttons',
							function: e =>{
									e.preventDefault(); e.stopImmediatePropagation();
									e.currentTarget.style.visibility = 'hidden';
									// e.currentTarget.style.display = 'none';

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
	 background-color: #0000ff80;
	 /* line-break: strict; */
	 overflow-wrap: break-word;
	 /* font: 200 1rem/1.8em "Noto Serif JP", serif; */
	 /* text-underline-position: right; */
	 /* writing-mode: vertical-rl; */
	 /* text-orientation: mixed; */
	 width: calc(297mm - 1mm) ;
	 height: calc(210mm - 1mm) ;
	 /* overflow: auto; */
	 /* width: 13446px; */
	 /* height: 592px; */
	 /* margin: 1px; */
	 padding-left: 1cm ;
	 padding-right: 1cm ;
	 padding-top: 1cm ;
	 padding-bottom: 1cm ;
  display: block;
	 /* transform: rotate(-90deg); */
	 /* transform: rotate(-90deg); */
	 /* transform-origin: right top; */
	 /* position: absolute; */
	 /* top: 0; right: 0; */
	 /* overflow: visible; */
} 
 .print-box:nth-child(2n){background-color: #00ffff80;}
 .print-box p[class="La1"] { padding-right: 1em; margin-right: 2em; border-right: double 3px #999999; }
 /* .print-box p[class^="La"]:first-of-type { border-right: double 3px #999999; } */
 /* .print-box p[class^="Lp"]:last-of-type { border-left: double 3px #999999; } */
 /* .print-box p[class^="Lp"] { border-left: double 3px #999999; } */
 p[class^="Lp"] + p[class$="title"] { padding-right: 2em; margin-right: 1em; border-right: double 3px #999999; }
 div.no + p.L1, p[class$="title"] + p.L1 { padding-right: 2em; }
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
											vc.style.backgroundColor = i % 2 == 0 ? '#ff000080' : '#00ff0080';
									});
									});

									!isMobile && window.print();
									e.currentTarget.style.visibility = "visible";
									$('#css-print').remove();
									Array.from($$('.print-box')).forEach( v => { v.remove(); delete v; });
											css.set('.showing', 'display', 'block');
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
	 background-color: #0000ff80;
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
 .print-box:nth-child(2n){background-color: #00ffff80;}
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
											vc.style.backgroundColor = i % 2 == 0 ? '#ff000080' : '#00ff0080';
									});
									});

									!isMobile && window.print();
									e.currentTarget.style.visibility = "visible";
									$('#css-print').remove();
									// Array.from($$('.print-box')).forEach( v => { v.remove(); delete v; });
											// css.set('.showing', 'display', 'block');
											// e.currentTarget.style.visibility = "hidden";
											// css.set('.honbun-c', 'display', 'block');
											// // window.print();
											// e.currentTarget.style.visibility = "visible";
											// css.set('.honbun-c', 'display', 'none');
											// $('#css-print').remove();
									// }
									} } },
				];
				console.log('flexbox2inner');
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
				console.log('flexbox2end');
		}catch(e){console.error(e)}
}




/* half-width
   0	1	2	3	4	5	6	7	8	9	A	B	C	D	E	F
	 U+0020		!	"	#	$	%	&	'	(	)	*	+	,	-	.	/
	 U+0030	0	1	2	3	4	5	6	7	8	9	:	;	<	=	>	?
	 U+0040	@	A	B	C	D	E	F	G	H	I	J	K	L	M	N	O
	 U+0050	P	Q	R	S	T	U	V	W	X	Y	Z	[	\	]	^	_
	 U+0060	`	a	b	c	d	e	f	g	h	i	j	k	l	m	n	o
	 U+0070	p	q	r	s	t	u	v	w	x	y	z	{	|	}	~	
 */
/* full-width
   ０ １ ２ ３ ４ ５ ６ ７ ８ ９ Ａ	Ｂ	Ｃ	Ｄ	Ｅ	Ｆ
	 U+FF00	＀	！	＂	＃	＄	％	＆	＇	（	）	＊	＋	，	－	．	／
	 U+FF10	０	１	２	３	４	５	６	７	８	９	：	；	＜	＝	＞	？
	 U+FF20	＠	Ａ	Ｂ	Ｃ	Ｄ	Ｅ	Ｆ	Ｇ	Ｈ	Ｉ	Ｊ	Ｋ	Ｌ	Ｍ	Ｎ	Ｏ
	 U+FF30	Ｐ	Ｑ	Ｒ	Ｓ	Ｔ	Ｕ	Ｖ	Ｗ	Ｘ	Ｙ	Ｚ	［	＼	］	＾	＿
	 U+FF40	｀	ａ	ｂ	ｃ	ｄ	ｅ	ｆ	ｇ	ｈ	ｉ	ｊ	ｋ	ｌ	ｍ	ｎ	ｏ
	 U+FF50	ｐ	ｑ	ｒ	ｓ	ｔ	ｕ	ｖ	ｗ	ｘ	ｙ	ｚ	｛	｜	｝	～	｟
 */
