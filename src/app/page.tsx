import { Button } from '@/_components/ui/button'
import Link from 'next/link'
import React from 'react'

const WelcomePage = () => {
    return (
        <>
            <div className="relative w-full h-screen overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1/2 bg-[#795555] [clip-path:polygon(0_0,100%_0,100%_0%,0_100%)]">
                    <div className='pl-20 pt-24'>
                        <div>
                            <Button variant="ghost" className='text-white border-2 border-opacity-20 hover:bg-black hover:bg-opacity-35 hover:border-none rounded-sm hover:text-white'>
                                <Link href={"/login"}>
                                    <div className='group text-lg ease-in-out duration-200 hover:pl-20'>
                                        <p className='inline group-hover:hidden'>ようこそ、</p>
                                        あなたの<p className='inline bg-gradient-to-r from-blue-400 via-green-400 to-yellow-400 bg-clip-text text-transparent hover:from-yellow-400 hover:via-green-400 hover:to-blue-400'>イラスト</p>
                                        <p className='inline bg-gradient-to-r from-yellow-400 via-red-400 to-purple-300 bg-clip-text text-transparent group-hover:hidden'>レータ</p>
                                        <p className='inline group-hover:hidden'>に希望！</p>
                                        <p className='hidden group-hover:inline'>として明るい未来はこちらから👉</p>
                                    </div>
                                </Link>
                            </Button>
                        </div>
                    </div>
                    <div className='pl-20 pt-10'>
                        <div>
                            <Button variant="ghost" className='text-white border-2 border-opacity-20 hover:bg-black hover:bg-opacity-35 hover:border-none rounded-sm hover:text-white'>
                                <Link href={"/login"}>
                                    <div className='group text-lg ease-in-out duration-200 hover:pl-20'>
                                        <p className='inline group-hover:hidden'>ようこそ、</p>
                                        あなたの<p className='inline bg-gradient-to-r from-blue-400 via-green-400 to-yellow-400 bg-clip-text text-transparent hover:from-yellow-400 hover:via-green-400 hover:to-blue-400'>イラスト</p>
                                        <p className='inline bg-gradient-to-r from-yellow-400 via-red-400 to-purple-300 bg-clip-text text-transparent group-hover:hidden'>レータ</p>
                                        <p className='inline group-hover:hidden'>に希望！</p>
                                        <p className='hidden group-hover:inline'>として明るい未来はこちらから👉</p>
                                    </div>
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-red-500 [clip-path:polygon(0_100%,100%_100%,100%_100%,0_60%)]"></div>
            </div>
        </>
    )
}

export default WelcomePage