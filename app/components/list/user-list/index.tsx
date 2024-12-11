import { useSelector, useDispatch } from 'react-redux'
import { emitSecretPhraseUpdate } from '~/redux/user/userSlice'
import type { AppDispatch, RootState } from '~/redux/store'
import { useState } from 'react'

interface User {
  username: string;
  image_url: string;
  roles: string;
  secret_phrase: string;
}

interface UserTableProps {
  users: User[];
  socket: any;
}

export default function UserTable({ users, socket }: UserTableProps) {
  const dispatch = useDispatch<AppDispatch>()
  const { user: currentUser, isAuthenticated } = useSelector((state: RootState) => state.user)
  const [editingPhrase, setEditingPhrase] = useState<{id: string, phrase: string} | null>(null)

  const handleUpdatePhrase = (userId: string) => {
    if (!editingPhrase?.phrase) return

    dispatch(emitSecretPhraseUpdate({
      userId,
      newSecretPhrase: editingPhrase.phrase,
      socket,
      actorId: currentUser.username
    }))
    setEditingPhrase(null)
  }

  const canViewSecretPhrase = (user: User) => {
    return currentUser?.roles === 'admin' || currentUser?.username === user.username
  }

  const renderSecretPhrase = (user: User) => {
    if (!isAuthenticated || !canViewSecretPhrase(user)) {
      return <div className="text-gray-400">Hidden</div>
    }

    if (editingPhrase?.id === user.username) {
      return (
        <div className="flex gap-2">
          <input 
            type="text"
            value={editingPhrase.phrase}
            onChange={(e) => setEditingPhrase({id: user.username, phrase: e.target.value})}
            className="rounded border px-2 py-1"
          />
          <button 
            onClick={() => handleUpdatePhrase(user.username)}
            className="text-green-600 hover:text-green-900"
          >
            Save
          </button>
          <button 
            onClick={() => setEditingPhrase(null)}
            className="text-red-600 hover:text-red-900"
          >
            Cancel
          </button>
        </div>
      )
    }

    return <div className="text-gray-900">{user.secret_phrase}</div>
  }

  return (
    <div className="mx-auto max-w-7xl">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold text-gray-900">Users</h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all the users including their name, image, secret-phrase, and role.
            </p>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                      Username
                    </th>
                    {isAuthenticated && (
                      <>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Secret Phrase
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Role
                        </th>
                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                          <span className="sr-only">Actions</span>
                        </th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {users.map((user) => (
                    <tr key={user.username}>
                      <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                        <div className="flex items-center">
                          <div className="size-11 shrink-0">
                            <img alt="" src={user.image_url} className="size-11 rounded-full" />
                          </div>
                          <div className="ml-4">
                            <div className="font-medium text-gray-900">{user.username}</div>
                          </div>
                        </div>
                      </td>
                      {isAuthenticated && (
                        <>
                          <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                            {renderSecretPhrase(user)}
                          </td>
                          <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                            <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                              {user.roles}
                            </span>
                          </td>
                          <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                            {canViewSecretPhrase(user) && (
                              <button
                                onClick={() => setEditingPhrase({id: user.username, phrase: user.secret_phrase})}
                                className="text-indigo-600 hover:text-indigo-900"
                              >
                                Edit phrase
                              </button>
                            )}
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
