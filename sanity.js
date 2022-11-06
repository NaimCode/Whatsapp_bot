const sanityClient = require('@sanity/client')
const imageUrlBuilder=require('@sanity/image-url')
const sanity = sanityClient({
  projectId: '00vapem7',
  dataset: 'production',
  apiVersion: '2021-03-25', // use current UTC date - see "specifying API version"!
  //token: 'sanity-auth-token', // or leave blank for unauthenticated usage
   useCdn: true, // `false` if you want to ensure fresh data
})
const builder=imageUrlBuilder(sanity)
module.exports={sanity,builder}