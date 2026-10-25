(function(){
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function(s){ return document.querySelector(s); };
  var $$ = function(s){ return [].slice.call(document.querySelectorAll(s)); };

  /* product tabs */
  var tabs = $$('[role=tab]');
  if (tabs.length) {
    var select = function(tab, focus){
      tabs.forEach(function(t){
        var on = t === tab;
        t.setAttribute('aria-selected', on);
        t.tabIndex = on ? 0 : -1;
        document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
      });
      if (focus) tab.focus();
    };
    tabs.forEach(function(t, i){
      t.addEventListener('click', function(){ select(t); });
      t.addEventListener('keydown', function(e){
        if (e.key === 'ArrowRight') select(tabs[(i+1)%tabs.length], true);
        if (e.key === 'ArrowLeft') select(tabs[(i-1+tabs.length)%tabs.length], true);
      });
    });
    select(tabs[0]);
  }

  /* quote form demo */
  var send = $('[data-demo=send]');
  if (send) send.addEventListener('click', function(){ $('[data-out=send]').hidden = false; send.textContent = 'Sent'; });

  /* chat demo */
  var chatBtn = $('[data-demo=chat]'), chat = $('[data-chat]');
  if (chatBtn && chat) {
    var script = [
      ['me','Hi, no hot water since this morning. Do you cover W6?'],
      ['them','Yes, we cover W6. Is anyone vulnerable in the house, or is there a leak?'],
      ['me','No leak, but I\u2019ve got a baby at home.'],
      ['them','Thanks. I\u2019ve marked this as urgent and sent it to the team. What\u2019s the best number to call you on?'],
      ['me','07700 900654'],
      ['them','<span class="tag">Urgent</span> Sent to Example Plumbing. Someone will call you shortly.']
    ];
    chatBtn.addEventListener('click', function(){
      chatBtn.remove();
      script.forEach(function(m, i){
        setTimeout(function(){
          var d = document.createElement('div');
          d.className = 'msg ' + m[0];
          d.innerHTML = m[1];
          chat.appendChild(d);
          chat.scrollTop = chat.scrollHeight;
        }, reduce ? 0 : i * 900);
      });
    });
  }

  /* booking demo */
  var slots = $$('[data-slots] .slot');
  slots.forEach(function(s){
    s.addEventListener('click', function(){
      slots.forEach(function(o){ o.setAttribute('aria-pressed', o === s); });
      $('[data-slot-text]').textContent = 'Site visit, ' + s.textContent;
      $('[data-out=slot]').hidden = false;
    });
  });

  /* address fix demo */
  var fix = $('[data-demo=fix]');
  if (fix) fix.addEventListener('click', function(){
    $$('[data-fix]').forEach(function(el){ el.textContent = '020 7946 0001'; el.className = 'good'; });
    fix.textContent = 'All matching';
  });

  /* estimate builder */
  var boxes = $$('[data-opts] input');
  if (boxes.length) {
    var fmt = function(n){ return '\u00a3' + n.toLocaleString('en-GB'); };
    var update = function(){
      var min = 0, max = 0, monthly = 0, names = [];
      boxes.forEach(function(b){
        if (!b.checked) return;
        names.push(b.dataset.name);
        if (b.dataset.monthly) monthly = 1;
        else { min += +b.dataset.min; max += +b.dataset.max; }
      });
      if (monthly) {
        var picked = boxes.filter(function(b){ return b.checked && !b.dataset.monthly; }).map(function(b){ return b.value; });
        monthly = (picked.indexOf('crm') > -1 || picked.indexOf('chat') > -1) ? 99 : (picked.indexOf('site') > -1 || picked.length >= 3) ? 79 : 59;
      }
      $('[data-sum]').textContent = min === max ? fmt(min) : fmt(min) + ' to ' + fmt(max);
      $('[data-per]').textContent = monthly ? 'Plus ' + fmt(monthly) + ' a month' : '';
      $('[data-list]').innerHTML = names.length ? names.map(function(n){ return '<li>' + n + '</li>'; }).join('') : '<li>Nothing ticked yet</li>';
      var body = 'Business name:\nWebsite:\n\nI\u2019m interested in:\n' + (names.length ? names.map(function(n){ return '- ' + n; }).join('\n') : '- Not sure yet');
      $('[data-mail]').href = 'mailto:oscarayton@getquotehelm.co.uk?subject=' + encodeURIComponent('Free website check') + '&body=' + encodeURIComponent(body);
    };
    boxes.forEach(function(b){ b.addEventListener('change', update); });
    $$('[data-add]').forEach(function(btn){
      btn.addEventListener('click', function(){
        var box = $('[data-opts] input[value="' + btn.dataset.add + '"]');
        if (!box) return;
        box.checked = true; update();
        btn.textContent = 'Added to your estimate';
        document.getElementById('estimate').scrollIntoView({behavior: reduce ? 'auto' : 'smooth'});
      });
    });
  }
})();
