import {NextResponse} from 'next/server';
import {buildPaymentRequirement} from '@/lib/agentic-payments';
export async function GET(){ return NextResponse.json(buildPaymentRequirement()); }
