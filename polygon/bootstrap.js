'use strict';
(async()=>{
 try{
  const response=await fetch('version.json?check='+Date.now(),{cache:'no-store'});if(!response.ok)throw Error('Versionsdatei fehlt');const manifest=await response.json();
  if(!/^[a-zA-Z0-9._-]+$/.test(manifest.version))throw Error('Ungültige Version');window.kaerwaVersion=manifest.version;
  const css=document.createElement('link');css.rel='stylesheet';css.href='style.css?v='+manifest.version;document.head.append(css);
  for(const file of ['engine.js','polygon-scene.js','game.js'])await new Promise((resolve,reject)=>{const script=document.createElement('script');script.src=file+'?v='+manifest.version;script.onload=resolve;script.onerror=reject;document.body.append(script);});
 }catch(e){console.error(e);document.getElementById('loading').textContent='Das Update ist noch nicht vollständig geladen. Bitte nach dem Upload neu laden.';}
})();
