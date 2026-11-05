// JELAJAH GUNUNG JABAR - site.js
(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  // Header: bayangan saat scroll + menu mobile
  const header = $('.site-header');
  const onScroll = () => header && header.classList.toggle('scrolled', window.scrollY > 8);
  onScroll();
  addEventListener('scroll', onScroll, { passive: true });

  const toggle = $('.nav-toggle'), nav = $('#main-nav');
  if (toggle && nav) {
    const setOpen = o => { nav.classList.toggle('open', o); toggle.setAttribute('aria-expanded', String(o)); };
    toggle.addEventListener('click', () => setOpen(!nav.classList.contains('open')));
    $$('a', nav).forEach(a => a.addEventListener('click', () => setOpen(false)));
  }

  // Sidebar admin (mobile)
  const sb = $('[data-sidebar-toggle]');
  if (sb) sb.addEventListener('click', () => document.body.classList.toggle('sidebar-open'));

  // Submit otomatis saat filter berubah
  $$('[data-autosubmit]').forEach(el => el.addEventListener('change', () => el.form && el.form.submit()));

  // Konfirmasi sebelum aksi (nonaktifkan/aktifkan)
  $$('form[data-confirm]').forEach(f => f.addEventListener('submit', e => {
    if (!confirm(f.dataset.confirm)) e.preventDefault();
  }));

  // Filter cepat tabel admin
  const tf = $('[data-table-filter]');
  if (tf) {
    const rows = $$(tf.dataset.tableFilter + ' tbody tr'), empty = $('[data-table-empty]');
    tf.addEventListener('input', () => {
      const q = tf.value.trim().toLowerCase(); let n = 0;
      rows.forEach(r => { const m = r.textContent.toLowerCase().includes(q); r.hidden = !m; if (m) n++; });
      if (empty) empty.hidden = n > 0;
    });
  }

  // Preview + validasi gambar (JPG/PNG/WebP, maks 5 MB)
  const file = $('[data-image-input]'), prev = $('[data-image-preview]'), err = $('[data-image-error]');
  if (file && prev) {
    file.addEventListener('change', () => {
      const f = file.files[0]; if (err) err.textContent = ''; if (!f) return;
      const okType = ['image/jpeg', 'image/png', 'image/webp'].includes(f.type);
      if (!okType || f.size > 5 * 1024 * 1024) {
        file.value = '';
        if (err) err.textContent = !okType ? 'Format harus JPG, PNG, atau WebP.' : 'Ukuran maksimal 5 MB.';
        return;
      }
      prev.src = URL.createObjectURL(f); prev.hidden = false;
    });
  }

  // Penghitung karakter
  $$('[data-counter]').forEach(t => {
    const out = $(t.dataset.counter); if (!out) return;
    const up = () => { out.textContent = t.value.length + ' / ' + t.maxLength; };
    t.addEventListener('input', up); up();
  });
})();
