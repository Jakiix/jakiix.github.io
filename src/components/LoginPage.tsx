import { useState, useEffect } from 'react';
import { Gift, Lock } from 'lucide-react';
import { airtableBase } from '../lib/airtable';

interface LoginPageProps {
  onLogin: (firstName: string, code: string) => void;
  error: string | null;
}

export function LoginPage({ onLogin, error }: LoginPageProps) {
  const [firstName, setFirstName] = useState('');
  const [code, setCode] = useState('');
  const [peopleNames, setPeopleNames] = useState<string[]>([]);
  const [loadingNames, setLoadingNames] = useState(true);

  useEffect(() => {
    fetchPeopleNames();
  }, []);

  const fetchPeopleNames = async () => {
    try {
      const records = await airtableBase('People')
        .select({ sort: [{ field: 'Name', direction: 'asc' }] })
        .all();

      const names = records
        .map((r) => r.get('Name') as string)
        .filter(Boolean);

      setPeopleNames(names);
    } catch (err) {
      console.error('Error fetching people names:', err);
    } finally {
      setLoadingNames(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (firstName.trim() && code.trim()) {
      onLogin(firstName.trim(), code.trim());
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-red-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Gift className="w-20 h-20 text-rose-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Listes de Cadeaux</h1>
          <p className="text-gray-600">Connectez-vous pour accéder aux listes</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                Prénom
              </label>
              {loadingNames ? (
                <div className="text-gray-500 text-sm">Chargement des prénoms...</div>
              ) : (
                <select
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                  required
                >
                  <option value="" disabled>
                    Sélectionnez votre prénom
                  </option>
                  {peopleNames.map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              )}
            </div>

            <div>
              <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-2">
                Code
              </label>
              <input
                type="password"
                id="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                placeholder="Votre code"
                required
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2 text-red-700">
                <Lock className="w-4 h-4" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-rose-600 hover:bg-rose-700 text-white px-6 py-3 rounded-lg transition-colors font-medium shadow-md hover:shadow-lg"
            >
              Se connecter
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
