import { PhotoGallery } from '../components/PhotoGallery';

export function PhotoPage() {
    return (
        <div className="min-h-screen bg-[#f5f5f0] py-12 px-4">
            <h1 className="text-4xl font-bold text-center mb-12">Gallerie Photos</h1>
            <PhotoGallery />
        </div>
    );
}