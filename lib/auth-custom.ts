import { auth } from '@clerk/nextjs/server'

export async function getAuthRole(): Promise<string | undefined> {
  const { sessionClaims } = await auth()
  const metadata = sessionClaims?.metadata as { role?: string } | undefined
  return metadata?.role
}

export async function getAuthRoles(): Promise<string[]> {
  const role = await getAuthRole()
  return role ? [role] : []
}

export async function isAdmin(): Promise<boolean> {
  return (await getAuthRole()) === 'admin'
}

