const API_KEY = 'AIzaSyAo1DFoWoWo-W5zFEf5IqSJN6GB1EHp7Bo'
const EMAIL = 'qatester01@cocomail.test'
const PASS = 'CocoTest!2026'

async function main() {
  let res = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: EMAIL, password: PASS, returnSecureToken: true }),
    },
  )
  if (!res.ok) {
    console.log('signup failed:', await res.text())
    res = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: EMAIL, password: PASS, returnSecureToken: true }),
      },
    )
  }
  const data = await res.json()
  const { idToken, localId } = data
  console.log('uid', localId)

  const DB =
    'https://coco-ai-c363d-default-rtdb.asia-southeast1.firebasedatabase.app'
  const put = await fetch(`${DB}/users/${localId}.json?auth=${idToken}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      uid: localId,
      name: 'QA Tester',
      email: EMAIL,
      plan: 'free',
      createdAt: Date.now(),
    }),
  })
  console.log('profile write', put.status, await put.text())
}
main()
