import {load,mutate,subscribe} from './modules/store.js';import {renderCartCount,money} from './modules/ui.js';import {fetchDiscord} from './modules/discord.js';
const wrap=document.getElementById('featured-products');
function render(){renderCartCount();wrap.innerHTML=load().products.slice(0,4).map(p=>`<article class='card'><h3>${p.name}</h3><p>${money(p.price)}</p><button data-id='${p.id}' class='cta'>Add to cart</button></article>`).join('')}
wrap?.addEventListener('click',e=>{const id=e.target.dataset.id;if(!id)return;mutate(s=>{const it=s.cart.find(i=>i.id===id);if(it)it.qty++;else s.cart.push({id,qty:1});});});
subscribe(render);render();fetchDiscord().then(d=>{document.getElementById('discord-status').textContent=`${d.online?'Online':'Offline'} • ${d.members} members`;document.getElementById('discord-join').href=d.invite});
