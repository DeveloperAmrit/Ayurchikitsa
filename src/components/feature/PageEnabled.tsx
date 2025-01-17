'use client'
import { usePathname } from 'next/navigation';
import {FEATURE_FLAGS} from './featureFlags'
import Error from 'next/error';
interface PageEnabledProps {
    children: React.ReactNode;
}

export const PageEnabled = ({ children }: PageEnabledProps) => {
    const pathname = usePathname()
    console.log("pathname", pathname)   
    const featureFlag = Object.values(FEATURE_FLAGS).find(flag => flag.enabled)
    if(featureFlag && !featureFlag.enabled){
        return <Error statusCode={404}/>
    }
    return <>{children}</>;
};