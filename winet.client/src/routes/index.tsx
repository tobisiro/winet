import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: HomeComponent,
});

function HomeComponent() {
  return (
    <div className="home-page">
      <h1>Vitajte vo WI-NET</h1>
      <p>Nekompromisný domáci internet.</p>
    </div>
  );
}
