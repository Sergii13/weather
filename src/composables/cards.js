import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { setItem } from '@/helpers/persistanceStorage.js'

export const useCards = () => {
  const route = useRoute()
  const isFavorited = computed(() => {
    return route.name === 'favorite'
  })

  const arrModals = ref([{ isModalOpen: false }, { isModalOpen: false }])

  const cards = ref([])
  const deleteId = ref(null)
  const deleteItem = (id) => {
    if (!arrModals.value[0].isModalOpen) {
      deleteId.value = id
      document.documentElement.classList.add('popup-show')
      arrModals.value[0].isModalOpen = true
    } else {
      cards.value = cards.value.filter((item) => item.id !== deleteId.value)
      if (isFavorited.value) {
        setItem('favorited_cards', cards.value)
      }
      deleteId.value = null
      handleModalClose()
    }
  }
  const handleModalClose = () => {
    document.documentElement.classList.remove('popup-show')
    arrModals.value.map((item) => (item.isModalOpen = false))
  }

  return { cards, arrModals, handleModalClose, deleteItem }
}
