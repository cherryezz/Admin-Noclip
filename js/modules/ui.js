import {load} from './store.js';
export function renderCartCount(){const el=document.getElementById('cart-count');if(!el)return;const qty=load().cart.reduce((a,c)=>a+c.qty,0);el.textContent=qty}
export function money(n){return `$${n.toFixed(2)}`}
