// Builds dist/index.html: one self-contained file (CSS, fonts, icons, JS inlined).
import {readFileSync as r,writeFileSync as w,mkdirSync,cpSync} from 'node:fs';
import {execSync} from 'node:child_process';
// TODO before launch: replace with the real domain.
const SITE_URL='https://caseiq.example/';
const faq=JSON.parse(r('src/faq.json','utf8'));
const services=JSON.parse(r('src/services.json','utf8'));
mkdirSync('dist',{recursive:true});
execSync('npx @tailwindcss/cli -i src/input.css -o dist/.tw.css --minify',{stdio:'pipe'});
const b64=p=>r(p).toString('base64');
const fonts=`@font-face{font-family:Gloock;font-display:swap;src:url(data:font/woff2;base64,${b64('node_modules/@fontsource/gloock/files/gloock-latin-400-normal.woff2')}) format("woff2")}@font-face{font-family:"Hanken Grotesk";font-weight:100 900;font-display:swap;src:url(data:font/woff2;base64,${b64('node_modules/@fontsource-variable/hanken-grotesk/files/hanken-grotesk-latin-wght-normal.woff2')}) format("woff2")}`;
const icon=(n,c='')=>r(`node_modules/lucide-static/icons/${n}.svg`,'utf8').replace(/<!--[\s\S]*?-->/g,'').replace(/\s*\n\s*/g,' ').replace(/class="[^"]*"/,`class="${c||'ico'}" aria-hidden="true"`).trim();
const esc=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;');
const faqHtml=faq.map((f,i)=>`<details${i?'':' open'} class="group border-b border-ink/25"><summary class="flex items-start justify-between gap-6 py-5"><h3 class="text-xl md:text-2xl">${esc(f.q)}</h3>${icon('plus','ico chev mt-1 text-golddeep')}</summary><p class="pb-5 max-w-[68ch] text-ink">${esc(f.a)}</p></details>`).join('');
const org={'@type':'ProfessionalService','@id':SITE_URL+'#org',name:'CaseIQ',url:SITE_URL,description:'Litigation support, legal education, document preparation and forensic analysis for self-represented litigants across Canada.',areaServed:{'@type':'Country',name:'Canada'},address:{'@type':'PostalAddress',addressLocality:'Toronto',addressRegion:'ON',addressCountry:'CA'},image:SITE_URL+'og.png',disambiguatingDescription:'Litigation support service. Not a law firm.',makesOffer:{'@type':'Offer',name:'Free 15-minute triage',price:0,priceCurrency:'CAD',url:SITE_URL+'#intake',itemOffered:{'@type':'Service',name:'Free 15-minute case triage'}},knowsAbout:['self-represented litigants','factums','motions','affidavits','forensic accounting','handwriting and signature analysis']};
const ld={'@context':'https://schema.org','@graph':[org,{'@type':'WebSite','@id':SITE_URL+'#site',url:SITE_URL,name:'CaseIQ',publisher:{'@id':SITE_URL+'#org'}},{'@type':['WebPage','FAQPage'],'@id':SITE_URL+'#page',url:SITE_URL,name:'Self-Represented Litigant Help in Canada',description:'Litigation support and forensic analysis for self-represented litigants across Canada.',dateModified:'2026-11-09',isPartOf:{'@id':SITE_URL+'#site'},about:{'@id':SITE_URL+'#org'},inLanguage:'en-CA',mainEntity:faq.map(f=>({'@type':'Question',name:f.q,acceptedAnswer:{'@type':'Answer',text:f.a}}))},
 ...services.map((s,i)=>({'@type':'Service','@id':SITE_URL+'#service-'+(i+1),url:SITE_URL+'#p'+i,name:s.title,description:s.lead,serviceType:'Litigation support',provider:{'@id':SITE_URL+'#org'},areaServed:{'@type':'Country',name:'Canada'}}))]};
const li=x=>`<li class="pl-5 relative before:content-[''] before:absolute before:left-0 before:top-[.6em] before:w-2 before:h-2 before:bg-golddeep">${x}</li>`;
const cells=services.map((s,i)=>`<h3 class="contents"><button id="b${i}" class="svc" aria-expanded="${i==0}" aria-controls="p${i}"><span><span class="block font-display text-2xl leading-tight">${s.title}</span><span class="svc-sub block mt-0.5 text-mist text-base">${s.short}</span></span></button></h3><div id="p${i}" role="region" aria-labelledby="b${i}" class="svc-p on-light"${i?' hidden':''}><p class="text-xl max-w-[56ch]">${s.lead}</p><p class="font-bold mt-6">What you get</p><ul class="mt-2 space-y-2">${s.get.map(li).join('')}</ul><p class="mt-5 pt-4 border-t border-ink/25 text-ink2">${s.note}</p></div>`).join('');
let h=r('src/index.html','utf8');
h=h.replace('{{faq}}',faqHtml).replace('{{cells}}',cells).replace(/\{\{icon:([a-z0-9-]+)(?:\|([^}]*))?\}\}/g,(_,n,c)=>icon(n,c))
 .replaceAll('{{url}}',SITE_URL)
 .replace('{{css}}',()=>fonts+r('dist/.tw.css','utf8'))
 .replace('{{jsonld}}',()=>JSON.stringify(ld).replace(/</g,'\\u003c'))
 .replace('{{js}}',()=>r('src/app.js','utf8'));
w('dist/index.html',h);
cpSync('src/media','dist/media',{recursive:true});
console.log('dist/index.html',(h.length/1024|0)+'KB');
