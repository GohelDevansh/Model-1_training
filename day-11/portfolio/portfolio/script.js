 const cursor = document.getElementById('cursor');
  const ring = document.getElementById('cursorRing');
  let cx=0,cy=0,rx=0,ry=0;
  document.addEventListener('mousemove', e => { cx=e.clientX; cy=e.clientY; cursor.style.left=cx+'px'; cursor.style.top=cy+'px'; });
  (function loop(){ rx+=(cx-rx)*.12; ry+=(cy-ry)*.12; ring.style.left=rx+'px'; ring.style.top=ry+'px'; requestAnimationFrame(loop); })();
  document.querySelectorAll('a,button,.project-card,.skill-tag,.edu-item,.cert-item').forEach(el=>{
    el.addEventListener('mouseenter',()=>{cursor.classList.add('expand');ring.classList.add('expand');});
    el.addEventListener('mouseleave',()=>{cursor.classList.remove('expand');ring.classList.remove('expand');});
  });

  window.addEventListener('scroll',()=>{ document.getElementById('navbar').classList.toggle('scrolled',scrollY>60); });

  const ham=document.getElementById('hamburger'), mob=document.getElementById('mobileMenu');
  ham.addEventListener('click',()=>{ ham.classList.toggle('open'); mob.classList.toggle('open'); });
  document.querySelectorAll('.mobile-link').forEach(l=>l.addEventListener('click',()=>{ ham.classList.remove('open'); mob.classList.remove('open'); }));

  const obs=new IntersectionObserver(entries=>entries.forEach(e=>{ if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target);} }),{threshold:.1});
  document.querySelectorAll('.fade-up').forEach(el=>obs.observe(el));
  document.querySelectorAll('#home .fade-up').forEach((el,i)=>setTimeout(()=>el.classList.add('visible'),100+i*130));

  document.querySelectorAll('.filter-btn').forEach(btn=>{
    btn.addEventListener('click',()=>{
      document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const f=btn.dataset.filter;
      document.querySelectorAll('.project-card').forEach(c=>{
        const show=f==='all'||c.dataset.tags.includes(f);
        c.style.opacity=show?'1':'0.2';
        c.style.pointerEvents=show?'auto':'none';
        c.style.transition='opacity .3s ease';
      });
    });
  });

  function handleSubmit(e){
    e.preventDefault();
    const btn=e.target.querySelector('button[type=submit]');
    btn.textContent='Sending...'; btn.disabled=true;
    setTimeout(()=>{ btn.textContent='Send Message →'; btn.disabled=false; e.target.reset(); const t=document.getElementById('toast'); t.classList.add('show'); setTimeout(()=>t.classList.remove('show'),3500); },1200);
  }