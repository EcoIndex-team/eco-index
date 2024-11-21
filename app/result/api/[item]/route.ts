'use server'

import { exec } from 'child_process'
import { promisify } from 'util'

export async function GET(request: Request, { params }: { params: Promise<{ item: string }> }) {
    const asyncExec = promisify(exec)
    const param = (await params).item.split('_')

    const { stdout } = await asyncExec(
        `python app/result/api/scraper/scraper.py ${param[0]} ${param[1]}`
    )

    return Response.json(stdout)
}
