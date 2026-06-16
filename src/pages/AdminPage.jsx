import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import {
  getLocalInvitaciones,
  saveLocalInvitacion,
  deleteLocalInvitacion,
  loadStaticInvitaciones,
  exportForDeploy,
  exportBackup,
  importData,
} from '../data/storage.js'
import {
  Plus,
  Trash2,
  Edit2,
  ExternalLink,
  Download,
  Upload,
  Eye,
  X,
  RefreshCw,
} from 'lucide-react'

const emptyForm = {
  slug: '',
  theme: 'classic',
  nombreEvento: '',
  subtitulo: '',
  fotoUrl: '',
  fechaHora: '',
  horarioTexto: 'DE 21:30 A 05:30 HS',
  nombreSalon: '',
  direccion: '',
  mapsUrl: '',
  frase: '',
  dressCode: 'ELEGANTE',
  mensajeRegalo: '',
  aliasLabel: 'MI ALIAS:',
  alias: '',
  whatsapp: '',
  mensajeConfirmacion: '',
  videoId: '',
}

export default function AdminPage() {
  const [invitaciones, setInvitaciones] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ ...emptyForm })
  const [editingSlug, setEditingSlug] = useState(null)
  const [previewSlug, setPreviewSlug] = useState(null)

  const refresh = useCallback(() => {
    setInvitaciones(getLocalInvitaciones())
  }, [])

  useEffect(() => {
    async function init() {
      const local = getLocalInvitaciones()
      if (local.length === 0) {
        const staticData = await loadStaticInvitaciones()
        if (staticData.length > 0) {
          localStorage.setItem('invitaciones_admin_v1', JSON.stringify(staticData))
        }
      }
      refresh()
    }
    init()
  }, [refresh])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.slug || !form.nombreEvento || !form.fechaHora) return
    saveLocalInvitacion({ ...form })
    refresh()
    setShowForm(false)
    setForm({ ...emptyForm })
    setEditingSlug(null)
  }

  const handleEdit = (inv) => {
    setForm({ ...inv })
    setEditingSlug(inv.slug)
    setShowForm(true)
  }

  const handleDelete = (slug) => {
    if (confirm('¿Eliminar esta invitación?')) {
      deleteLocalInvitacion(slug)
      refresh()
    }
  }

  const handleImport = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      try {
        if (importData(ev.target.result)) {
          refresh()
          alert('Importado correctamente')
        }
      } catch {
        alert('Error al importar')
      }
    }
    reader.readAsText(file)
  }

  const previewInv = previewSlug ? invitaciones.find((i) => i.slug === previewSlug) : null

  const handleReseed = async () => {
    if (!confirm('Esto reemplazará todas las invitaciones del panel con las del archivo invitaciones.json. ¿Continuar?')) return
    const staticData = await loadStaticInvitaciones()
    if (staticData.length > 0) {
      localStorage.setItem('invitaciones_admin_v1', JSON.stringify(staticData))
      refresh()
      alert('Invitaciones re-cargadas desde invitaciones.json')
    } else {
      alert('No se encontraron invitaciones en invitaciones.json')
    }
  }

  return (
    <div className="min-h-dvh bg-inv-gray-900 text-white">
      <header className="sticky top-0 z-30 bg-inv-black/80 backdrop-blur-md border-b border-white/10 px-4 py-4 flex items-center justify-between">
        <h1 className="font-cinzel text-lg tracking-widest uppercase">Gestor de Invitaciones</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={exportForDeploy}
            className="p-2 rounded-md bg-emerald-500/20 hover:bg-emerald-500/30 transition"
            title="Exportar para deploy"
          >
            <Download className="w-4 h-4 text-emerald-400" />
          </button>
          <button
            onClick={exportBackup}
            className="p-2 rounded-md bg-white/5 hover:bg-white/10 transition"
            title="Backup JSON"
          >
            <Download className="w-4 h-4" />
          </button>
          <label className="p-2 rounded-md bg-white/5 hover:bg-white/10 transition cursor-pointer" title="Importar JSON">
            <Upload className="w-4 h-4" />
            <input type="file" accept=".json" className="hidden" onChange={handleImport} />
          </label>
          <button
            onClick={handleReseed}
            className="p-2 rounded-md bg-white/5 hover:bg-white/10 transition"
            title="Re-cargar desde invitaciones.json"
          >
            <RefreshCw className="w-4 h-4 text-amber-400" />
          </button>
          <button
            onClick={() => {
              setForm({ ...emptyForm })
              setEditingSlug(null)
              setShowForm(true)
            }}
            className="flex items-center gap-1 bg-white text-black px-3 py-2 rounded-md font-inter text-xs tracking-wider uppercase hover:bg-gray-200 transition"
          >
            <Plus className="w-4 h-4" />
            Nueva
          </button>
        </div>
      </header>

      <main className="max-w-xl mx-auto px-4 py-6">
        <div className="mb-6 p-4 bg-white/5 border border-white/10 rounded-lg">
          <p className="font-inter text-xs text-gray-400 leading-relaxed">
            <strong className="text-white">Flujo de trabajo:</strong> Creá/editá invitaciones acá. Cuando estén listas, tocá el botón verde para exportar <code className="bg-white/10 px-1 rounded">invitaciones.json</code>, reemplazalo en la carpeta <code className="bg-white/10 px-1 rounded">public/</code>, hacé build y deploy. Los enlaces quedan fijos para siempre.
          </p>
        </div>
        {invitaciones.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-cormorant text-lg text-gray-400 mb-4">
              No hay invitaciones creadas
            </p>
            <button
              onClick={() => {
                setForm({ ...emptyForm })
                setShowForm(true)
              }}
              className="text-sm underline text-gray-300 hover:text-white"
            >
              Crear la primera
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {invitaciones.map((inv) => (
              <div
                key={inv.slug}
                className="bg-white/5 border border-white/10 rounded-lg p-4 flex items-center justify-between"
              >
                <div className="min-w-0">
                  <p className="font-cinzel text-sm truncate">{inv.nombreEvento}</p>
                  <p className="font-inter text-[10px] text-gray-400 tracking-wider uppercase">
                    /invitacion/{inv.slug}
                  </p>
                </div>
                <div className="flex items-center gap-1 ml-2 shrink-0">
                  <button
                    onClick={() => setPreviewSlug(inv.slug)}
                    className="p-2 rounded-md hover:bg-white/10 text-gray-300"
                    title="Vista previa"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <Link
                    to={`/invitacion/${inv.slug}`}
                    target="_blank"
                    className="p-2 rounded-md hover:bg-white/10 text-gray-300"
                    title="Abrir"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => handleEdit(inv)}
                    className="p-2 rounded-md hover:bg-white/10 text-gray-300"
                    title="Editar"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(inv.slug)}
                    className="p-2 rounded-md hover:bg-red-500/20 text-gray-300 hover:text-red-300"
                    title="Eliminar"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm flex items-start justify-center overflow-y-auto py-10 px-4">
          <div className="bg-inv-gray-800 border border-white/10 rounded-xl w-full max-w-lg p-6 relative">
            <button
              onClick={() => {
                setShowForm(false)
                setForm({ ...emptyForm })
                setEditingSlug(null)
              }}
              className="absolute top-4 right-4 p-1 rounded-md hover:bg-white/10 text-gray-400"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="font-cinzel text-lg tracking-widest uppercase mb-6">
              {editingSlug ? 'Editar invitación' : 'Nueva invitación'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-inter text-[10px] tracking-wider uppercase text-gray-400 mb-1">Slug (URL)</label>
                  <input
                    required
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                    className="w-full bg-black/40 border border-white/10 rounded-md px-3 py-2 font-inter text-sm outline-none focus:border-white/30"
                    placeholder="emilia-xv"
                  />
                </div>
                <div>
                  <label className="block font-inter text-[10px] tracking-wider uppercase text-gray-400 mb-1">Nombre del evento</label>
                  <input
                    required
                    value={form.nombreEvento}
                    onChange={(e) => setForm({ ...form, nombreEvento: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-md px-3 py-2 font-inter text-sm outline-none focus:border-white/30"
                    placeholder="EMILIA XV"
                  />
                </div>
                <div>
                  <label className="block font-inter text-[10px] tracking-wider uppercase text-gray-400 mb-1">Tema</label>
                  <select
                    value={form.theme}
                    onChange={(e) => setForm({ ...form, theme: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-md px-3 py-2 font-inter text-sm outline-none focus:border-white/30"
                  >
                    <option value="classic">Classic (Blanco/Negro)</option>
                    <option value="warm">Warm (Dorado/Champagne)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-inter text-[10px] tracking-wider uppercase text-gray-400 mb-1">Subtítulo</label>
                <input
                  value={form.subtitulo}
                  onChange={(e) => setForm({ ...form, subtitulo: e.target.value })}
                  className="w-full bg-black/40 border border-white/10 rounded-md px-3 py-2 font-inter text-sm outline-none focus:border-white/30"
                  placeholder="LET'S PARTY"
                />
              </div>

              <div>
                <label className="block font-inter text-[10px] tracking-wider uppercase text-gray-400 mb-1">URL de la foto principal</label>
                <input
                  required
                  value={form.fotoUrl}
                  onChange={(e) => setForm({ ...form, fotoUrl: e.target.value })}
                  className="w-full bg-black/40 border border-white/10 rounded-md px-3 py-2 font-inter text-sm outline-none focus:border-white/30"
                  placeholder="https://..."
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-inter text-[10px] tracking-wider uppercase text-gray-400 mb-1">Fecha y hora del evento</label>
                  <input
                    required
                    type="datetime-local"
                    value={form.fechaHora}
                    onChange={(e) => setForm({ ...form, fechaHora: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-md px-3 py-2 font-inter text-sm outline-none focus:border-white/30"
                  />
                </div>
                <div>
                  <label className="block font-inter text-[10px] tracking-wider uppercase text-gray-400 mb-1">Horario (texto)</label>
                  <input
                    value={form.horarioTexto}
                    onChange={(e) => setForm({ ...form, horarioTexto: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-md px-3 py-2 font-inter text-sm outline-none focus:border-white/30"
                    placeholder="DE 21:30 A 05:30 HS"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-inter text-[10px] tracking-wider uppercase text-gray-400 mb-1">Nombre del salón</label>
                  <input
                    value={form.nombreSalon}
                    onChange={(e) => setForm({ ...form, nombreSalon: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-md px-3 py-2 font-inter text-sm outline-none focus:border-white/30"
                    placeholder="JANO'S MORÓN"
                  />
                </div>
                <div>
                  <label className="block font-inter text-[10px] tracking-wider uppercase text-gray-400 mb-1">Dirección</label>
                  <input
                    value={form.direccion}
                    onChange={(e) => setForm({ ...form, direccion: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-md px-3 py-2 font-inter text-sm outline-none focus:border-white/30"
                    placeholder="AV. PRESIDENTE PERÓN 4852"
                  />
                </div>
              </div>

              <div>
                <label className="block font-inter text-[10px] tracking-wider uppercase text-gray-400 mb-1">Link de Google Maps</label>
                <input
                  value={form.mapsUrl}
                  onChange={(e) => setForm({ ...form, mapsUrl: e.target.value })}
                  className="w-full bg-black/40 border border-white/10 rounded-md px-3 py-2 font-inter text-sm outline-none focus:border-white/30"
                  placeholder="https://maps.app.goo.gl/..."
                />
              </div>

              <div>
                <label className="block font-inter text-[10px] tracking-wider uppercase text-gray-400 mb-1">Frase emotiva</label>
                <textarea
                  value={form.frase}
                  onChange={(e) => setForm({ ...form, frase: e.target.value })}
                  rows={3}
                  className="w-full bg-black/40 border border-white/10 rounded-md px-3 py-2 font-inter text-sm outline-none focus:border-white/30 resize-none"
                  placeholder="Hay momentos en la vida..."
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-inter text-[10px] tracking-wider uppercase text-gray-400 mb-1">Dress Code</label>
                  <input
                    value={form.dressCode}
                    onChange={(e) => setForm({ ...form, dressCode: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-md px-3 py-2 font-inter text-sm outline-none focus:border-white/30"
                    placeholder="ELEGANTE"
                  />
                </div>
                <div>
                  <label className="block font-inter text-[10px] tracking-wider uppercase text-gray-400 mb-1">Video ID de YouTube</label>
                  <input
                    value={form.videoId}
                    onChange={(e) => setForm({ ...form, videoId: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-md px-3 py-2 font-inter text-sm outline-none focus:border-white/30"
                    placeholder="Xk0wdDTTPA0"
                  />
                </div>
              </div>

              <div>
                <label className="block font-inter text-[10px] tracking-wider uppercase text-gray-400 mb-1">Mensaje de regalo</label>
                <textarea
                  value={form.mensajeRegalo}
                  onChange={(e) => setForm({ ...form, mensajeRegalo: e.target.value })}
                  rows={2}
                  className="w-full bg-black/40 border border-white/10 rounded-md px-3 py-2 font-inter text-sm outline-none focus:border-white/30 resize-none"
                  placeholder="Mi mejor regalo es tu presencia..."
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-inter text-[10px] tracking-wider uppercase text-gray-400 mb-1">Alias label</label>
                  <input
                    value={form.aliasLabel}
                    onChange={(e) => setForm({ ...form, aliasLabel: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-md px-3 py-2 font-inter text-sm outline-none focus:border-white/30"
                    placeholder="MI ALIAS:"
                  />
                </div>
                <div>
                  <label className="block font-inter text-[10px] tracking-wider uppercase text-gray-400 mb-1">Alias bancario</label>
                  <input
                    value={form.alias}
                    onChange={(e) => setForm({ ...form, alias: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-md px-3 py-2 font-inter text-sm outline-none focus:border-white/30"
                    placeholder="EMILIA.XV"
                  />
                </div>
              </div>

              <div>
                <label className="block font-inter text-[10px] tracking-wider uppercase text-gray-400 mb-1">Número de WhatsApp (solo números, con código de país)</label>
                <input
                  value={form.whatsapp}
                  onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                  className="w-full bg-black/40 border border-white/10 rounded-md px-3 py-2 font-inter text-sm outline-none focus:border-white/30"
                  placeholder="5491123456789"
                />
              </div>

              <div>
                <label className="block font-inter text-[10px] tracking-wider uppercase text-gray-400 mb-1">Mensaje de confirmación (usa *{'${nombre}'}* para incluir el nombre)</label>
                <textarea
                  value={form.mensajeConfirmacion}
                  onChange={(e) => setForm({ ...form, mensajeConfirmacion: e.target.value })}
                  rows={2}
                  className="w-full bg-black/40 border border-white/10 rounded-md px-3 py-2 font-inter text-sm outline-none focus:border-white/30 resize-none"
                  placeholder="Hola! Soy *${nombre}* y quiero confirmar mi asistencia..."
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-white text-black font-inter text-sm tracking-wider uppercase py-3 rounded-md hover:bg-gray-200 transition"
                >
                  {editingSlug ? 'Guardar cambios' : 'Crear invitación'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {previewSlug && previewInv && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center px-4 py-8">
          <div className="w-full max-w-sm bg-black rounded-xl overflow-hidden relative max-h-[90vh] overflow-y-auto no-scrollbar">
            <button
              onClick={() => setPreviewSlug(null)}
              className="sticky top-0 z-10 ml-auto mr-2 mt-2 p-2 bg-black/50 rounded-full text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <iframe
              src={`/invitacion/${previewSlug}?v=${Date.now()}`}
              className="w-full h-[85vh] border-0"
              style={{ overflow: 'auto' }}
              title="Preview"
              scrolling="auto"
            />
          </div>
        </div>
      )}
    </div>
  )
}
