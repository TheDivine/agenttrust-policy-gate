import fs from 'node:fs';
import {gate} from './index.mjs';
try {
 const [requestFile,policyFile,flag]=process.argv.slice(2);
 if(!requestFile||!policyFile||(flag && flag!=='--demo-approved')) throw Error('Usage: cli.mjs REQUEST POLICY [--demo-approved]');
 const result=gate(JSON.parse(fs.readFileSync(requestFile,'utf8')),JSON.parse(fs.readFileSync(policyFile,'utf8')),flag==='--demo-approved');
 console.log(JSON.stringify(result,null,2));process.exitCode=result.decision==='ALLOW'?0:2;
} catch(e) {console.error(JSON.stringify({decision:'ERROR',error:e.message}));process.exitCode=1;}
