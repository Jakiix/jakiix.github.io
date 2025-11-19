import { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { Person, airtableBase } from '../lib/airtable';

interface ProfileModalProps {
  person: Person;
  onClose: () => void;
}

export function ProfileModal({ person, onClose }: ProfileModalProps) {
  const [newGiftTitle, setNewGiftTitle] = useState('');
  const [newGiftLink, setNewGiftLink] = useState('');
  const [newGiftPrice, setNewGiftPrice] = useState('');
  const [isAddingGift, setIsAddingGift] = useState(false);

  const handleAddGift = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGiftTitle.trim()) return;

    try {
      setIsAddingGift(true);

      // Ici on cast en any pour éviter les erreurs TypeScript
      await airtableBase('Gifts').create({
        Title: newGiftTitle.trim(),
        PersonId: [person.id],
        GiftedBy: null,
        Lien: newGiftLink.trim() || null,
        Prix: newGiftPrice.trim() || null
      } as any);

      // Reset des champs
      setNewGiftTitle('');
      setNewGiftLink('');
      setNewGiftPrice('');

      onClose();
    } catch (error) {
      console.error('Error adding gift:', error);
    } finally {
      setIsAddingGift(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Ajouter un cadeau à ma liste</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleAddGift} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nom du cadeau *
            </label>
            <input
              type="text"
              value={newGiftTitle}
              onChange={(e) => setNewGiftTitle(e.target.value)}
              placeholder="Nom du cadeau..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Lien précis du cadeau
            </label>
            <input
              type="url"
              value={newGiftLink}
              onChange={(e) => setNewGiftLink(e.target.value)}
              placeholder="https://..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Prix approximatif
            </label>
            <input
              type="text"
              value={newGiftPrice}
              onChange={(e) => setNewGiftPrice(e.target.value)}
              placeholder="Ex: 20€, 50€, etc."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>

          <button
            type="submit"
            disabled={isAddingGift || !newGiftTitle.trim()}
            className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition-colors font-medium"
          >
            <Plus className="w-4 h-4" />
            <span>Ajouter</span>
          </button>
        </form>
      </div>
    </div>
  );
}
