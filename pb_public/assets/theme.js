/* 全栈网页应用管理平台 · 主题色切换（每人在自己浏览器里选，按 localStorage 记住） */
(function(){
  var THEMES = {
    blue:   {name: '海蓝',   p: '#2563EB', d: '#0A2540', a: '#22C3D6'},
    teal:   {name: '青碧',   p: '#0D9488', d: '#07332F', a: '#2DD4BF'},
    green:  {name: '翠绿',   p: '#16A34A', d: '#0B2E1F', a: '#4ADE80'},
    violet: {name: '紫罗兰', p: '#7C3AED', d: '#1E1B4B', a: '#A78BFA'},
    orange: {name: '蜜橙',   p: '#EA580C', d: '#331A06', a: '#FDBA74'},
    rose:   {name: '玫红',   p: '#E11D48', d: '#2B0A14', a: '#FB7185'}
  };
  var KEY = 'pf_theme';
  function ring(hex){
    var n = parseInt(hex.slice(1), 16);
    return 'rgba(' + ((n >> 16) & 255) + ',' + ((n >> 8) & 255) + ',' + (n & 255) + ',.18)';
  }
  function apply(name){
    var t = THEMES[name] || THEMES.blue;
    var r = document.documentElement;
    r.setAttribute('data-theme', name);
    r.style.setProperty('--pf-primary', t.p);
    r.style.setProperty('--pf-deep', t.d);
    r.style.setProperty('--pf-accent', t.a);
    r.style.setProperty('--pf-ring', ring(t.p));
    try { localStorage.setItem(KEY, name); } catch(e){}
    document.querySelectorAll('#pfThemePop .sw').forEach(function(b){
      b.classList.toggle('on', b.getAttribute('data-t') === name);
    });
  }
  function build(){
    if (document.getElementById('pfThemeBox')) return;
    var cur = 'blue';
    try { cur = localStorage.getItem(KEY) || 'blue'; } catch(e){}
    var box = document.createElement('div');
    box.id = 'pfThemeBox';
    var cells = Object.keys(THEMES).map(function(k){
      var t = THEMES[k];
      return '<div class="cell"><button class="sw' + (k === cur ? ' on' : '') + '" data-t="' + k + '" title="' + t.name + '" style="background:' + t.p + '"></button><div class="nm">' + t.name + '</div></div>';
    }).join('');
    box.innerHTML = '<div id="pfThemePop" style="display:none"><div class="cap">主题色（只影响你自己的界面）</div><div class="row">' + cells + '</div></div>' +
      '<button id="pfThemeBtn" title="换主题色">🎨</button>';
    document.body.appendChild(box);
    var pop = box.querySelector('#pfThemePop');
    box.querySelector('#pfThemeBtn').addEventListener('click', function(){
      pop.style.display = pop.style.display === 'none' ? 'block' : 'none';
    });
    box.querySelectorAll('.sw').forEach(function(b){
      b.addEventListener('click', function(){ apply(b.getAttribute('data-t')); });
    });
    document.addEventListener('click', function(e){
      if (!box.contains(e.target)) pop.style.display = 'none';
    });
  }
  var cur = 'blue';
  try { cur = localStorage.getItem(KEY) || 'blue'; } catch(e){}
  apply(cur);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build);
  else build();
  window.pfSetTheme = apply;
})();
