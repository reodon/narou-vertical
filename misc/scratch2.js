async
function gatherTOC(html){
		let noveltitle = html.$('.novel_title');
		let indexBox = html.$('.index_box') || html.$('.novel_sublist');
		indexBox = [...indexBox];
		let pageNavi = html.$('.page_navi'); /* nullable */
		
		if(pageNavi)
				for(let v of [...pageNavi.$$('a')].slice(0, -2)){
						/**/debug(v.href, 'v.href');
						let sublist = await fetch(v.href)
								.then(parse)
								.then( doc => {
										// indexBox = [ ...indexBox, ...doc.$('.novel_sublist').$$('li') ];
										return doc.$('.novel_sublist').$$('li');
								});
						indexBox = [ ...indexBox, ...sublist ];
				}

		return {noveltitle, indexBox};
}

