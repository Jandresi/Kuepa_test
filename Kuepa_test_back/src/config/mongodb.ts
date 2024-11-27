import * as mongoose from 'mongoose';
const uri = process.env.ATLAS_URI as string;

async function connectMongoDb() {
  mongoose.connect(uri)
  .then(() => console.log('Conexión con mongo realizada.'))
  .catch((error:any) => console.log('Conexión con mongo fallida. ' + error.message))
}

export {connectMongoDb};
