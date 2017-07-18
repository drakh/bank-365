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
			e.stop();
		}
		this.el.toggleClass('open');
	},
	go_to: function (el, e)
	{
		if (e)
		{
			e.stop();
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

			'click'     : this.close.bind(this)
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

		if (this.main.hasClass('openArticle')) {
			this.a.removeClass('open');
		} else {
			this.a.addClass('open');
		}

		if (this.a.hasClass('open')) {
			this.main.toggleClass('openArticle');
		} else {
			this.main.removeClass('openArticle');
		}
	},
	open: function ()
	{
		this.a.addClass('open');
	},
	close: function ()
	{
		if (window.innerWidth > 740) {
			this.a.removeClass('open');
		}
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
			//$('cookie_b').addEvent('click', this.set_cookie.bind(this));
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
