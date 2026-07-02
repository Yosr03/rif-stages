import { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import { Calendar, Clock, Video, Building2 } from 'lucide-react';

const InterviewModal = ({ isOpen, onClose, onSave, candidate }) => {
  const [formData, setFormData] = useState({
    date: '',
    time: '10:00',
    type: 'Visio',
    notes: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Reset form quand modal s'ouvre
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setFormData({
        date: tomorrow.toISOString().split('T')[0],
        time: '10:00',
        type: 'Visio',
        notes: '',
      });
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de la création de l\'entretien');
    } finally {
      setLoading(false);
    }
  };

  if (!candidate) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Planifier un entretien" size="md">
      <form onSubmit={handleSubmit}>
        {/* Info candidat */}
        <div style={{
          padding: '1rem',
          backgroundColor: '#F0F9FF',
          borderRadius: '0.5rem',
          border: '1px solid #BFDBFE',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            backgroundColor: '#2563EB',
            color: 'white',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
            fontSize: '1rem',
          }}>
            {candidate.firstName[0]}{candidate.lastName[0]}
          </div>
          <div>
            <p style={{ fontWeight: 700, color: '#1F2937', margin: 0 }}>
              {candidate.firstName} {candidate.lastName}
            </p>
            <p style={{ fontSize: '0.875rem', color: '#6B7280', margin: 0 }}>
              {candidate.department}
            </p>
          </div>
        </div>

        {/* Date */}
        <div style={{ marginBottom: '1rem' }}>
          <label style={{
            display: 'block',
            fontSize: '0.875rem',
            fontWeight: 600,
            color: '#374151',
            marginBottom: '0.375rem',
          }}>
            <Calendar size={14} style={{ display: 'inline', marginRight: '4px' }} />
            Date de l'entretien *
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            min={new Date().toISOString().split('T')[0]}
            style={{
              width: '100%',
              padding: '0.625rem 1rem',
              border: '1px solid #D1D5DB',
              borderRadius: '0.5rem',
              fontSize: '0.875rem',
              outline: 'none',
              fontFamily: 'inherit',
            }}
          />
        </div>

        {/* Heure */}
        <div style={{ marginBottom: '1rem' }}>
          <label style={{
            display: 'block',
            fontSize: '0.875rem',
            fontWeight: 600,
            color: '#374151',
            marginBottom: '0.375rem',
          }}>
            <Clock size={14} style={{ display: 'inline', marginRight: '4px' }} />
            Heure *
          </label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '0.625rem 1rem',
              border: '1px solid #D1D5DB',
              borderRadius: '0.5rem',
              fontSize: '0.875rem',
              outline: 'none',
              fontFamily: 'inherit',
            }}
          />
        </div>

        {/* Type */}
        <div style={{ marginBottom: '1rem' }}>
          <label style={{
            display: 'block',
            fontSize: '0.875rem',
            fontWeight: 600,
            color: '#374151',
            marginBottom: '0.5rem',
          }}>
            Type d'entretien *
          </label>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {['Visio', 'Présentiel'].map((type) => (
              <label
                key={type}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  border: `2px solid ${formData.type === type ? '#2563EB' : '#E5E7EB'}`,
                  backgroundColor: formData.type === type ? '#EFF6FF' : 'white',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: formData.type === type ? '#2563EB' : '#6B7280',
                  transition: 'all 0.2s',
                }}
              >
                <input
                  type="radio"
                  name="type"
                  value={type}
                  checked={formData.type === type}
                  onChange={handleChange}
                  style={{ display: 'none' }}
                />
                {type === 'Visio' ? <Video size={16} /> : <Building2 size={16} />}
                {type}
              </label>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{
            display: 'block',
            fontSize: '0.875rem',
            fontWeight: 600,
            color: '#374151',
            marginBottom: '0.375rem',
          }}>
            Notes (optionnel)
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={3}
            placeholder="Informations supplémentaires..."
            style={{
              width: '100%',
              padding: '0.625rem 1rem',
              border: '1px solid #D1D5DB',
              borderRadius: '0.5rem',
              fontSize: '0.875rem',
              outline: 'none',
              fontFamily: 'inherit',
              resize: 'vertical',
            }}
          />
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
          <button
            type="button"
            onClick={onClose}
            className="btn-secondary"
          >
            Annuler
          </button>
          <button
            type="submit"
            disabled={loading}
            className="btn-primary"
          >
            {loading ? 'Enregistrement...' : 'Planifier l\'entretien'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default InterviewModal;