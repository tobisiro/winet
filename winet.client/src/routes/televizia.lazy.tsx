import { createLazyFileRoute } from '@tanstack/react-router';
import TvPage from '../components/ui/TvPage';

export const Route = createLazyFileRoute('/televizia')({
  component: TvPage,
})
