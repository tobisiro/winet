import { createLazyFileRoute } from '@tanstack/react-router';
import ContactPage from '../components/ui/ContactPage';

export const Route = createLazyFileRoute('/kontakt')({
  component: ContactPage,
})
