import React from 'react'
import { Link } from 'react-router-dom'

function PleaseLoginCom() {
  return (
    <div>
      <main className="grid min-h-full place-items-center  px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <h1 className="mt-4 text-2xl tracking-tight text-gray-900 ">Please Login Access this Page</h1>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link to='/login'>
              <div className="rounded-md px-14 bg-indigo-600 text-xl py-2.5 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Login
              </div>
            </Link>
          </div>
        </div>
      </main>              
    </div >
  )
}

export default PleaseLoginCom