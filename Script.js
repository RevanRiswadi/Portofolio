// Dark Mode Toggle
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light-mode';
document.body.classList.add(currentTheme);
updateThemeIcon();

themeToggle.addEventListener('click', () => {
  if (document.body.classList.contains('dark-mode')) {
    document.body.classList.remove('dark-mode');
    document.body.classList.add('light-mode');
    localStorage.setItem('theme', 'light-mode');
  } else {
    document.body.classList.add('dark-mode');
    document.body.classList.remove('light-mode');
    localStorage.setItem('theme', 'dark-mode');
  }
  updateThemeIcon();
});

function updateThemeIcon() {
  const icon = themeToggle.querySelector('i');
  if (document.body.classList.contains('dark-mode')) {
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
  } else {
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
  }
}

// Intersection Observer for Fade-in Animation
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
  observer.observe(el);
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    subject: document.getElementById('subject').value,
    message: document.getElementById('message').value
  };

  try {
    // Using Formspree for free email service
    const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      formMessage.textContent = '✅ Pesan berhasil dikirim! Terima kasih telah menghubungi saya.';
      formMessage.classList.add('success');
      formMessage.classList.remove('error');
      contactForm.reset();
      
      // Clear message after 5 seconds
      setTimeout(() => {
        formMessage.classList.remove('success');
        formMessage.textContent = '';
      }, 5000);
    } else {
      throw new Error('Form submission failed');
    }
  } catch (error) {
    // Fallback: Local storage + Alert
    formMessage.textContent = '✅ Pesan disimpan! (Hubungkan Formspree untuk email otomatis)';
    formMessage.classList.add('success');
    formMessage.classList.remove('error');
    
    // Save to localStorage
    const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
    messages.push({
      ...formData,
      timestamp: new Date().toLocaleString()
    });
    localStorage.setItem('contactMessages', JSON.stringify(messages));
    
    contactForm.reset();
    
    setTimeout(() => {
      formMessage.classList.remove('success');
      formMessage.textContent = '';
    }, 5000);
  }
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Navbar Active Link Indicator
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  const sections = document.querySelectorAll('section');
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').slice(1) === current) {
      link.classList.add('active');
    }
  });
});

// Skill Bar Animation
const skillBars = document.querySelectorAll('.skill-bar');
const skillObserverOptions = {
  threshold: 0.5
};

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar = entry.target.querySelector('.skill-progress');
      const width = bar.style.width;
      bar.style.width = '0';
      
      // Trigger animation
      setTimeout(() => {
        bar.style.width = width;
      }, 100);
      
      skillObserver.unobserve(entry.target);
    }
  });
}, skillObserverOptions);

skillBars.forEach(bar => {
  skillObserver.observe(bar);
});

// Scroll-based animations for elements
const animateOnScroll = () => {
  const elements = document.querySelectorAll('.fade-in, .project-card, .stat-card, .edu-card');
  
  elements.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;
    const elementBottom = el.getBoundingClientRect().bottom;
    
    if (elementTop < window.innerHeight && elementBottom > 0) {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }
  });
};

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Parallax Effect on Hero
const hero = document.querySelector('.hero');
window.addEventListener('scroll', () => {
  if (window.scrollY < window.innerHeight) {
    hero.style.backgroundPosition = `0px ${window.scrollY * 0.5}px`;
  }
});

// Mobile Menu Support
const navContainer = document.querySelector('.nav-container');

// Close nav links on click (for mobile)
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    // Add any mobile-specific close behavior here if needed
  });
});

// Intersection Observer for Timeline
const timelineItems = document.querySelectorAll('.timeline-item');
const timelineObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
      timelineObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

timelineItems.forEach(item => {
  item.style.opacity = '0';
  item.style.transform = 'translateY(30px)';
  timelineObserver.observe(item);
});

// Add CSS animation for timeline
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .nav-links a.active {
    color: var(--primary-light);
  }
`;
document.head.appendChild(style);

// Counter Animation for Stats
const animateCounter = (element, target) => {
  const speed = Math.ceil(target / 100);
  let current = 0;
  
  const increment = () => {
    current += speed;
    if (current >= target) {
      element.textContent = target;
    } else {
      element.textContent = current;
      requestAnimationFrame(increment);
    }
  };
  
  increment();
};

// Trigger counter when visible
const statCards = document.querySelectorAll('.stat-number');
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const number = parseInt(entry.target.textContent);
      animateCounter(entry.target, number);
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

statCards.forEach(card => {
  statsObserver.observe(card);
});

// Tech Icon Rotation Animation
const techIcons = document.querySelectorAll('.tech-icon');
techIcons.forEach(icon => {
  icon.addEventListener('mouseenter', function() {
    this.style.animation = 'none';
    setTimeout(() => {
      this.style.animation = '';
    }, 10);
  });
});

console.log('✨ Portfolio loaded successfully!');
