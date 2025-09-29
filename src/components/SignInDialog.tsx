import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";

// ✅ Firebase imports
import { auth, db } from "../lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

// ✅ Auth Context
import { useAuth } from "@/context/AuthContext";

export const SignInDialog = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRoleState] = useState("tourist"); // default role
  const { toast } = useToast();
  const { setRole } = useAuth();

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const email = e.target["signup-email"].value;
    const password = e.target["signup-password"].value;
    const name = e.target["name"].value;

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // ✅ Save role + name to Firestore
      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        role,
      });

      setRole(role); // ✅ update context

      toast({
        title: "Account created!",
        description: `Welcome ${name}, you signed up as ${role}.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const email = e.target["email"].value;
    const password = e.target["password"].value;

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // ✅ Get role from Firestore
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        setRole(userData.role); // ✅ update context
        toast({
          title: "Sign in successful!",
          description: `Welcome back ${userData.name}, Role: ${userData.role}`,
        });
      } else {
        toast({
          title: "Error",
          description: "No user data found!",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Sign In
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Welcome to SoulOfSikkim</DialogTitle>
          <DialogDescription>
            Sign in to access your saved tours and personalized recommendations.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="signin" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          {/* ✅ Sign In */}
          <TabsContent value="signin" className="space-y-4">
            <form onSubmit={handleSignin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </TabsContent>

          {/* ✅ Sign Up */}
          <TabsContent value="signup" className="space-y-4">
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your full name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input
                  id="signup-email"
                  type="email"
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <Input
                  id="signup-password"
                  type="password"
                  placeholder="Create a password"
                  required
                />
              </div>

              {/* ✅ Role selector */}
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <select
                  id="role"
                  className="w-full border rounded-md p-2"
                  value={role}
                  onChange={(e) => setRoleState(e.target.value)}
                >
                  <option value="tourist">Tourist</option>
                  <option value="researcher">Researcher</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Creating account..." : "Sign Up"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default SignInDialog;
