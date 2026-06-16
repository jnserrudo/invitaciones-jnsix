const STORAGE_KEY = 'invitaciones_admin_v1'

// --- Lectura estática (producción) ---
export async function loadStaticInvitaciones() {
  // Sin cache persistente para ver cambios inmediatamente en desarrollo
  try {
    const res = await fetch('/invitaciones.json?v=' + Date.now())
    if (!res.ok) throw new Error('HTTP ' + res.status)
    const data = await res.json()
    return Array.isArray(data) ? data : []
  } catch {
    return []
  }
}

export async function getStaticInvitacionBySlug(slug) {
  const all = await loadStaticInvitaciones()
  return all.find((inv) => inv.slug === slug) || null
}

// --- localStorage (solo para el panel de admin en el navegador) ---
export function getLocalInvitaciones() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function getLocalInvitacionBySlug(slug) {
  const all = getLocalInvitaciones()
  return all.find((inv) => inv.slug === slug) || null
}

export function saveLocalInvitacion(invitacion) {
  const all = getLocalInvitaciones()
  const existingIndex = all.findIndex((inv) => inv.slug === invitacion.slug)
  const now = new Date().toISOString()
  if (existingIndex >= 0) {
    all[existingIndex] = { ...all[existingIndex], ...invitacion, updatedAt: now }
  } else {
    all.push({
      ...invitacion,
      createdAt: now,
      updatedAt: now,
    })
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all))
  return all[existingIndex >= 0 ? existingIndex : all.length - 1]
}

export function deleteLocalInvitacion(slug) {
  const all = getLocalInvitaciones()
  const filtered = all.filter((inv) => inv.slug !== slug)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
}

// --- Exportar para deploy ---
export function exportForDeploy() {
  const all = getLocalInvitaciones()
  const blob = new Blob([JSON.stringify(all, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'invitaciones.json'
  a.click()
  URL.revokeObjectURL(url)
}

// --- Importar/Backup ---
export function exportBackup() {
  const all = getLocalInvitaciones()
  const blob = new Blob([JSON.stringify(all, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `invitaciones_backup_${new Date().toISOString().split('T')[0]}.json`
  a.click()
  URL.revokeObjectURL(url)
}

export function importData(jsonText) {
  const parsed = JSON.parse(jsonText)
  if (Array.isArray(parsed)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed))
    return true
  }
  return false
}
