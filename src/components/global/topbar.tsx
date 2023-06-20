
import { Fragment, useState } from 'react'
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react'
import {
  Bars3Icon,
  ChartBarIcon,
  PuzzlePieceIcon,
  Squares2X2Icon,
  HomeIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'




interface TopbarProps {
    BGcolor?: string;
}

const products = [
  { name: 'Conway\'s Game of Life', description: 'Zero-player cellular automata game', href: '/projects/conways', icon: Squares2X2Icon },
  { name: 'Visual Sorting', description: 'See how different sorting algorithms behave', href: '/projects/sorting', icon: ChartBarIcon },
  { name: 'Wordle Clone', description: 'Popular NYT word game by Josh Wardle', href: '/projects/wordle', icon: PuzzlePieceIcon }
]


function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Topbar({ BGcolor }:TopbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)


  const borderStyle = `${BGcolor} w-full h-1`;

  return (
    <header className="bg-rblack w-full sticky top-0 z-50">
        <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
            <div className="flex lg:flex-1">
                <Link href="/" className="-m-1.5 p-1.5">
                    <span className="sr-only">Home</span>
                    <HomeIcon className='h-8 text-bright hover:text-cambridge' />
                </Link>
            </div>
            <div className="flex lg:hidden">
            <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-bright hover:text-cambridge"
                onClick={() => setMobileMenuOpen(true)}
            >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
            </div>
            <Popover.Group className="hidden lg:flex lg:gap-x-12">
            <Popover className="relative">
                <Popover.Button className="flex items-center gap-x-1 text-md font-semibold leading-6 text-bright hover:text-cambridge">
                    Projects
                <ChevronDownIcon className="h-5 w-5 flex-none" aria-hidden="true" />
                </Popover.Button>

                <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
                >
                <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-2 ring-cambridge">
                    <div className="p-4 bg-rblack">
                    {products.map((item) => (
                        <div
                        key={item.name}
                        className="group relative flex items-center gap-x-6 rounded-lg p-4 text-md leading-6 bg-rblack hover:bg-jet"
                        >
                        <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:text-cambridge">
                            <item.icon className="h-6 w-6 text-bright group-hover:text-cambridge" aria-hidden="true" />
                        </div>
                        <div className="flex-auto">
                            <a href={item.href} className="block font-semibold text-bright hover:text-cambridge">
                            {item.name}
                            <span className="absolute inset-0" />
                            </a>
                            <p className="mt-1 text-bright group-hover:text-cambridge">{item.description}</p>
                        </div>
                        </div>
                    ))}
                    </div>
                </Popover.Panel>
                </Transition>
            </Popover>

            <a href="#" className="text-md font-semibold leading-6 text-bright hover:text-cambridge">
                About
            </a>
            </Popover.Group>
            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            
            </div>
        </nav>




        {/* MOBILE SIDE BAR */}
        <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
            <div className="fixed inset-0 z-10" />
            <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-rblack px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
                <Link href="/" className="-m-1.5 p-1.5">
                <span className="sr-only">Home</span>
                <HomeIcon className='h-8 text-bright hover:text-cambridge' />
                </Link>
                <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-bright"
                onClick={() => setMobileMenuOpen(false)}
                >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6 text-bright hover:text-cambridge" aria-hidden="true" />
                </button>
            </div>
            <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-cambridge">
                <div className="space-y-2 py-6">
                    <Disclosure as="div" className="-mx-3">
                    {({ open }) => (
                        <>
                        <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-bright font-semibold leading-7 text-bright hover:bg-jet hover:text-cambridge">
                            Projects
                            <ChevronDownIcon
                            className={classNames(open ? 'rotate-180' : '', 'h-5 w-5 flex-none')}
                            aria-hidden="true"
                            />
                        </Disclosure.Button>
                        <Disclosure.Panel className="mt-2 space-y-2">
                            {[...products].map((item) => (
                            <Disclosure.Button
                                key={item.name}
                                as="a"
                                href={item.href}
                                className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-bright hover:bg-jet hover:text-cambridge"
                            >
                                {item.name}
                            </Disclosure.Button>
                            ))}
                        </Disclosure.Panel>
                        </>
                    )}
                    </Disclosure>
                    <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-bright hover:bg-jet hover:text-cambridge"
                    >
                    Features
                    </a>
                    <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-bright hover:bg-jet hover:text-cambridge"
                    >
                    Marketplace
                    </a>
                    <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-bright hover:bg-jet hover:text-cambridge"
                    >
                    Company
                    </a>
                </div>
                </div>
            </div>
            </Dialog.Panel>
        </Dialog>
        <div className={borderStyle} />
    </header>
  )
}