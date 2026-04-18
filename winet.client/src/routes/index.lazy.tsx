import { createLazyFileRoute } from '@tanstack/react-router';
import Home from '../components/ui/Home';

export const Route = createLazyFileRoute('/')({
  component: Home,
})
