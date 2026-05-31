import {MvpConsole} from '@/components/MvpConsole';
import {project} from '@/data/project';
import {paymentPolicy} from '@/lib/agentic-payments';
import {assetPlan} from '@/lib/assets';
export default function Page(){return <MvpConsole project={project} paymentPolicy={paymentPolicy} assetPlan={assetPlan}/>;}
