import type { TTaskUpdate } from "../../types/taskUpdate"
import type { TTodo } from "../../types/todo"
import { componentMounted } from "../../utils/componentMounted"
import { BaseModal } from "./BaseModal"

type TEditTaskModalProps = {
  open: boolean
  onClose: () => void
  onSubmit: (task: TTaskUpdate) => Promise<void>
  todo: TTodo | null
}

export function EditModal({ open, onClose, onSubmit, todo }: TEditTaskModalProps) {
  const modalId = Math.random().toString(36).substring(2, 15)

  const handleCloseModal = () => {
    const form = document.getElementById(`editTaskForm-${modalId}`) as HTMLFormElement
    if (form) {
      form.reset()
    }
    onClose()
  }

  const handleSubmit = async () => {
    if (!todo || !todo._id) {
      console.error("No task selected for editing")
      return
    }

    const titleElement = document.getElementById(`editTaskTitle-${modalId}`) as HTMLInputElement
    const descriptionElement = document.getElementById(`editTaskDescription-${modalId}`) as HTMLTextAreaElement

    if (!titleElement || !descriptionElement) {
      console.error("Form elements not found")
      return
    }

    const title = titleElement.value.trim()
    const description = descriptionElement.value.trim()

    if (!title) {
      alert("Title is required")
      titleElement.focus()
      return
    }

    await onSubmit({ title, description })
    handleCloseModal()
  }

  componentMounted(() => {
    const cancelBtn = document.getElementById(`cancelEditBtn-${modalId}`)
    const form = document.getElementById(`editTaskForm-${modalId}`)

    if (cancelBtn) {
      cancelBtn.addEventListener("click", handleCloseModal)
    }

    if (form) {
      form.addEventListener("submit", (e: Event) => {
        e.preventDefault()
        handleSubmit()
      })
    }
  })

  const contentHTML = `
    <form id="editTaskForm-${modalId}">
      <div class="form-group">
        <label for="editTaskTitle-${modalId}">Title</label>
        <input 
          type="text" 
          id="editTaskTitle-${modalId}" 
          class="input" 
          placeholder="Enter task title" 
          required 
          value="${todo?.title || ""}"
        >
      </div>
      <div class="form-group">
        <label for="editTaskDescription-${modalId}">Description</label>
        <textarea 
          id="editTaskDescription-${modalId}" 
          class="textarea" 
          placeholder="Enter task description"
        >${todo?.description || ""}</textarea>
      </div>
      <div class="dialog-footer">
        <button type="button" class="btn-secondary" id="cancelEditBtn-${modalId}">Cancel</button>
        <button type="submit" class="btn-primary">Update Task</button>
      </div>
    </form>
  `

  return BaseModal({
    title: "Edit Task",
    open,
    onClose: handleCloseModal,
    contentHTML
  })
}
