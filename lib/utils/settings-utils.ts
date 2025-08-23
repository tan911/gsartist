import { ProfileData, PasswordData, NotificationSettings, BookingSettings } from '@/types'

/**
 * Validate profile data
 * @param profileData Profile data to validate
 * @returns Validation result with errors array
 */
export const validateProfileData = (
    profileData: Partial<ProfileData>
): { isValid: boolean; errors: string[] } => {
    const errors: string[] = []

    if (!profileData.firstName?.trim()) {
        errors.push('First name is required')
    }

    if (!profileData.lastName?.trim()) {
        errors.push('Last name is required')
    }

    if (!profileData.email?.trim()) {
        errors.push('Email is required')
    } else if (!isValidEmail(profileData.email)) {
        errors.push('Please enter a valid email address')
    }

    if (!profileData.phone?.trim()) {
        errors.push('Phone number is required')
    } else if (!isValidPhone(profileData.phone)) {
        errors.push('Please enter a valid phone number')
    }

    if (profileData.website && !isValidUrl(profileData.website)) {
        errors.push('Please enter a valid website URL')
    }

    return {
        isValid: errors.length === 0,
        errors,
    }
}

/**
 * Validate password data
 * @param passwordData Password data to validate
 * @returns Validation result with errors array
 */
export const validatePasswordData = (
    passwordData: PasswordData
): { isValid: boolean; errors: string[] } => {
    const errors: string[] = []

    if (!passwordData.currentPassword) {
        errors.push('Current password is required')
    }

    if (!passwordData.newPassword) {
        errors.push('New password is required')
    } else if (passwordData.newPassword.length < 8) {
        errors.push('New password must be at least 8 characters long')
    } else if (!isStrongPassword(passwordData.newPassword)) {
        errors.push(
            'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
        )
    }

    if (!passwordData.confirmPassword) {
        errors.push('Please confirm your new password')
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
        errors.push('Passwords do not match')
    }

    return {
        isValid: errors.length === 0,
        errors,
    }
}

/**
 * Validate booking settings
 * @param bookingSettings Booking settings to validate
 * @returns Validation result with errors array
 */
export const validateBookingSettings = (
    bookingSettings: Partial<BookingSettings>
): { isValid: boolean; errors: string[] } => {
    const errors: string[] = []

    if (bookingSettings.bufferTime && bookingSettings.bufferTime < 0) {
        errors.push('Buffer time cannot be negative')
    }

    if (bookingSettings.leadTime && bookingSettings.leadTime < 1) {
        errors.push('Lead time must be at least 1 hour')
    }

    if (bookingSettings.maxAdvanceBooking && bookingSettings.maxAdvanceBooking < 1) {
        errors.push('Maximum advance booking must be at least 1 day')
    }

    if (
        bookingSettings.depositAmount &&
        (bookingSettings.depositAmount < 0 || bookingSettings.depositAmount > 100)
    ) {
        errors.push('Deposit amount must be between 0 and 100 percent')
    }

    return {
        isValid: errors.length === 0,
        errors,
    }
}

/**
 * Sanitize profile input
 * @param input Input string to sanitize
 * @returns Sanitized string
 */
export const sanitizeProfileInput = (input: string): string => {
    return input.trim().replace(/[<>]/g, '') // Basic sanitization
}

/**
 * Format phone number for display
 * @param phone Phone number to format
 * @returns Formatted phone number
 */
export const formatPhoneNumber = (phone: string): string => {
    // Remove all non-digit characters
    const cleaned = phone.replace(/\D/g, '')

    // Format based on length
    if (cleaned.length === 11) {
        return `+${cleaned.slice(0, 2)} ${cleaned.slice(2, 5)} ${cleaned.slice(5, 8)} ${cleaned.slice(8)}`
    }

    return phone // Return original if can't format
}

/**
 * Check if email is valid
 * @param email Email to validate
 * @returns True if valid
 */
export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
}

/**
 * Check if phone number is valid
 * @param phone Phone number to validate
 * @returns True if valid
 */
export const isValidPhone = (phone: string): boolean => {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
    const cleaned = phone.replace(/\D/g, '')
    return phoneRegex.test(cleaned)
}

/**
 * Check if URL is valid
 * @param url URL to validate
 * @returns True if valid
 */
export const isValidUrl = (url: string): boolean => {
    try {
        new URL(url)
        return true
    } catch {
        return false
    }
}

/**
 * Check if password is strong
 * @param password Password to validate
 * @returns True if strong
 */
export const isStrongPassword = (password: string): boolean => {
    const hasUpperCase = /[A-Z]/.test(password)
    const hasLowerCase = /[a-z]/.test(password)
    const hasNumbers = /\d/.test(password)
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

    return hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar
}

/**
 * Get notification summary
 * @param settings Notification settings
 * @returns Summary string
 */
export const getNotificationSummary = (settings: NotificationSettings): string => {
    const enabledCount = Object.values(settings).filter(Boolean).length
    const totalCount = Object.keys(settings).length
    return `${enabledCount} of ${totalCount} notifications enabled`
}

/**
 * Get booking settings summary
 * @param settings Booking settings
 * @returns Summary string
 */
export const getBookingSettingsSummary = (settings: BookingSettings): string => {
    const mode = settings.confirmationMode === 'instant' ? 'Instant' : 'Manual'
    const buffer = settings.bufferTime > 0 ? `${settings.bufferTime}min buffer` : 'No buffer'
    const lead = `${settings.leadTime}h lead time`

    return `${mode} confirmation • ${buffer} • ${lead}`
}

/**
 * Generate settings export data
 * @param profileData Profile data
 * @param notificationSettings Notification settings
 * @param bookingSettings Booking settings
 * @returns Exportable data object
 */
export const generateSettingsExport = (
    profileData: ProfileData,
    notificationSettings: NotificationSettings,
    bookingSettings: BookingSettings
) => {
    return {
        profile: {
            name: `${profileData.firstName} ${profileData.lastName}`,
            email: profileData.email,
            phone: profileData.phone,
            location: profileData.location,
            website: profileData.website,
        },
        notifications: notificationSettings,
        booking: bookingSettings,
        exportedAt: new Date().toISOString(),
    }
}
