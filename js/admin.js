import {load,mutate,subscribe} from './modules/store.js';
const TOKEN='noclip_admin_token';const login=document.getElementById('login');const dash=document.getElementById('dashboard');
const AUTH={user:'admin',pass:'changeme-now'};
function isAuth(){return sessionStorage.getItem(TOKEN)==='ok'}
function gate(){login.classList.toggle('hidden',isAuth());dash.classList.toggle('hidden',!isAuth())}
document.getElementById('login-btn').onclick=()=>{if(document.getElementById('user').value===AUTH.user&&document.getElementById('pass').value===AUTH.pass){sessionStorage.setItem(TOKEN,'ok');gate()}};document.getElementById('logout').onclick=()=>{sessionStorage.removeItem(TOKEN);gate()};
function render(){if(!isAuth())return;const s=load();document.getElementById('product-list').innerHTML=s.products.map(p=>`<div>${p.name} - $${p.price.toFixed(2)} <button data-delp='${p.id}'>Delete</button></div>`).join('');document.getElementById('coupon-list').innerHTML=s.coupons.map(c=>`<div>${c.code} (${c.type}:${c.value}) use ${c.used}/${c.limit}</div>`).join('');document.getElementById('post-list').innerHTML=s.posts.map(p=>`<div>${p.title}</div>`).join('')}

document.getElementById('product-form').onsubmit=e=>{e.preventDefault();const fd=new FormData(e.target);mutate(s=>s.products.push({id:crypto.randomUUID(),name:fd.get('name'),price:Number(fd.get('price')),category:fd.get('category')}));e.target.reset()};
document.getElementById('coupon-form').onsubmit=e=>{e.preventDefault();const fd=new FormData(e.target);mutate(s=>s.coupons.push({id:crypto.randomUUID(),code:String(fd.get('code')).toUpperCase(),type:fd.get('type'),value:Number(fd.get('value')),limit:Number(fd.get('limit')),used:0}));e.target.reset()};
document.getElementById('post-form').onsubmit=e=>{e.preventDefault();const fd=new FormData(e.target);mutate(s=>s.posts.push({id:crypto.randomUUID(),title:fd.get('title'),body:fd.get('body'),date:new Date().toISOString()}));e.target.reset()};
document.body.addEventListener('click',e=>{const id=e.target.dataset.delp;if(id)mutate(s=>s.products=s.products.filter(p=>p.id!==id))});
subscribe(render);gate();render();
