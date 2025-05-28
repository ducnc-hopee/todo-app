// import { MODAL_TYPES, TModalTypes } from "../../constants/modals";
// import { componentMounted } from "../../utils/componentMounted";

// export type TBaseModalProps = {
//     open: boolean;
//     onClose: () => void;
//     title: string;
//     contentHTML: string;
// }

// export function BaseModal({ title, open, contentHTML, onClose}: TBaseModalProps) {
//     const modalId = Math.random().toString(36).substring(2, 15);
//     if (!open) return '';

//     componentMounted(() => {
//         document.getElementById(`closeAddTaskDialog-${modalId}`)?.addEventListener('click', onClose);
//     })

//     return (
//         `
//         <div class="dialog-overlay ${open ? 'active': ''}">
//             <div class="dialog">
//                 <div class="dialog-header">
//                     <h3>${title}</h3>
//                     <button class="close-btn" id="closeAddTaskDialog-${modalId}">
//                         <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x">
//                         <path d="M18 6 6 18M6 6l12 12"></path>
//                         </svg>
//                     </button>
//                 </div>
//                 ${contentHTML}
//             </div>
//         </div>
//         `
//     );
// }   

import { componentMounted } from "../../utils/componentMounted"

export type TBaseModalProps = {
  open: boolean
  onClose: () => void
  title: string
  contentHTML: string
  modalType?: string // Thêm để phân biệt modal types
}

// Global registry để track modal instances và cleanup
const modalRegistry = new Map<string, () => void>()

export function BaseModal({ title, open, contentHTML, onClose, modalType = "default" }: TBaseModalProps) {
  const modalId = Math.random().toString(36).substring(2, 15)

  if (!open) {
    // Cleanup modal nếu đã tồn tại
    const existingCleanup = modalRegistry.get(modalType)
    if (existingCleanup) {
      existingCleanup()
      modalRegistry.delete(modalType)
    }
    return ""
  }

  // Escape HTML để tránh XSS
  const escapeHtml = (text: string) => {
    const div = document.createElement("div")
    div.textContent = text
    return div.innerHTML
  }

  const safeTitle = escapeHtml(title)
  const closeButtonId = `closeModal-${modalType}-${modalId}`

  // Cleanup function
  const cleanup = () => {
    const closeBtn = document.getElementById(closeButtonId)
    const overlay = document.querySelector(`.dialog-overlay[data-modal-id="${modalId}"]`)

    if (closeBtn) {
      closeBtn.removeEventListener("click", handleClose)
    }

    if (overlay) {
      overlay.removeEventListener("click", handleOverlayClick)
    }

    // Remove from registry
    modalRegistry.delete(modalType)
  }

  const handleClose = () => {
    cleanup()
    onClose()
  }

  const handleOverlayClick = (e: Event) => {
    if (e.target === e.currentTarget) {
      handleClose()
    }
  }

  componentMounted(() => {
    // Cleanup existing modal of same type
    const existingCleanup = modalRegistry.get(modalType)
    if (existingCleanup) {
      existingCleanup()
    }

    // Register new cleanup
    modalRegistry.set(modalType, cleanup)

    // Setup event listeners
    const closeBtn = document.getElementById(closeButtonId)
    const overlay = document.querySelector(`.dialog-overlay[data-modal-id="${modalId}"]`)

    if (closeBtn) {
      closeBtn.addEventListener("click", handleClose)
    }

    if (overlay) {
      overlay.addEventListener("click", handleOverlayClick)
    }

    // Cleanup on page unload
    window.addEventListener("beforeunload", cleanup)
  })

  return `
    <div class="dialog-overlay ${open ? "active" : ""}" data-modal-id="${modalId}" data-modal-type="${modalType}">
      <div class="dialog">
        <div class="dialog-header">
          <h3>${safeTitle}</h3>
          <button class="close-btn" id="${closeButtonId}" type="button" aria-label="Close modal">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x">
              <path d="M18 6 6 18M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <div class="dialog-content">
          ${contentHTML}
        </div>
      </div>
    </div>
  `
}

// Utility để cleanup tất cả modals
export function cleanupAllModals() {
  modalRegistry.forEach((cleanup) => cleanup())
  modalRegistry.clear()
}
