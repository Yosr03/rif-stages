import { Link } from 'react-router-dom';
import { CheckCircle2, Home, ArrowRight } from 'lucide-react';
import Navbar from '../components/layout/Navbar';

const SuccessPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-lg mx-auto px-4 py-16 text-center">
        {/* Success Animation */}
        <div className="relative inline-flex mb-8">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center animate-bounce">
            <CheckCircle2 className="w-14 h-14 text-green-500" />
          </div>
          <div className="absolute inset-0 w-24 h-24 bg-green-200 rounded-full animate-ping opacity-30" />
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Candidature envoyée avec succès ! 🎉
        </h1>
        <p className="text-gray-500 text-lg mb-2">
          Merci pour votre candidature au sein du Groupe RIF.
        </p>
        <p className="text-gray-400 text-sm mb-8">
          Vous recevrez un email de confirmation sous peu.
          Notre équipe RH examinera votre dossier et vous tiendra informé(e) de la suite.
        </p>

        {/* What's next */}
        <div className="card text-left mb-8">
          <h3 className="font-bold text-gray-800 mb-4">📌 Prochaines étapes</h3>
          <div className="space-y-3">
            {[
              'Examen de votre candidature par l\'équipe RH',
              'Évaluation de vos compétences et de votre profil',
              'Prise de contact pour un éventuel entretien',
              'Notification de la décision finale par email',
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">
                  {i + 1}
                </div>
                <p className="text-sm text-gray-600">{step}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/" className="btn-primary flex items-center justify-center gap-2">
            <Home className="w-4 h-4" /> Retour à l'accueil
          </Link>
          <Link to="/candidature" className="btn-secondary flex items-center justify-center gap-2">
            Nouvelle candidature <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;