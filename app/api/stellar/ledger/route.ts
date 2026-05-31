import {NextResponse} from 'next/server';
import {getLatestLedgerSnapshot} from '@/lib/stellar';
export async function GET(){ try { return NextResponse.json({ok:true, ...(await getLatestLedgerSnapshot())}); } catch (error) { return NextResponse.json({ok:false,error:error instanceof Error ? error.message : 'Unable to reach Stellar RPC'},{status:503}); } }
