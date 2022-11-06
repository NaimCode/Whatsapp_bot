const { Client, Buttons, LocalAuth } = require('whatsapp-web.js');
const { menu, reponseMenu } = require("./ai/menu")
const client = new Client({
  authStrategy: new LocalAuth()
});
const qrcode = require('qrcode-terminal');

const { getCategories } = require('./controller');
const { produitsNew } = require('./ai/produits');
const { reponseCategorie } = require('./ai/categorie');

client.on('qr', qr => {
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('Client is ready!');
});
client.on('message', async msg => {

  if (msg.body === '!test') {
    produitsNew({ client, msg })
  }
  if (msg.body.toLowerCase().includes('tu as une copine')) {
    msg.reply("Oui elle s'appelle Charité, je l'aime trop ❤️");
  }
  if (msg.hasQuotedMsg) {
    //reponse
    console.log('Réponse')

    reponseMenu({ msg, client })
    reponseCategorie({ msg, client })
  } else {
    //demande
    console.log('Demande')

    menu({ msg, client })
  }


});

client.initialize();


