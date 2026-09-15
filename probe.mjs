const API_KEY = 'AIzaSyAo1DFoWoWo-W5zFEf5IqSJN6GB1EHp7Bo'
const DB = 'https://coco-ai-c363d-default-rtdb.asia-southeast1.firebasedatabase.app'
const EMAIL = 'portal-admin@coco-ai.internal'
const PASS = 'Sx9!portal_Rtdb#adminOnly_2f7Kd$Qa1zP'

async function main() {
  const r = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: EMAIL, password: PASS, returnSecureToken: true }),
  })
  const { idToken } = await r.json()
  const keys = await (await fetch(`${DB}/usage/__config/groqKeys.json?auth=${idToken}`)).json()
  const key = Object.values(keys || {})[0]?.key
  console.log('key prefix:', key?.slice(0, 10))

  const models = await fetch('https://api.groq.com/openai/v1/models', {
    headers: { Authorization: `Bearer ${key}` },
  })
  const md = await models.json()
  console.log('models status', models.status)
  console.log((md.data || []).map((m) => m.id).join('\n'))
}
main()
