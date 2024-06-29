'use client';
import {signIn, useSession } from 'next-auth/react';

import React from 'react'
const Dashboard = () => {
  const {data:session} = useSession();
  return (
    <>
        {session ? (
            <div>
                <h1>Dashboard</h1>
            </div>
        ) : (
            <div className='relative z-50'>
                <h1>Not signed in</h1>
                <p>
                    <button onClick={()=>signIn("google")}>
                        Signin with Google
                    </button>
                    <br />
                    <button onClick={()=>signIn("github")}>
                        Signin with Github
                    </button>
                </p>
            </div>
        )}
    </>
  )
}

export default Dashboard