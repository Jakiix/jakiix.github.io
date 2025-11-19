import { useEffect, useState } from 'react';
import { ArrowLeft, Plus, Gift as GiftIcon, User } from 'lucide-react';
import { airtableBase, Person } from '../lib/airtable';

export interface Gift {
  id: string;
  personId: string;
  title: string;
  giftedBy: string | null;
  Lien?: string | null;
  Prix?: string | null;
}

interface GiftListPageProps {
  person: Person;
  loggedInPerson: Person;
  onBack: () => void;
}

export function GiftListPage({ person, loggedInPerson, onBack }: GiftListPageProps) {
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGift, setSelectedGift] = useState<Gift | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newGiftTitle, setNewGiftTitle] = useState('');

  useEffect(() => {
    fetchGifts();
  }, [person.id]);

  async function fetchGifts() {
    try {
      const records = await airtableBase('Gifts')
        .select({ sort: [{ field: 'Created', direction: 'desc' }] })
        .all();

      const giftsData: Gift[] = records
        .filter(record => {
          const personIdArray = record.get('PersonId') as string[];
          return personIdArray && personIdArray.includes(person.id);
        })
        .map(record => {
          const personIdArray = record.get('PersonId') as string[];
          return {
            id: record.id,
            personId: personIdArray ? personIdArray[0] : '',
            title: record.get('Title') as string,
            giftedBy: (record.get('GiftedBy') as string) || null,
            Lien: record.get('Lien') as string | null,
            Prix: record.get('Prix') as string | null,
          };
        });

      setGifts(giftsData);
    } catch (error) {
      console.error('Error fetching gifts:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleAddGift() {
    if (!newGiftTitle.trim()) return;

    try {
      const records = await airtableBase('Gifts').create([
        {
          fields: {
            PersonId: [person.id],
            Title: newGiftTitle.trim()
          }
        }
      ]);

      const newGift: Gift = {
        id: records[0].id,
        personId: person.id,
        title: newGiftTitle.trim(),
        giftedBy: null,
      };

      setGifts([newGift, ...gifts]);
      setNewGiftTitle('');
      setShowAddForm(false);
    } catch (error) {
      console.error('Error adding gift:', error);
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
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-red-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-700 hover:text-rose-600 transition-colors mb-6 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Retour</span>
        </button>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
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
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{person.name}</h1>
                <p className="text-gray-600">Liste de cadeaux</p>
              </div>
            </div>
          </div>

          {showAddForm && (
            <div className="bg-rose-50 rounded-lg p-4 mb-6 border-2 border-rose-200">
              <h3 className="font-semibold text-gray-900 mb-3">Nouveau cadeau</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newGiftTitle}
                  onChange={(e) => setNewGiftTitle(e.target.value)}
                  placeholder="Titre du cadeau..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                  onKeyDown={(e) => e.key === 'Enter' && handleAddGift()}
                />
                <button
                  onClick={() => {
                    setShowAddForm(false);
                    setNewGiftTitle('');
                  }}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg transition-colors"
                >
                  Annuler
                </button>
              </div>
            </div>
          )}

          <div className="space-y-3">
            {gifts.length === 0 ? (
              <div className="text-center py-12">
                <GiftIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">Aucun cadeau pour le moment</p>
              </div>
            ) : (
              gifts.map((gift) => (
                <div
                  key={gift.id}
                  onClick={() => setSelectedGift(gift)}
                  className="bg-gray-50 hover:bg-gray-100 rounded-lg p-4 transition-all cursor-pointer border-2 border-transparent hover:border-rose-300"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <GiftIcon className="w-5 h-5 text-rose-600" />
                      <span className="text-gray-900 font-medium">{gift.title}</span>
                      {gift.Lien && (
                        <a
                          href={gift.Lien}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-2 text-blue-600 hover:text-blue-800 transition-colors"
                          title="Voir le cadeau"
                        >
                          🔗
                        </a>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {gift.Prix && (
                        <span className="text-gray-500 text-sm italic">{gift.Prix}</span>
                      )}
                      {gift.giftedBy ? (
                        <div className="flex items-center gap-2 text-sm text-gray-600 bg-green-100 px-3 py-1 rounded-full ml-2">
                          <User className="w-4 h-4 text-green-600" />
                          <span className="text-green-700 font-medium">{gift.giftedBy}</span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-400 italic ml-2">Non attribué</span>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* MODALE AUTO-ASSIGNATION */}
        {selectedGift && loggedInPerson && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{selectedGift.title}</h3>
              
              {selectedGift.giftedBy === loggedInPerson.name ? (
                <p className="text-gray-600 mb-4">Vous êtes assigné à ce cadeau, voulez-vous vous désassigner ?</p>
              ) : (
                <p className="text-gray-600 mb-4">Je veux offrir ce cadeau</p>
              )}

              <div className="flex gap-3">
                {selectedGift.giftedBy === loggedInPerson.name ? (
                  <button
                    onClick={async () => {
                      try {
                        await airtableBase('Gifts').update(selectedGift.id, { GiftedBy: null });
                        setGifts(
                          gifts.map(g =>
                            g.id === selectedGift.id ? { ...g, giftedBy: null } : g
                          )
                        );
                      } catch (error) {
                        console.error('Error unassigning gift:', error);
                      } finally {
                        setSelectedGift(null);
                      }
                    }}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors font-medium"
                  >
                    Se désassigner
                  </button>
                ) : (
                  <button
                    onClick={async () => {
                      try {
                        await airtableBase('Gifts').update(selectedGift.id, {
                          GiftedBy: loggedInPerson.name
                        });
                        setGifts(
                          gifts.map(g =>
                            g.id === selectedGift.id
                              ? { ...g, giftedBy: loggedInPerson.name }
                              : g
                          )
                        );
                      } catch (error) {
                        console.error('Error assigning gift:', error);
                      } finally {
                        setSelectedGift(null);
                      }
                    }}
                    className="flex-1 bg-rose-600 hover:bg-rose-700 text-white px-6 py-3 rounded-lg transition-colors font-medium"
                  >
                    Confirmer
                  </button>
                )}
                <button
                  onClick={() => setSelectedGift(null)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-lg transition-colors font-medium"
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
