let sections = $('section');
let current = 0;
let timeout = 800;
//Allow the event listener to run only once every `timeout` microseconds
let lastCall = 0;
//Stores the last time the event listener ran successfully

$(document).on('mousewheel DOMMouseScroll', function(e) {
	if (lastCall >= (Date.now() - timeout)){
		//Event was triggered too fast so ignored
		return;
	}
	lastCall = Date.now();
	target = 0;
	//target was reset
 	var delta = e.originalEvent.detail < 0 || e.originalEvent.wheelDelta > 0 ? 1 : -1;
	//delta set to 1 if scrolled up and -1 if scrolled down

	 if(delta < 0){
		//Handling scroll down
		target = current + 1;
		//Target set to next section
	}
	else{
		//Handling scroll up
		target = current - 1;
		//Target set to previous section
	}

	if(sections.eq(target).length && target >= 0){
		//Checks if target section exists in html
		current = target;
		//Current has been set to target
		$('body, html').animate({
						scrollTop: sections.eq(current).offset().top
					  }, 800);
		//Move to the target(now stored in current) section
	}
});
