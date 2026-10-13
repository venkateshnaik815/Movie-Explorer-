import { useState, useEffect } from 'react'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { PageContainer } from '../components/layout/PageContainer'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { tmdbApi } from '../services/tmdbApi'
import { HiArrowUpTray, HiFilm, HiCheck, HiTrash, HiPlay, HiDocumentText } from 'react-icons/hi2'

export default function Uploads() {
  useDocumentTitle('Upload Media & Videos')
  const [uploads, setUploads] = useLocalStorage('movie-explorer-uploads', [
    {
      id: 'demo-1',
      title: 'Interstellar - Fan Cut Teaser',
      category: 'Trailer',
      description: 'A 4K tribute trailer showcasing the wormhole travel sequence.',
      fileName: 'interstellar_tribute_4k.mp4',
      fileSize: '48.2 MB',
      createdAt: '2024-03-12',
      duration: '2:15',
    },
    {
      id: 'demo-2',
      title: 'The Dark Knight - Joker interrogation Scene Breakdown',
      category: 'Clip',
      description: 'Detailed analysis and remastered clip of the iconic scene.',
      fileName: 'dark_knight_scene.mp4',
      fileSize: '32.1 MB',
      createdAt: '2024-03-10',
      duration: '4:40',
    }
  ])

  useEffect(() => {
    tmdbApi.getUploads().then((backendUploads) => {
      if (Array.isArray(backendUploads) && backendUploads.length > 0) {
        setUploads(backendUploads)
      }
    })
  }, [])

  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('Trailer')
  const [description, setDescription] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [successMsg, setSuccessMsg] = useState('')

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const handleUpload = (e) => {
    e.preventDefault()
    if (!title.trim() || !selectedFile) return

    setUploading(true)
    setProgress(15)

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval)
          setTimeout(() => {
            const newUpload = {
              id: 'upl-' + Date.now(),
              title: title.trim(),
              category,
              description: description.trim() || 'No description provided.',
              fileName: selectedFile.name,
              fileSize: `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB`,
              createdAt: new Date().toISOString().split('T')[0],
              duration: '3:00',
            }
            tmdbApi.createUpload(newUpload)
            setUploads([newUpload, ...uploads])
            setUploading(false)
            setProgress(0)
            setTitle('')
            setDescription('')
            setSelectedFile(null)
            setSuccessMsg('Media uploaded successfully!')
            setTimeout(() => setSuccessMsg(''), 4000)
          }, 400)
          return 100
        }
        return prev + 20
      })
    }, 200)
  }

  const handleDelete = (id) => {
    tmdbApi.deleteUpload(id)
    setUploads(uploads.filter((u) => u.id !== id))
  }

  return (
    <PageContainer>
      <div className="page-header">
        <h1>
          <HiArrowUpTray style={{ verticalAlign: 'middle', color: 'var(--color-accent)' }} /> Media Uploads
        </h1>
        <p>Upload movie trailers, fan edits, scenes, and media for the community</p>
      </div>

      <div className="upload-layout">
        {/* Upload Form Card */}
        <div className="upload-card">
          <h3>Upload New Media</h3>
          {successMsg && (
            <div className="upload-success-alert">
              <HiCheck size={20} /> {successMsg}
            </div>
          )}

          <form onSubmit={handleUpload}>
            {/* Drag and Drop Zone */}
            <div
              className={`upload-dropzone ${selectedFile ? 'has-file' : ''}`}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              onClick={() => document.getElementById('file-input').click()}
            >
              <input
                id="file-input"
                type="file"
                accept="video/*"
                style={{ display: 'none' }}
                onChange={handleFileSelect}
              />
              <HiFilm size={48} className="dropzone-icon" />
              {selectedFile ? (
                <div className="dropzone-file-info">
                  <span className="file-name">{selectedFile.name}</span>
                  <span className="file-size">({(selectedFile.size / (1024 * 1024)).toFixed(1)} MB)</span>
                  <span className="change-file-hint">Click or drop another file to replace</span>
                </div>
              ) : (
                <div className="dropzone-prompt">
                  <p><strong>Click to browse</strong> or drag & drop video file</p>
                  <span>Supports MP4, WebM, MKV (Up to 500MB)</span>
                </div>
              )}
            </div>

            {/* Inputs */}
            <div className="form-group">
              <label>Media Title *</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Dune 2 Fan Cut Trailer"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Category</label>
              <select
                className="form-input"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Trailer">Official / Fan Trailer</option>
                <option value="Clip">Scene Clip</option>
                <option value="Teaser">Teaser</option>
                <option value="Short Film">Short Film</option>
                <option value="Review">Video Review</option>
              </select>
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                className="form-input form-textarea"
                placeholder="Add synopsis, context or tags..."
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {uploading && (
              <div className="upload-progress-wrapper">
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${progress}%` }} />
                </div>
                <span className="progress-text">Uploading & Processing... {progress}%</span>
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary btn-full"
              disabled={!selectedFile || !title.trim() || uploading}
            >
              <HiArrowUpTray size={20} />
              {uploading ? 'Uploading...' : 'Publish Media'}
            </button>
          </form>
        </div>

        {/* Uploads History List */}
        <div className="uploads-list-section">
          <h3>Your Uploaded Media ({uploads.length})</h3>
          <div className="uploads-list">
            {uploads.map((item) => (
              <div key={item.id} className="uploaded-media-card">
                <div className="media-preview-icon">
                  <HiPlay size={24} />
                  <span className="media-duration">{item.duration}</span>
                </div>
                <div className="media-details">
                  <div className="media-title-row">
                    <h4 className="media-title">{item.title}</h4>
                    <span className="media-badge">{item.category}</span>
                  </div>
                  <p className="media-desc">{item.description}</p>
                  <div className="media-meta">
                    <span><HiDocumentText size={14} /> {item.fileName}</span>
                    <span>• {item.fileSize}</span>
                    <span>• {item.createdAt}</span>
                  </div>
                </div>
                <button
                  className="media-delete-btn"
                  onClick={() => handleDelete(item.id)}
                  title="Delete media"
                  aria-label="Delete media"
                >
                  <HiTrash size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageContainer>
  )
}
