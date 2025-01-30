import Container from "@/components/Container";
import UserSidebar from "@/components/user-info/UserSidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Container className="flex gap-6">
      <UserSidebar />
      <main className="w-full">{children}</main>
    </Container>
  );
}
