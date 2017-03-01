var $body,
	$demos,
	$crane,
	$map,
	$toggleBtn,
	$toggleOn,
	$toggleOff,
	crane,
	craneFaces,
	cubeFaces,
	diamondFaces,
	shadeAmount,
	tintAmount,
	light,
	currentCover,
	renderTimer,
	isLit,
	domTransformProperty,
	cssTransformProperty,
	domTransitionProperty,
	cssTransitionProperty,
	transitionEndEvent,
	transitionEndEvents = {
		'WebkitTransition' : 'webkitTransitionEnd',
		'MozTransition'    : 'transitionend',
		'OTransition'      : 'oTransitionEnd',
		'msTransition'     : 'MSTransitionEnd',
		'transition'       : 'transitionend'
	};





$(document).ready(function() {
	$body = $('body');
	$demos = $('.demo');
	light = new Photon.Light();
	shadeAmount = .5;
	tintAmount = 0;
	cubeFaces = [];
	diamondFaces = [];
	currentCover = 0;
	renderCurrent = renderCrane;
	$toggleBtn = $('.toggle-btn');
	$toggleOn = $('.toggle .label-on');
	$toggleOff = $('.toggle .label-off');
	isLit = true;
	domTransformProperty = Modernizr.prefixed('transform');
	cssTransformProperty = domToCss(domTransformProperty);
	domTransitionProperty = Modernizr.prefixed('transition');
	cssTransitionProperty = domToCss(domTransitionProperty);
	transitionEndEvent = transitionEndEvents[domTransitionProperty];

	setupLightControls();
	setupCrane();

	// demo menu
	$('.example-menu a').bind('click', onDemoNav);

	if(cssTransformProperty === '-webkit-transform' || cssTransformProperty === 'transform') {
		showCrane();
	} else {
		$('.map-thumb').click();
		showMap();
		$('.crane').hide();
		$('.crane-thumb').hide();
	}
});







/*---------------------------------

	Light Controls

---------------------------------*/

function setupLightControls() {
	$('.toggle a').bind('click', toggleLight);
}

function toggleLight(e) {
	e.preventDefault();

	switch($(e.target).attr('id')) {
		case 'label-on':
			isLit = true;
			$toggleBtn.addClass('on');
			$toggleOn.addClass('current');
			$toggleOff.removeClass('current');
			$('.photon-shader').show();
			break;
		case 'label-off':
			isLit = false;
			$toggleBtn.removeClass('on');
			$toggleOn.removeClass('current');
			$toggleOff.addClass('current');
			$('.photon-shader').hide();
			break;
		case 'toggle-btn':
			isLit = !isLit;
			$toggleBtn.toggleClass('on');
			$toggleOn.toggleClass('current');
			$toggleOff.toggleClass('current');
			$('.photon-shader').toggle();
			break;
	}
}








/*---------------------------------

	Menus

---------------------------------*/

function onDemoNav(e) {
	e.preventDefault();

	var demo = $(e.target).attr('data-demo');

	$('.example-menu .current').removeClass('current');
	$(this).addClass('current');

	switch(demo) {
		case 'crane':
			showCrane();
			renderCurrent = renderCrane;
			break;


	renderCurrent();
	if(!isLit) {
		$('.photon-shader').hide();
	}
}









/*---------------------------------

	Crane

---------------------------------*/

function setupCrane() {
	$crane = $('.crane');
	crane = new Photon.FaceGroup($('.crane')[0], $('.crane .face'), .6, .1, true);
	renderCrane();
}

function renderCrane() {
	crane.render(light, true);
}

function showCrane() {
	$body.bind('mousemove', rotateCrane);
	$crane.show();
}

function hideCrane() {
	$body.unbind('mousemove', rotateCrane);
	$crane.hide();
}

function rotateCrane(e) {
	var xPer = e.pageX / $body.width();

	$(crane.element).css(cssTransformProperty, 'rotateX(-15deg) rotateY(' + (-180 + (xPer * 360)) + 'deg)');
	renderCrane();
}












/*---------------------------------

	Utilities

---------------------------------*/

function domToCss(property) {
	var css = property.replace(/([A-Z])/g, function (str, m1) {
		return '-' + m1.toLowerCase();
	}).replace(/^ms-/,'-ms-');

	return css;
}

function clamp(val, min, max) {
    if(val > max) return max;
    if(val < min) return min;
    return val;
}
