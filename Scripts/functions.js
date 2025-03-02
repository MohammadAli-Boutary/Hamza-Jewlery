$(document).ready(function () {
    initAOS();
    titleAnimation();
    checkLastScroll();
    animateTitles();
    toggleActive();
    mobileMenuToggler();
    console.log("All functions initialized.");

});

function initAOS() {
    AOS.init({
        duration: 1000,  // Animation duration in ms
        easing: 'ease-in-out',  // Easing function
        once: true,  // Animate only once
    });
}

function animateTitles() {
    gsap.registerPlugin(ScrollTrigger);

    try {
        gsap.utils.toArray(".fadeTitle").forEach((title) => {
            gsap.set(title, {
                transform: "translate3d(0, 100%, 0)",
                clipPath: "polygon(-10% -100%, 110% -100%, 110% 0%, -10% 0%)",
                opacity: 0, // Initially hidden
            });

            gsap.to(title, {
                scrollTrigger: {
                    trigger: title,
                    start: "top 100%",
                    end: "top 20%",
                    toggleActions: "play none none once", // Play on enter, reverse on exit
                    markers: false, // Debugging option
                    once: true,
                },
                duration: 1.2, // Animation duration
                ease: "power2.out", // Smooth easing
                transform: "translate3d(0, 0, 0)",
                clipPath: "polygon(-10% 0%, 110% 0%, 110% 110%, -10% 110%)",
                opacity: 1, // Fade in
            });
        });

        // gsap.utils.toArray(".fadeTitle").forEach(title => {
        //     gsap.set(title, {
        //         transform: "translate3d(0, 100%, 0)",
        //         clipPath: "polygon(-10% -100%, 110% -100%, 110% 0%, -10% 0%)"
        //     });

        //     gsap.to(title, {
        //         scrollTrigger: {
        //             trigger: title,
        //             start: "top 100%",
        //             end: "top 20%",
        //             toggleActions: "play none none reverse", // Play on enter, reverse on exit
        //             markers: false, // Set to true to debug
        //             once: true,
        //         },
        //         duration: 1.5, // Duration of animation
        //         ease: "power2.out", // Smooth easing
        //         transform: "translate3d(0, 0, 0)",
        //         clipPath: "polygon(-10% 0%, 110% 0%, 110% 110%, -10% 110%)"
        //     });
        // });
    } catch (error) {
        console.log("Error with animateTitles: ", error);
    }
}

function toggleActive() {

    gsap.registerPlugin(ScrollTrigger);

    gsap.to(".collections .listingHolder", {
        scrollTrigger: {
            trigger: ".collections .listingHolder",
            start: "top 80%", // Adjust based on when you want the effect to trigger
            toggleClass: "active",
            once: true, // Ensures it only triggers once
        }
    });
}
function mobileMenuToggler() {
    $(".menuButton").click(function () {
        $(".menuList").addClass("active");
        $("body").css("overflow", "hidden"); // Prevent scrolling
    });

    $(".close").click(function () {
        $(".menuList").removeClass("active");
        $("body").css("overflow", ""); // Restore scrolling
    });
}


function checkLastScroll() {
    var lastScrollTop = 0; // Keep track of the last scroll position
    var delta = 20; // Threshold for detecting scroll changes
    var whiteMenuOffset = 200; // Offset before transitioning to whiteMenu

    $(window).scroll(function () {
        var nowScrollTop = $(this).scrollTop(); // Get the current scroll position

        // Check if the scroll change is significant or at the top of the page
        if (Math.abs(lastScrollTop - nowScrollTop) >= delta || nowScrollTop <= 100) {
            if (nowScrollTop <= 100) {
                // When closer to the top (<= 100px), always show the header
                $("header").removeClass("hideMenu whiteMenu");

                if ($(".mainBanner").length) {
                    $("header").removeClass("whiteMenu");
                }
            } else if (nowScrollTop > lastScrollTop) {
                // Scrolling down, hide the header
                $("header").addClass("hideMenu").removeClass("showMenu");


            } else {
                // Scrolling up, show the header
                $("header").removeClass("hideMenu").addClass("showMenu");

                // // Remove whiteMenu if scrolling back above the offset
                // if (nowScrollTop < whiteMenuOffset) {
                //     $("header").removeClass("whiteMenu");
                // }

            }

            lastScrollTop = nowScrollTop; // Update the last scroll position
        }
    });
}


// Title Animation
function titleAnimation() {
    try {
        const childSplit = new SplitText(".lettersFadeUp", {
            type: "words,chars",
            linesClass: "split-child",
        });
        const parentSplit = new SplitText(".text-animate", {
            // type: "lines",
            linesClass: "split-parent",
        });

        // Timeline for the animation
        const tl = gsap.timeline({
            defaults: {
                duration: 0.8,
                ease: "power3.inOut",
            },
        });

        // Animation for each letter of the text
        tl.from(childSplit.chars, {
            duration: 0.5,
            y: 50,
            // yPercent: 100,
            // ease: "power4",
            ease: "power3.out",
            delay: 1,
            stagger: 0.1,
            opacity: 0,

        });


        ScrollTrigger.create({
            trigger: ".lettersFadeUp",
            animation: tl,
            start: "top 90%",
            // end: "top 50%", // Adjust if needed
            scrub: false,
            // once: true, // Ensures the animation only happens once
            markers: false, // Debugging markers

        });
    } catch (error) {
        console.log("Error in titles: ", error);
    }
}
function splitTextHandler(element, type) {
    const splitText = new SplitText(element, {
        type: type,
        wordsClass: "word",
        linesClass: "line",
        charsClass: "char",
    });
    return splitText;
}
