'use client'

import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'

interface ModalDialogProps {
  open: boolean
  onClose: () => void
  title: string
  description?: string
  icon?: React.ReactNode
  confirmLabel: string
  cancelLabel: string
  onConfirm: () => void
  confirmButtonClass?: string
}

export default function ModalDialog({
  open,
  onClose,
  title,
  description,
  icon,
  confirmLabel,
  cancelLabel,
  onConfirm,
  confirmButtonClass = "bg-red-600 hover:bg-red-500"
}: ModalDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <DialogBackdrop
        className="fixed inset-0 bg-gray-500/75 transition-opacity"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6"
          >
            <div className="sm:flex sm:items-start">
              {icon && (
                <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                  {icon}
                </div>
              )}
              <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                  {title}
                </DialogTitle>
                {description && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">{description}</p>
                  </div>
                )}
              </div>
            </div>
            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                onClick={onConfirm}
                className={`inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto ${confirmButtonClass}`}
              >
                {confirmLabel}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                {cancelLabel}
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}
