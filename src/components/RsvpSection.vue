<template>
  <section class="rsvp-wrapper" id="rsvp-section" aria-label="RSVP dan Buku Tamu">
    <!-- Section Title -->
    <div class="section-header">
      <h2 class="script-title">RSVP</h2>
      <div class="leaf-divider">
        <span class="leaf-line"></span>
        <span class="leaf-icon">❧</span>
        <span class="leaf-line"></span>
      </div>
    </div>

    <!-- Attendance Stats -->
    <div class="stats-row">
      <div class="stat-card stat-card-hadir">
        <span class="stat-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.75">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </span>
        <span class="stat-number">{{ totalHadir }}</span>
        <span class="stat-label">Total Hadir</span>
      </div>
      <div class="stat-card stat-card-tidak">
        <span class="stat-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.75">
            <path stroke-linecap="round" d="M18 6 6 18M6 6l12 12" />
          </svg>
        </span>
        <span class="stat-number">{{ totalTidakHadir }}</span>
        <span class="stat-label">Total Tidak Hadir</span>
      </div>
    </div>

    <!-- Card 1: Buku Tamu & Reservasi -->
    <div class="form-card">
      <h3 class="card-script-title">Buku Tamu &amp; Reservasi</h3>

      <form @submit.prevent="submitRsvp" class="rsvp-form">
        <div class="form-group">
          <label for="rsvp-name" class="form-label">Nama</label>
          <input
            id="rsvp-name"
            v-model="formRsvp.name"
            type="text"
            class="form-input"
            placeholder="Masukkan nama lengkap Anda"
            required
          />
        </div>

        <div class="form-group">
          <label for="rsvp-phone" class="form-label">Nomor Telepon</label>
          <input
            id="rsvp-phone"
            v-model="formRsvp.phone"
            type="tel"
            class="form-input"
            placeholder="Contoh: 081234567890"
            required
          />
        </div>

        <div class="form-group">
          <label for="rsvp-guests" class="form-label">Jumlah Tamu</label>
          <input
            id="rsvp-guests"
            v-model.number="formRsvp.guests"
            type="number"
            min="1"
            max="10"
            class="form-input"
            placeholder="1"
            required
          />
        </div>

        <div class="form-group">
          <label for="rsvp-attendance" class="form-label">Konfirmasi Kehadiran</label>
          <select
            id="rsvp-attendance"
            v-model="formRsvp.attendance"
            class="form-input form-select"
            required
          >
            <option value="" disabled selected>Pilih..</option>
            <option value="hadir">Hadir</option>
            <option value="tidak_hadir">Tidak Hadir</option>
          </select>
        </div>

        <button type="submit" class="btn-submit" :disabled="isSubmittingRsvp">
          <span v-if="!isSubmittingRsvp">Kirim</span>
          <span v-else>Mengirim...</span>
        </button>
      </form>
    </div>

    <!-- Card 2: Wedding Wishes -->
    <div class="form-card">
      <h3 class="card-script-title">Wedding Wishes</h3>

      <form @submit.prevent="submitWish" class="wish-form">
        <div class="form-group">
          <label for="wish-name" class="form-label">Nama</label>
          <input
            id="wish-name"
            v-model="formWish.name"
            type="text"
            class="form-input"
            placeholder="Masukkan nama Anda"
            required
          />
        </div>

        <div class="form-group">
          <label for="wish-message" class="form-label">Ucapan</label>
          <div class="textarea-wrapper">
            <textarea
              id="wish-message"
              v-model="formWish.message"
              class="form-textarea"
              rows="4"
              maxlength="300"
              placeholder="Tulis ucapan dan doa restu untuk kedua mempelai..."
              required
            ></textarea>
            <span class="char-count">{{ formWish.message.length }}/300</span>
          </div>
        </div>

        <button type="submit" class="btn-submit" :disabled="isSubmittingWish">
          <span v-if="!isSubmittingWish">Kirim</span>
          <span v-else>Mengirim...</span>
        </button>
      </form>

      <!-- Wishes Stream List -->
      <div v-if="wishesList.length > 0" class="wishes-list">
        <div v-for="item in wishesList" :key="item.id" class="wish-item">
          <div class="wish-header">
            <span class="wish-author">{{ item.name }}</span>
            <span class="wish-date">{{ item.date }}</span>
          </div>
          <p class="wish-text">{{ item.message }}</p>
        </div>
      </div>
    </div>

    <!-- Toast Notification -->
    <transition name="toast-anim">
      <div v-if="toastText" class="rsvp-toast" role="status">
        <svg class="toast-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <polyline points="20 6 9 17 4 12" />
        </svg>
        <span>{{ toastText }}</span>
      </div>
    </transition>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { db } from '../service/firebase'
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp, type Timestamp } from 'firebase/firestore'

const route = useRoute()

const GUESTS_COLLECTION = 'guests_susiaris'
const WISHES_COLLECTION = 'wishes_susiaris'

interface RsvpItem {
  id: string
  name: string
  phone: string
  guests: number
  attendance: 'hadir' | 'tidak_hadir'
  date: string
}

interface WishItem {
  id: string
  name: string
  message: string
  date: string
}

const rsvpList = ref<RsvpItem[]>([])
const wishesList = ref<WishItem[]>([])

const formRsvp = ref({
  name: '',
  phone: '',
  guests: 1,
  attendance: '' as '' | 'hadir' | 'tidak_hadir'
})

const formWish = ref({
  name: '',
  message: ''
})

const isSubmittingRsvp = ref(false)
const isSubmittingWish = ref(false)
const toastText = ref('')

const totalHadir = computed(() => {
  return rsvpList.value
    .filter(item => item.attendance === 'hadir')
    .reduce((sum, item) => sum + (Number(item.guests) || 1), 0)
})

const totalTidakHadir = computed(() => {
  return rsvpList.value.filter(item => item.attendance === 'tidak_hadir').length
})

const showToast = (msg: string) => {
  toastText.value = msg
  setTimeout(() => {
    toastText.value = ''
  }, 3200)
}

const formatDate = (createdAt: Timestamp | null | undefined) => {
  if (!createdAt) return 'Baru saja'
  return createdAt.toDate().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

let unsubscribeGuests: (() => void) | null = null
let unsubscribeWishes: (() => void) | null = null

const subscribeToData = () => {
  const guestsQ = query(collection(db, GUESTS_COLLECTION), orderBy('createdAt', 'desc'))
  unsubscribeGuests = onSnapshot(guestsQ, (snapshot) => {
    rsvpList.value = snapshot.docs.map((docSnap) => {
      const data = docSnap.data()
      return {
        id: docSnap.id,
        name: data.name || '',
        phone: data.phone || '',
        guests: data.guests || 1,
        attendance: data.attendance || 'hadir',
        date: formatDate(data.createdAt)
      }
    })
  })

  const wishesQ = query(collection(db, WISHES_COLLECTION), orderBy('createdAt', 'desc'))
  unsubscribeWishes = onSnapshot(wishesQ, (snapshot) => {
    wishesList.value = snapshot.docs.map((docSnap) => {
      const data = docSnap.data()
      return {
        id: docSnap.id,
        name: data.name || '',
        message: data.message || '',
        date: formatDate(data.createdAt)
      }
    })
  })
}

const loadGuestName = () => {
  const queryGuest = route.query.to || route.query.u || route.query.guest || route.query.nama
  if (typeof queryGuest === 'string' && queryGuest.trim().length > 0) {
    if (!formRsvp.value.name) formRsvp.value.name = queryGuest.trim()
    if (!formWish.value.name) formWish.value.name = queryGuest.trim()
  }
}

const submitRsvp = async () => {
  if (!formRsvp.value.name || !formRsvp.value.attendance) return
  isSubmittingRsvp.value = true

  try {
    await addDoc(collection(db, GUESTS_COLLECTION), {
      name: formRsvp.value.name.trim(),
      phone: formRsvp.value.phone.trim(),
      guests: formRsvp.value.guests || 1,
      attendance: formRsvp.value.attendance,
      createdAt: serverTimestamp()
    })

    showToast('Terima kasih, konfirmasi kehadiran berhasil dikirim!')
    formRsvp.value.phone = ''
    formRsvp.value.attendance = ''
  } catch (err) {
    console.error(err)
    showToast('Gagal mengirim konfirmasi. Silakan coba lagi.')
  } finally {
    isSubmittingRsvp.value = false
  }
}

const submitWish = async () => {
  if (!formWish.value.name || !formWish.value.message.trim()) return
  isSubmittingWish.value = true

  try {
    await addDoc(collection(db, WISHES_COLLECTION), {
      name: formWish.value.name.trim(),
      message: formWish.value.message.trim(),
      createdAt: serverTimestamp()
    })

    showToast('Doa & ucapan Anda berhasil terkirim!')
    formWish.value.message = ''
  } catch (err) {
    console.error(err)
    showToast('Gagal mengirim ucapan. Silakan coba lagi.')
  } finally {
    isSubmittingWish.value = false
  }
}

onMounted(() => {
  subscribeToData()
  loadGuestName()
})

onUnmounted(() => {
  if (unsubscribeGuests) unsubscribeGuests()
  if (unsubscribeWishes) unsubscribeWishes()
})
</script>

<style scoped>
.rsvp-wrapper {
  width: 100%;
  max-width: 440px;
  margin: 32px auto 20px;
  padding: 0 16px;
}

/* Section Title */
.section-header {
  text-align: center;
  margin-bottom: 24px;
}

.script-title {
  font-family: var(--font-serif);
  font-size: 38px;
  font-weight: 500;
  font-style: italic;
  color: #5380ae;
  margin: 0;
  letter-spacing: 2px;
}

.leaf-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 4px;
}

.leaf-line {
  width: 40px;
  height: 1px;
  background: #a3c4e4;
}

.leaf-icon {
  font-size: 14px;
  color: #6a9ce4;
}

/* Stats Row */
.stats-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 22px;
}

.stat-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 18px 10px 16px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(20px) saturate(160%);
  -webkit-backdrop-filter: blur(20px) saturate(160%);
  border: 1px solid rgba(255, 255, 255, 0.55);
  box-shadow: 0 6px 18px rgba(49, 133, 242, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.5);
}

.stat-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  color: #ffffff;
  margin-bottom: 4px;
}

.stat-icon svg {
  width: 16px;
  height: 16px;
}

.stat-card-hadir .stat-icon {
  background: linear-gradient(135deg, #34d399 0%, #059669 100%);
  box-shadow: 0 4px 12px rgba(5, 150, 105, 0.35);
}

.stat-card-hadir .stat-number {
  color: #059669;
}

.stat-card-tidak .stat-icon {
  background: linear-gradient(135deg, #94a3b8 0%, #64748b 100%);
  box-shadow: 0 4px 12px rgba(100, 116, 139, 0.35);
}

.stat-card-tidak .stat-number {
  color: #64748b;
}

.stat-number {
  font-family: var(--font-sans);
  font-size: 24px;
  font-weight: 800;
  line-height: 1.1;
}

.stat-label {
  font-size: 10.5px;
  font-weight: 600;
  color: var(--color-text-muted);
  text-align: center;
  letter-spacing: 0.2px;
}

.form-card {
  background: rgba(255, 255, 255, 0.28);
  backdrop-filter: blur(24px) saturate(160%);
  -webkit-backdrop-filter: blur(24px) saturate(160%);
  border-radius: 20px;
  padding: 24px 20px 22px;
  margin-bottom: 24px;
  box-shadow: 0 6px 20px rgba(83, 128, 174, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.45);
}

.card-script-title {
  font-family: var(--font-serif);
  font-size: 27px;
  font-weight: 600;
  font-style: italic;
  color: #5380ae;
  text-align: center;
  margin: 0 0 20px;
}

.form-group {
  margin-bottom: 14px;
}

.form-label {
  display: block;
  font-size: 12px;
  font-weight: 500;
  color: #5380ae;
  margin-bottom: 6px;
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 11px 14px;
  border: 1px solid #d0e4f5;
  border-radius: 10px;
  background: #fbfdff;
  color: #17345c;
  font-size: 13.5px;
  font-family: inherit;
  outline: none;
  transition: all 0.2s ease;
  box-sizing: border-box;
}

.form-input:focus,
.form-textarea:focus {
  border-color: #3185f2;
  background: #ffffff;
  box-shadow: 0 0 0 3px rgba(49, 133, 242, 0.12);
}

.form-select {
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%235380ae' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 16px;
}

.textarea-wrapper {
  position: relative;
}

.form-textarea {
  resize: vertical;
  min-height: 90px;
}

.char-count {
  position: absolute;
  bottom: 8px;
  right: 12px;
  font-size: 11px;
  color: #8ea8c7;
}

/* Submit Button (matching screenshot button style) */
.btn-submit {
  width: 100%;
  padding: 12px;
  background: #5380ae;
  color: #ffffff;
  border: none;
  border-radius: 10px;
  font-size: 13.5px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 6px;
  box-shadow: 0 4px 12px rgba(83, 128, 174, 0.25);
}

.btn-submit:hover:not(:disabled) {
  background: #416892;
  box-shadow: 0 6px 16px rgba(83, 128, 174, 0.35);
  transform: translateY(-1px);
}

.btn-submit:active:not(:disabled) {
  transform: translateY(0);
}

.btn-submit:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}

/* Wishes List */
.wishes-list {
  margin-top: 20px;
  border-top: 1px dashed #d0e4f5;
  padding-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-height: 280px;
  overflow-y: auto;
}

.wish-item {
  background: #f7faff;
  border: 1px solid #e1effa;
  border-radius: 10px;
  padding: 10px 12px;
}

.wish-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 4px;
}

.wish-author {
  font-size: 12.5px;
  font-weight: 700;
  color: #17345c;
}

.wish-date {
  font-size: 10.5px;
  color: #8ea8c7;
}

.wish-text {
  font-size: 12px;
  line-height: 1.5;
  color: #2c4970;
  margin: 0;
}

/* Toast */
.rsvp-toast {
  position: fixed;
  top: 75px;
  left: 50%;
  transform: translateX(-50%);
  background: #ffffff;
  border: 1.5px solid #3185f2;
  color: #17345c;
  padding: 10px 20px;
  border-radius: 30px;
  box-shadow: 0 10px 25px rgba(49, 133, 242, 0.25);
  z-index: 999999;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 600;
}

.toast-check {
  width: 16px;
  height: 16px;
  color: #3185f2;
}

.toast-anim-enter-active,
.toast-anim-leave-active {
  transition: all 0.3s ease;
}

.toast-anim-enter-from,
.toast-anim-leave-to {
  opacity: 0;
  transform: translate(-50%, -10px);
}
</style>
