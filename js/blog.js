import {load,subscribe} from './modules/store.js';import {renderCartCount} from './modules/ui.js';
const posts=document.getElementById('posts');
function render(){renderCartCount();posts.innerHTML=load().posts.sort((a,b)=>b.date.localeCompare(a.date)).map(p=>`<article class='glass'><h2>${p.title}</h2><small>${new Date(p.date).toLocaleString()}</small><p>${p.body}</p></article>`).join('')}
subscribe(render);render();
