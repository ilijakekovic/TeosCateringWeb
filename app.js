/* Mobile nav toggle */
const nav = document.querySelector('.nav');
const toggle = document.querySelector('.nav__toggle');
if (toggle) toggle.addEventListener('click', () => nav.classList.toggle('nav--open'));

/* Set current page link */
document.querySelectorAll('.nav__link').forEach(a=>{
  if (a.getAttribute('href') && location.pathname.endsWith(a.getAttribute('href')))
    a.setAttribute('aria-current','page');
  if (location.pathname.endsWith('/') && a.getAttribute('href')==='index.html')
    a.setAttribute('aria-current','page');
});

/* Menu filters (on menu.html) */
const tabs = document.querySelectorAll('[data-tab]');
const items = document.querySelectorAll('[data-item]');
function applyFilter(cat){
  items.forEach(el=>{
    const show = (cat==='all') || el.dataset.item.includes(cat);
    el.style.display = show ? '' : 'none';
  });
  tabs.forEach(t=>t.classList.toggle('is-active', t.dataset.tab===cat));
}
tabs.forEach(t=>t.addEventListener('click', ()=>applyFilter(t.dataset.tab)));

/* Prefill from URL ?success=true (for catering form) */
const success = new URLSearchParams(location.search).get('success');
if (success && document.querySelector('.success')) {
  document.querySelector('.success').style.display = 'block';
}

/* Quote form validation (no backend) */
const form = document.querySelector('#quote-form');
if (form) {
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const required = ['name','email','date','guests','event'];
    let ok = true;
    required.forEach(id=>{
      const el = form.querySelector('#'+id);
      if (!el.value.trim()) { ok=false; el.classList.add('invalid'); }
      else el.classList.remove('invalid');
    });
    const email = form.querySelector('#email').value;
    if (ok && !/^\S+@\S+\.\S+$/.test(email)) { ok=false; alert('Please enter a valid email.'); }
    if (!ok) return;
    // Simulate success
    form.reset();
    document.querySelector('.success').style.display = 'block';
    window.scrollTo({top:0, behavior:'smooth'});
  });
}

/* Smooth scroll to the quote section */
const quoteButton = document.querySelector('a[href="#quote"]');
if (quoteButton) {
  quoteButton.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent default anchor behavior
    const target = document.querySelector('#quote');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
}
