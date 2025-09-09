import { translationData } from '@/data/translation'

function Translation({ children, className }: { children: string, className?: string }) {
    return <span className={className}>{translationData[children as keyof typeof translationData] ?? children}</span>
}


export default Translation