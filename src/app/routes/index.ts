import express from 'express'
import { AttachmentRoute } from '../modules/attchment/attachment.route'




const router = express.Router()

const moduleRoutes = [
  {
    path: '/attachment',
    route: AttachmentRoute,
  },
 

 
]

moduleRoutes.forEach(route => router.use(route.path, route.route))
export default router
