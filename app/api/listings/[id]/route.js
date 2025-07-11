// app/api/listings/[id]/route.js
import { updateListing } from '@/lib/memoryStore';

export async function PUT(req, { params }) {
  const data = await req.json();
  updateListing(parseInt(params.id), data);
  return Response.json({ message: 'Listing updated' });
}
