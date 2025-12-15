import { UserRole } from "@/types";

const MOCK_USERS: Array<{
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  avatar: string | null;
  phone: string | null;
  isActive: boolean;
  isEmailVerified: boolean;
}> = [
  {
    id: "1",
    email: "admin@youthconnect.bj",
    password: "Admin123!",
    firstName: "Admin",
    lastName: "YouthConnect",
    role: "ADMIN" as UserRole,
    avatar: null,
    phone: "+229 90 00 00 00",
    isActive: true,
    isEmailVerified: true,
  },
  {
    id: "2",
    email: "organisateur@youthconnect.bj",
    password: "Organizer123!",
    firstName: "Jean",
    lastName: "Organisateur",
    role: "ORGANIZER" as UserRole,
    avatar: null,
    phone: "+229 91 00 00 00",
    isActive: true,
    isEmailVerified: true,
  },
  {
    id: "3",
    email: "visiteur@youthconnect.bj",
    password: "Visitor123!",
    firstName: "Marie",
    lastName: "Visiteur",
    role: "VISITOR" as UserRole,
    avatar: null,
    phone: "+229 92 00 00 00",
    isActive: true,
    isEmailVerified: true,
  },
];

export const mockLogin = async (email: string, password: string) => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const user = MOCK_USERS.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    throw new Error("Email ou mot de passe incorrect");
  }

  const { password: _, ...userWithoutPassword } = user;

  return {
    user: userWithoutPassword,
    token: `mock-token-${user.id}-${Date.now()}`,
  };
};

export const mockRegister = async (data: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: UserRole;
}) => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const existingUser = MOCK_USERS.find((u) => u.email === data.email);
  if (existingUser) {
    throw new Error("Cet email est déjà utilisé");
  }

  const newUser = {
    id: String(MOCK_USERS.length + 1),
    email: data.email,
    password: data.password,
    firstName: data.firstName,
    lastName: data.lastName,
    role: data.role,
    avatar: null,
    phone: data.phone || null,
    isActive: true,
    isEmailVerified: false,
  };

  MOCK_USERS.push(newUser);

  const { password: _, ...userWithoutPassword } = newUser;

  return {
    user: userWithoutPassword,
    token: `mock-token-${newUser.id}-${Date.now()}`,
  };
};

export const DEMO_CREDENTIALS = {
  admin: { email: "admin@youthconnect.bj", password: "Admin123!" },
  organizer: { email: "organisateur@youthconnect.bj", password: "Organizer123!" },
  visitor: { email: "visiteur@youthconnect.bj", password: "Visitor123!" },
};
