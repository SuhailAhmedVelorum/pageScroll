/*!
 * pageScroll
 * https://github.com/SuhailAhmedVelorum/pageScroll
 *
 * @license GPLv3 for open source use only
 *
 */

//section tags are identified
//set classes for each of the sections
//base class = sec
//overriding class = sec1, sec2 so on make sure to set !important

let sections = $('section');
let num_sec = sections.length;
let temp;

//Initial CSS
$('.sec').css({"height":"100vh","width":"100vw","display":"flex","align-items":"center","justify-content":"center","background-color":"rgb(0,0,0)"});
$('body').css("overflow","hidden");
$('html').css("overflow","hidden");
$('*').css({"padding":"0px","margin":"0px","box-sizing":"border-box"});

if(num_sec >1){
	let current = 0;//Current active section
	let timeout = 800;//Allow the event listener to run only once every `timeout` microseconds
	let lastCall = 0;//Stores the last time the event listener ran successfully

	$(document).on('mousewheel DOMMouseScroll', function(e) {
		//Event was triggered too fast so ignored
		if (lastCall >= (Date.now() - timeout)){
			return;
		}
		lastCall = Date.now();
		target = 0;
		
		//delta set to 1 if scrolled up and -1 if scrolled down
	 	let delta = e.originalEvent.detail < 0 || e.originalEvent.wheelDelta > 0 ? 1 : -1;

		//Scrolled down
		if(delta < 0){
			target = current + 1;
		}
		//Scrolled up
		else{
			target = current - 1;
		}

		//Movement to scrolled section - checks existance and prevents out of bounds
		if(sections.eq(target).length && target >= 0){
			current = target;
			$('body, html').animate({
							scrollTop: sections.eq(current).offset().top
						  }, 800);
			selectstop(target);
		}
	});

	//Animate and move to the nth section and set fill current circle stop
	function teleport(n){
		$('body, html').animate({
			scrollTop: sections.eq(n).offset().top
		  }, 800);		
		selectstop(n);
	}

	//Calculate the color distance between the background color of the section and b/w returns 0 for dark background and 1 for light
	function coldist(temp){
		let bckgcolvals = $(".sec"+(temp)).css("background-color").slice(4,-1).split(",");
		let ra = parseInt(bckgcolvals[0]);
		let ga = parseInt(bckgcolvals[1]);
		let ba = parseInt(bckgcolvals[2]);
		let disttow = Math.sqrt(Math.pow(255-ra,2)+Math.pow(255-ga,2)+Math.pow(255-ba,2));
		let disttob = Math.sqrt(Math.pow(ra,2)+Math.pow(ga,2)+Math.pow(ba,2));
		if(disttob > disttow){
			return 1;
		}
		else{
			return 0;
		}
	}

	//Fills the currently active stop
	function selectstop(position){
		if(coldist(position) == 0){
			$('.stops').attr("src","./assets/light.svg");
			$('.sep-line').css("border-left","1px solid rgb(255, 255, 255)");
			$('.stopper'+position).attr("src","./assets/lightf.svg");
		}
		else{
			$('.stops').attr('src','./assets/dark.svg');
			$('.sep-line').css("border-left","1px solid rgb(0, 0, 0)");
			$('.stopper'+position).attr("src","./assets/darkf.svg");
		}
	}

	//Defining altscroll
	let altscr = document.createElement("div");
	altscr.className = "alt-scroll";
	altscr.id= "alt-scroll";

	//Adds the first circle stop and defines the separating line
	let sep = '<div class="sep-line"></div>';
	let stopper0;
	if(coldist(0) == 0){
		stopper0 = '<img src="./assets/lightf.svg" class="stops stopper0" onclick="teleport(0)">';
	}
	else{
		stopper0 = '<img src="./assets/darkf.svg" class="stops stopper0" onclick="teleport(0)">';
	}
	let template = document.createElement('template');
	template.innerHTML = stopper0;
	altscr.appendChild(template.content.firstChild);


	//Adds the separating lines and the following circle stops
	let stopper;
	for(temp = 1; temp < num_sec; temp++){
		stopper = '<img src="./assets/light.svg" class="stops stopper'+temp+'" onclick="teleport('+temp+')">';
		template = document.createElement('template');
		template.innerHTML = sep + stopper;
		altscr.appendChild(template.content);
	}

	//Add my beautiful scroll to the page
	document.body.appendChild(altscr);
	$('.alt-scroll').css({"position":"fixed","right":"1%","width":"2%","height":"50%","top":"50%","transform":"translateY(-50%)","display":"inline-block","justify-content":"center","align-items":"cemter","vertical-align":"middle"});
	$('.stops').css({"display":"block","cursor":"pointer","position":"relative","height":"4%","left":"50%","transform":"translateX(-50%)","padding":"5px","background-color":"transparent"});
	$('.sep-line').css({"display":"block","position":"relative","left":"50%","transform":"translateX(-50%)","width":"1px","border-left":"1px solid rgb(255,255,255)"});
	selectstop(0);
	

	//Dynamically set the height of the separating lines
	let altscrlheight = $('.alt-scroll').css('height').slice(0,-2);
	let spercent = 1700/altscrlheight;
	let lineavail = 100 - (spercent*num_sec);
	let linepercent = lineavail/(num_sec-1);
	$('.sep-line').css('height',linepercent+'%');
}