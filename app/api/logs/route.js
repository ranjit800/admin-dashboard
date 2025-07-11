// app/api/logs/route.js
import { getLogs } from '@/lib/logs';

export async function GET() {
  return Response.json(getLogs());
}
