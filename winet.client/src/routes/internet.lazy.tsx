import { createLazyFileRoute } from '@tanstack/react-router';
import InternetPage from '../components/ui/InternetPage';

export const Route = createLazyFileRoute('/internet')({
  component: InternetPage,
})
