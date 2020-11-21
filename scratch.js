class OrderButton extends HTMLElement {
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
				

				// let template = document.createElement('template');
				shadow.innerHTML =
						'<template>' +
						'' +
						'<div>' +
						'  <a>' +
						'    <slot name="text">NAME</slot>' +
						'    <span>\u25bc</span>&nbsp;' +  /* u25bc:▼ */
						'  </a>' +
						'</div>' +
						'' +
						'</template>' +
						'' +
						'' ;
				
				// document.body.appendChild(template);
				let templateContent = shadow.querySelector('template').content;

				shadow.appendChild(style);
				shadow.appendChild(templateContent.cloneNode(true));

				this.a = shadow.querySelector('a');
				console.log(shadow);
				// console.log(template);
				console.log(templateContent);

				// template.remove();
				
				if(this.getAttributeNode('autonomous'))
						this.addEventListener('click', e => {
								// e.preventDefault(); e.stopImmediatePropagation();
								if('asc' === this.getAttribute('state'))
										this.setAttribute('state', 'desc');
								else
										this.setAttribute('state', 'asc');
						}, {capture: true});
				
		}


		static get observedAttributes() { return ['state']; }

		attributeChangedCallback(name, oldValue, newValue) {
				if('state' === name){
						if('asc' === newValue){
								this.a.innerHTML = this.a.innerHTML.replace(/\u{25bc}/u, '\u25b2'); /* u25bc:▼, u25b2:▲ */
						}
						if('desc' === newValue){
								this.a.innerHTML = this.a.innerHTML.replace(/\u{25b2}/u, '\u25bc');
						}
				}
		}
		
}
