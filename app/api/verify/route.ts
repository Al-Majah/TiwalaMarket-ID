import {NextResponse} from 'next/server';
import {project} from '@/data/project';
import {verifyRecord} from '@/lib/verification';
export async function GET(request: Request){ const {searchParams}=new URL(request.url); const id=searchParams.get('id'); const record=project.records.find(item=>item.id===id); if(!record) return NextResponse.json({ok:false,error:'Record not found'},{status:404}); return NextResponse.json({ok:true, record, verification:verifyRecord(record)}); }
