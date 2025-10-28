gsap.registerPlugin(ScrollTrigger); /* adding the plugin fo the scrolltrigger animation to work*/


/* music*/
const audio = document.getElementById('backgroundmusic');

function playMusic() {
  if (audio.paused) audio.play();
}

window.addEventListener('scroll', playMusic, { once: true }); /*to play the music on scroll*/
window.addEventListener('click', playMusic, { once: true });/*to play the music on click, added this one as the scroll was not always working*/


/*homepage - clouds*/

gsap.to('#cloud1', { /*making it move just a bit, so that when the scroll trigger is activated, the movement does not appear all of a sudden. */
    x: 30, /*x- axis moves towards the middle on the right*/
    duration: 20,   
    ease: 'power1.inOut', /*Gsap easing, moves faster at start and end*/
    repeat: -1, /*to repeat the animation in cycle*/         
    yoyo: true, /*yoyoing left and right to create a natural look*/       
  });

gsap.to('#cloud2', {
    x: 30, /*x- axis moves towards the middle on the left*/
    duration: 20,
    ease: 'power1.inOut',
    repeat: -1,
    yoyo: true,
  });

/*parallax scrolling*/
gsap.fromTo('#cloud1',
  { xPercent: -10, yPercent:35 }, /*beginning position, from:*/
  { xPercent: 40, yPercent: -95, /*ending position, to:*/

    ease: 'none',  /*no ease so that it match te scroll movement perfectly, increasing user experience by creating a mapping effect*/
    scrollTrigger: {
      trigger: '.hero-wrap',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 0.8 /*linking the animation*/
    }
  }
);

gsap.fromTo('#cloud2',
  { xPercent: 50, yPercent: 85 }, /*beginning position, from:*/
  { xPercent: -50, yPercent: -95, /*ending position, to:*/

    ease: 'none', 
    scrollTrigger: {
      trigger: '#home',
      start: 'top bottom', 
      end: 'bottom top',
      scrub: 0.8
    }
  }
);

/*SECTION 5 - record player*/

const centerrotate = document.getElementById('centerrotate'); 
const pin = document.getElementById('pin');

let rotationspin = gsap.to(centerrotate, { /*spinning 360 degrees, full rotation*/
  rotation: 360,/*spinning 360 degrees, full rotation*/
  duration: 5,/*5 seconf per spin to create a calming effect that is not too overwhelming*/
  repeat: -1,/*repeating infinitely*/
  transformOrigin: "50% 50%" /*to create a center spin*/
});

let spinning = true; 


centerrotate.addEventListener('click', () => {
  if (spinning) {   /*if spinning on click stop and move the pin*/
    gsap.to(rotationspin, { timeScale: 0, duration: 1, ease: "power2.out" });   /*using GSAP Timescale to make the animation start and stop slowly*/
    gsap.to(pin, { rotation: -22, duration: 0.25, ease: "power2.out" });
  } 
  
  else {  /*else resume spins again*/
    gsap.to(rotationspin, { timeScale: 1, duration: 0.6, ease: "power2.inOut" });
    gsap.to(pin, { rotation: -11, duration: 0.25, ease: "power2.out" });
  }
  spinning = !spinning;  /*switching between the true and false, to make it possible to click it on and off */
});


/*SECTION 6 - fan*/

let bladeSpin = gsap.to("#bladesvg", { /*making the blade spin first then using the scroll trigger, Pin, Scrub,Debug from Gsap. GSAP. n.d. “Pin, Scrub, Debug.” GSAP. Accessed October 22, 2025. https://gsap.com/scroll/. */
  rotation: 800, /*rotating the fan */                        
  transformOrigin: "50% 50%", /*rotating the blade in the center point */     
  paused: true /*to make it spin only while scrolling */     
});


ScrollTrigger.create({  /*to activate the scroll trigger */     
  animation: bladeSpin,      
  trigger: "#bladesvg",  /*spin when the blade is in view*/   
  start: "top center", /*start spinning when the top is in the center*/  
  end: "+=500", /*end spining*/  
  scrub: 3   /*relates to scrolling, i wanted it to contiue moving a bit after user stop scrolling , just like a fan takes time to stop, making it natural */                          
});


/*SECTION 7 - phone*/

const phoneOn = document.getElementById('phoneOn'); /*selecting the image for phone on*/  
const phoneOff = document.getElementById('phoneOff'); /*selecting the image for phone off*/  
const powerSwitch = document.getElementById('powerSwitch');  /*selecting the  switch*/  

function togglePhoneImages(isOn) {  /*if swicth is on show phoneon*/  
  if (isOn) { 
    phoneOn.classList.add('visible'); 
    phoneOff.classList.remove('visible');
  } else { /*else show phone off*/ 
    phoneOn.classList.remove('visible');
    phoneOff.classList.add('visible');
  }
}

togglePhoneImages(true);  /*initial button will be on 'on' for use to turn it off according to the storytelling*/  

powerSwitch.addEventListener('sl-change', (event) => { /*listen to the event, beinf switch on or off and then show the appropriate image dependingon that was toggled.*/
  togglePhoneImages(event.target.checked);
});


