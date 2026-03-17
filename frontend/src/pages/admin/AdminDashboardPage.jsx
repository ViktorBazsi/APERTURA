import { useEffect, useState } from 'react';
import { creatorService } from '../../services/creator.service';
import { performanceService } from '../../services/performance.service';
import { eventService } from '../../services/event.service';
import { newsService } from '../../services/news.service';
import { critiqueService } from '../../services/critique.service';

function AdminDashboardPage() {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    Promise.all([
      creatorService.list(),
      performanceService.list(),
      eventService.list(),
      newsService.list(),
      critiqueService.list(),
    ]).then(([creators, performances, events, news, critiques]) => {
      setStats([
        ['Alkotók', creators.length],
        ['Előadások', performances.length],
        ['Események', events.length],
        ['Hírek', news.length],
        ['Kritikák', critiques.length],
      ]);
    }).catch(() => setStats([]));
  }, []);

  return (
    <div>
      <h1 className='editorial-title text-5xl'>Admin dashboard</h1>
      <p className='mt-4 max-w-2xl text-canvas/65'>ETAP 3: teljes admin CRUD, Cloudinary képfeltöltés és előadás-galéria támogatás.</p>
      <div className='mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5'>
        {stats.map(([label, value]) => (
          <div key={label} className='surface p-5'>
            <p className='text-sm uppercase tracking-[0.24em] text-canvas/45'>{label}</p>
            <p className='mt-3 text-4xl text-gold'>{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboardPage;