// app/page.tsx
import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/docs/catch-all-segment'); // Or your starting doc
}