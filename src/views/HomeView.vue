<template>
  <button @click.prev="handleClick" class="add-new-card__button button">Add New Card</button>
  <div ref="list" class="cards">
    <CardWeather
      v-for="(card, index) of cards"
      @delete-item="deleteItem"
      @change-city="changeCity"
      @add-favorited="addFavorited"
      :card="card"
      :key="card.id"
      :index="index"
    />
  </div>
  <ModalWeather :is-open="arrModals[0].isModalOpen" @close="handleModalClose">
    <template #popup-text>
      Delete this card??
      <div class="popup__buttons">
        <button @click="deleteItem" class="button">Confirm</button>
        <button @click="handleModalClose" class="button">Cancel</button>
      </div>
    </template>
  </ModalWeather>
  <ModalWeather :is-open="arrModals[1].isModalOpen" @close="handleModalClose">
    <template #popup-text> Maximum 5 items, delete current ones to add new ones </template>
  </ModalWeather>
</template>

<script setup>
import CardWeather from '@/components/CardWeather.vue'
import { setItem, getItem } from '@/helpers/persistanceStorage.js'
import { uuid } from 'vue-uuid'
import { getIp } from '@/api/getIp'
import { ref, onMounted, computed } from 'vue'
import ModalWeather from '@/components/ModalWeather.vue'
import { useCards } from '@/composables/cards'

let defaultCity = {
  name: 'Ternopil',
  lat: '',
  lon: ''
}
const { cards, arrModals, handleModalClose, deleteItem } = useCards()
const list = ref(null)

const handleClick = () => {
  if (cards.value.length < 5) {
    cards.value.push({
      city: defaultCity,
      id: uuid.v4()
    })
    let timer = null
    timer = setTimeout(() => {
      list.value.lastElementChild.scrollIntoView({ behavior: 'smooth' })
      clearTimeout(timer)
    }, 300)
  }
}

const changeCity = (newCity, id) => {
  cards.value = cards.value.map((item) => {
    if (item.id === id) {
      return { ...item, city: newCity }
    } else {
      return item
    }
  })
}
const addFavorited = (id) => {
  const currentItem = cards.value.find((item) => item.id === id)
  let cardsWithStorage = getItem('favorited_cards')
  if (!cardsWithStorage) {
    cardsWithStorage = []
  }
  if (cardsWithStorage && cardsWithStorage.length < 5) {
    cardsWithStorage.push({ ...currentItem, id: uuid.v4() })
    setItem('favorited_cards', cardsWithStorage)
  } else {
    document.documentElement.classList.add('popup-show')
    arrModals.value[1].isModalOpen = true
  }
}
onMounted(() => {
  list.value = document.getElementById('myList')
  getIp()
    .then((res) => {
      defaultCity = {
        name: res.city,
        lat: res.latitude,
        lon: res.longitude
      }
    })
    .finally(() => {
      cards.value.push({
        city: defaultCity,
        id: uuid.v4()
      })
    })
})
</script>

<style lang="scss" scoped>
.cards {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
}
.add-new-card__button {
  margin-bottom: 20px;
  margin-left: auto;
  display: flex;
  max-width: 200px;
  @media (max-width: $mobileSmall) {
    width: 100%;
    max-width: 100%;
  }
}
</style>
