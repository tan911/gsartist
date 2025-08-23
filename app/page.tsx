'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/context/AuthContext'
import { Button } from '@/components/ui/buttonnew'
import Link from 'next/link'

export default function Home() {
    const router = useRouter()
    const { isAuthenticated } = useAuth()

    useEffect(() => {
        // Only redirect authenticated users to dashboard
        if (isAuthenticated) {
            router.push('/dashboard')
        }
    }, [isAuthenticated, router])

    // Show loading while checking authentication
    if (isAuthenticated === undefined) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading...</p>
                </div>
            </div>
        )
    }

    // Show landing page for unauthenticated users
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center">
                            <h1 className="text-2xl font-bold text-gray-900">GlowSimcha</h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Link href="/auth/login">
                                <Button variant="outline" size="sm">
                                    Sign In
                                </Button>
                            </Link>
                            <Link href="/auth/signup">
                                <Button size="sm">Get Started</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                        Welcome to{' '}
                        <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                            GlowSimcha
                        </span>
                    </h1>
                    <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                        The ultimate platform for artists to manage bookings, showcase portfolios,
                        and grow their business. Connect with clients and streamline your workflow.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/auth/signup">
                            <Button size="lg" className="text-lg px-8 py-3">
                                Start Your Journey
                            </Button>
                        </Link>
                        <Link href="/auth/login">
                            <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                                Sign In to Dashboard
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Features Section */}
                <div className="mt-24 grid md:grid-cols-3 gap-8">
                    <div className="text-center p-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg
                                className="w-8 h-8 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Smart Booking</h3>
                        <p className="text-gray-600">
                            Manage your appointments and availability with our intelligent booking
                            system.
                        </p>
                    </div>

                    <div className="text-center p-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg
                                className="w-8 h-8 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            Portfolio Showcase
                        </h3>
                        <p className="text-gray-600">
                            Display your best work and attract new clients with a professional
                            portfolio.
                        </p>
                    </div>

                    <div className="text-center p-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg
                                className="w-8 h-8 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 10V3L4 14h7v7l9-11h-7z"
                                />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            Business Growth
                        </h3>
                        <p className="text-gray-600">
                            Track your performance, manage reviews, and grow your artist business.
                        </p>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200 mt-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="text-center text-gray-600">
                        <p>&copy; 2024 GlowSimcha. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}
