import {
    Calendar,
    Clock,
    Users,
    Scissors,
    MapPin,
    Star,
    Settings,
    Camera,
    Plus,
    DollarSign,
    Mail,
    Phone,
    Shield,
    User,
    Bell,
    CreditCard,
    Trash2,
    CheckCircle,
    Lock,
    Globe,
    MessageCircle,
} from 'lucide-react'

export const menuItems: MenuItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: Calendar, active: true },
    { id: 'bookings', label: 'Bookings', icon: Users },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'services', label: 'Services', icon: Scissors },
    { id: 'availability', label: 'Availability', icon: Clock },
    { id: 'portfolio', label: 'Portfolio', icon: Camera },
    { id: 'messages', label: 'Messages', icon: MessageCircle },
    { id: 'reviews', label: 'Reviews', icon: Star },
    { id: 'location', label: 'Location', icon: MapPin },
    { id: 'settings', label: 'Settings', icon: Settings },
]

import {
    Service,
    Review,
    MenuItem,
    BlackoutDate,
    WeeklyWorkingHours,
    AvailabilitySettings,
    QuickAction,
    StatCardProps,
    VerificationItem,
    LocationSettings,
    RadiusOption,
    ServiceArea,
    ProfileData,
    PasswordData,
    NotificationSettings,
    BookingSettings,
    VerificationData,
    SettingsSection,
    Conversation,
    Notification,
} from '@/types'

import type { Booking } from '@/types'

// 1. Centralize clients
export const clients = [
    {
        id: 'client-1',
        name: 'Sarah Johnson',
        phone: '+63 912 345 6789',
        email: 'sarah.j@email.com',
        avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
        notes: 'Wants balayage highlights, shoulder length cut',
    },
    {
        id: 'client-2',
        name: 'Maria Santos',
        phone: '+63 917 234 5678',
        email: 'maria.santos@email.com',
        avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
        notes: 'Bridal makeup for church wedding, natural look preferred',
    },
    {
        id: 'client-3',
        name: 'Lisa Chen',
        avatar: 'LC',
        phone: '+63 905 876 5432',
        email: 'lisa.chen@email.com',
    },
    {
        id: 'client-4',
        name: 'Emma Wilson',
        avatar: 'EW',
        phone: '+63 900 000 0000',
        email: 'emma.wilson@email.com',
    },
]

// 2. Helper functions for resolving linked data
export function getServiceById(id: string): Service {
    const found = services.find((s) => s.id === id)
    if (found) return found
    // Fallback service object
    return {
        id: 'unknown',
        name: 'Unknown Service',
        category: 'Other',
        duration: '1h',
        price: 0,
    }
}
export function getClientById(id: string) {
    return clients.find((c) => c.id === id)
}
export function getReviewById(id: number) {
    return reviewsLinked.find((r) => r.id === id)
}

// 3. Restructure blackoutDates, workingHours, and availabilitySettings to support per-user data
export const userAvailability: {
    userId: string
    blackoutDates: BlackoutDate[]
    workingHours: WeeklyWorkingHours
    availabilitySettings: AvailabilitySettings
}[] = [
    {
        userId: 'artist-1',
        blackoutDates: [
            { id: 1, date: '2025-07-15', reason: 'Personal Day' },
            { id: 2, date: '2025-08-01', reason: 'Vacation' },
            { id: 3, date: '2025-12-25', reason: 'Christmas Holiday' },
        ],
        workingHours: {
            monday: { enabled: true, start: '09:00', end: '17:00' },
            tuesday: { enabled: true, start: '09:00', end: '17:00' },
            wednesday: { enabled: true, start: '09:00', end: '17:00' },
            thursday: { enabled: true, start: '09:00', end: '17:00' },
            friday: { enabled: true, start: '09:00', end: '17:00' },
            saturday: { enabled: false, start: '09:00', end: '17:00' },
            sunday: { enabled: false, start: '09:00', end: '17:00' },
        },
        availabilitySettings: {
            leadTime: '24',
            maxAdvanceBooking: '30',
            bufferTime: '15',
        },
    },
]

export function getUserAvailabilityByUserId(userId: string) {
    return userAvailability.find((ua) => ua.userId === userId)
}

// 4. Refactor reviews to use IDs for service and client
export const reviewsLinked = [
    {
        id: 1,
        clientId: 'client-1',
        serviceId: '3', // Wedding Makeup
        rating: 5,
        comment:
            'Absolutely amazing! The makeup lasted all day and looked flawless. Sarah is incredibly talented and professional. Will definitely book again!',
        date: '2025-06-20',
        replied: false,
        replyText: '',
    },
    {
        id: 2,
        clientId: 'client-2',
        serviceId: '1', // Hair Styling
        rating: 5,
        comment:
            'Professional and talented. Highly recommend! The hair styling was exactly what I wanted.',
        date: '2025-06-18',
        replied: true,
        replyText: 'Thank you so much Rachel! It was a pleasure working with you.',
    },
    {
        id: 3,
        clientId: 'client-3',
        serviceId: '2', // Hair Color
        rating: 4,
        comment: 'Great service, will book again! The color came out beautifully.',
        date: '2025-06-15',
        replied: false,
        replyText: '',
    },
    {
        id: 4,
        clientId: 'client-4',
        serviceId: '4', // Bridal Package
        rating: 5,
        comment: 'Perfect for my special day! Sarah made me feel beautiful and confident.',
        date: '2025-06-10',
        replied: true,
        replyText: 'Thank you Maria! You looked absolutely stunning. Congratulations again!',
    },
]

export const portfolioCategories = ['All', 'Hair', 'Makeup', 'Combo']

export const portfolioItems = [
    {
        id: 1,
        type: 'image',
        title: 'Wedding',
        category: 'Makeup',
        images: [
            'https://images.unsplash.com/photo-1646770965835-4547b3ef13b0?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        ],
    },
]

export const services: Service[] = [
    {
        id: '1',
        name: 'Haircut & Style',
        duration: '1h 30m',
        price: 80,
        category: 'Hair',
    },
    {
        id: '2',
        name: 'Hair Color',
        duration: '2h 30m',
        price: 120,
        category: 'Hair',
    },
    {
        id: '3',
        name: 'Wedding Makeup',
        duration: '3h',
        price: 200,
        category: 'Makeup',
    },
    {
        id: '4',
        name: 'Event Styling',
        duration: '2h',
        price: 150,
        category: 'Combo',
    },
]

// needs to be dynamic
export const blackoutDates: BlackoutDate[] = [
    { id: 1, date: '2025-07-15', reason: 'Personal Day' },
    { id: 2, date: '2025-08-01', reason: 'Vacation' },
    { id: 3, date: '2025-12-25', reason: 'Christmas Holiday' },
]

// needs to be dynamic
export const workingHours: WeeklyWorkingHours = {
    monday: { enabled: true, start: '09:00', end: '17:00' },
    tuesday: { enabled: true, start: '09:00', end: '17:00' },
    wednesday: { enabled: true, start: '09:00', end: '17:00' },
    thursday: { enabled: true, start: '09:00', end: '17:00' },
    friday: { enabled: true, start: '09:00', end: '17:00' },
    saturday: { enabled: false, start: '09:00', end: '17:00' },
    sunday: { enabled: false, start: '09:00', end: '17:00' },
}

// needs to be dynamic
export const availabilitySettings: AvailabilitySettings = {
    leadTime: '24', // hours
    maxAdvanceBooking: '30', // days
    bufferTime: '15', // minutes
}

export const quickActions: QuickAction[] = [
    { icon: Plus, label: 'Add Service' },
    { icon: Calendar, label: 'Set Availability' },
    { icon: Camera, label: 'Upload Portfolio' },
    { icon: MapPin, label: 'Update Location' },
]

export const statsOverviewStats: StatCardProps[] = [
    {
        title: 'Total Bookings',
        value: '23',
        change: '+12%',
        icon: Users,
        color: 'blue',
    },
    {
        title: 'This Week',
        value: '8',
        change: '+3',
        icon: Calendar,
        color: 'green',
    },
    {
        title: 'Average Rating',
        value: '4.9',
        icon: Star,
        color: 'yellow',
    },
    {
        title: 'Monthly Earnings',
        value: '$2,450',
        change: '+18%',
        icon: DollarSign,
        color: 'purple',
    },
]

export const verificationItems: VerificationItem[] = [
    {
        id: 'email',
        label: 'Email Verification',
        icon: Mail,
        status: 'verified',
    },
    {
        id: 'phone',
        label: 'Phone Verification',
        icon: Phone,
        status: 'verified',
    },
    {
        id: 'identity',
        label: 'Identity Verification',
        icon: Shield,
        status: 'pending',
    },
]

export const reviews: Review[] = [
    {
        id: 1,
        client: 'Emma Wilson',
        rating: 5,
        comment:
            'Absolutely amazing! The makeup lasted all day and looked flawless. Sarah is incredibly talented and professional. Will definitely book again!',
        date: '2025-06-20',
        service: 'Wedding Makeup',
        replied: false,
        replyText: '',
    },
    {
        id: 2,
        client: 'Rachel Green',
        rating: 5,
        comment:
            'Professional and talented. Highly recommend! The hair styling was exactly what I wanted.',
        date: '2025-06-18',
        service: 'Hair Styling',
        replied: true,
        replyText: 'Thank you so much Rachel! It was a pleasure working with you.',
    },
    {
        id: 3,
        client: 'Sophie Brown',
        rating: 4,
        comment: 'Great service, will book again! The color came out beautifully.',
        date: '2025-06-15',
        service: 'Hair Color',
        replied: false,
        replyText: '',
    },
    {
        id: 4,
        client: 'Maria Santos',
        rating: 5,
        comment: 'Perfect for my special day! Sarah made me feel beautiful and confident.',
        date: '2025-06-10',
        service: 'Bridal Package',
        replied: true,
        replyText: 'Thank you Maria! You looked absolutely stunning. Congratulations again!',
    },
]

export const allBookingsLinked: Booking[] = [
    // Refactored calendarBookings
    {
        id: 'calendar-1',
        client: {
            id: 'client-1',
            name: 'Sarah Johnson',
            phone: '+63 912 345 6789',
            email: 'sarah.j@email.com',
            avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
            notes: 'Wants balayage highlights, shoulder length cut',
        },
        service: getServiceById('1'),
        servicePrice: 1800,
        travelFee: 0,
        totalAmount: 1800,
        status: 'confirmed',
        paymentStatus: 'paid',
        date: '2025-07-05',
        startTime: '10:00',
        endTime: '12:30',
        duration: '2h 30m',
        location: {
            address: 'Malate, Manila',
            city: 'Manila',
            region: 'NCR',
            postalCode: '1004',
            coordinates: { lat: 14.573, lng: 120.982 },
            type: 'client',
        },
        isTravel: true,
        travelDistance: '5.2 km',
        notes: 'Wants balayage highlights, shoulder length cut',
        createdAt: '2025-06-20T10:00:00Z',
        updatedAt: '2025-06-20T10:00:00Z',
        remindersSent: ['email', 'sms'],
        attachments: [],
        review: getReviewById(1),
        calendarColor: '#A3E635',
        recurring: false,
        cancellationReason: null,
        source: 'web',
    },
    {
        id: 'calendar-2',
        client: {
            id: 'client-2',
            name: 'Maria Santos',
            phone: '+63 917 234 5678',
            email: 'maria.santos@email.com',
            avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
            notes: 'Bridal makeup for church wedding, natural look preferred',
        },
        service: getServiceById('3'),
        servicePrice: 2500,
        travelFee: 0,
        totalAmount: 2500,
        status: 'confirmed',
        paymentStatus: 'paid',
        date: '2025-07-06',
        startTime: '14:00',
        endTime: '17:00',
        duration: '3h',
        location: {
            address: 'Your Studio',
            city: 'Manila',
            region: 'NCR',
            postalCode: '1004',
            coordinates: { lat: 14.573, lng: 120.982 },
            type: 'studio',
        },
        isTravel: false,
        travelDistance: undefined,
        notes: 'Bridal makeup for church wedding, natural look preferred',
        createdAt: '2025-06-21T10:00:00Z',
        updatedAt: '2025-07-06T18:00:00Z',
        remindersSent: ['email'],
        attachments: [],
        review: getReviewById(4),
        calendarColor: '#F472B6',
        recurring: false,
        cancellationReason: null,
        source: 'web',
    },
    {
        id: 'calendar-3',
        client: {
            id: 'client-3',
            name: 'Lisa Chen',
            avatar: 'LC',
            phone: '+63 905 876 5432',
            email: 'lisa.chen@email.com',
        },
        service: getServiceById('2'),
        servicePrice: 1200,
        travelFee: 0,
        totalAmount: 1200,
        status: 'pending',
        paymentStatus: 'unpaid',
        date: '2025-07-07',
        startTime: '11:00',
        endTime: '12:30',
        duration: '1h 30m',
        location: {
            address: 'Makati CBD',
            city: 'Makati',
            region: 'NCR',
            postalCode: '1200',
            coordinates: { lat: 14.5547, lng: 121.0244 },
            type: 'client',
        },
        isTravel: true,
        travelDistance: '8.7 km',
        notes: 'Event styling for corporate photoshoot',
        createdAt: '2025-06-22T10:00:00Z',
        updatedAt: '2025-07-07T12:30:00Z',
        remindersSent: [],
        attachments: [],
        review: getReviewById(2),
        calendarColor: '#60A5FA',
        recurring: false,
        cancellationReason: null,
        source: 'web',
    },
    {
        id: 'calendar-4',
        client: {
            id: 'client-4',
            name: 'Emma Wilson',
            avatar: 'EW',
            phone: '+63 900 000 0000',
            email: 'emma.wilson@email.com',
        },
        service: getServiceById('4'),
        servicePrice: 2200,
        travelFee: 0,
        totalAmount: 2200,
        status: 'confirmed',
        paymentStatus: 'paid',
        date: '2025-07-08',
        startTime: '09:00',
        endTime: '12:00',
        duration: '3h',
        location: {
            address: 'BGC, Taguig',
            city: 'Taguig',
            region: 'NCR',
            postalCode: '1630',
            coordinates: { lat: 14.5243, lng: 121.0565 },
            type: 'client',
        },
        isTravel: true,
        travelDistance: '12.1 km',
        notes: 'Graduation photos, elegant look',
        createdAt: '2025-06-23T10:00:00Z',
        updatedAt: '2025-07-08T12:00:00Z',
        remindersSent: [],
        attachments: [],
        review: getReviewById(1),
        calendarColor: '#FBBF24',
        recurring: false,
        cancellationReason: null,
        source: 'web',
    },
]

export const calendarBlockedDates = [
    { date: '2025-07-15', reason: 'Personal Day', type: 'personal' },
    { date: '2025-07-20', reason: 'Family Event', type: 'personal' },
    { date: '2025-07-25', reason: 'Vacation', type: 'vacation' },
]

// Location Mock Data
export const defaultLocationSettings: LocationSettings = {
    baseLocation: {
        address: '123 Beauty Street',
        city: 'Angeles City',
        region: 'Central Luzon',
        postalCode: '2009',
        coordinates: { lat: 15.1453, lng: 120.5937 },
    },
    travelRadius: 15,
    manualAcceptanceOutsideRadius: true,
    preferredServiceAreas: ['Angeles City', 'Mabalacat', 'San Fernando'],
}

export const radiusOptions: RadiusOption[] = [
    { value: 5, label: '5 km', description: 'Local area only' },
    { value: 10, label: '10 km', description: 'Nearby cities' },
    { value: 15, label: '15 km', description: 'Recommended' },
    { value: 20, label: '20 km', description: 'Extended area' },
    { value: 25, label: '25 km', description: 'Wide coverage' },
    { value: 30, label: '30 km', description: 'Regional coverage' },
    { value: 40, label: '40 km', description: 'Large area' },
    { value: 50, label: '50 km', description: 'Maximum coverage' },
]

export const popularServiceAreas: ServiceArea[] = [
    { id: '1', name: 'Angeles City', isActive: true },
    { id: '2', name: 'Mabalacat', isActive: true },
    { id: '3', name: 'San Fernando', isActive: true },
    { id: '4', name: 'Tarlac City', isActive: false },
    { id: '5', name: 'Olongapo', isActive: false },
    { id: '6', name: 'Subic', isActive: false },
    { id: '7', name: 'Clark', isActive: false },
    { id: '8', name: 'Porac', isActive: false },
]

// Settings Mock Data
export const defaultProfileData: ProfileData = {
    firstName: 'Alexandra',
    lastName: 'Santos',
    email: 'alexandra.santos@email.com',
    phone: '+63 912 345 6789',
    bio: 'Professional hair stylist and makeup artist with 8+ years of experience. Specializing in bridal, event, and editorial looks.',
    location: 'Angeles City, Pampanga',
    website: 'https://alexandrasantos.com',
    instagram: '@alexandrasantos_mua',
    facebook: 'Alexandra Santos MUA',
}

export const defaultPasswordData: PasswordData = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
}

export const defaultNotificationSettings: NotificationSettings = {
    newBookings: true,
    bookingChanges: true,
    cancellations: true,
    reviews: true,
    emailNotifications: true,
    smsNotifications: true,
    marketingEmails: false,
}

export const defaultBookingSettings: BookingSettings = {
    confirmationMode: 'instant',
    bufferTime: 15,
    leadTime: 24,
    maxAdvanceBooking: 30,
    customInstructions:
        'Please bring reference photos and arrive 10 minutes early for consultation.',
    requireDeposit: false,
    depositAmount: 20,
    cancellationPolicy: '24 hours notice required for cancellations',
}

export const defaultVerificationData: VerificationData = {
    email: { verified: true, pending: false },
    phone: { verified: true, pending: false },
    identity: { verified: false, pending: true },
}

export const settingsSections: SettingsSection[] = [
    { id: 'profile', label: 'Profile Information', icon: User },
    { id: 'account', label: 'Account Security', icon: Shield },
    { id: 'booking', label: 'Booking Settings', icon: Calendar },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'verification', label: 'Verification', icon: CheckCircle },
    { id: 'payment', label: 'Payment & Billing', icon: CreditCard },
    { id: 'privacy', label: 'Privacy & Data', icon: Lock },
    { id: 'danger', label: 'Danger Zone', icon: Trash2 },
]

export const bufferTimeOptions = [
    { value: 0, label: 'No buffer time' },
    { value: 15, label: '15 minutes' },
    { value: 30, label: '30 minutes' },
    { value: 45, label: '45 minutes' },
    { value: 60, label: '1 hour' },
]

export const leadTimeOptions = [
    { value: 2, label: '2 hours' },
    { value: 4, label: '4 hours' },
    { value: 12, label: '12 hours' },
    { value: 24, label: '24 hours' },
    { value: 48, label: '48 hours' },
]

export const maxAdvanceBookingOptions = [
    { value: 7, label: '1 week' },
    { value: 14, label: '2 weeks' },
    { value: 30, label: '1 month' },
    { value: 60, label: '2 months' },
    { value: 90, label: '3 months' },
]

export const mockConversations: Conversation[] = [
    {
        id: 1,
        client: {
            id: 'client-1',
            name: 'Sarah Johnson',
            avatar: 'SJ',
            phone: '+63 912 345 6789',
            email: 'sarah.j@email.com',
        },
        lastMessage: 'Thank you! Can we reschedule to 2 PM?',
        timestamp: '2 min ago',
        unread: 2,
        online: true,
        messages: [
            {
                id: 1,
                sender: 'client',
                text: 'Hi! I have a booking for tomorrow at 10 AM for haircut & color.',
                timestamp: '10:30 AM',
                read: true,
            },
            {
                id: 2,
                sender: 'artist',
                text: 'Hi Sarah! Yes, I have you confirmed for 10 AM tomorrow. Looking forward to seeing you!',
                timestamp: '10:32 AM',
                read: true,
            },
            {
                id: 3,
                sender: 'client',
                text: 'Here are some hairstyle inspirations!',
                timestamp: '10:33 AM',
                read: false,
                images: [
                    'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=facearea&w=256&q=80',
                    'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=facearea&w=256&q=80',
                ],
            },
            {
                id: 4,
                sender: 'client',
                text: 'Actually, something came up. Can we reschedule to 2 PM?',
                timestamp: '10:35 AM',
                read: false,
            },
            {
                id: 5,
                sender: 'client',
                text: 'Thank you! Can we reschedule to 2 PM?',
                timestamp: '10:36 AM',
                read: false,
            },
            {
                id: 6,
                sender: 'client',
                text: 'Here is my reference document.',
                timestamp: '10:37 AM',
                read: false,
                files: [
                    {
                        name: 'reference.pdf',
                        url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
                    },
                ],
            },
        ],
    },
    {
        id: 2,
        client: {
            id: 'client-2',
            name: 'Maria Santos',
            avatar: 'MS',
            phone: '+63 917 234 5678',
            email: 'maria.santos@email.com',
        },
        lastMessage: 'Perfect! See you on Friday.',
        timestamp: '1 hour ago',
        unread: 0,
        online: false,
        messages: [
            {
                id: 1,
                sender: 'artist',
                text: 'Hi Maria! Just confirming your wedding makeup appointment for Friday at 2 PM.',
                timestamp: '9:15 AM',
                read: true,
            },
            {
                id: 2,
                sender: 'client',
                text: 'Yes, confirmed! Should I bring any reference photos?',
                timestamp: '9:20 AM',
                read: true,
            },
            {
                id: 3,
                sender: 'artist',
                text: 'That would be great! Please bring any makeup looks you like.',
                timestamp: '9:22 AM',
                read: true,
            },
            {
                id: 4,
                sender: 'client',
                text: 'Perfect! See you on Friday.',
                timestamp: '9:25 AM',
                read: true,
            },
        ],
    },
    {
        id: 3,
        client: {
            id: 'client-3',
            name: 'Lisa Chen',
            avatar: 'LC',
            phone: '+63 905 876 5432',
            email: 'lisa.chen@email.com',
        },
        lastMessage: 'Do you have availability next week?',
        timestamp: '3 hours ago',
        unread: 1,
        online: true,
        messages: [
            {
                id: 1,
                sender: 'client',
                text: 'Hi! I saw your portfolio and I love your work.',
                timestamp: '2:15 PM',
                read: true,
            },
            {
                id: 2,
                sender: 'client',
                text: 'Do you have availability next week?',
                timestamp: '2:16 PM',
                read: false,
            },
        ],
    },
    {
        id: 4,
        client: {
            id: 'client-4',
            name: 'Emma Wilson',
            avatar: 'EW',
            phone: '+63 900 000 0000',
            email: 'emma.wilson@email.com',
        },
        lastMessage: 'Thank you for the amazing service! ⭐',
        timestamp: 'Yesterday',
        unread: 0,
        online: false,
        messages: [
            {
                id: 1,
                sender: 'client',
                text: 'Thank you for the amazing service! ⭐',
                timestamp: 'Yesterday 4:30 PM',
                read: true,
            },
        ],
    },
]

export const notificationsList: Notification[] = [
    {
        id: 1,
        type: 'booking',
        title: 'New Booking Request',
        message: 'Sarah Johnson requested a haircut & color for tomorrow at 10 AM',
        timestamp: '5 min ago',
        read: false,
        icon: Calendar,
        color: 'blue',
    },
    {
        id: 2,
        type: 'message',
        title: 'New Message',
        message: 'Maria Santos sent you a message about Friday appointment',
        timestamp: '1 hour ago',
        read: false,
        icon: MessageCircle,
        color: 'green',
    },
    {
        id: 3,
        type: 'review',
        title: 'New Review',
        message: 'Emma Wilson left you a 5-star review',
        timestamp: '2 hours ago',
        read: false,
        icon: Star,
        color: 'yellow',
    },
    {
        id: 4,
        type: 'booking',
        title: 'Booking Confirmed',
        message: 'Lisa Chen confirmed her appointment for next Monday',
        timestamp: '3 hours ago',
        read: true,
        icon: CheckCircle,
        color: 'green',
    },
    {
        id: 5,
        type: 'system',
        title: 'Profile Verification',
        message: 'Please complete your identity verification',
        timestamp: '1 day ago',
        read: false,
        icon: Shield,
        color: 'orange',
    },
]

export const mockUser = {
    id: 'artist-1',
    name: 'Alex Simcha',
    email: 'alex.simcha@example.com',
    isArtist: true,
    image: null, // or provide a URL if needed
}

// Calendar filter options
export const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'pending', label: 'Pending' },
    { value: 'cancelled', label: 'Cancelled' },
    { value: 'completed', label: 'Completed' },
]

export const serviceOptions = [
    { value: 'all', label: 'All Services' },
    { value: 'hair', label: 'Hair Services' },
    { value: 'makeup', label: 'Makeup Services' },
    { value: 'combo', label: 'Combo Services' },
]
export const serviceCategoryOptions = [
    { value: 'hair', label: 'Hair Services' },
    { value: 'makeup', label: 'Makeup Services' },
    { value: 'combo', label: 'Combo Services' },
]

export const durationOptions = [
    { value: '15m', label: '15m' },
    { value: '30m', label: '30m' },
    { value: '45m', label: '45m' },
    { value: '1h', label: '1h' },
    { value: '1h 15m', label: '1h 15m' },
    { value: '1h 30m', label: '1h 30m' },
    { value: '1h 45m', label: '1h 45m' },
    { value: '2h', label: '2h' },
    { value: '2h 15m', label: '2h 15m' },
    '2h 30m',
    '2h 45m',
    '3h',
    '3h 15m',
    '3h 30m',
    '3h 45m',
    '4h',
    '4h 30m',
    '5h',
    '5h 30m',
    '6h',
    '6h 30m',
    '7h',
    '7h 30m',
    '8h',
    '8h 30m',
    '9h',
    '9h 30m',
    '10h',
    '10h 30m',
    '11h',
    '11h 30m',
    '12h',
]
