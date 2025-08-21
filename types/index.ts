export interface Booking {
  id: string;
  client: Client;
  service: Service;
  servicePrice: number;
  travelFee?: number;
  totalAmount: number;
  status: "confirmed" | "pending" | "cancelled" | "completed";
  paymentStatus: "paid" | "unpaid" | "deposit";
  date: string;
  startTime: string;
  endTime: string;
  duration: string;
  location: Location;
  isTravel: boolean;
  travelDistance?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  remindersSent?: string[];
  attachments?: string[];
  review?: {
    rating: number;
    comment: string;
    date: string;
  } | null;
  calendarColor?: string;
  recurring?: boolean;
  cancellationReason?: string | null;
  source?: "web" | "app" | "admin";
}

export interface Service {
  id: string;
  name: string;
  category: string;
  duration: string;
  price: number;
  description?: string;
}

export interface Review {
  id: number;
  client: string;
  rating: number;
  comment: string;
  date: string;
  service?: string;
  replied?: boolean;
  replyText?: string;
}

export interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  active?: boolean;
}

export interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  icon: React.ComponentType<any>;
  color?: "blue" | "green" | "yellow" | "purple" | "red";
}

export interface VerificationItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  status: "verified" | "pending" | "failed";
}

export interface WorkingHours {
  enabled: boolean;
  start: string;
  end: string;
}

export interface WeeklyWorkingHours {
  monday: WorkingHours;
  tuesday: WorkingHours;
  wednesday: WorkingHours;
  thursday: WorkingHours;
  friday: WorkingHours;
  saturday: WorkingHours;
  sunday: WorkingHours;
}

export interface BlackoutDate {
  id: number;
  date: string;
  reason: string;
}

export interface AvailabilitySettings {
  leadTime: string;
  maxAdvanceBooking: string;
  bufferTime: string;
}

export interface MenuItem {
  id: string;
  label: string;
  // icon: React.ComponentType<{ className?: string }>;
  icon: React.ComponentType<any & { className?: string }>;
}

export type TabType =
  | "dashboard"
  | "bookings"
  | "calendar"
  | "services"
  | "availability"
  | "portfolio"
  | "reviews"
  | "location"
  | "settings";

export type ReviewsFilter = "All" | "Replied" | "Pending";

export type DayOfWeek =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

// Badge
export interface BadgeProps {
  children: React.ReactNode;
  variant?: "success" | "warning" | "danger" | "info";
  className?: string;
}

// Button
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "danger" | "outline";
  size?: "sm" | "md" | "lg";
}

// StatsCard
export interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  icon: React.ComponentType<any>;
  color?: "blue" | "green" | "yellow" | "purple" | "red";
}

// InputLabel (Input)
export interface InputLabelProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helpText?: string;
}

// Modal
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  maxWidth?: string;
}

// Select
export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helpText?: string;
  children: React.ReactNode;
}

export interface QuickAction {
  icon: React.ComponentType<any>;
  label: string;
}

// Location Types
export interface Coordinates {
  lat: number;
  lng: number;
}

export interface LocationData {
  address: string;
  city: string;
  region: string;
  postalCode: string;
  coordinates: Coordinates;
}

export interface LocationSettings {
  baseLocation: LocationData | null;
  travelRadius: number;
  manualAcceptanceOutsideRadius: boolean;
  preferredServiceAreas: string[];
}

export interface LocationTabProps {
  className?: string;
}

export interface LocationFormData {
  address: string;
  city: string;
  region: string;
  postalCode: string;
  coordinates: Coordinates;
}

export interface ServiceArea {
  id: string;
  name: string;
  isActive: boolean;
}

export interface RadiusOption {
  value: number;
  label: string;
  description?: string;
}

export interface LocationUpdatePayload {
  baseLocation?: Partial<LocationData>;
  travelRadius?: number;
  manualAcceptanceOutsideRadius?: boolean;
  preferredServiceAreas?: string[];
}

// Settings Types
export interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  bio: string;
  location: string;
  website: string;
  instagram: string;
  facebook: string;
}

export interface PasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface NotificationSettings {
  newBookings: boolean;
  bookingChanges: boolean;
  cancellations: boolean;
  reviews: boolean;
  emailNotifications: boolean;
  smsNotifications: boolean;
  marketingEmails: boolean;
}

export interface BookingSettings {
  confirmationMode: "instant" | "manual";
  bufferTime: number; // minutes
  leadTime: number; // hours
  maxAdvanceBooking: number; // days
  customInstructions: string;
  requireDeposit: boolean;
  depositAmount: number; // percentage
  cancellationPolicy: string;
}

export interface VerificationStatus {
  verified: boolean;
  pending: boolean;
}

export interface VerificationData {
  email: VerificationStatus;
  phone: VerificationStatus;
  identity: VerificationStatus;
}

export interface SettingsSection {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  description?: string;
}

export interface SettingsTabProps {
  className?: string;
}

export interface FormGroupProps {
  label: string;
  children: React.ReactNode;
  required?: boolean;
  error?: string;
  helpText?: string;
}

export interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface SectionHeaderProps {
  title: string;
  description?: string;
  icon?: React.ComponentType<any>;
}

export interface VerificationItemProps {
  type: "email" | "phone" | "identity";
  title: string;
  subtitle: string;
  status: VerificationStatus;
  onVerify: (type: string) => void;
  icon: React.ComponentType<any>;
}

export interface Client {
  id: string;
  name: string;
  phone: string;
  email: string;
  avatar?: string;
  notes?: string;
}

export interface Location {
  address: string;
  city: string;
  region: string;
  postalCode: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  type: "studio" | "client" | "other";
}

export interface Booking {
  id: string;
  client: Client;
  service: Service;
  servicePrice: number;
  travelFee?: number;
  totalAmount: number;
  status: "confirmed" | "pending" | "cancelled" | "completed";
  paymentStatus: "paid" | "unpaid" | "deposit";
  date: string;
  startTime: string;
  endTime: string;
  duration: string;
  location: Location;
  isTravel: boolean;
  travelDistance?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  remindersSent?: string[];
  attachments?: string[];
  review?: {
    rating: number;
    comment: string;
    date: string;
  } | null;
  calendarColor?: string;
  recurring?: boolean;
  cancellationReason?: string | null;
  source?: "web" | "app" | "admin";
}

export interface Message {
  id: number;
  sender: "client" | "artist";
  text: string;
  timestamp: string;
  read: boolean;
  images?: string[];
  files?: { name: string; url: string }[];
  status?: "sent" | "delivered" | "read";
}

export interface Conversation {
  id: number;
  client: Client;
  lastMessage: string;
  timestamp: string;
  unread: number;
  online: boolean;
  messages: Message[];
}

export interface Notification {
  id: number;
  type: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  icon: React.ElementType;
  color: string;
}

// Portfolio types
export type PortfolioCategory = string;
export type PortfolioFilter = "All" | "Hair" | "Makeup" | "Combo";

export interface PortfolioItem {
  id: number;
  type: string;
  images: string[];
  title: string;
  category: PortfolioCategory;
}

export interface PortfolioGridProps {
  items: PortfolioItem[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onImageClick: (item: PortfolioItem) => void;
}

export interface ImageJson {
  image_url: string;
  image_name: string;
  image_size: number;
  image_dimensions?: {
    width: number;
    height: number;
  };
  image_type?: string;
  uploaded_at?: string;
  artist_id?: string;
}

export interface PortfolioUploadModalProps {
  open: boolean;
  onClose: () => void;
  onUpload: (item: PortfolioItem) => void;
  initialValues?: PortfolioItem | null;
  artistName?: string;
  artistId?: string;
}

export interface PortfolioImageUploadProps {
  artistId: string;
  onUpload: (image: ImageJson | null) => void;
  artistName?: string;
  service?: string;
}

export interface PortfolioStatsProps {
  portfolioItems: PortfolioItem[];
}

export interface PortfolioFilterTabsProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export interface PortfolioImagePreviewListProps {
  images: string[];
  onRemove: (idx: number) => void;
  uploadedImage?: ImageJson | null;
}

export interface PortfolioUploadFormProps {
  title: string;
  setTitle: (title: string) => void;
  category: string;
  setCategory: (category: string) => void;
  onUpload: () => void;
  onClose: () => void;
  disabled: boolean;
  isEdit?: boolean;
}

export interface PortfolioImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedItem: PortfolioItem | null;
}

export interface PortfolioHeaderProps {
  onAddClick: () => void;
}

// Bookings feature types
export interface BookingsListProps {
  bookings: Booking[];
  onAccept: (id: string) => void;
  onCancel: (id: string) => void;
  onComplete?: (id: string) => void;
}

export interface BookingCardProps {
  booking: Booking;
  onAccept?: (id: string) => void;
  onCancel?: (id: string) => void;
  onComplete?: (id: string) => void;
}

export interface CancelBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export interface BookingsHeaderProps {
  dateRange: string;
  setDateRange: (value: string) => void;
}

export interface BookingsTabSectionProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export interface BookingsContentProps {
  activeTab: string;
  bookings: Booking[];
  onAccept: (id: string) => void;
  onCancel: (id: string) => void;
  onComplete?: (id: string) => void;
}

// Calendar Types
export interface CalendarFilters {
  status: string;
  service: string;
  timeRange: string;
}

export interface CalendarFiltersPanelProps {
  selectedFilters: CalendarFilters;
  onChange: (filters: CalendarFilters) => void;
}

export interface CalendarSidebarProps {
  selectedDate: Date | null;
  getBookingsForDate: (date: Date) => Booking[];
  getBlockedInfoForDate: (date: Date) => any;
  bookings: Booking[];
  currentDate: Date;
}

export interface CalendarGridProps {
  days: (Date | null)[];
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
  getBookingsForDate: (date: Date) => Booking[];
  getBlockedInfoForDate: (date: Date) => any;
}

export interface BookingCardProps {
  booking: Booking;
  isCompact?: boolean;
}

export interface StatusBadgeProps {
  status: string;
}

export interface CalendarHeaderProps {
  currentDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
  showFilters: boolean;
  onToggleFilters: () => void;
}

export interface FilterOption {
  value: string;
  label: string;
}
