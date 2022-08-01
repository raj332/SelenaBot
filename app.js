const readline = require('readline');
const r1=readline.createInterface(process.stdin,process.stdout);
const bot =require("./bot");
//hello world

r1.setPrompt("you    => ");
r1.prompt();
r1.on('line',(msg)=>{
 setTimeout(async() => {
    let reply=await bot.reply(msg);
    if(reply instanceof Function){
        reply();
    }
    console.log( "\nSelena => "+reply +'\n' )
    r1.setPrompt("you    => ");
r1.prompt();
 }, 800);
    
}).on('close',()=>{
    process.exit();
})