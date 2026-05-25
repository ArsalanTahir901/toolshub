'use client'
import { Button } from '@/components/buttons'
import { Card } from '@/components/card'
import { paths } from '@/constants';
import Link from 'next/link';
import { useRouter } from 'next/navigation'

const Notfound = () => {
    const router = useRouter();
    return (
        <div className='fixed inset-0 h-screen overflow-hidden z-9999 bg-background p-6 flex items-center justify-center'>
            <div>
                <Card className='page-container!'>
                    <h2 className='text-2xl mb-4'>The resource you are looking for not found</h2>
                    <div className='text-center text-4xl font-medium mb-4'>
                        404
                    </div>
                    <div className='flex items-center justify-center gap-4 flex-wrap'>
                        <Button
                            variant='outline'
                            onClick={() => router.back()}
                        >
                            Go Back
                        </Button>
                        <Link href={paths.home.href}>
                            <Button variant='ghost'>Go {paths.home.title}</Button>
                        </Link>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default Notfound
