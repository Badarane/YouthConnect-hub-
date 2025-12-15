export type UserRole = "SUPER_ADMIN" | "ADMIN" | "ORGANIZER" | "MEMBER" | "VISITOR";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatar?: string;
  role: UserRole;
  groupId?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Group {
  id: string;
  name: string;
  description?: string;
  responsableId?: string;
  memberCount: number;
  createdAt: string;
}

export interface Member extends User {
  group?: Group;
  joinDate: string;
  address?: string;
  birthDate?: string;
  profession?: string;
  cotisations: Cotisation[];
}

export interface Event {
  id: string;
  title: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
  image?: string;
  createdById: string;
  participants: EventParticipant[];
  comments: Comment[];
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface EventParticipant {
  id: string;
  eventId: string;
  userId: string;
  user: User;
  status: "confirmed" | "pending" | "declined";
  confirmedAt?: string;
}

export interface Comment {
  id: string;
  content: string;
  authorId: string;
  author: User;
  eventId?: string;
  articleId?: string;
  createdAt: string;
}

export type CotisationType = "mensuelle" | "annuelle" | "speciale";
export type PaymentStatus = "paid" | "pending" | "overdue";

export interface CotisationCategory {
  id: string;
  name: string;
  type: CotisationType;
  amount: number;
  description?: string;
  isActive: boolean;
}

export interface Cotisation {
  id: string;
  memberId: string;
  member?: Member;
  categoryId: string;
  category?: CotisationCategory;
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: PaymentStatus;
  paymentMethod?: string;
  reference?: string;
  createdAt: string;
}

export interface Article {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  coverImage?: string;
  authorId: string;
  author: User;
  category: "article" | "communique" | "compte-rendu";
  isPublished: boolean;
  publishedAt?: string;
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
}

export type DocumentVisibility = "public" | "membres";

export interface Document {
  id: string;
  title: string;
  description?: string;
  fileUrl: string;
  fileType: string;
  fileSize: number;
  category: string;
  visibility: DocumentVisibility;
  uploadedById: string;
  uploadedBy: User;
  downloads: number;
  createdAt: string;
}

export type NotificationType =
  | "event"
  | "document"
  | "payment"
  | "member"
  | "system";

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  isRead: boolean;
  link?: string;
  createdAt: string;
}

export interface DashboardStats {
  totalMembers: number;
  activeMembers: number;
  totalCotisations: number;
  pendingCotisations: number;
  upcomingEvents: number;
  totalGroups: number;
  recentPayments: Cotisation[];
  membersByGroup: { group: string; count: number }[];
  cotisationsByMonth: { month: string; amount: number }[];
}

export interface AdminDashboardStats {
  totalUsers: number;
  totalOrganizers: number;
  totalVisitors: number;
  totalEvents: number;
  upcomingEvents: number;
  completedEvents: number;
  totalRevenue: number;
  revenueThisMonth: number;
  totalPayments: number;
  pendingPayments: number;
  recentRegistrations: RecentActivity[];
  recentPayments: RecentPayment[];
  usersByRole: { role: string; count: number }[];
  eventsByStatus: { status: string; count: number }[];
  revenueByMonth: { month: string; amount: number }[];
}

export interface OrganizerDashboardStats {
  myEvents: number;
  myUpcomingEvents: number;
  myCompletedEvents: number;
  totalParticipants: number;
  totalRevenue: number;
  revenueThisMonth: number;
  avgParticipantsPerEvent: number;
  myRecentEvents: OrganizerEvent[];
  participantsByEvent: { eventTitle: string; count: number }[];
  revenueByEvent: { eventTitle: string; amount: number }[];
}

export interface VisitorDashboardStats {
  registeredEvents: number;
  upcomingRegisteredEvents: number;
  pastAttendedEvents: number;
  totalPayments: number;
  pendingPayments: number;
  myUpcomingEvents: VisitorEvent[];
  myRecentPayments: VisitorPayment[];
}

export interface RecentActivity {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  eventId: string;
  eventTitle: string;
  registeredAt: string;
}

export interface RecentPayment {
  id: string;
  userId: string;
  userName: string;
  amount: number;
  status: string;
  eventTitle?: string;
  createdAt: string;
}

export interface OrganizerEvent {
  id: string;
  title: string;
  slug: string;
  startDate: string;
  status: string;
  participantCount: number;
}

export interface VisitorEvent {
  id: string;
  title: string;
  startDate: string;
  location: string;
  status: string;
}

export interface VisitorPayment {
  id: string;
  amount: number;
  status: string;
  eventTitle?: string;
  createdAt: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}
