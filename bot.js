
const fetch = require('cross-fetch');
var database =[
    {
        q:"hey hii hi hello hiiii hy",
        a:"Hello , How can I help you ?"
    },
    {
        q:"howareyou howru ?",
      a:"I am fine"
    },
    {
           q: 'Bye by tata byee',
           a: ()=>{
            console.log( "Selena => Bye , Have a nice day ! :) ");
            
            process.exit();
           }
    },
    { 
      q: 'name',
      a:async (msg)=>{

            let response=await fetch('https://api.agify.io/?name='+msg);
            let data= await response.json();
            return await 'your age is around '+data.age;
          }
      },
    {
        q:"tellmejokes tellmeajoke ",
        a:async ()=>{
          let response=await fetch('https://v2.jokeapi.dev/joke/Any?safe-mode');
          let data= await response.json();
          return await data.setup+'\n             '+data.delivery;
        }
    },{
          q:"trackmyparcel track",
          a: "Please Enter tracking number !"

    },
   
    {
        q:"goodnight",
      a:"sweet Dreams"
    }
]
const changetstamp = (stamp) => {
  let date = new Date(stamp);
  let date1 = date.toLocaleString();


  return date1;
}

module.exports.reply=async (msg)=>{
msg=msg.toLowerCase();
msg= msg.replace(/[^a-zA-Z0-9]/g, '');
var reg = new RegExp('^[0-9]{10}$');
if(reg.test(msg)){
  let url = "https://api-eu.dhl.com/track/shipments?trackingNumber=" + msg;
  let response = await fetch(url, {
    method: 'GET',
    headers: {
      'DHL-API-Key': 'luNyrmraEjGdRprHrVY9cNDv5GlG0vtn'
    }
  });
  let status ,timestamp ,source ,dest;
  data = await response.json();  
  if (!data.status) {
    if (data.shipments[0].status.status != 'delivered') {
       return  'Estimated Delivery on ' + changetstamp(data.shipments[0].estimatedTimeOfDelivery);
    } else {
      status = data.shipments[0].status.description;
     timestamp = changetstamp(data.shipments[0].status.timestamp);
    }
    source = data.shipments[0].origin.address.addressLocality
    dest = data.shipments[0].destination.address.addressLocality
    status = 'status : '+status+'\n          '+'timestamp : '+timestamp+'\n          '+'source : '+source+'\n          '+'destination : '+dest;
    return await status;
    
    }
}
for(const element of database){

  if( msg.indexOf(element.q) > -1 ||  element.q.indexOf(msg) > -1){
    if(element.a instanceof Function){
      return  element.a();
    }
    return element.a;
  }
};

    return "Sorry , I did't get it :( ";
  
}

//7763265646