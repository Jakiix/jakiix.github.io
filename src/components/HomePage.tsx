import { useEffect, useState } from 'react';
import { Gift, LogOut, Settings } from 'lucide-react';
import { airtableBase, Person } from '../lib/airtable';
import { ProfileModal } from './ProfileModal';

interface HomePageProps {
  onSelectPerson: (person: Person) => void;
  loggedInPerson: Person;
  onLogout: () => void;
}

export function HomePage({ onSelectPerson, loggedInPerson, onLogout }: HomePageProps) {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [currentLoggedInPerson, setCurrentLoggedInPerson] = useState(loggedInPerson);

  useEffect(() => {
    fetchPeople();
  }, []);

  async function fetchPeople() {
    try {
      const records = await airtableBase('People')
        .select({ sort: [{ field: 'Name', direction: 'asc' }] })
        .all();

      const peopleData: Person[] = records
        .map(record => ({
          id: record.id,
          name: record.get('Name') as string,
          avatar: record.get('Avatar') as { url: string }[] | undefined
        }))
        .filter(person => person.name && person.id !== currentLoggedInPerson.id);

      setPeople(peopleData);
    } catch (error) {
      console.error('Error fetching people:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-red-50 flex items-center justify-center">
        <div className="text-rose-600 text-xl">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-red-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => setShowProfileModal(true)}
            className="flex items-center gap-2 bg-white hover:bg-gray-100 text-gray-700 px-4 py-2 rounded-lg transition-colors shadow-md"
          >
            <Settings className="w-4 h-4" />
            <span className="font-medium">Ajouter un cadeau à ma liste</span>
          </button>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 bg-white hover:bg-gray-100 text-gray-700 px-4 py-2 rounded-lg transition-colors shadow-md"
          >
            <LogOut className="w-4 h-4" />
            <span className="font-medium">Déconnexion</span>
          </button>
        </div>

        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Gift className="w-16 h-16 text-rose-600" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-3">
            Listes de Cadeaux
          </h1>
          <p className="text-gray-600 text-lg">
            Bienvenue {currentLoggedInPerson.name} ! Sélectionnez une personne pour voir sa liste
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {people.map((person) => (
            <button
              key={person.id}
              onClick={() => onSelectPerson(person)}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 p-6 text-center group"
            >
              <div className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center overflow-hidden border-2 border-rose-300">
                {person.avatar && person.avatar.length > 0 ? (
                  <img
                    src={person.avatar[0].url}
                    alt={person.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center text-white text-2xl font-bold">
                    {person.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <h2 className="text-xl font-semibold text-gray-800 group-hover:text-rose-600 transition-colors">
                {person.name}
              </h2>
            </button>
          ))}
        </div>
      </div>

      {showProfileModal && (
        <ProfileModal
          person={currentLoggedInPerson}
          onClose={() => setShowProfileModal(false)}
        />
      )}
    </div>
  );
}
