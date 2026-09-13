<template>
  <main class="dashboard-page">
    <header class="dashboard-header">
      <h1 class="dashboard-title">Dashboard Undangan</h1>
      <p class="dashboard-sub">Susi &amp; Aris — RSVP &amp; Ucapan Tamu</p>
    </header>

    <transition name="toast-fade">
      <div v-if="toastText" class="toast-bubble" role="status">
        <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <polyline points="20 6 9 17 4 12" />
        </svg>
        <span>{{ toastText }}</span>
      </div>
    </transition>

    <section class="data-section">
      <h2 class="section-title">Daftar Tamu &amp; Kirim Undangan ({{ inviteList.length }})</h2>

      <form class="invite-form" @submit.prevent="addInvite">
        <input
          v-model="inviteForm.name"
          type="text"
          class="invite-input"
          placeholder="Nama tamu"
          required
        />
        <input
          v-model="inviteForm.phone"
          type="tel"
          class="invite-input"
          placeholder="No. WhatsApp (contoh: 081234567890)"
          required
        />
        <button type="submit" class="btn-add-invite" :disabled="isAddingInvite">
          {{ isAddingInvite ? 'Menambahkan...' : 'Tambah ke Daftar' }}
        </button>
      </form>

      <p v-if="!isLoadingInvites && inviteList.length === 0" class="empty-note">Belum ada tamu ditambahkan.</p>

      <div class="data-list">
        <div v-for="item in inviteList" :key="item.id" class="invite-card">
          <div class="invite-card-head">
            <span class="data-name">{{ item.name }}</span>
            <button class="btn-delete" @click="removeInvite(item.id)" aria-label="Hapus tamu">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p class="data-meta">{{ item.phone }}</p>

          <div class="invite-link-row">
            <input type="text" class="invite-link-input" :value="buildInviteLink(item.name)" readonly />
            <button type="button" class="btn-copy-link" @click="copyInviteLink(item.name)">Salin</button>
          </div>

          <a
            :href="buildWaLink(item)"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-send-wa"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.52 3.48A11.9 11.9 0 0 0 12.04 0C5.5 0 .2 5.3.2 11.84c0 2.09.55 4.13 1.6 5.93L0 24l6.4-1.68a11.86 11.86 0 0 0 5.64 1.44h.01c6.54 0 11.85-5.3 11.85-11.85 0-3.17-1.24-6.14-3.38-8.43ZM12.05 21.4h-.01a9.6 9.6 0 0 1-4.9-1.34l-.35-.21-3.63.95.97-3.54-.23-.36a9.6 9.6 0 0 1-1.47-5.11c0-5.3 4.32-9.62 9.63-9.62 2.57 0 4.98 1 6.8 2.82a9.56 9.56 0 0 1 2.82 6.8c0 5.3-4.32 9.61-9.63 9.61Zm5.27-7.2c-.29-.14-1.7-.84-1.96-.93-.26-.1-.46-.14-.65.14-.19.29-.75.93-.92 1.12-.17.19-.34.21-.63.07-.29-.14-1.23-.45-2.34-1.44-.87-.77-1.45-1.72-1.62-2.01-.17-.29-.02-.44.13-.58.13-.13.29-.34.43-.5.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.5-.07-.14-.65-1.56-.89-2.14-.23-.56-.47-.48-.65-.49-.17-.01-.36-.01-.55-.01-.19 0-.5.07-.76.36-.26.29-1 .98-1 2.4 0 1.41 1.02 2.77 1.17 2.96.14.19 2 3.05 4.85 4.28.68.29 1.21.47 1.62.6.68.22 1.3.19 1.79.11.55-.08 1.7-.69 1.94-1.36.24-.67.24-1.24.17-1.36-.07-.12-.26-.19-.55-.34Z" />
            </svg>
            Kirim via WhatsApp
          </a>
        </div>
      </div>
    </section>

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
import { collection, onSnapshot, query, orderBy, addDoc, deleteDoc, doc, setDoc, increment, serverTimestamp, type Timestamp } from 'firebase/firestore'

const GUESTS_COLLECTION = 'guests_susiaris'
const WISHES_COLLECTION = 'wishes_susiaris'
const INVITE_COLLECTION = 'invite_list_susiaris'

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

interface InviteItem {
  id: string
  name: string
  phone: string
}

const rsvpList = ref<RsvpItem[]>([])
const wishesList = ref<WishItem[]>([])
const inviteList = ref<InviteItem[]>([])
const isLoadingGuests = ref(true)
const isLoadingWishes = ref(true)
const isLoadingInvites = ref(true)
const isAddingInvite = ref(false)
const inviteForm = ref({ name: '', phone: '' })
const toastText = ref('')

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
let unsubscribeInvites: (() => void) | null = null

onMounted(() => {
  const inviteQ = query(collection(db, INVITE_COLLECTION), orderBy('createdAt', 'desc'))
  unsubscribeInvites = onSnapshot(inviteQ, (snapshot) => {
    inviteList.value = snapshot.docs.map((docSnap) => {
      const data = docSnap.data()
      return {
        id: docSnap.id,
        name: data.name || '',
        phone: data.phone || ''
      }
    })
    isLoadingInvites.value = false
  })

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
  if (unsubscribeInvites) unsubscribeInvites()
})

const removeRsvp = async (id: string) => {
  const item = rsvpList.value.find((r) => r.id === id)
  if (!confirm('Hapus data RSVP ini?')) return
  await deleteDoc(doc(db, GUESTS_COLLECTION, id))

  if (item) {
    try {
      const summaryRef = doc(db, 'metadata_susiaris', 'summary')
      await setDoc(summaryRef, {
        totalHadir: item.attendance === 'hadir' ? increment(-(item.guests || 1)) : increment(0),
        totalTidakHadir: item.attendance === 'tidak_hadir' ? increment(-1) : increment(0)
      }, { merge: true })
    } catch (e) {
      console.error('Error syncing summary after delete:', e)
    }
  }
}

const removeWish = async (id: string) => {
  if (!confirm('Hapus ucapan ini?')) return
  await deleteDoc(doc(db, WISHES_COLLECTION, id))
}

const showToast = (msg: string) => {
  toastText.value = msg
  setTimeout(() => {
    toastText.value = ''
  }, 2800)
}

const addInvite = async () => {
  if (!inviteForm.value.name.trim() || !inviteForm.value.phone.trim()) return
  isAddingInvite.value = true

  try {
    await addDoc(collection(db, INVITE_COLLECTION), {
      name: inviteForm.value.name.trim(),
      phone: inviteForm.value.phone.trim(),
      createdAt: serverTimestamp()
    })
    inviteForm.value = { name: '', phone: '' }
    showToast('Tamu berhasil ditambahkan ke daftar!')
  } catch (err) {
    console.error(err)
    showToast('Gagal menambahkan tamu. Silakan coba lagi.')
  } finally {
    isAddingInvite.value = false
  }
}

const removeInvite = async (id: string) => {
  if (!confirm('Hapus tamu ini dari daftar?')) return
  await deleteDoc(doc(db, INVITE_COLLECTION, id))
}

const buildInviteLink = (name: string) => {
  return `${window.location.origin}/?to=${encodeURIComponent(name)}`
}

const buildWaMessage = (name: string) => {
  const link = buildInviteLink(name)
  return `Assalamualaikum Bapak/Ibu/Saudara/i ${name},\n\nDengan penuh syukur dan kebahagiaan, kami mengundang Anda untuk hadir pada acara pernikahan kami:\n\nSusi & Aris\n\nBerikut link undangan digital kami:\n${link}\n\nMerupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.\n\nTerima kasih.`
}

const normalizePhone = (phone: string) => {
  let digits = phone.replace(/\D/g, '')
  if (digits.startsWith('0')) {
    digits = '62' + digits.slice(1)
  } else if (!digits.startsWith('62')) {
    digits = '62' + digits
  }
  return digits
}

const buildWaLink = (item: InviteItem) => {
  const message = buildWaMessage(item.name)
  return `https://wa.me/${normalizePhone(item.phone)}?text=${encodeURIComponent(message)}`
}

const copyInviteLink = async (name: string) => {
  try {
    await navigator.clipboard.writeText(buildInviteLink(name))
    showToast('Link undangan berhasil disalin!')
  } catch (err) {
    showToast('Gagal menyalin link.')
  }
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

/* Toast */
.toast-bubble {
  position: fixed;
  top: 16px;
  left: 50%;
  transform: translateX(-50%);
  background: #ffffff;
  border: 1.5px solid var(--color-blue-primary);
  color: var(--color-text-navy);
  padding: 10px 20px;
  border-radius: 30px;
  box-shadow: 0 10px 25px rgba(49, 133, 242, 0.2);
  z-index: 99999;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 600;
  max-width: 90vw;
}

.check-icon {
  width: 16px;
  height: 16px;
  color: var(--color-blue-primary);
  flex-shrink: 0;
}

.toast-fade-enter-active,
.toast-fade-leave-active {
  transition: all 0.3s ease;
}

.toast-fade-enter-from,
.toast-fade-leave-to {
  opacity: 0;
  transform: translate(-50%, -10px);
}

/* Invite form */
.invite-form {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
}

.invite-input {
  width: 100%;
  padding: 10px 14px;
  border: 1px solid #d0e4f5;
  border-radius: 10px;
  background: #fbfdff;
  color: var(--color-text-navy);
  font-size: 13px;
  font-family: inherit;
  outline: none;
  box-sizing: border-box;
  transition: all 0.2s ease;
}

.invite-input:focus {
  border-color: var(--color-blue-primary);
  background: #ffffff;
  box-shadow: 0 0 0 3px rgba(49, 133, 242, 0.12);
}

.btn-add-invite {
  width: 100%;
  padding: 11px;
  background: var(--color-blue-primary);
  color: #ffffff;
  border: none;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(49, 133, 242, 0.25);
}

.btn-add-invite:hover:not(:disabled) {
  background: #2573d8;
  transform: translateY(-1px);
}

.btn-add-invite:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}

/* Invite cards */
.invite-card {
  background: #ffffff;
  border: 1px solid rgba(196, 226, 248, 0.7);
  border-radius: 14px;
  padding: 14px 16px;
  box-shadow: 0 4px 14px rgba(49, 133, 242, 0.06);
}

.invite-card-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 2px;
}

.invite-link-row {
  display: flex;
  gap: 6px;
  margin: 10px 0;
}

.invite-link-input {
  flex: 1;
  min-width: 0;
  padding: 8px 10px;
  border: 1px solid #e1effa;
  border-radius: 8px;
  background: #f7faff;
  color: var(--color-text-muted);
  font-size: 11px;
  font-family: inherit;
}

.btn-copy-link {
  flex-shrink: 0;
  padding: 8px 14px;
  border: 1px solid var(--color-blue-soft);
  border-radius: 8px;
  background: #f0f7fe;
  color: var(--color-text-navy);
  font-size: 11.5px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-copy-link:hover {
  background: var(--color-blue-primary);
  border-color: var(--color-blue-primary);
  color: #ffffff;
}

.btn-send-wa {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 10px;
  background: #25d366;
  color: #ffffff;
  border-radius: 10px;
  font-size: 12.5px;
  font-weight: 700;
  text-decoration: none;
  box-shadow: 0 4px 12px rgba(37, 211, 102, 0.3);
  transition: all 0.2s ease;
}

.btn-send-wa:hover {
  background: #1ebe5a;
  transform: translateY(-1px);
}

.btn-send-wa svg {
  width: 15px;
  height: 15px;
}
</style>
