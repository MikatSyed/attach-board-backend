import mongoose from 'mongoose'
import config from './config/index'
import { v2 as cloudinary } from 'cloudinary';
import {app} from './app';

async function DatabaseConnection() {
  try {
    await mongoose.connect(config.database_url as string)
    console.log(`🛢   Database is connected successfully`)

    app.listen(config.port, () => {
      console.log(`Application  listening on port ${config.port}`)
    })
    cloudinary.config({
      cloud_name: config.cloud_name,
      api_key: config.api_key,
      api_secret: config.api_secret,
    });
  
  } catch (err) {
    console.log('Failed to connect database', err)
  }
}

DatabaseConnection()
