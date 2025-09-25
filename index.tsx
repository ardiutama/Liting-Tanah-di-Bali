/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { createClient } from '@supabase/supabase-js';

// --- Supabase Setup (Replace with your credentials) ---
const supabaseUrl = process.env.SUPABASE_URL; // Your Supabase URL
const supabaseKey = process.env.SUPABASE_ANON_KEY; // Your Supabase Anon Key
const supabase = createClient(supabaseUrl, supabaseKey);

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