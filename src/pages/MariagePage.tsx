import React, { useRef, useState, useEffect } from 'react';
import { Camera, Heart, Upload, X, User } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

interface SelectedPhoto {
    file: File;
    preview: string;
}

// Configuration Supabase
const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
);

function MariagePage() {
    const [photos, setPhotos] = useState<string[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedPhotos, setSelectedPhotos] = useState<SelectedPhoto[]>([]);
    const [senderName, setSenderName] = useState('');
    const [showGallery, setShowGallery] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files || []);
        const remainingSlots = 5 - selectedPhotos.length;
        const newFiles = files.slice(0, remainingSlots);

        const newPhotos = newFiles.map(file => ({
        file,
        preview: URL.createObjectURL(file)
        }));

        setSelectedPhotos(prev => [...prev, ...newPhotos]);
        
        // Reset input value to allow selecting the same file again
        if (fileInputRef.current) {
        fileInputRef.current.value = '';
        }
    };

    const fetchPhotos = async () => {
        try {
            const { data, error } = await supabase.storage
                .from('mariage-photos')
                .list('');


            console.log('data:', data);
            console.log('error:', error);


            if (error) throw error;
            
            const publicUrls = data.map(file => 
                `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/mariage-photos/${file.name.replace(/^\/+/, '')}`
            );
            
            console.log('Photos récupérées :', publicUrls);
            setPhotos(publicUrls);
        } catch (error) {
            console.error("Erreur lors de la récupération des photos", error);
        }
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const removePhoto = (index: number) => {
        setSelectedPhotos(prev => {
        const newPhotos = [...prev];
        URL.revokeObjectURL(newPhotos[index].preview);
        newPhotos.splice(index, 1);
        return newPhotos;
        });
    };

    const handleSubmit = async () => {
        if (selectedPhotos.length === 0 || !senderName.trim()) {
            alert("Veuillez entrer votre nom avant l'envoi.");
            return;
        }
    
        setIsUploading(true);
        
        try {
            await Promise.all(
                selectedPhotos.map(async (photo) => {
                    const safeName = senderName.trim().replace(/\s+/g, '_').replace(/[^\w-]/g, '');
                    const fileName = `${safeName}_${crypto.randomUUID()}`;
                    console.log(fileName);
    
                    const { error } = await supabase.storage
                        .from('mariage-photos')
                        .upload(fileName, photo.file);
    
                    if (error) throw error;
                })
            );
    
            selectedPhotos.forEach(photo => URL.revokeObjectURL(photo.preview));
            setSelectedPhotos([]);
            await fetchPhotos();
            alert('Photos envoyées avec succès ! 🎉');
        } catch (error) {
            console.error('Erreur upload:', error);
            alert('Erreur : certaines photos n\'ont pas été envoyées 📵');
        } finally {
            setIsUploading(false);
        }
    };

    useEffect(() => {
        fetchPhotos();
    }, []);

    return (
        <div 
        className="min-h-screen bg-cover bg-center bg-no-repeat"
        style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80")',
            backgroundColor: 'rgba(20, 83, 45, 0.5)',
            backgroundBlendMode: 'overlay'
        }}
        >
        <div className="min-h-screen bg-emerald-800/40 backdrop-blur-sm flex flex-col items-center justify-start pt-12 px-4">
            {/* Title Section */}
            <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-serif text-orange-100 mb-3 drop-shadow-lg">
                Lilas & Nathan
            </h1>
            <div className="flex items-center justify-center gap-3">
                <Heart className="w-6 h-6 text-orange-200 fill-orange-200" />
                <p className="text-xl md:text-2xl text-orange-50 font-light">
                Partagez vos moments
                </p>
                <Heart className="w-6 h-6 text-orange-200 fill-orange-200" />
            </div>
            </div>

            {/* Upload Section */}
            <div className="w-full max-w-md bg-emerald-700/60 backdrop-blur-sm rounded-2xl shadow-lg shadow-emerald-950/20 p-6 md:p-8 mb-8 border border-emerald-500/30">
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                multiple
                className="hidden"
            />

            {/* Name Input */}
            <div className="mb-6">
                <label htmlFor="senderName" className="block text-sm font-medium text-orange-100 mb-2">
                    Votre nom
                </label>
                <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-orange-200" />
                    <input
                        type="text"
                        id="senderName"
                        value={senderName}
                        onChange={(e) => setSenderName(e.target.value)}
                        placeholder="Entrez votre nom"
                        className="w-full pl-10 mb-4 pr-4 py-3 bg-emerald-600/40 border border-emerald-500/30 rounded-lg text-orange-50 placeholder-orange-200/70 focus:outline-none focus:ring-2 focus:ring-orange-300/50 focus:border-orange-300/50 transition-all duration-200"
                    />
                </div>

            {selectedPhotos.length > 0 ? (
                <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    {selectedPhotos.map((photo, index) => (
                    <div key={index} className="relative">
                        <img 
                        src={photo.preview} 
                        alt={`Preview ${index + 1}`}
                        className="w-full aspect-square object-cover rounded-lg border border-emerald-500/30 shadow-lg"
                        />
                        <button
                        onClick={() => removePhoto(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                        >
                        <X className="w-4 h-4" />
                        </button>
                    </div>
                    ))}
                </div>
                <div className="flex flex-col gap-3">
                    {selectedPhotos.length < 5 && (
                    <button
                        onClick={handleUploadClick}
                        className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-orange-50 rounded-lg transition duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                    >
                        <Camera className="w-5 h-5" />
                        Ajouter d'autres photos ({5 - selectedPhotos.length} restantes)
                    </button>
                    )}
                    <button
                        onClick={handleSubmit}
                        disabled={isUploading}
                        className="w-full py-3 px-4 bg-custom-terra hover:bg-custom-terra/90 text-orange-50 rounded-lg transition duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"                    >
                        <Heart className="w-5 h-5" />
                        {isUploading ? 'Envoi en cours...' : `Cliquer ici pour envoyer ${selectedPhotos.length} photo${selectedPhotos.length > 1 ? 's' : ''} aux mariés`}
                    </button>
                </div>
                </div>
            ) : (
                <button
                onClick={handleUploadClick}
                className="w-full h-64 border-3 border-dashed border-emerald-400/40 rounded-lg hover:border-emerald-300/50 transition duration-200 flex flex-col items-center justify-center gap-4 bg-emerald-600/30 hover:bg-emerald-600/40"
                >
                <Upload className="w-12 h-12 text-orange-200" />
                <div className="text-center">
                    <p className="text-lg font-medium text-orange-50">
                    Cliquez pour ajouter jusqu'à 5 photos
                    </p>
                    <p className="text-sm text-orange-100/80">
                    ou glissez-déposez vos images ici
                    </p>
                </div>
                </button>
            )}
            </div>

            {/* Photo Gallery */}
            {showGallery && (
            <div className="w-full max-w-6xl mb-12">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {photos.map((photoUrl, index) => (
                        <div 
                            key={index}
                            className="aspect-square overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 border border-emerald-500/30 bg-emerald-700/40 hover:scale-[1.02]"
                        >
                            <img
                                src={photoUrl}
                                alt={`Photo ${index + 1}`}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                            />
                        </div>
                    ))}
                </div>
            </div>
        )}
        </div>
        </div></div>
    );
}

export default MariagePage;