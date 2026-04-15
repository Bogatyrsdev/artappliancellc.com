// Mobile menu toggle
const mobileToggle = document.getElementById('mobileToggle');
const nav = document.getElementById('nav');

if (mobileToggle && nav) {
  mobileToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    mobileToggle.classList.toggle('active');
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('active');
      mobileToggle.classList.remove('active');
    });
  });
}

// Header scroll effect
const header = document.getElementById('header');
if (header) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      header.style.boxShadow = '0 2px 20px rgba(11,29,53,0.1)';
    } else {
      header.style.boxShadow = '0 1px 3px rgba(11,29,53,0.06)';
    }
  });
}

// Contact form handling — submits via fetch to the form's action (Formspree),
// then shows an in-page confirmation. Formspree can be configured to send
// the submission to an email-to-SMS gateway so you receive a text.
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  const confirmation = document.getElementById('formConfirmation');
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = 'Sending...';
    btn.disabled = true;

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(contactForm)
      });

      if (response.ok) {
        contactForm.reset();
        if (confirmation) confirmation.hidden = false;
        btn.textContent = 'Request Received ✓';
        btn.style.background = '#22c55e';
        btn.style.borderColor = '#22c55e';
      } else {
        throw new Error('Submission failed');
      }
    } catch (err) {
      btn.textContent = 'Try Again';
      btn.style.background = '#ef4444';
      btn.style.borderColor = '#ef4444';
      btn.disabled = false;
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        btn.style.borderColor = '';
      }, 3000);
    }
  });
}

// Smooth reveal on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

document.querySelectorAll('.prop-card, .service-card, .commercial-card, .review-card, .brand-item, .guarantee-card, .process-step').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

// Highlight active sidebar link on service pages
const currentPage = window.location.pathname.split('/').pop();
document.querySelectorAll('.sidebar-services a').forEach(link => {
  if (link.getAttribute('href').includes(currentPage)) {
    link.classList.add('active');
  }
});

// Image error fallback - show navy gradient instead of broken image
document.querySelectorAll('.service-card-img, .commercial-card-img, .service-hero-img').forEach(img => {
  img.addEventListener('error', () => {
    img.style.display = 'none';
    const placeholder = document.createElement('div');
    placeholder.style.cssText = 'width:100%;height:' + (img.classList.contains('service-hero-img') ? '320px' : '180px') + ';background:linear-gradient(135deg,#13294b 0%,#1e4d7b 100%);display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,0.3);font-size:0.9rem;font-weight:600;border-radius:inherit;';
    placeholder.textContent = img.alt || 'Image';
    img.parentNode.insertBefore(placeholder, img);
  });
});
