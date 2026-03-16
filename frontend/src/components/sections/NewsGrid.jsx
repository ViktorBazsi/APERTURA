import { news } from '../../data';
import Section from '../ui/Section';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import DatePill from '../ui/DatePill';

function NewsGrid() {
  return (
    <Section
      eyebrow="Kiemelések"
      title="Friss hírek és fókuszpontok"
      description="Rövid, hiteles tartalmi blokkok a bemutatható kezdőoldalhoz."
    >
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {news.map((item) => (
          <Card key={item.id}>
            <div className="flex items-center justify-between gap-3">
              <Badge>{item.category}</Badge>
              <DatePill date={item.date} />
            </div>
            <h3 className="mt-5 text-2xl font-medium leading-snug">{item.title}</h3>
            <p className="mt-4 text-sm leading-6 text-canvas/68">{item.excerpt}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}

export default NewsGrid;
