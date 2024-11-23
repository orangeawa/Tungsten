import { acceptHMRUpdate, defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  /**
   * Current name of the user.
   */
  const savedName = ref('')

  function setNewName(name: string) {
    savedName.value = name
  }

  return {
    setNewName,
    savedName,
  }
})

// Hot Module Replacement (HMR) support
// When the file is saved, HMR will automatically update the store without refreshing the entire page.
// This ensures that user input data (e.g., the current name and previous names) remains unchanged.
if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore as any, import.meta.hot))
