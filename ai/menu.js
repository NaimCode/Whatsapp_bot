
const { Buttons} = require('whatsapp-web.js');
const { categorie } = require('./categorie');
const { inDev } = require('./testing');
const {produitsNew}=require('./produits')
const buttons={
    categorie:'Nos catégories',
    new_product:'Nouveaux produits',
    aide:"Aide",
    others:"Autres services"
}
const commande="!menu"

//const body="Bonjour! Je suis votre shopping assistant aujourd'hui et je suis là pour vous aider. Voici notre menu, choisissez la rubrique qui vous intéresse."
const body="Bonjour et bienvenue Chez Charity! Je suis votre shopping assistant aujourd'hui et je suis là pour vous aider. Voici notre menu, choisissez la rubrique qui vous intéresse."
const footer="Vous pouvez toujours voir le menu avec la commande: "+commande
const title="Menu"
const menu=({msg,client})=>{
    if(msg.body.toLowerCase()===commande){
          const _buttons=Object.keys(buttons).map((key)=>({body:buttons[key]}))
          client.sendMessage(msg.from,new Buttons(body,_buttons,title,footer));
    
      }
}
const sendButtons=({msg,client})=>client.sendMessage(msg.from,new Buttons(Object.keys(buttons).map((key)=>({body:buttons[key]}))))
const reponseMenu=async({msg,client})=>{
    if(msg._data.quotedMsg.title===title){
        console.log("Reponse pour Menu")
        switch(msg.body) {
            case buttons.categorie:
              categorie({msg,client,msg})
              break;
            case buttons.new_product:
              produitsNew({client,msg})
              break;
            case buttons.aide:
                inDev({msg})
              break;
            case buttons.others:
                inDev({msg})
              break;
    
            default:
              sendButtons({msg,client})
          }
    }
   
}
module.exports={menu,reponseMenu,buttons}