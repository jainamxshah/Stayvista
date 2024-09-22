'use server'

import { cookies } from 'next/headers'

export async function handleLogin(userId: string, accessToken: string, refreshToken: string) {
  // Set session_userid cookie
  cookies().set('session_userid',userId,{
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/'
  });

  // Set access_token cookie
  cookies().set('session_access_token',accessToken,{
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 ,
    path: '/'
  });

  // Set refresh_token cookie
  cookies().set('session_refresh_token',refreshToken,{
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/'
  });
}

export async function resetAuthCookies() {
  cookies().set('session_userid','');
  cookies().set('session_access_token','');
  cookies().set('session_refresh_token','');
}

export async function getUserId() {
  const userId=cookies().get('session_userid')?.value
  return userId ? userId : null;
}

export async function getAccessToken() {
  let access_token=cookies().get('session_access_token')?.value;
  console.log(access_token)
  return access_token;
}