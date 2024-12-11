import { Dialog } from '@headlessui/react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUserAPI } from '~/api/user-api'
import { setUser } from '~/redux/user/userSlice'

interface SignInModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SignInModal({ isOpen, onClose }: SignInModalProps) {
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    username: '',
    secret_phrase: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await loginUserAPI(formData)
      dispatch(setUser(response.data))
      localStorage.setItem('user', JSON.stringify(response.data))
      onClose()
    } catch (error) {
      console.error('Login failed:', error)
    }
  }

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
          <div className="flex min-h-full flex-1 flex-col justify-center">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Sign in to your account
              </h2>
            </div>

            <div className="mt-8">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                    Username
                  </label>
                  <div className="mt-2">
                    <input
                      id="username"
                      name="username"
                      type="text"
                      required
                      value={formData.username}
                      onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                      className="block w-full rounded-lg border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="secret_phrase" className="block text-sm font-medium leading-6 text-gray-900">
                    Secret-Phrase
                  </label>
                  <div className="mt-2">
                    <input
                      id="secret_phrase"
                      name="secret_phrase"
                      type="password"
                      required
                      value={formData.secret_phrase}
                      onChange={(e) => setFormData(prev => ({ ...prev, secret_phrase: e.target.value }))}
                      className="block w-full rounded-lg border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Sign in
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}