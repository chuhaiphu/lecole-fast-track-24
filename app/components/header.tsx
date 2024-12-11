'use client'

import { useState } from 'react'
import SignInModal from './modal/sign-in-form'

export default function HeaderComponent() {
  const [showSignIn, setShowSignIn] = useState(false)

  return (
    <header className="bg-white">
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <a href="#" className="-m-1.5 p-1.5">
          <img
            alt=""
            src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
            className="h-8 w-auto"
          />
        </a>
        <button
          onClick={() => setShowSignIn(true)}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors"
        >
          Sign in
        </button>
      </nav>

      <SignInModal isOpen={showSignIn} onClose={() => setShowSignIn(false)} />
    </header>
  )
}
