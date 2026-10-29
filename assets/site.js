/* Quotehelm config. One place only.
   formEndpoint is the Formspree form "Quotehelm quote form", which emails enquiries to
   oscarayton@getquotehelm.co.uk. The home page and the contact page both read it.
   Formspree's honeypot field is _gotcha. */
var QUOTEHELM = {
  formEndpoint: "https://formspree.io/f/mkjjbyyr"
};

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
      ['me','Hi, no hot water since this morning. Do you cover PO19?'],
      ['them','Yes, we cover PO19 and Chichester. Is anyone vulnerable in the house, or is there a leak?'],
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
    $$('[data-fix]').forEach(function(el){ el.textContent = '01632 960001'; el.className = 'good'; });
    fix.textContent = 'All matching';
  });

  /* estimate builder */
  var boxes = $$('[data-opts] input');
  if (boxes.length) {
    var fmt = function(n){ return '\u00a3' + n.toLocaleString('en-GB'); };
    var update = function(){
      var min = 0, max = 0, monthly = 0, names = [];
      /* the website already includes a quote form, so don't charge for it twice */
      var hasSite = boxes.some(function(b){ return b.checked && b.value === 'site'; });
      boxes.forEach(function(b){
        if (!b.checked) return;
        if (hasSite && b.value === 'quote') { names.push(b.dataset.name + ' (included with the website)'); return; }
        names.push(b.dataset.name);
        if (b.dataset.monthly) monthly = +b.dataset.monthly;
        else { min += +b.dataset.min; max += +b.dataset.max; }
      });
      $('[data-sum]').textContent = min === max ? fmt(min) : fmt(min) + ' to ' + fmt(max);
      $('[data-per]').textContent = monthly ? 'Plus ' + fmt(monthly) + ' a month, first month free' : '';
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

  /* quote forms: endpoint comes only from QUOTEHELM.formEndpoint */
  var endpoint = (window.QUOTEHELM && QUOTEHELM.formEndpoint) || "";
  var configured = endpoint.indexOf("PLACEHOLDER") === -1 && /^https:\/\/formspree\.io\/f\/[A-Za-z0-9]+$/.test(endpoint);
  $$("[data-form-pending]").forEach(function(note){ if (configured) note.remove(); });
  $$("[data-quote-form]").forEach(function(form){
    if (configured) form.setAttribute("action", endpoint);
    form.addEventListener("submit", function(e){
      e.preventDefault();
      var status = form.querySelector("[data-form-status]");
      var button = form.querySelector("[type=submit]");
      var honey = form.querySelector("[data-honeypot]");
      var show = function(kind, text){
        status.className = "form-status " + kind;
        status.setAttribute("role", kind === "err" ? "alert" : "status");
        status.textContent = text;
        status.focus();
      };
      if (honey && honey.value) {
        show("ok", "Thanks. If you meant to enquire, please email oscarayton@getquotehelm.co.uk as well.");
        return;
      }
      if (!configured) {
        show("err", "This form is not connected yet. Please email oscarayton@getquotehelm.co.uk and I will reply.");
        return;
      }
      button.disabled = true;
      status.className = "form-status";
      status.textContent = "Sending.";
      /* several products can be ticked: send them as one field, so none are dropped */
      var data = new FormData(form);
      var picked = data.getAll("interested");
      data.delete("interested");
      data.append("interested", picked.length ? picked.join(", ") : "Not sure yet");
      fetch(endpoint, {
        method: "POST",
        body: data,
        headers: { "Accept": "application/json" }
      }).then(function(res){
        if (!res.ok) throw new Error("form");
        form.reset();
        show("ok", "Thanks. I\u2019ve got it, and I\u2019ll reply on weekdays, usually within one working day.");
      }).catch(function(){
        show("err", "That didn\u2019t send. Please email oscarayton@getquotehelm.co.uk instead.");
      }).then(function(){ button.disabled = false; });
    });
  });
})();
