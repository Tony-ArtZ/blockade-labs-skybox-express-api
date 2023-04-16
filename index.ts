import express from 'express'
import type {Response, Request} from 'express'
import 'dotenv/config'
import { BlockadeLabsSdk } from '@blockadelabs/sdk';

interface GenerateRequestBody {
    prompt: string,
    styleId: number
}

const apiKey = process.env.BLOCKADE_LABS_API_KEY??""
const sdk = new BlockadeLabsSdk({api_key: apiKey})
const app = express()
const port = 3000

app.use(express.json)

app.get('/skyboxstyles', async (req: Request, res: Response) => {
   const styles = await sdk.getSkyboxStyles()
   console.log(styles)
   res.status(200).json(styles)
})

app.post('/generateskybox', async (req: Request, res: Response) => {
    const {prompt, styleId}:GenerateRequestBody = req.body
    const generateStatus = await sdk.generateSkybox({prompt: prompt, skybox_style_id: styleId})
    res.status(200).json(generateStatus)
})

app.post('/skyboxstatus', async (req: Request, res: Response) => {
    const {id}:{id: number} = req.body
    const status = await sdk.getImagineById({id: id})
    res.status(200).json(status)
})

app.listen(port)
