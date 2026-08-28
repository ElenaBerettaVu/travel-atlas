(() => {
  "use strict";
  const data = window.TRAVEL_ATLAS_DATA || { profile:{}, countries:[], journeys:[] };
  const countries = data.countries || [];
  const journeys = (data.journeys || []).slice().sort((a,b)=>String(b.date).localeCompare(String(a.date)));
  const world = window.WORLD_GEOJSON || window.WORLD_GEO || window.worldGeoJSON || null;
  const $ = (s,root=document)=>root.querySelector(s), $$=(s,root=document)=>[...root.querySelectorAll(s)];
  const esc = (v)=>String(v ?? "").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"}[c]));
  const flag=(iso2)=>iso2?String.fromCodePoint(...iso2.toUpperCase().split("").map(c=>127397+c.charCodeAt())):"◉";
  const visitLabel = (item) =>
  item?.visitsDisplay || String(item?.visits ?? 0);
  const state={theme:localStorage.getItem("atlas-theme")||"light",projection:"orthographic",mapLevel:"country",rotation:{lon:-8,lat:-12},zoom:1,selected:null,sort:"visits",query:""};
  const countryByIso=new Map(countries.map(c=>[c.iso3,c]));
  const continentColors={Europe:"#4057ff",Asia:"#ff6a3d",Africa:"#d9ff43","North America":"#f0a6ff","South America":"#16a085",Oceania:"#f2c94c"};

  const regions=[]; const cities=[];
  countries.forEach(country=>(country.regions||[]).forEach(region=>{
    regions.push({...region,countryIso:country.iso3,countryName:country.name,continent:country.continent});
    (region.cities||[]).forEach(city=>cities.push({...city,regionName:region.name,countryIso:country.iso3,countryName:country.name,continent:country.continent}));
  }));

  function setProfile(){ $$('[data-profile]').forEach(el=>{const key=el.dataset.profile;if(data.profile[key]!=null)el.textContent=data.profile[key]}); if(data.profile.demo)$('#demo-pill').hidden=false; }
  function aggregate(){
    const continents=new Set(countries.map(c=>c.continent));
    const totalJourneys = journeys.length;
    const vals={countries:countries.length,regions:regions.length,cities:cities.length,journeys:totalJourneys,continents:continents.size,coverage:`${((countries.length/(data.profile.worldCountryCount||195))*100).toFixed(1)}%`};
    Object.entries(vals).forEach(([k,v])=>$$(`[data-stat="${k}"]`).forEach(el=>el.textContent=v));
    return vals;
  }
  function initTheme(){document.documentElement.dataset.theme=state.theme;$('#theme-toggle')?.addEventListener('click',()=>{state.theme=state.theme==='light'?'dark':'light';document.documentElement.dataset.theme=state.theme;localStorage.setItem('atlas-theme',state.theme);renderMap();renderCharts();});}
  function initMenu(){const b=$('#menu-button'),m=$('#mobile-nav');if(!b||!m)return;b.addEventListener('click',()=>{const open=b.getAttribute('aria-expanded')==='true';b.setAttribute('aria-expanded',String(!open));m.hidden=open});$$('a',m).forEach(a=>a.addEventListener('click',()=>{m.hidden=true;b.setAttribute('aria-expanded','false')}));}

  function renderMap(){
    const host=$('#world-map'); if(!host||!window.d3||!world) return;
    host.innerHTML=''; const width=Math.max(320,host.clientWidth||900),height=Math.max(380,host.clientHeight||620); const css=getComputedStyle(document.documentElement);
    const colors={land:css.getPropertyValue('--map-land').trim(),ocean:css.getPropertyValue('--map-ocean').trim(),stroke:css.getPropertyValue('--map-stroke').trim(),ink:css.getPropertyValue('--ink').trim(),paper:css.getPropertyValue('--paper').trim()};
    const d3=window.d3, svg=d3.select(host).append('svg').attr('viewBox',`0 0 ${width} ${height}`).attr('width',width).attr('height',height);
    const tip=d3.select(host).append('div').attr('class','map-tooltip');
    const isGlobe=state.projection==='orthographic'; const base=isGlobe?Math.min(width,height)*.43:Math.min(width/(2*Math.PI),height/Math.PI)*.92;
    const projection=isGlobe?d3.geo.orthographic().clipAngle(90).precision(.2):d3.geo.equirectangular().precision(.2);
    projection.translate([width/2,height/2]).scale(base*state.zoom).rotate([state.rotation.lon,state.rotation.lat,0]);
    const path=d3.geo.path().projection(projection),grat=d3.geo.graticule().step([20,20]);
    svg.append('path').datum({type:'Sphere'}).attr('d',path).style('fill',colors.ocean).style('stroke',colors.stroke);
    svg.append('path').datum(grat()).attr('d',path).style('fill','none').style('stroke',colors.stroke).style('stroke-opacity',.45).style('stroke-width',.6);
    const maxVisits=Math.max(1,...countries.map(c=>c.visits||1)); const interp=d3.interpolateRgb(state.theme==='dark'?'#21336a':'#b8c2ff','#4057ff');
    const featureCountry=f=>countryByIso.get(f?.properties?.iso3);
    const paths=svg.append('g').selectAll('path').data(world.features||[]).enter().append('path').attr('class',f=>`world-country${featureCountry(f)?' is-visited':''}`).attr('d',path)
      .style('stroke',colors.stroke).style('stroke-width',.65).style('cursor',f=>featureCountry(f)?'pointer':'default').style('fill',f=>{const c=featureCountry(f);if(!c)return colors.land;if(state.selected?.countryIso===c.iso3||state.selected?.iso3===c.iso3)return '#d9ff43';return interp(Math.min(1,(c.visits||1)/maxVisits));})
      .on('mouseenter',function(f){const c=featureCountry(f);tip.html(c?`<strong>${esc(c.name)}</strong><br>${visitLabel(c)} visits · ${(c.regions||[]).length} regions`:`${esc(f?.properties?.name||'')}`).classed('is-visible',true);})
      .on('mousemove',function(){const m=d3.mouse(host);tip.style('transform',`translate(${Math.min(width-190,m[0]+14)}px,${Math.min(height-80,m[1]+14)}px)`);}).on('mouseleave',()=>tip.classed('is-visible',false))
      .on('click',f=>{const c=featureCountry(f);if(c)selectPlace({type:'country',...c,countryIso:c.iso3});});
    const pointData=state.mapLevel==='region'?regions:state.mapLevel==='city'?cities:[];
    const visiblePoints=pointData.filter(p=>p.coordinates&&Number.isFinite(p.coordinates.lat)&&Number.isFinite(p.coordinates.lon));
    const markerRadius=state.mapLevel==='city'?4.2:6.2;
    const markerPath=d3.geo.path().projection(projection).pointRadius(markerRadius);
    const markers=svg.append('g').selectAll('path').data(visiblePoints).enter().append('path').attr('class','map-marker').datum(d=>({type:'Point',coordinates:[d.coordinates.lon,d.coordinates.lat],_data:d})).attr('d',markerPath).style('fill',state.mapLevel==='city'?'#ff6a3d':'#d9ff43').style('stroke',colors.ink).style('stroke-width',1)
      .on('mouseenter',function(p){const d=p._data;tip.html(`<strong>${esc(d.name)}</strong><br>${esc(d.countryName)}${d.visits?` · ${visitLabel(d)} visits`:''}`).classed('is-visible',true);}).on('mousemove',function(){const m=d3.mouse(host);tip.style('transform',`translate(${m[0]+14}px,${m[1]+14}px)`);}).on('mouseleave',()=>tip.classed('is-visible',false)).on('click',p=>selectPlace({type:state.mapLevel,...p._data}));
    function update(){projection.rotate([state.rotation.lon,state.rotation.lat,0]).scale(base*state.zoom);svg.selectAll('path').attr('d',function(d){return d?.type==='Point'?markerPath(d):path(d)});}
    svg.call(d3.behavior.drag().on('drag',()=>{state.rotation.lon=((state.rotation.lon+d3.event.dx*.28+540)%360)-180;state.rotation.lat=Math.max(-85,Math.min(85,state.rotation.lat-d3.event.dy*.28));update();}));
    svg.on('wheel',()=>{d3.event.preventDefault();state.zoom=Math.max(.72,Math.min(2.8,state.zoom*Math.exp(-d3.event.deltaY*.001)));update();});
    $('#map-status').textContent=`${state.mapLevel.toUpperCase()} LAYER · ${state.mapLevel==='country'?countries.length:pointData.length} PLACES`;
  }

  function selectPlace(place){state.selected=place;renderPlacePanel();renderMap();}
  function renderPlacePanel(){const panel=$('#place-panel');if(!panel||!state.selected)return;const p=state.selected;let html='';
    if(p.type==='country'){
      const cityCount=(p.regions||[]).reduce((s,r)=>s+(r.cities||[]).length,0);html=`<div class="place-panel__crumb">Country / ${esc(p.continent)}</div><div class="place-panel__flag">${flag(p.iso2)}</div><h3>${esc(p.name)}</h3><p>${esc(p.essence||'')}</p><div class="place-panel__stats"><div><strong>${visitLabel(p)}</strong><span>visits</span></div><div><strong>${(p.regions||[]).length}</strong><span>regions</span></div><div><strong>${cityCount}</strong><span>cities</span></div><div><strong>${journeys.filter(j=>j.country===p.iso3).length}</strong><span>stories</span></div></div><span class="micro">GO DEEPER</span><div class="place-panel__list">${(p.regions||[]).map(r=>`<button data-select-region="${esc(p.iso3)}|${esc(r.name)}"><span>${esc(r.name)}</span><span>→</span></button>`).join('')}</div>`;
    } else if(p.type==='region') {const c=countryByIso.get(p.countryIso);html=`<div class="place-panel__crumb">${esc(c?.name||'')} / Region</div><h3>${esc(p.name)}</h3><p>${esc(c?.essence||'')}</p><div class="place-panel__stats"><div><strong>${(p.cities||[]).length}</strong><span>cities</span></div><div><strong>${(p.cities||[]).reduce((s,x)=>s+(x.visits||0),0)}</strong><span>city visits</span></div></div><span class="micro">CITIES</span><div class="place-panel__list">${(p.cities||[]).map(city=>`<button data-select-city="${esc(p.countryIso)}|${esc(p.name)}|${esc(city.name)}"><span>${esc(city.name)}</span><span>${visitLabel(city)}×</span></button>`).join('')}</div>`;
    } else {const c=countryByIso.get(p.countryIso);const js=journeys.filter(j=>j.country===p.countryIso&&j.city===p.name);html=`<div class="place-panel__crumb">${esc(c?.name||'')} / ${esc(p.regionName||'')} / City</div><h3>${esc(p.name)}</h3><p>${esc(p.feeling||'')}</p><div class="place-panel__stats"><div><strong>${visitLabel(p)}</strong><span>visits</span></div><div><strong>${js.length}</strong><span>stories</span></div></div>${js.length?`<span class="micro">JOURNEYS</span><div class="place-panel__list">${js.map(j=>`<button data-open-journey="${esc(j.id)}"><span>${esc(j.title)}</span><span>→</span></button>`).join('')}</div>`:''}`;}
    panel.innerHTML=html;$$('[data-select-region]',panel).forEach(b=>b.addEventListener('click',()=>{const [iso,name]=b.dataset.selectRegion.split('|');const r=regions.find(x=>x.countryIso===iso&&x.name===name);if(r)selectPlace({type:'region',...r});}));$$('[data-select-city]',panel).forEach(b=>b.addEventListener('click',()=>{const [iso,reg,name]=b.dataset.selectCity.split('|');const city=cities.find(x=>x.countryIso===iso&&x.regionName===reg&&x.name===name);if(city)selectPlace({type:'city',...city});}));$$('[data-open-journey]',panel).forEach(b=>b.addEventListener('click',()=>openJourney(b.dataset.openJourney)));
  }

  function initMapControls(){$$('[data-map-level]').forEach(b=>b.addEventListener('click',()=>{$$('[data-map-level]').forEach(x=>{x.classList.toggle('is-active',x===b);x.setAttribute('aria-pressed',String(x===b))});state.mapLevel=b.dataset.mapLevel;renderMap();}));$$('[data-projection]').forEach(b=>b.addEventListener('click',()=>{$$('[data-projection]').forEach(x=>{x.classList.toggle('is-active',x===b);x.setAttribute('aria-pressed',String(x===b))});state.projection=b.dataset.projection;state.zoom=1;state.rotation={lon:-8,lat:-12};renderMap();}));$('#map-reset')?.addEventListener('click',()=>{state.zoom=1;state.rotation={lon:-8,lat:-12};state.selected=null;$('#place-panel').innerHTML=`<div class="place-panel__empty"><span class="micro">CURRENT SELECTION</span><h3>Choose a place.</h3><p>La geografia diventa più interessante quando si può entrare dentro.</p></div>`;renderMap();});}

  function journeyYear(j){return Number(String(j.date).slice(0,4))||0}
  function renderCharts(){renderTimeline();renderDonut();renderFingerprint();renderConstellation();}
  function renderTimeline(){const host=$('#timeline-chart');if(!host||!window.d3)return;host.innerHTML='';const years=[...new Set(journeys.map(journeyYear))].sort((a,b)=>a-b);if(!years.length)return;const min=Math.min(...years),max=Math.max(...years),all=[];for(let y=min;y<=max;y++)all.push({year:y,count:journeys.filter(j=>journeyYear(j)===y).length});$('#year-range').textContent=`${min} — ${max}`;const w=host.clientWidth||900,h=host.clientHeight||355,m={t:20,r:10,b:35,l:10},d3=window.d3,svg=d3.select(host).append('svg').attr('viewBox',`0 0 ${w} ${h}`);const x=d3.scale.ordinal().domain(all.map(d=>d.year)).rangeBands([m.l,w-m.r],.22),y=d3.scale.linear().domain([0,Math.max(1,...all.map(d=>d.count))]).range([h-m.b,m.t]);svg.selectAll('.timeline-line').data(all).enter().append('line').attr('class','timeline-line').attr('x1',d=>x(d.year)+x.rangeBand()/2).attr('x2',d=>x(d.year)+x.rangeBand()/2).attr('y1',m.t).attr('y2',h-m.b);svg.selectAll('.timeline-bar').data(all).enter().append('rect').attr('class','timeline-bar').attr('x',d=>x(d.year)).attr('y',d=>y(d.count)).attr('width',x.rangeBand()).attr('height',d=>h-m.b-y(d.count)).attr('rx',Math.min(8,x.rangeBand()/2));svg.selectAll('.chart-label').data(all).enter().append('text').attr('class','chart-label').attr('x',d=>x(d.year)+x.rangeBand()/2).attr('y',h-10).attr('text-anchor','middle').text(d=>d.year);svg.selectAll('.chart-value').data(all).enter().append('text').attr('class','chart-value').attr('x',d=>x(d.year)+x.rangeBand()/2).attr('y',d=>y(d.count)-8).attr('text-anchor','middle').text(d=>d.count||'');}
  function renderDonut(){const host=$('#continent-donut'),legend=$('#continent-legend');if(!host||!legend||!window.d3)return;host.innerHTML='';legend.innerHTML='';const counts={};countries.forEach(c=>counts[c.continent]=(counts[c.continent]||0)+1);const items=Object.entries(counts).map(([name,value])=>({name,value}));const w=host.clientWidth||340,h=host.clientHeight||285,r=Math.min(w,h)/2-10,d3=window.d3,svg=d3.select(host).append('svg').attr('viewBox',`0 0 ${w} ${h}`).append('g').attr('transform',`translate(${w/2},${h/2})`),pie=d3.layout.pie().sort(null).value(d=>d.value),arc=d3.svg.arc().innerRadius(r*.68).outerRadius(r);svg.selectAll('path').data(pie(items)).enter().append('path').attr('d',arc).style('fill',d=>continentColors[d.data.name]||'#999').style('stroke',getComputedStyle(document.documentElement).getPropertyValue('--paper')).style('stroke-width',4);items.forEach(i=>legend.insertAdjacentHTML('beforeend',`<div><i style="background:${continentColors[i.name]||'#999'}"></i><span>${esc(i.name)}</span><strong>${i.value}</strong></div>`));}
  function renderFingerprint(){const host=$('#fingerprint-chart');if(!host||!window.d3)return;host.innerHTML='';const maxCountryVisits=Math.max(1,...countries.map(c=>c.visits||0));const returnScore=Math.min(1,countries.filter(c=>(c.visits||0)>1).length/Math.max(1,countries.length));const cityScore=Math.min(1,cities.length/30);const continentScore=Math.min(1,new Set(countries.map(c=>c.continent)).size/6);const memoryScore=Math.min(1,journeys.length/12);const depthScore=Math.min(1,(regions.length+cityScore*10)/(countries.length*4));const vals=[['Returns',returnScore],['Cities',cityScore],['Range',continentScore],['Memories',memoryScore],['Depth',depthScore]];const w=host.clientWidth||500,h=host.clientHeight||310,cx=w/2,cy=h/2+5,R=Math.min(w,h)*.36,n=vals.length,d3=window.d3,svg=d3.select(host).append('svg').attr('viewBox',`0 0 ${w} ${h}`);const pt=(i,r)=>[cx+Math.cos(-Math.PI/2+i*2*Math.PI/n)*r,cy+Math.sin(-Math.PI/2+i*2*Math.PI/n)*r];for(let ring=1;ring<=4;ring++){svg.append('polygon').attr('points',vals.map((_,i)=>pt(i,R*ring/4).join(',')).join(' ')).style('fill','none').style('stroke','var(--line)').style('stroke-width',1)}vals.forEach((v,i)=>{const [x,y]=pt(i,R);svg.append('line').attr('x1',cx).attr('y1',cy).attr('x2',x).attr('y2',y).style('stroke','var(--line)');const [lx,ly]=pt(i,R+25);svg.append('text').attr('class','chart-label').attr('x',lx).attr('y',ly).attr('text-anchor','middle').text(v[0].toUpperCase())});svg.append('polygon').attr('points',vals.map((v,i)=>pt(i,R*v[1]).join(',')).join(' ')).style('fill','#d9ff43').style('fill-opacity',.72).style('stroke','#11110f').style('stroke-width',1.4);}
  function renderConstellation(){const host=$('#constellation-chart');if(!host||!window.d3)return;host.innerHTML='';const w=host.clientWidth||900,h=host.clientHeight||360,d3=window.d3,svg=d3.select(host).append('svg').attr('viewBox',`0 0 ${w} ${h}`),continents=[...new Set(cities.map(c=>c.continent))],x=d3.scale.ordinal().domain(continents).rangePoints([70,w-70]),max=Math.max(1,...cities.map(c=>c.visits||1)),y=d3.scale.linear().domain([0,max]).range([h-55,55]);continents.forEach(c=>svg.append('text').attr('class','chart-label').attr('x',x(c)).attr('y',h-18).attr('text-anchor','middle').text(c.toUpperCase()));cities.forEach((c,i)=>{const jitter=((i%7)-3)*13,r=5+(c.visits||1)*2.3;svg.append('circle').datum(c).attr('class','city-node').attr('cx',x(c.continent)+jitter).attr('cy',y(c.visits||1)).attr('r',r).style('fill',continentColors[c.continent]||'#4057ff').style('fill-opacity',.78).style('stroke','var(--ink)').style('stroke-width',.7).on('click',d=>{selectPlace({type:'city',...d});document.querySelector('#atlas')?.scrollIntoView({behavior:'smooth'});});if((c.visits||0)>=2)svg.append('text').attr('class','city-label').attr('x',x(c.continent)+jitter).attr('y',y(c.visits||1)-r-7).attr('text-anchor','middle').text(c.name)});}

  function renderJourneys(){const feat=$('#journey-feature'),grid=$('#journey-grid');if(!feat||!grid)return;if(!journeys.length){feat.innerHTML='<p>No journeys yet.</p>';return;}const f=journeys[0];feat.innerHTML=`<div class="journey-photo">${photoTag(f.photos?.[0],f.title)}<span class="journey-photo__label">${esc(f.kicker)}</span></div><div class="journey-copy"><div><span class="micro">FEATURED JOURNEY</span><h3>${esc(f.title)}</h3><p>${esc(f.excerpt)}</p></div><div><div class="tag-row">${(f.details||[]).map(x=>`<span class="tag">${esc(x)}</span>`).join('')}</div><button class="arrow-link" data-open-journey="${esc(f.id)}" type="button">Open journey <span>↗</span></button></div></div>`;grid.innerHTML=journeys.slice(1).map(j=>`<article class="journey-card"><div class="journey-card__image">${photoTag(j.photos?.[0],j.title)}</div><div class="journey-card__body"><span class="micro">${esc(j.kicker)}</span><h3>${esc(j.title)}</h3><p>${esc(j.excerpt)}</p><button type="button" data-open-journey="${esc(j.id)}">Read memory ↗</button></div></article>`).join('');$$('[data-open-journey]').forEach(b=>b.addEventListener('click',()=>openJourney(b.dataset.openJourney)));}
  function photoTag(src,alt){return src?`<img src="${esc(src)}" alt="${esc(alt)}" loading="lazy" />`:''}
  function openJourney(id){const j=journeys.find(x=>x.id===id),dialog=$('#journey-dialog'),content=$('#dialog-content');if(!j||!dialog||!content)return;content.innerHTML=`<div class="dialog-hero"><span class="micro">${esc(j.kicker)}</span><h2>${esc(j.title)}</h2><p>${esc(j.excerpt)}</p><div class="tag-row">${(j.details||[]).map(x=>`<span class="tag">${esc(x)}</span>`).join('')}</div></div><div class="dialog-grid"><article><h3>What stayed</h3><p>${esc(j.left)}</p></article><article><h3>What I learned</h3><p>${esc(j.learned)}</p></article></div>${j.photos?.length?`<div class="photo-gallery">${j.photos.map(p=>`<img src="${esc(p)}" alt="${esc(j.title)}" loading="lazy" />`).join('')}</div>`:''}`;dialog.showModal();}
  function initDialog(){const d=$('#journey-dialog');$('#dialog-close')?.addEventListener('click',()=>d?.close());d?.addEventListener('click',e=>{if(e.target===d)d.close()});}

  function renderPlaces(){const host=$('#country-accordion');if(!host)return;let list=countries.filter(c=>{const q=state.query.toLowerCase();if(!q)return true;return [c.name,...(c.regions||[]).flatMap(r=>[r.name,...(r.cities||[]).map(x=>x.name)])].some(x=>String(x).toLowerCase().includes(q));});list=list.slice().sort(state.sort==='alpha'?(a,b)=>a.name.localeCompare(b.name):(a,b)=>(b.visits||0)-(a.visits||0));host.innerHTML=list.map(c=>{const cityCount=(c.regions||[]).reduce((s,r)=>s+(r.cities||[]).length,0);return `<article class="country-row"><button class="country-row__button" type="button"><span class="country-row__flag">${flag(c.iso2)}</span><span class="country-row__name">${esc(c.name)}</span><span class="country-row__meta">${(c.regions||[]).length} regions · ${cityCount} cities</span><span class="country-row__meta">${visitLabel(c)} visits</span><span>＋</span></button><div class="country-row__details">${(c.regions||[]).map(r=>`<div class="region-block"><h4>${esc(r.name)}</h4><div class="city-list">${(r.cities||[]).map(city=>`<button class="city-chip" type="button" data-city="${esc(c.iso3)}|${esc(r.name)}|${esc(city.name)}">${esc(city.name)} · ${visitLabel(city)}×</button>`).join('')}</div></div>`).join('')}</div></article>`}).join('');$$('.country-row__button',host).forEach(b=>b.addEventListener('click',()=>{const row=b.closest('.country-row');row.classList.toggle('is-open');b.lastElementChild.textContent=row.classList.contains('is-open')?'−':'＋';}));$$('[data-city]',host).forEach(b=>b.addEventListener('click',()=>{const [iso,reg,name]=b.dataset.city.split('|');const city=cities.find(x=>x.countryIso===iso&&x.regionName===reg&&x.name===name);if(city){selectPlace({type:'city',...city});$('#atlas')?.scrollIntoView({behavior:'smooth'});}}));}
  function initPlaces(){const s=$('#place-search');s?.addEventListener('input',()=>{state.query=s.value.trim();renderPlaces()});$$('[data-place-sort]').forEach(b=>b.addEventListener('click',()=>{$$('[data-place-sort]').forEach(x=>{x.classList.toggle('is-active',x===b);x.setAttribute('aria-pressed',String(x===b))});state.sort=b.dataset.placeSort;renderPlaces();}));}

  function init(){setProfile();aggregate();initTheme();initMenu();initMapControls();initPlaces();initDialog();renderMap();renderCharts();renderJourneys();renderPlaces();let raf;window.addEventListener('resize',()=>{cancelAnimationFrame(raf);raf=requestAnimationFrame(()=>{renderMap();renderCharts();});});}
  document.addEventListener('DOMContentLoaded',init);
})();

(() => {
  "use strict";

  const data =
    window.TRAVEL_ATLAS_DATA || {
      countries: [],
      journeys: []
    };

  const countries = data.countries || [];
  const journeys = data.journeys || [];

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  const esc = v =>
    String(v ?? "").replace(
      /[&<>"']/g,
      c =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#039;"
        })[c]
    );

  const flag = iso =>
    iso
      ? String.fromCodePoint(
          ...iso
            .toUpperCase()
            .split("")
            .map(c => 127397 + c.charCodeAt())
        )
      : "◉";

  const regions = [];
  const cities = [];

  countries.forEach(c =>
    (c.regions || []).forEach(r => {
      regions.push({
        ...r,
        countryIso: c.iso3,
        countryName: c.name
      });

      (r.cities || []).forEach(x =>
        cities.push({
          ...x,
          regionName: r.name,
          countryIso: c.iso3,
          countryName: c.name
        })
      );
    })
  );

  const cityCount = c =>
    (c.regions || []).reduce(
      (s, r) => s + (r.cities || []).length,
      0
    );

  const fmt = n =>
    Number(n || 0)
      .toFixed(1)
      .replace(".0", "");

  let selected = countries[0]?.iso3;

  const CSS = `
  .insight-stat-grid{
    display:grid;
    grid-template-columns:repeat(4,1fr);
    gap:1px;
    background:var(--line);
    border:1px solid var(--line);
    margin-bottom:16px
  }

  .insight-stat{
    min-height:140px;
    background:var(--paper);
    padding:22px;
    display:flex;
    flex-direction:column;
    justify-content:space-between
  }

  .insight-stat span,
  .insight-stat small{
    font:10px var(--mono);
    text-transform:uppercase;
    color:var(--muted)
  }

  .insight-stat strong{
    font-size:clamp(30px,3vw,48px);
    line-height:.95;
    letter-spacing:-.055em;
    overflow-wrap:anywhere
  }

  .country-rank{
    display:grid
  }

  .country-rank button{
    border:0;
    border-bottom:1px solid var(--line);
    background:transparent;
    display:grid;
    grid-template-columns:minmax(150px,1.1fr) minmax(150px,3fr) 42px;
    gap:18px;
    align-items:center;
    text-align:left;
    padding:13px 0
  }

  .country-rank__name{
    display:flex;
    gap:9px;
    align-items:center;
    font-weight:600
  }

  .country-rank__bar{
    height:12px;
    background:var(--line);
    border-radius:99px;
    overflow:hidden
  }

  .country-rank__bar i{
    display:block;
    height:100%;
    background:var(--blue);
    border-radius:99px
  }

  .country-rank button:hover .country-rank__bar i{
    background:var(--orange)
  }

  .country-rank button>strong{
    font:11px var(--mono);
    text-align:right
  }

  .return-box{
    display:grid;
    grid-template-columns:auto 1fr;
    gap:22px;
    align-items:end;
    margin:26px 0
  }

  .return-box>strong{
    font-size:90px;
    line-height:.75;
    letter-spacing:-.08em
  }

  .return-box p{
    margin:0;
    color:var(--muted)
  }

  .return-track{
    display:flex;
    height:18px;
    border-radius:99px;
    overflow:hidden;
    background:var(--line)
  }

  .return-track i:first-child{
    background:var(--blue)
  }

  .return-track i:last-child{
    background:var(--acid)
  }

  .return-list{
    margin-top:18px;
    border-top:1px solid var(--line)
  }

  .return-list div{
    display:flex;
    justify-content:space-between;
    padding:9px 0;
    border-bottom:1px solid var(--line);
    font-size:13px
  }

  .return-list b{
    font:11px var(--mono)
  }

  .country-explorer{
    padding:0
  }

  .country-explorer .viz-head{
    padding:28px 28px 0
  }

  .country-tabs{
    display:flex;
    gap:6px;
    padding:0 28px 22px;
    overflow:auto
  }

  .country-tabs button{
    border:1px solid var(--line);
    background:transparent;
    border-radius:99px;
    padding:9px 12px;
    white-space:nowrap
  }

  .country-tabs button.is-active{
    background:var(--ink);
    color:var(--bg)
  }

  .country-body{
    border-top:1px solid var(--line)
  }

  .country-title{
    display:flex;
    justify-content:space-between;
    align-items:end;
    gap:25px;
    padding:28px
  }

  .country-title h3{
    font-size:clamp(48px,6vw,90px);
    line-height:.9;
    letter-spacing:-.065em;
    margin:8px 0 0
  }

  .country-title p{
    color:var(--muted);
    margin:0 0 8px
  }

  .country-snapshot{
    display:grid;
    grid-template-columns:repeat(4,1fr);
    border-top:1px solid var(--line);
    border-bottom:1px solid var(--line)
  }

  .country-snapshot div{
    padding:20px 28px;
    border-right:1px solid var(--line)
  }

  .country-snapshot div:last-child{
    border-right:0
  }

  .country-snapshot strong{
    display:block;
    font-size:34px
  }

  .country-snapshot span{
    font:10px var(--mono);
    text-transform:uppercase;
    color:var(--muted)
  }

  .country-detail{
    display:grid;
    grid-template-columns:1fr 1fr
  }

  .country-detail section{
    padding:28px
  }

  .country-detail section:first-child{
    border-right:1px solid var(--line)
  }

  .mini-head{
    font:10px var(--mono);
    text-transform:uppercase;
    color:var(--muted);
    margin-bottom:15px
  }

  .region-row,
  .city-row{
    display:grid;
    grid-template-columns:1.3fr 1fr 40px;
    gap:12px;
    align-items:center;
    min-height:55px;
    border-top:1px solid var(--line)
  }

  .region-row span,
  .city-row span{
    font-size:11px;
    color:var(--muted)
  }

  .region-row b,
  .city-row b{
    font:11px var(--mono);
    text-align:right
  }

  .dots{
    display:flex;
    gap:4px;
    flex-wrap:wrap
  }

  .dots i{
    width:8px;
    height:8px;
    border-radius:50%;
    background:var(--blue)
  }

  .dots i.empty{
    background:transparent;
    border:1px solid var(--line-strong)
  }

  .citybar{
    height:8px;
    background:var(--line);
    border-radius:99px;
    overflow:hidden
  }

  .citybar i{
    display:block;
    height:100%;
    background:var(--orange)
  }

  .depth-table{
    border-top:1px solid var(--line)
  }

  .depth-row{
    display:grid;
    grid-template-columns:minmax(160px,1.4fr) repeat(3,1fr);
    gap:10px;
    min-height:56px;
    align-items:center;
    border-bottom:1px solid var(--line)
  }

  .depth-row.head{
    min-height:36px;
    font:10px var(--mono);
    text-transform:uppercase;
    color:var(--muted)
  }

  .depth-cell{
    height:32px;
    padding:0 9px;
    display:flex;
    align-items:center;
    position:relative;
    background:var(--line);
    overflow:hidden
  }

  .depth-cell:before{
    content:"";
    position:absolute;
    inset:0 auto 0 0;
    width:var(--fill);
    background:color-mix(in srgb,var(--blue) 35%,transparent)
  }

  .depth-cell b{
    position:relative;
    font:11px var(--mono)
  }

  .timeline-empty{
    height:100%;
    min-height:285px;
    border:1px dashed var(--line-strong);
    display:flex;
    align-items:center;
    justify-content:center;
    padding:30px;
    text-align:center;
    color:var(--muted)
  }

  .timeline-empty strong{
    display:block;
    color:var(--ink);
    font-size:19px;
    margin-bottom:8px
  }

  .timeline-empty p{
    max-width:560px;
    margin:0
  }

  .timeline-empty code{
    font-family:var(--mono);
    color:var(--ink)
  }

  @media(max-width:1000px){
    .insight-stat-grid{
      grid-template-columns:repeat(2,1fr)
    }

    .country-detail{
      grid-template-columns:1fr
    }

    .country-detail section:first-child{
      border-right:0;
      border-bottom:1px solid var(--line)
    }
  }

  @media(max-width:700px){
    .insight-stat{
      min-height:120px;
      padding:16px
    }

    .insight-stat strong{
      font-size:30px
    }

    .country-rank button{
      grid-template-columns:105px 1fr 32px;
      gap:9px
    }

    .country-explorer .viz-head{
      padding:20px 20px 0
    }

    .country-tabs{
      padding:0 20px 18px
    }

    .country-title{
      display:block;
      padding:22px 20px
    }

    .country-title h3{
      font-size:50px;
      margin-bottom:16px
    }

    .country-snapshot{
      grid-template-columns:1fr 1fr
    }

    .country-snapshot div{
      padding:16px 20px
    }

    .country-snapshot div:nth-child(2){
      border-right:0
    }

    .country-detail section{
      padding:22px 20px
    }

    .depth-row{
      grid-template-columns:105px repeat(3,1fr);
      font-size:11px
    }
  }
  `;

  function install() {
    if ($("#atlas-insights-style")) return;

    const st = document.createElement("style");
    st.id = "atlas-insights-style";
    st.textContent = CSS;
    document.head.appendChild(st);

    const grid = $("#data .viz-grid");

    if (!grid) return;

    grid.insertAdjacentHTML(
      "beforebegin",
      `
      <div class="insight-stat-grid">

        <article class="insight-stat">
          <span>Recorded visits</span>
          <strong data-i="visits">—</strong>
          <small>country-level minimum</small>
        </article>

        <article class="insight-stat">
          <span>Repeat countries</span>
          <strong data-i="repeatCountries">—</strong>
          <small>visited more than once</small>
        </article>

        <article class="insight-stat">
          <span>Repeat cities</span>
          <strong data-i="repeatCities">—</strong>
          <small>places that pulled you back</small>
        </article>

        <article class="insight-stat">
          <span>Avg. cities / country</span>
          <strong data-i="avgCities">—</strong>
          <small>geographic breadth</small>
        </article>

        <article class="insight-stat">
          <span>Avg. regions / country</span>
          <strong data-i="avgRegions">—</strong>
          <small>regional depth</small>
        </article>

        <article class="insight-stat">
          <span>Most visited country</span>
          <strong data-i="topCountry">—</strong>
          <small>by recorded visits</small>
        </article>

        <article class="insight-stat">
          <span>Most visited city</span>
          <strong data-i="topCity">—</strong>
          <small>strongest return</small>
        </article>

        <article class="insight-stat">
          <span>Most explored country</span>
          <strong data-i="deepCountry">—</strong>
          <small>regions + cities</small>
        </article>

      </div>
      `
    );

    grid.insertAdjacentHTML(
      "afterbegin",
      `
      <article class="viz-card viz-card--wide">

        <div class="viz-head">
          <div>
            <span class="micro">COUNTRIES BY VISITS</span>
            <h3>Where do you keep going back?</h3>
          </div>

          <div class="viz-key">Click a country</div>
        </div>

        <div id="country-rank" class="country-rank"></div>

      </article>


      <article class="viz-card">

        <div class="viz-head">
          <div>
            <span class="micro">RETURN PROFILE</span>
            <h3>Which places pulled you back?</h3>
          </div>
        </div>

        <div id="return-profile"></div>

      </article>


      <article class="viz-card">

        <div class="viz-head">
          <div>
            <span class="micro">DATA COMPLETENESS</span>
            <h3>What is still missing?</h3>
          </div>
        </div>

        <div class="return-box">
          <strong data-i="regionOnly">—</strong>
          <p>visited regions still need a city.</p>
        </div>

        <p class="viz-note">
          Useful for Toscana and Umbria:
          a region can stay recorded even before you add individual cities.
        </p>

      </article>


      <article
        class="viz-card viz-card--wide country-explorer"
        id="country-explorer"
      >

        <div class="viz-head">
          <div>
            <span class="micro">COUNTRY EXPLORER</span>
            <h3>One country at a time.</h3>
          </div>

          <div class="viz-key">
            Country → region → city
          </div>
        </div>

        <div
          id="country-tabs"
          class="country-tabs"
        ></div>

        <div
          id="country-body"
          class="country-body"
        ></div>

      </article>


      <article class="viz-card viz-card--wide">

        <div class="viz-head">
          <div>
            <span class="micro">GEOGRAPHIC DEPTH</span>
            <h3>How deeply is each country mapped?</h3>
          </div>

          <div class="viz-key">
            Relative intensity
          </div>
        </div>

        <div
          id="depth-table"
          class="depth-table"
        ></div>

      </article>
      `
    );
  }

  function stats() {
    const visits = countries.reduce(
      (s, c) => s + (c.visits || 0),
      0
    );

    const repeatCountries =
      countries.filter(c => (c.visits || 0) > 1).length;

    const repeatCities =
      cities.filter(c => (c.visits || 0) > 1).length;

    const topCountry = [...countries].sort(
      (a, b) => (b.visits || 0) - (a.visits || 0)
    )[0];

    const topCity = [...cities].sort(
      (a, b) => (b.visits || 0) - (a.visits || 0)
    )[0];

    const deep = [...countries].sort(
      (a, b) =>
        ((b.regions || []).length + cityCount(b)) -
        ((a.regions || []).length + cityCount(a))
    )[0];

    const vals = {
      visits,

      repeatCountries,

      repeatCities,

      avgCities: fmt(
        cities.length /
          Math.max(1, countries.length)
      ),

      avgRegions: fmt(
        regions.length /
          Math.max(1, countries.length)
      ),

      topCountry:
        topCountry?.name || "—",

      topCity:
        topCity?.name || "—",

      deepCountry:
        deep?.name || "—",

      regionOnly:
        regions.filter(
          r => !(r.cities || []).length
        ).length
    };

    Object.entries(vals).forEach(
      ([k, v]) =>
        $$(`[data-i="${k}"]`).forEach(
          el => (el.textContent = v)
        )
    );

    /*
     * Important:
     * Journeys means real journey stories,
     * not total recorded country visits.
     */
    $$('[data-stat="journeys"]').forEach(
      el => (el.textContent = journeys.length)
    );
  }

  function timeline() {
    /*
     * We can only plot a temporal chart when
     * actual journey dates exist.
     */
    if (
      journeys.some(j =>
        /^\d{4}/.test(
          String(j.date || "")
        )
      )
    ) {
      return;
    }

    const host = $("#timeline-chart");
    const range = $("#year-range");

    if (!host) return;

    if (range) {
      range.textContent = "DATES NEEDED";
    }

    host.innerHTML = `
      <div class="timeline-empty">

        <div>

          <strong>
            No travel dates yet.
          </strong>

          <p>
            This chart reads
            <code>journeys[].date</code>.

            Your current
            <code>journeys</code>
            array is empty, so there is
            no timeline to plot yet.
          </p>

        </div>

      </div>
    `;
  }

  function rank() {
    const host = $("#country-rank");

    if (!host) return;

    const arr = [...countries].sort(
      (a, b) =>
        (b.visits || 0) -
        (a.visits || 0)
    );

    const max = Math.max(
      1,
      ...arr.map(c => c.visits || 0)
    );

    host.innerHTML = arr
      .map(
        c => `
        <button data-rank="${esc(c.iso3)}">

          <span class="country-rank__name">
            ${flag(c.iso2)}
            ${esc(c.name)}
          </span>

          <span class="country-rank__bar">
            <i
              style="
                width:
                ${Math.max(
                  4,
                  ((c.visits || 0) / max) * 100
                )}%
              "
            ></i>
          </span>

          <strong>
            ${c.visits || 0}
          </strong>

        </button>
        `
      )
      .join("");

    $$("[data-rank]", host).forEach(
      b =>
        (b.onclick = () => {
          selected = b.dataset.rank;

          explorer();

          $("#country-explorer")
            ?.scrollIntoView({
              behavior: "smooth",
              block: "center"
            });
        })
    );
  }

  function returns() {
    const host = $("#return-profile");

    if (!host) return;

    const repeated = cities
      .filter(
        c => (c.visits || 0) > 1
      )
      .sort(
        (a, b) =>
          (b.visits || 0) -
          (a.visits || 0)
      );

    const once =
      cities.length - repeated.length;

    const total =
      Math.max(1, cities.length);

    const rp =
      (repeated.length / total) * 100;

    host.innerHTML = `

      <div class="return-box">

        <strong>
          ${repeated.length}
        </strong>

        <p>
          cities pulled you back.
          <br>
          ${once} cities currently have
          one recorded visit.
        </p>

      </div>


      <div class="return-track">

        <i
          style="
            width:${100 - rp}%
          "
        ></i>

        <i
          style="
            width:${rp}%
          "
        ></i>

      </div>


      <div class="return-list">

        ${
          repeated
            .map(
              c => `
              <div>
                <span>
                  ${esc(c.name)}
                </span>

                <b>
                  ${c.visits}×
                </b>
              </div>
              `
            )
            .join("") ||
          "<div>No repeated cities yet.</div>"
        }

      </div>
    `;
  }

  function explorer() {
    const tabs = $("#country-tabs");
    const host = $("#country-body");

    if (
      !tabs ||
      !host ||
      !countries.length
    ) {
      return;
    }

    const c =
      countries.find(
        x => x.iso3 === selected
      ) || countries[0];

    selected = c.iso3;

    const cc =
      (c.regions || [])
        .flatMap(r =>
          (r.cities || []).map(
            x => ({
              ...x,
              region: r.name
            })
          )
        );

    const max =
      Math.max(
        1,
        ...cc.map(
          x => x.visits || 0
        )
      );

    tabs.innerHTML =
      countries
        .map(
          x => `
          <button
            data-country="${x.iso3}"
            class="${
              x.iso3 === selected
                ? "is-active"
                : ""
            }"
          >
            ${flag(x.iso2)}
            ${esc(x.name)}
          </button>
          `
        )
        .join("");

    host.innerHTML = `

      <div class="country-title">

        <div>

          <span class="micro">
            COUNTRY SNAPSHOT
          </span>

          <h3>
            ${flag(c.iso2)}
            ${esc(c.name)}
          </h3>

        </div>

        <p>
          ${c.visits || 0}
          recorded visits ·
          ${(c.regions || []).length}
          regions ·
          ${cc.length}
          cities
        </p>

      </div>


      <div class="country-snapshot">

        <div>
          <strong>
            ${c.visits || 0}
          </strong>
          <span>visits</span>
        </div>

        <div>
          <strong>
            ${(c.regions || []).length}
          </strong>
          <span>regions</span>
        </div>

        <div>
          <strong>
            ${cc.length}
          </strong>
          <span>cities</span>
        </div>

        <div>
          <strong>
            ${
              cc.filter(
                x =>
                  (x.visits || 0) > 1
              ).length
            }
          </strong>
          <span>
            repeated cities
          </span>
        </div>

      </div>


      <div class="country-detail">

        <section>

          <div class="mini-head">
            Regional footprint
          </div>

          ${
            (c.regions || [])
              .map(r => {
                const n =
                  (r.cities || []).length;

                return `
                <div class="region-row">

                  <div>
                    <strong>
                      ${esc(r.name)}
                    </strong>

                    <br>

                    <span>
                      ${
                        n
                          ? n + " cities"
                          : "region only"
                      }
                    </span>
                  </div>

                  <div class="dots">
                    ${
                      n
                        ? Array.from(
                            {
                              length:
                                Math.min(
                                  n,
                                  10
                                )
                            },
                            () => "<i></i>"
                          ).join("")
                        : '<i class="empty"></i>'
                    }
                  </div>

                  <b>
                    ${r.visits || 0}×
                  </b>

                </div>
                `;
              })
              .join("")
          }

        </section>


        <section>

          <div class="mini-head">
            City ranking
          </div>

          ${
            cc.length
              ? cc
                  .sort(
                    (a, b) =>
                      (b.visits || 0) -
                      (a.visits || 0)
                  )
                  .map(
                    x => `
                    <div class="city-row">

                      <div>

                        <strong>
                          ${esc(x.name)}
                        </strong>

                        <br>

                        <span>
                          ${esc(x.region)}
                        </span>

                      </div>


                      <div class="citybar">

                        <i
                          style="
                            width:
                            ${Math.max(
                              4,
                              ((x.visits || 0) /
                                max) *
                                100
                            )}%
                          "
                        ></i>

                      </div>


                      <b>
                        ${x.visits || 0}×
                      </b>

                    </div>
                    `
                  )
                  .join("")
              : `
                <p class="viz-note">
                  Cities not specified yet.
                </p>
                `
          }

        </section>

      </div>
    `;

    $$(
      "[data-country]",
      tabs
    ).forEach(
      b =>
        (b.onclick = () => {
          selected =
            b.dataset.country;

          explorer();
        })
    );
  }

  function depth() {
    const host =
      $("#depth-table");

    if (!host) return;

    const rows =
      countries.map(c => ({
        c,
        r:
          (c.regions || []).length,
        ct:
          cityCount(c),
        v:
          c.visits || 0
      }));

    const mr =
      Math.max(
        1,
        ...rows.map(x => x.r)
      );

    const mc =
      Math.max(
        1,
        ...rows.map(x => x.ct)
      );

    const mv =
      Math.max(
        1,
        ...rows.map(x => x.v)
      );

    host.innerHTML = `

      <div class="depth-row head">

        <span>
          Country
        </span>

        <span>
          Regions
        </span>

        <span>
          Cities
        </span>

        <span>
          Visits
        </span>

      </div>


      ${
        rows
          .map(
            x => `
            <div class="depth-row">

              <strong>
                ${flag(x.c.iso2)}
                ${esc(x.c.name)}
              </strong>


              <span
                class="depth-cell"
                style="
                  --fill:
                  ${(x.r / mr) * 100}%
                "
              >
                <b>
                  ${x.r}
                </b>
              </span>


              <span
                class="depth-cell"
                style="
                  --fill:
                  ${(x.ct / mc) * 100}%
                "
              >
                <b>
                  ${x.ct}
                </b>
              </span>


              <span
                class="depth-cell"
                style="
                  --fill:
                  ${(x.v / mv) * 100}%
                "
              >
                <b>
                  ${x.v}
                </b>
              </span>

            </div>
            `
          )
          .join("")
      }
    `;
  }

  function init() {
    install();

    stats();

    timeline();

    rank();

    returns();

    explorer();

    depth();
  }

  document.addEventListener(
    "DOMContentLoaded",
    init
  );
})();
