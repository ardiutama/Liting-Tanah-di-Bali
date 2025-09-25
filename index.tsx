/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
// In a real project, you would install the supabase-js library
// import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// --- Supabase Setup (Replace with your credentials) ---
// const supabaseUrl = process.env.SUPABASE_URL; // Your Supabase URL
// const supabaseKey = process.env.SUPABASE_ANON_KEY; // Your Supabase Anon Key
// const supabase = createClient(supabaseUrl, supabaseKey);

// --- Mock Data (Remove this when using Supabase) ---
// This data simulates what you would get from a Supabase table.
// The images are placeholders from Unsplash.
const mockListings = [
  {
    id: 1,
    title: 'Tanah Premium Tepi Pantai Cemagi',
    location: 'Cemagi, Mengwi, Badung',
    price: 3500000000,
    size_sqm: 1000,
    status: 'Dijual',
    image_url: 'https://images.unsplash.com/photo-1517404215738-15263e9f9178?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'Kavling View Sawah di Ubud',
    location: 'Ubud, Gianyar',
    price: 1800000000,
    size_sqm: 800,
    status: 'Dijual',
    image_url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1932&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'Tanah Datar Strategis di Canggu',
    location: 'Canggu, Kuta Utara, Badung',
    price: 2500000000,
    size_sqm: 500,
    status: 'Dijual',
    image_url: 'https://images.unsplash.com/photo-1542649768-99321a583582?q=80&w=1932&auto=format&fit=crop',
  },
  {
    id: 4,
    title: 'Lahan Luas untuk Villa di Uluwatu',
    location: 'Uluwatu, Kuta Selatan, Badung',
    price: 5000000000,
    size_sqm: 2500,
    status: 'Disewakan',
    image_url: 'https://images.unsplash.com/photo-1588614959067-aef3a0fea1d4?q=80&w=1974&auto=format&fit=crop',
  },
    {
    id: 5,
    title: 'Tanah Kebun Produktif di Tabanan',
    location: 'Tabanan',
    price: 950000000,
    size_sqm: 1500,
    status: 'Dijual',
    image_url: 'https://images.unsplash.com/photo-1589252331339-1681a8e15478?q=80&w=1968&auto=format&fit=crop',
  },
  {
    id: 6,
    title: 'Pemandangan Gunung Agung, Sidemen',
    location: 'Sidemen, Karangasem',
    price: 1200000000,
    size_sqm: 1100,
    status: 'Dijual',
    image_url: 'https://images.unsplash.com/photo-1601636182394-4c46f6f2a493?q=80&w=1974&auto=format&fit=crop',
  }
];

// --- Types ---
interface Listing {
  id: number;
  title: string;
  location: string;
  price: number;
  size_sqm: number;
  status: 'Dijual' | 'Disewakan';
  image_url: string;
}

// --- Helper Functions ---
const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price);
};

// --- Components ---
const ListingCard: React.FC<{ listing: Listing }> = ({ listing }) => {
  return (
    <div className="listing-card" aria-label={`Listing for ${listing.title}`}>
      <img src={listing.image_url} alt={listing.title} className="listing-card__image" loading="lazy" />
      <div className="listing-card__content">
        <span className="listing-card__status">{listing.status}</span>
        <h3 className="listing-card__title">{listing.title}</h3>
        <p className="listing-card__location">{listing.location}</p>
        <div className="listing-card__details">
          <span className="listing-card__price">{formatPrice(listing.price)}</span>
          <span className="listing-card__size">{listing.size_sqm} m²</span>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      setError(null);

      // --- TODO: Replace with actual Supabase fetch ---
      /*
      try {
        const { data, error } = await supabase
          .from('land_listings') // Make sure your table is named 'land_listings'
          .select('*');

        if (error) throw error;
        setListings(data || []);
      } catch (err: any) {
        setError('Gagal memuat data. Silakan coba lagi nanti.');
        console.error('Error fetching from Supabase:', err);
      } finally {
        setLoading(false);
      }
      */
      
      // Using mock data for now
      setTimeout(() => {
        setListings(mockListings);
        setLoading(false);
      }, 1000); // Simulate network delay
    };

    fetchListings();
  }, []);

  const renderContent = () => {
    if (loading) {
      return <p className="info-state">Memuat listing...</p>;
    }
    if (error) {
      return <p className="info-state">{error}</p>;
    }
    if (listings.length === 0) {
      return <p className="info-state">Belum ada listing yang tersedia.</p>;
    }
    return (
      <div className="listings-grid">
        {listings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
    );
  };

  return (
    <div className="app-container">
      <header>
        <h1>Tanah Bali<span>.</span></h1>
      </header>
      <main>
        <h2>Temukan Tanah Impian Anda</h2>
        <p>Jelajahi pilihan properti tanah terbaik di seluruh Bali untuk investasi atau hunian pribadi Anda.</p>
        {renderContent()}
      </main>
      <footer>
        <p>&copy; {new Date().getFullYear()} Tanah Bali. Dibuat dengan ❤️ di Bali.</p>
      </footer>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<React.StrictMode><App /></React.StrictMode>);