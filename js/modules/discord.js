export async function fetchDiscord(){
  try{const r=await fetch('api/discord.json');return await r.json()}catch{return {online:false,members:0,invite:'https://discord.gg/fivem'}}
}
