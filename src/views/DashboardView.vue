<template>
  <main class="dashboard-page">
    <header class="dashboard-header">
      <h1 class="dashboard-title">Dashboard Undangan</h1>
      <p class="dashboard-sub">Susi &amp; Aris — RSVP &amp; Ucapan Tamu</p>
    </header>

    <section class="stats-row" aria-label="Ringkasan RSVP">
      <div class="stat-card">
        <span class="stat-number">{{ totalHadirPax }}</span>
        <span class="stat-label">Total Tamu Hadir</span>
      </div>
      <div class="stat-card">
        <span class="stat-number">{{ totalTidakHadir }}</span>
        <span class="stat-label">Tidak Hadir</span>
      </div>
      <div class="stat-card">
        <span class="stat-number">{{ wishesList.length }}</span>
        <span class="stat-label">Ucapan Masuk</span>
      </div>
    </section>

    <section class="data-section">
      <h2 class="section-title">Daftar RSVP ({{ rsvpList.length }})</h2>

      <p v-if="!isLoadingGuests && rsvpList.length === 0" class="empty-note">Belum ada konfirmasi kehadiran.</p>

      <div class="data-list">
        <div v-for="item in rsvpList" :key="item.id" class="data-card">
          <div class="data-card-main">
            <div class="data-card-head">
              <span class="data-name">{{ item.name }}</span>
              <span
                class="status-badge"
                :class="item.attendance === 'hadir' ? 'status-hadir' : 'status-tidak'"
              >
                {{ item.attendance === 'hadir' ? 'Hadir' : 'Tidak Hadir' }}
              </span>
            </div>
            <p class="data-meta">{{ item.phone || '-' }} · {{ item.guests }} tamu · {{ item.date }}</p>
          </div>
          <button class="btn-delete" @click="removeRsvp(item.id)" aria-label="Hapus data RSVP">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </section>

    <section class="data-section">
      <h2 class="section-title">Ucapan &amp; Doa ({{ wishesList.length }})</h2>

      <p v-if="!isLoadingWishes && wishesList.length === 0" class="empty-note">Belum ada ucapan masuk.</p>

      <div class="data-list">
        <div v-for="item in wishesList" :key="item.id" class="data-card">
          <div class="data-card-main">
            <div class="data-card-head">
              <span class="data-name">{{ item.name }}</span>
            </div>
            <p class="wish-text">{{ item.message }}</p>
            <p class="data-meta">{{ item.date }}</p>
          </div>
          <button class="btn-delete" @click="removeWish(item.id)" aria-label="Hapus ucapan">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { db } from '../service/firebase'
import { collection, onSnapshot, query, orderBy, deleteDoc, doc, type Timestamp } from 'firebase/firestore'

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
const isLoadingGuests = ref(true)
const isLoadingWishes = ref(true)

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

const totalHadirPax = computed(() =>
  rsvpList.value
    .filter((item) => item.attendance === 'hadir')
    .reduce((sum, item) => sum + (Number(item.guests) || 1), 0)
)

const totalTidakHadir = computed(() => rsvpList.value.filter((item) => item.attendance === 'tidak_hadir').length)

let unsubscribeGuests: (() => void) | null = null
let unsubscribeWishes: (() => void) | null = null

onMounted(() => {
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
    isLoadingGuests.value = false
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
    isLoadingWishes.value = false
  })
})

onUnmounted(() => {
  if (unsubscribeGuests) unsubscribeGuests()
  if (unsubscribeWishes) unsubscribeWishes()
})

const removeRsvp = async (id: string) => {
  if (!confirm('Hapus data RSVP ini?')) return
  await deleteDoc(doc(db, GUESTS_COLLECTION, id))
}

const removeWish = async (id: string) => {
  if (!confirm('Hapus ucapan ini?')) return
  await deleteDoc(doc(db, WISHES_COLLECTION, id))
}
</script>

<style scoped>
.dashboard-page {
  position: relative;
  z-index: 1;
  min-height: 100vh;
  min-height: 100dvh;
  background: var(--color-bg-page);
  color: var(--color-text-navy);
  padding: 24px 16px 48px;
}

.dashboard-header {
  text-align: center;
  margin-bottom: 20px;
}

.dashboard-title {
  font-family: var(--font-serif);
  font-size: 24px;
  font-weight: 700;
  margin: 0 0 4px;
}

.dashboard-sub {
  font-size: 12.5px;
  color: var(--color-text-muted);
  margin: 0;
}

.stats-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  max-width: 480px;
  margin: 0 auto 28px;
}

.stat-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  border: 1px solid rgba(196, 226, 248, 0.7);
  border-radius: 14px;
  padding: 14px 8px;
  box-shadow: 0 4px 14px rgba(49, 133, 242, 0.08);
}

.stat-number {
  font-size: 22px;
  font-weight: 700;
  color: var(--color-blue-primary);
}

.stat-label {
  font-size: 10.5px;
  color: var(--color-text-muted);
  text-align: center;
  margin-top: 2px;
}

.data-section {
  max-width: 480px;
  margin: 0 auto 32px;
}

.section-title {
  font-size: 15px;
  font-weight: 700;
  margin: 0 0 12px;
}

.empty-note {
  font-size: 12.5px;
  color: var(--color-text-muted);
  font-style: italic;
}

.data-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.data-card {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
  background: #ffffff;
  border: 1px solid rgba(196, 226, 248, 0.7);
  border-radius: 14px;
  padding: 14px 16px;
  box-shadow: 0 4px 14px rgba(49, 133, 242, 0.06);
}

.data-card-main {
  flex: 1;
  min-width: 0;
}

.data-card-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 4px;
}

.data-name {
  font-weight: 700;
  font-size: 13.5px;
  color: var(--color-text-navy);
}

.status-badge {
  font-size: 10.5px;
  font-weight: 700;
  padding: 3px 9px;
  border-radius: 10px;
  white-space: nowrap;
}

.status-hadir {
  background: rgba(49, 133, 242, 0.12);
  color: var(--color-blue-primary);
}

.status-tidak {
  background: rgba(83, 128, 174, 0.12);
  color: var(--color-text-muted);
}

.data-meta {
  font-size: 11.5px;
  color: var(--color-text-muted);
  margin: 0;
}

.wish-text {
  font-size: 12.5px;
  line-height: 1.5;
  color: var(--color-text-body);
  margin: 0 0 4px;
}

.btn-delete {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 1px solid rgba(196, 226, 248, 0.9);
  background: #f7faff;
  color: var(--color-text-muted);
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-delete:hover {
  background: #fdeaea;
  border-color: #f3b6b6;
  color: #c23b3b;
}

.btn-delete svg {
  width: 13px;
  height: 13px;
}
</style>
