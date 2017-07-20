/* yes with mootools we need this to use addEvent()*/
var media_events = {
	loadstart: 2,
	progress: 2,
	suspend: 2,
	abort: 2,
	error: 2,
	emptied: 2,
	stalled: 2,
	play: 2,
	pause: 2,
	loadedmetadata: 2,
	loadeddata: 2,
	waiting: 2,
	playing: 2,
	canplay: 2,
	canplaythrough: 2,
	seeking: 2,
	seeked: 2,
	timeupdate: 2,
	ended: 2,
	ratechange: 2,
	durationchange: 2,
	volumechange: 2
};

Element.NativeEvents = Object.merge(Element.NativeEvents, media_events);


var menu = new Class({
	Implements: [Events, Options],
	initialize: function (el, o)
	{
		this.setOptions(o);
		this.el = el;
		var p = el.getElement('.patty');
		p.addEvent('click', this.toggle.bind(this));
		var btns = el.getElements('aside a');
		this.btns = btns;
		for (var i = 0; i < btns.length; i++)
		{
			btns[i].addEvent('click', this.go_to.bind(this, btns[i]));
		}
	},
	do_sel: function (s)
	{
		for (var i = 0; i < this.btns.length; i++)
		{
			this.btns.removeClass('s');
		}
		if (s.c == 0)
		{
			this.btns[0].addClass('s');
		}
		else if (s.c == 9)
		{
			this.btns[3].addClass('s');
		}
		else if (s.c == 8)
		{
			this.btns[2].addClass('s');
		}
		else
		{
			this.btns[1].addClass('s');
		}
	},
	toggle: function (e)
	{
		if (e)
		{
			//e.stop();
		}
		this.el.toggleClass('open');
	},
	go_to: function (el, e)
	{
		if (e)
		{
			//e.stop();
		}
		var h = el.get('href').replace('#', '');
		this.el.removeClass('open');
		this.fireEvent('goto', h);
	}
});

var profile = new Class({
	initialize: function (el)
	{
		this.main = el.getElement('main');
		this.a = el.getElement('main article');
		el.addEvents({
			'mouseenter': this.open.bind(this),
			'mouseleave': this.close.bind(this),
			
			'click': this.close.bind(this)
		});
		var a = el.getElement('main header a');
		a.addEvent('click', this.toggle.bind(this));
		var main = el.getElement('main header strong');
		var video = el.getElement('aside');
		main.addEvent('click', this.toggle.bind(this));
		video.addEvent('click', this.toggle.bind(this));
	},
	toggle: function (e)
	{
		e.stop();
		
		if (this.main.hasClass('openArticle'))
		{
			this.a.removeClass('open');
		}
		else
		{
			this.a.addClass('open');
		}
		
		if (this.a.hasClass('open'))
		{
			this.main.toggleClass('openArticle');
		}
		else
		{
			this.main.removeClass('openArticle');
		}
	},
	open: function ()
	{
		this.a.addClass('open');
	},
	close: function ()
	{
		if (window.innerWidth > 740)
		{
			this.a.removeClass('open');
		}
	}
});

var art_switcher = new Class({
	initialize: function (el)
	{
		this.el = el;
		var s = el.getElements('.breadcrumbs .r_switch');
		for (var i = 0; i < s.length; i++)
		{
			var b = s[i].getElement('button');
			b.addEvent('click', this.switch_articles.bind(this, i))
		}
		this.s = s;
	},
	switch_articles: function (i, e)
	{
		e.stop();
		for (var j = 0; j < this.s.length; j++)
		{
			this.s[j].removeClass('active');
		}
		this.el.removeClass('new');
		if (i == 1)
		{
			this.el.addClass('new');
		}
		this.s[i].addClass('active');
	}
});

var art_sharer = new Class({
	initialize: function (el)
	{
		this.str = '';
		this.el = el;
		this.shr_el = $('share_el');
		this.shareables = document.body.getElements('.shareable');
		this.shr_el.addEvents({
			'mouseenter': this.clr_tm.bind(this),
			'mouseleave': this.mk_leave.bind(this)
		});
		this.svgs = this.shareables.getElement('svg');
		for (var i = 0; i < this.shareables.length; i++)
		{
			this.shareables[i].addEvents({
				'mouseleave': this.mk_leave.bind(this),
				'mouseenter': this.clr_tm.bind(this),
				'mousedown': this.foo.bind(this),
				'mouseup': this.foo.bind(this),
				'click': this.show_shr_el_shareable.bind(this, i)
			});
			this.svgs[i].addEvents({
				'mouseleave': this.mk_leave.bind(this),
				'mouseenter': this.clr_tm.bind(this),
				'mousedown': this.foo.bind(this),
				'mouseup': this.foo.bind(this),
				'click': this.show_shr_el_shareable.bind(this, i)
			});
		}
		this.a_s = [];
		var lis = this.shr_el.getElements('li');
		for (var i = 0; i < lis.length; i++)
		{
			var a = lis[i].getElement('a');
			a.addEvents({
				'mousedown': this.foo.bind(this),
				'mouseup': this.foo.bind(this),
				'click': this.mk_share.bind(this, i)
			});
			lis[i].addEvents({
				'mousedown': this.foo.bind(this),
				'mouseup': this.foo.bind(this),
				'click': this.mk_share.bind(this, i)
			});
			this.a_s[i] = a;
		}
		el.addEvents({
			'mousedown': this.log_mouse_start.bind(this),
			'touchstart': this.log_mouse_start.bind(this),
			'mouseup': this.get_sel.bind(this),
			'touchend': this.get_sel.bind(this)
		});
		window.addEvents({
			'mousedown': this.hide_share.bind(this),
			'resize': this.hide_share.bind(this)
		})
	},
	clr_tm: function (e)
	{
		if (e)
		{
			e.stop();
		}
		if (this.timer)
		{
			clearTimeout(this.timer);
		}
	},
	mk_leave: function (e)
	{
		if (e)
		{
			e.stop();
		}
		this.clr_tm();
		this.timer = this.hide_share.delay(500, this);
	},
	foo: function (e)
	{
		e.stop();
	},
	hide_share: function ()
	{
		this.shr_el.setStyles({
			'display': 'none'
		});
		this.shr_el.removeClass('mid');
		this.shr_el.removeClass('down');
		this.str = '';
	},
	log_mouse_start: function (e)
	{
		this.mouse_start = e.page;
		this.hide_share();
	},
	show_shr_el_shareable: function (i, e)
	{
		e.stop();
		this.hide_share();
		var el = this.shareables[i];
		var sv = this.svgs[i];
		var sz = sv.getSize();
		var pos = sv.getPosition();
		var y_off = pos.y;
		if (el.hasClass('share'))
		{
			this.shr_el.addClass('mid');
			y_off = pos.y - 60;
		}
		else if (el.hasClass('images-inner'))
		{
			this.shr_el.addClass('down');
			y_off = pos.y + sz.y + 20;
		}
		else if (el.hasClass('quote'))
		{
			this.shr_el.addClass('down');
			y_off = pos.y + sz.y + 20;
		}
		this.show_shr_el();
		this.shr_el.setStyles({
			'left': (pos.x + (sz.x / 2)) - (this.shr_el_sz.x / 2),
			'top': y_off
		});
	},
	show_shr_el: function ()
	{
		this.shr_el.setStyles({
			'display': 'block'
		});
		this.shr_el_sz = this.shr_el.getSize();
	},
	get_sel: function (e)
	{
		//e.stop();
		var str = this.getSel();
		if (str.length > 5)
		{
			var st = this.mouse_start;
			var ed = e.page;
			var x = st.x;
			var y = st.y;
			this.show_shr_el();
			
			if (st.x > ed.x)
			{
				x = ed.x;
			}
			if (st.y > ed.y)
			{
				y = ed.y;
			}
			this.str = str;
			
			this.shr_el.setStyles({
				'left': x,
				'top': (y - (this.shr_el_sz.y * 1.1))
			});
		}
	},
	deSel: function ()
	{
		if (document.selection && document.selection.createRange)
		{
			document.selection.empty();
		}
		else if (document.getSelection)
		{
			return document.getSelection().removeAllRanges();
		}
		else if (window.getSelection)
		{
			return window.getSelection().removeAllRanges();
		}
	},
	getSel: function ()
	{
		if (document.selection && document.selection.createRange)
		{
			return document.selection.createRange().text;
		}
		else if (document.getSelection)
		{
			return document.getSelection().toString();
		}
		else if (window.getSelection)
		{
			return window.getSelection().toString();
		}
		else
		{
			return '';
		}
	},
	mk_share: function (i, e)
	{
		e.stop();
		var url = this.a_s[i].get('href');
		url = url.replace('{{@SEL_TEXT}}', this.str);
		this.hide_share();
		this.deSel();
		window.open(url);
	}
});

var App = {
	init: function ()
	{
		this.menus = [];
		this.b = document.body;
		this.check_cookie();
		this.init_menus();
		this.init_profiles();
		
		var main_articles = $('main_articles');
		if (main_articles)
		{
			new art_switcher(main_articles);
		}
		var main_article = $('main_article');
		if (main_article)
		{
			new art_sharer(main_article);
		}
	},
	init_profiles: function ()
	{
		var p = $$('section.profile');
		for (var i = 0; i < p.length; i++)
		{
			new profile(p[i]);
		}
	},
	check_cookie: function ()
	{
		if (Cookie.read('consent') != 'yess')
		{
			$('cookie_l').addClass('v');
			$('cookie_b').addEvent('click', this.set_cookie.bind(this));
		}
	},
	set_cookie: function (e)
	{
		e.stop();
		$('cookie_l').removeClass('v');
		Cookie.write('consent', 'yess', {duration: 365});
	},
	init_menus: function ()
	{
		
		var m = $$('nav.main-menu');
		for (var i = 0; i < m.length; i++)
		{
			this.menus[i] = new menu(m[i]);
		}
	}
};

window.addEvent('domready', App.init.bind(App));
