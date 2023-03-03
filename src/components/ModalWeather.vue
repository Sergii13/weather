<template>
  <Teleport to="body">
    <Transition name="popup">
      <div v-if="isOpen" id="popup" aria-hidden="true" class="popup popup_show">
        <div @click.self="handleClose" class="popup__wrapper">
          <div class="popup__content">
            <button @click.prevent="handleClose" data-close type="button" class="popup__close">
              <img src="@/assets/images/icons/close.png" alt="" />
            </button>
            <div class="popup__text">
              <slot name="popup-text" />
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  }
})
const emit = defineEmits(['close'])

const handleClose = () => {
  emit('close')
}
</script>

<style lang="scss">
.popup-enter-from .popup__content,
.popup-leave-to .popup__content {
  visibility: hidden;
  transform: scale(0);
}
.popup-enter-to .popup__content,
.popup-leave-from .popup__content {
  visibility: visible;
  transform: scale(1);
}
.popup-leave-active .popup__content,
.popup-enter-active .popup__content {
  transition: transform 0.3s ease 0s;
}
body::after {
  content: '';
  background: rgba(20, 20, 20, 0.81);
  backdrop-filter: blur(20px);
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0;
  transition: opacity 0.8s ease 0s;
  pointer-events: none;
  z-index: 149;
}
.popup-show body::after {
  opacity: 1;
}
.popup__buttons {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 30px;
}
.popup {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  transition: visibility 0.8s ease 0s;
  visibility: hidden;
  pointer-events: none;
}
.popup_show {
  z-index: 150;
  visibility: visible;
  overflow: auto;
  pointer-events: auto;
}

.popup__wrapper {
  padding: 30px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100%;
  flex: 1 1 auto;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup__content {
  width: 100%;
  max-width: 507px;
  background: var(--lightGreenColor);
  padding: 50px 20px;
  border-radius: 20px;
  position: relative;
  .lock & {
    visibility: visible;
  }
}
.popup__close {
  position: absolute;
  top: 15px;
  right: 15px;
  width: 30px;
  height: 30px;
  img {
    max-width: 100%;
  }
}
.popup__text {
  text-align: center;
  font-size: 30px;
}
</style>
