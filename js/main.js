// main.js
document.addEventListener("DOMContentLoaded", () => {
  // Initialize Locomotive Scroll
  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("[data-scroll-container]"),
    smooth: true, 
    lerp: 0.06,
    multiplier: 1.0,
    touchMultiplier: 2.0,
    smartphone: { smooth: true },
    tablet: { smooth: true }
  });

  // ScrollTrigger Integration
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.scrollerProxy("[data-scroll-container]", {
    scrollTop(value) {
      return arguments.length ? 
        locoScroll.scrollTo(value, 0, 0) : 
        locoScroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight
      };
    }
  });

  // Navbar Animation
  const navbar = document.querySelector('nav');
  ScrollTrigger.create({
    start: "top -80",
    onUpdate: (self) => {
      if (self.direction === -1) {
        navbar.classList.remove('scrolled');
      } else {
        navbar.classList.add('scrolled');
      }
    }
  });

  // Hero Animations
  gsap.from(".hero-content > *", {
    y: 50,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: "power3.out"
  });

  // Animated Gradient Text  
  gsap.to(".hero-title", {
    backgroundPositionX: "200%",
    duration: 3,
    repeat: -1,
    ease: "linear"
  });

  // Feature Cards Animation
  gsap.utils.toArray(".feature-card").forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        scroller: "[data-scroll-container]",
        start: "top 85%",
      },
      y: 60,
      opacity: 0,
      duration: 1,
      delay: i * 0.2,
      ease: "power3.out"
    });
  });

  // Course Card Animations
  gsap.utils.toArray(".course-card").forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: "top 85%", 
        end: "bottom center",
        scroller: "[data-scroll-container]",
        toggleActions: "play none none reverse"
      },
      y: 50,
      opacity: 0,
      duration: 1,
      delay: i * 0.2,
      ease: "power3.out"
    });
  });

  // Course Topics Stagger Animation
  gsap.utils.toArray(".course-topics").forEach(list => {
    gsap.from(list.children, {
      scrollTrigger: {
        trigger: list,
        start: "top 85%",
        scroller: "[data-scroll-container]"
      },
      y: 20,
      opacity: 0, 
      duration: 0.8,
      stagger: 0.1,
      ease: "power2.out"
    });
  });

  // Particles Configuration
  particlesJS("particles-js", {
    particles: {
      number: { value: 80 },
      color: { value: "#FFCE32" },
      opacity: { value: 0.5 },
      size: { value: 3 },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#1D63FF",
        opacity: 0.3,
        width: 1
      },
      move: {
        enable: true,
        speed: 2,
        direction: "none",
        random: false,
        straight: false,
        out_mode: "out",
        bounce: false
      }
    },
    interactivity: {
      detect_on: "canvas", 
      events: {
        onhover: {
          enable: true,
          mode: "grab"
        },
        resize: true
      }
    }
  });

  // Smooth Scroll for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        locoScroll.scrollTo(targetElement);
      }
    });
  });

  // Update ScrollTrigger when locomotive scroll updates
  locoScroll.on("scroll", ScrollTrigger.update);

  // Update ScrollTrigger when window resizes
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  ScrollTrigger.refresh();
});