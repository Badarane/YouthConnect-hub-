"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, UserPlus, Users, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAuthStore } from "@/stores/auth-store";
import { useToast } from "@/hooks/use-toast";
import { registerSchema, type RegisterFormData } from "@/lib/validations/auth";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { register: registerUser, isLoading } = useAuthStore();
  const { toast } = useToast();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: undefined,
    },
  });

  const selectedRole = watch("role");

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerUser({
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        role: data.role,
      });
      toast({
        title: "Inscription réussie",
        description: "Veuillez vous connecter avec vos identifiants",
        variant: "success",
      });
      router.push("/login");
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toast({
        title: "Erreur d'inscription",
        description: err.response?.data?.message || "Une erreur est survenue",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
          <span className="text-2xl font-bold text-primary-foreground">Y</span>
        </div>
        <CardTitle className="text-2xl font-bold">Créer un compte</CardTitle>
        <CardDescription>
          Rejoignez YouthConnect Hub dès maintenant
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <Label>Type de compte</Label>
            <RadioGroup
              value={selectedRole}
              onValueChange={(value) => setValue("role", value as "ORGANIZER" | "VISITOR")}
              className="grid grid-cols-2 gap-4"
            >
              <div>
                <RadioGroupItem
                  value="VISITOR"
                  id="visitor"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="visitor"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                >
                  <User className="mb-3 h-6 w-6" />
                  <span className="font-medium">Visiteur</span>
                  <span className="text-xs text-muted-foreground text-center mt-1">
                    Participez aux événements
                  </span>
                </Label>
              </div>
              <div>
                <RadioGroupItem
                  value="ORGANIZER"
                  id="organizer"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="organizer"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                >
                  <Users className="mb-3 h-6 w-6" />
                  <span className="font-medium">Organisateur</span>
                  <span className="text-xs text-muted-foreground text-center mt-1">
                    Créez des événements
                  </span>
                </Label>
              </div>
            </RadioGroup>
            {errors.role && (
              <p className="text-sm text-destructive">{errors.role.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">Prénom</Label>
              <Input
                id="firstName"
                placeholder="Jean"
                {...register("firstName")}
                error={errors.firstName?.message}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Nom</Label>
              <Input
                id="lastName"
                placeholder="Dupont"
                {...register("lastName")}
                error={errors.lastName?.message}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="votre@email.com"
              {...register("email")}
              error={errors.email?.message}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Téléphone (optionnel)</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+229 XX XX XX XX"
              {...register("phone")}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Mot de passe</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                {...register("password")}
                error={errors.password?.message}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-2 top-0 h-10 w-10"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Min. 8 caractères avec majuscule, minuscule et chiffre
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              {...register("confirmPassword")}
              error={errors.confirmPassword?.message}
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button type="submit" className="w-full" isLoading={isLoading}>
            <UserPlus className="mr-2 h-4 w-4" />
            S&apos;inscrire
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            Déjà un compte?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Se connecter
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
