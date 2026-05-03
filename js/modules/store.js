const KEY='noclip_state_v1';
const channel=new BroadcastChannel('noclip_live');
const seed={products:[{id:crypto.randomUUID(),name:'Ultra HUD',price:39.99,category:'UI'},{id:crypto.randomUUID(),name:'Patrol Pack',price:64.99,category:'Vehicles'}],posts:[{id:crypto.randomUUID(),title:'Marketplace Launch',body:'Welcome to the premium Noclip ecosystem.',date:new Date().toISOString()}],coupons:[{id:crypto.randomUUID(),code:'WELCOME10',type:'percent',value:10,limit:100,used:0}],cart:[],activeCoupon:null};
const listeners=new Set();
export function load(){return JSON.parse(localStorage.getItem(KEY)||'null')||seed}
export function save(state){localStorage.setItem(KEY,JSON.stringify(state));channel.postMessage({type:'sync'});listeners.forEach(l=>l(state));}
export function subscribe(fn){listeners.add(fn);channel.onmessage=()=>fn(load());window.addEventListener('storage',e=>e.key===KEY&&fn(load()));return()=>listeners.delete(fn)}
export function mutate(mut){const s=load();mut(s);save(s);return s}
