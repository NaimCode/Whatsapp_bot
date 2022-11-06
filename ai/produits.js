const { fetchData } =require("../controller")
const { builder }  =require("../sanity")
const { MessageMedia } = require('whatsapp-web.js');
const produitsByCat=async({client,msg})=>{
    const query=`*[_type=='categorie' && titre=='${msg.body}']{'produits': *[_type=='produit' && references(^._id)]}`
    const produits=await fetchData({query,filter:(d)=>d[0].produits})

   sendProduct({produits,client,msg})
}
const produitsNew=async({client,msg})=>{
    const query=`*[_type == "produit"][0...4]`
    const produits=await fetchData({query})

   sendProduct({produits,client,msg})
}
const sendProduct=async({client,produits,msg})=>{
    for(const produit of produits){
        const url=builder.image(produit.image).url()
          const media = await MessageMedia.fromUrl(url);
          const caption=produit.titre+"\n"+"Prix: "+produit.prix
        client.sendMessage(msg.from,media, {caption});
   
      }
}
module.exports={produitsByCat,produitsNew}