
const { Buttons} = require('whatsapp-web.js');
const { getCategories } = require('../controller');
const { produitsByCat } = require('./produits');

const commande="!categorie"

const body="Voici nos catégoies"
const footer="Vous pouvez toujours voir les catégories avec la commande: "+commande
const title="Catégorie"
const categorie=async({msg,client})=>{
    if(msg.body.toLowerCase()===commande || msg.body==='Nos catégories'){
     const cats=await getCategories()
     if(cats){
          const _buttons=cats.map((c)=>({body:c.titre}))
          client.sendMessage(msg.from,new Buttons(body,_buttons,title,footer));
        }else{
         msg.reply('😓 nous avons rencontrés un problème')
        }
    
      }
}
const reponseCategorie=async({msg,client})=>{
    if(msg._data.quotedMsg.title===title){
        console.log("Reponse pour Categorie")
        produitsByCat({client,msg})
    }
   
}
module.exports={categorie,reponseCategorie}