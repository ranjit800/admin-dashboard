// app/api/listings/route.js
import { getListings, addListing } from '@/lib/memoryStore';

export async function GET() {
  return Response.json(getListings());
}

export async function POST(req) {
  const data = await req.json();
  addListing(data);
  return Response.json({ message: 'Listing added' });
}
