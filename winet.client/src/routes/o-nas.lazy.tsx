import { createLazyFileRoute } from '@tanstack/react-router';
import AboutUs from '../components/ui/AboutUs';

export const Route = createLazyFileRoute('/o-nas')({
  component: AboutUs,
})
